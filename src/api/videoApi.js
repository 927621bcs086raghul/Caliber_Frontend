import apiClient from './axiosConfig'

export const uploadVideo = async ({ title, description, videoFile, thumbnailFile }) => {
  const formData = new FormData()

  if (title) formData.append('title', title)
  if (description) formData.append('description', description)
  if (videoFile) formData.append('video', videoFile)
  if (thumbnailFile) formData.append('thumbnail', thumbnailFile)

  const response = await apiClient.post('/videos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
