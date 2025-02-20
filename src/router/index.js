// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ResumeForm from '@/views/ResumeForm.vue'
import CreateResume from '@/views/CreateResume.vue'
import TemplateSelection from '@/views/TemplateSelection.vue'
import AuthPage from '@/views/AuthPage.vue'
import AuthSecondStepPage from '@/views/AuthSecondStepPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/resume-form/:templateType',
    name: 'ResumeForm',
    component: ResumeForm,
    props: true
  },
  {
    path: '/create-resume/:templateType',
    name: 'CreateResume',
    component: CreateResume,
    props: true
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
  },
  {
    path: '/auth-second-step/:email',
    name: 'AuthSecondStep',
    component: AuthSecondStepPage,
    props: true 
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
