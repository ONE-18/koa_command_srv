import axios from 'axios'
import { useRouter } from 'vue-router'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
})

// Interceptor de solicitud para agregar el token a los encabezados
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.log('401 error')
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)


export default axiosInstance
