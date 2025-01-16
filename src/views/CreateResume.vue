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