import { axiosClient } from './axiosClient'

export const authApi = {
  register: (payload) => axiosClient.post('/auth/register', payload),
  login: (payload) => axiosClient.post('/auth/login', payload),
  refresh: () => axiosClient.post('/auth/refresh'),
  logout: () => axiosClient.post('/auth/logout'),
  me: () => axiosClient.get('/auth/me')
}

