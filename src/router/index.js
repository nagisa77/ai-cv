// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ResumeForm from '@/views/resume_forms/ResumeForm.vue'
import ResumeFormGeneralSimple from '@/views/resume_forms/ResumeFormGeneralSimple.vue'
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
    path: '/resume-form/',
    name: 'ResumeForm',
    component: ResumeForm,
  },
  {
    path: '/resume-form-general-simple',
    name: 'ResumeFormGeneralSimple',
    component: ResumeFormGeneralSimple,
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
