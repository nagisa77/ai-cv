// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ResumeForm from '@/views/ResumeForm.vue'
import CreateResume from '@/views/CreateResume.vue'
import TemplateSelection from '@/views/TemplateSelection.vue'
import AuthPage from '@/views/AuthPage.vue'

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
  },
  {
    path: '/template-selection',
    name: 'TemplateSelection',
    component: TemplateSelection
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
