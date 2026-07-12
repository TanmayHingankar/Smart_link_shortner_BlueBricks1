import { axiosClient } from './axiosClient'

export const linkApi = {
  list: () => axiosClient.get('/links'),
  stats: () => axiosClient.get('/links/stats'),
  create: (payload) => axiosClient.post('/links', payload)
}

