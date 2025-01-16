// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// 你的页面组件
import HomePage from '@/views/Home.vue'
import CreateResume from '@/views/CreateResume.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/create-resume',
    name: 'CreateResume',
    component: CreateResume
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router