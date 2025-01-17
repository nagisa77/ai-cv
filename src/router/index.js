// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ResumeForm from '@/views/ResumeForm.vue'
import CreateResume from '@/views/CreateResume.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/resume-form',
    name: 'ResumeForm',
    component: ResumeForm
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
