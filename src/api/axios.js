import axios from 'axios'
// import router from '@/router' // 根据你的路由路径调整

// 创建带基础配置的实例
const apiClient = axios.create({
  baseURL: 'http://localhost:9000',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  console.log('[AXIOS] Intercepting request to:', config.url)
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('[AXIOS] Authorization header set')
  }
  return config
})

// // 响应拦截器
// apiClient.interceptors.response.use(
//   response => response,
//   error => {
//     const { response } = error
    
//     // 统一处理 401 错误
//     if (response?.status === 401) {
//       localStorage.removeItem('token')
//       router.push('/auth')
//     }
    
//     return Promise.reject(error)
//   }
// )

// 导出自定义实例
export default apiClient