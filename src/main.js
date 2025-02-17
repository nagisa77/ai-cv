import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import './assets/global.css'
import axios from 'axios'

const app = createApp(App)

// 配置Axios全局默认值
axios.defaults.baseURL = 'http://localhost:9000' 
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器（处理Token添加）
// 修改请求拦截器
axios.interceptors.request.use(config => {
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
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const { response } = error
    
    // 处理401未授权
    if (response && response.status === 401) {
      localStorage.removeItem('token')
      router.push('/auth').then(() => {
        // 可以在这里添加跳转后的额外操作
      })
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

// 将axios挂载到Vue实例（可选）
app.config.globalProperties.$axios = axios