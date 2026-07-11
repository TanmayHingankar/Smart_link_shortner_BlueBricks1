import { axiosClient } from './axiosClient'

export const analyticsApi = {
  linkAnalytics: ({ id, range }) => {
    const params = new URLSearchParams()
    if (range) params.set('range', range)
    return axiosClient.get(`/links/${id}/analytics${params.toString() ? `?${params.toString()}` : ''}`)
  }
}

