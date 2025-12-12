import apiClient from './axiosConfig'

export const registerUser = async ({ username, email, password }) => {
  const payload = {
    name: username,
    email,
    password,
  }

  const response = await apiClient.post('/auth/register', payload)
  return response.data
}

export const loginUser = async ({ email, password }) => {
  const payload = {
    email,
    password,
  }

  const response = await apiClient.post('/auth/login', payload)
  return response.data
}

export const checkAuth = async () => {
  const response = await apiClient.get('/auth/check')
  return response.data
}
