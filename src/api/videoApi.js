import apiClient from './axiosConfig'


export const uploadVideo = async ({ title, description, categories, videoFile, thumbnailFile, isDraft }) => {
  const formData = new FormData()

  if (title) formData.append('title', title)
  if (description) formData.append('description', description)
  if (Array.isArray(categories)) {
    categories.forEach((category) => {
      if (category) {
        formData.append('categories', category)
      }
    })
  }
  if (videoFile) formData.append('video', videoFile)
  if (thumbnailFile) formData.append('thumbnail', thumbnailFile)
  if (typeof isDraft === 'boolean') formData.append('isDraft', String(isDraft))

  console.log('uploadVideo FormData entries:', Array.from(formData.entries()))

  const response = await apiClient.post('/videos', formData, {
    
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const getVideoById = async (id) => {
  const response = await apiClient.get(`/videos/${id}`)
  return response.data
}

export const getVideosByUser = async (userId) => {
  const response = await apiClient.get(`/videos/user/${userId}`)
  return response.data
}

export const getVideoCategories = async () => {
  const response = await apiClient.get('/videos/categories')
  return response.data
}

export const getVideosByCategory = async (category) => {
  const response = await apiClient.get('/videos/category', {
    params: { category },
  })
  return response.data
}

