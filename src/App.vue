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
  name: 'App',
  data() {
    return {
      resumeData: {
        name: "",
        university: "",
        education: [
        ],
        work: [
        ],
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
      // 合并新的 resumeData
      this.resumeData = {
        ...this.resumeData,
        ...newResumeData.resumeData
      }

      // 如果需要更深层次的合并，可以使用 lodash 的 merge 方法
      // this.resumeData = _.merge({}, this.resumeData, newResumeData)

      console.log('简历已更新：', this.resumeData)
    }
  }
}
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
}
</style>