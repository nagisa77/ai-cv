import { createRouter, createWebHashHistory } from 'vue-router'
import HomeWrapper from '@/views/HomeWrapper.vue'
// import ResumeForm from '@/views/resume_forms/ResumeForm.vue'
// import ResumeFormGeneralSimple from '@/views/resume_forms/ResumeFormGeneralSimple.vue'
// import ResumeFormCreativeModern from '@/views/resume_forms/ResumeFormCreativeModern.vue'
import UnifiedResumeForm from '@/views/UnifiedResumeForm.vue'
import CreateResume from '@/views/CreateResume.vue'
import TemplateSelection from '@/views/TemplateSelection.vue'
import AuthPage from '@/views/AuthPage.vue'
import AuthSecondStepPage from '@/views/AuthSecondStepPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeWrapper
  },
  {
    path: '/resume-form-unified/:templateType?/:color?',
    name: 'ResumeFormUnified',
    component: UnifiedResumeForm,
    props: true
  },
  // {
  //   path: '/resume-form/:color?',
  //   name: 'ResumeForm',
  //   component: ResumeForm,
  //   props: true
  // },
  // {
  //   path: '/resume-form-general-simple/:color?',
  //   name: 'ResumeFormGeneralSimple',
  //   component: ResumeFormGeneralSimple,
  //   props: true
  // },
  // {
  //   path: '/resume-form-creative-modern/:color?',
  //   name: 'ResumeFormCreativeModern',
  //   component: ResumeFormCreativeModern,
  //   props: true
  // },
  {
    path: '/create-resume/:templateType/:resumeId?/:color?',
    name: 'CreateResume',
    component: CreateResume,
    props: true
  },
  {
    path: '/template-selection/:selectionType/:resumeId?/:userUploadedResumeUrl?',
    name: 'TemplateSelection',
    component: TemplateSelection,
    props: true
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
  //   scrollBehavior(to, from, savedPosition) {
  //     // 保持滚动位置
  //     if (savedPosition) {
  //       return savedPosition
  //     } else {
  //       return { top: 0 }
  //     }
  //   },
  routes
})

export default router
