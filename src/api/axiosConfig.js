import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// You can add interceptors here later (auth token, logging, etc.)
// apiClient.interceptors.request.use((config) => { ... })
// apiClient.interceptors.response.use((response) => response, (error) => { ... })

export default apiClient
