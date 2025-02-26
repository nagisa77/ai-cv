import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import './assets/global.css'
import apiClient from './api/axios'

const app = createApp(App)

// 配置Axios全局默认值
apiClient.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器（处理Token添加）
// 修改请求拦截器
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  console.log('[AXIOS] Intercepting request to:', config.url)
  console.log('[AXIOS] Current token:', token)
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('[AXIOS] Set headers:', config.headers)
  }
  return config
})

// 响应拦截器（处理Token过期）
apiClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const { response } = error
    
    // 处理401未授权
    if (response && response.status === 401) {
      localStorage.removeItem('token')
      const redirect = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push(`/auth?redirect=${redirect}`)
    }
    
    // 处理其他错误
    return Promise.reject(error)
  }
)

// 注册路由
app.use(router)

// 配置Toast
const toastOptions = {
  timeout: 2000,
  position: "top-center",
  closeButton: false,
  draggable: false,
  bodyClassName: "custom-toast-body",
  toastClassName: "custom-toast-container",
  transition: "Vue-Toastification__slideBlurred",
  maxToasts: 3,
  newestOnTop: true,
  filterDuplicate: true
}
app.use(Toast, toastOptions)

// 挂载应用
app.mount('#app')