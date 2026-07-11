import { axiosClient } from './axiosClient'

export const linkApi = {
  list: () => axiosClient.get('/links'),
  create: (payload) => axiosClient.post('/links', payload)
}

