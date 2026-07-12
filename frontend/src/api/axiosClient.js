import axios from 'axios'
import { env } from '../config/env'
import { clearAccessToken, getAccessToken, setAccessToken } from './tokenStore'

export const axiosClient = axios.create({
  baseURL: `${env.apiBaseUrl}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshPromise = null

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const status = error.response?.status
    const url = original?.url || ''

    const isAuthEndpoint =
      url.includes('/auth/refresh') ||
      url.includes('/auth/login') ||
      url.includes('/auth/register')

    if (status === 401 && original && !original._retry && !isAuthEndpoint) {
      original._retry = true
      try {
        refreshPromise = refreshPromise || axiosClient.post('/auth/refresh')
        const res = await refreshPromise
        refreshPromise = null

        const newToken = res?.data?.data?.accessToken
        if (newToken) {
          setAccessToken(newToken)
          original.headers = original.headers || {}
          original.headers.Authorization = `Bearer ${newToken}`
          return axiosClient(original)
        }
      } catch (refreshError) {
        refreshPromise = null
        clearAccessToken()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
