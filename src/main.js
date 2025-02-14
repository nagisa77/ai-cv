import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './assets/global.css'

const app = createApp(App)

// 先注册路由
app.use(router)

// 正确注册 Toast 插件
app.use(Toast, {
    // 基础配置
    timeout: 2000,
    position: "top-center",
    closeButton: false,
    draggable: false,

    // 样式相关配置
    bodyClassName: "custom-toast-body",
    toastClassName: "custom-toast-container",
    transition: "Vue-Toastification__slideBlurred",

    // 高级布局配置
    maxToasts: 3,
    newestOnTop: true,
    filterDuplicate: true
})

app.mount('#app')