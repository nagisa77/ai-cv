<!-- src/views/CreateResume.vue -->
<template>
  <div class="app">
    <ChatComponent @update-resume="handleUpdateResume" />
    <CVComponent :resumeData="resumeData" />
  </div>
</template>

<script>
import ChatComponent from '@/components/ChatComponent.vue'
import CVComponent from '@/components/CVComponent.vue'

export default {
  name: 'CreateResume',
  data() {
    return {
      resumeData: {
        name: "",
        university: "",
        education: [],
        work: [],
        summary: ""
      }
    }
  },
  components: {
    ChatComponent,
    CVComponent
  },
  created() {
    // 如果你是用 localStorage 来传递数据，可以在这里读取
    const formDataStr = localStorage.getItem('resumeFormData')
    if (formDataStr) {
      try {
        const formData = JSON.parse(formDataStr)
        // 根据你自己的需求将 formData 合并到 resumeData
        // 比如：
        this.resumeData.name = formData.name || ''
        // 也可能要把 educationList、workList、projectList 等合并到 resumeData 里
      } catch (error) {
        console.error('解析简历表单数据出错', error)
      }
    }
  },
  methods: {
    handleUpdateResume(newResumeData) {
      console.log('newResumeData', JSON.stringify(newResumeData))
      this.resumeData = {
        ...this.resumeData,
        ...newResumeData.resumeData
      }
      console.log('简历已更新：', this.resumeData)
    }
  }
}
</script>

<style scoped>
.app {
  display: flex;
  height: calc(100vh - 60px);
}
</style>
