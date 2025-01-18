<template>
  <div class="app">
    <!-- Chat 部分 -->
    <ChatComponent 
      :modules="chatModules"
      @update-resume="handleUpdateResume"
      :currentSelectedTitle="currentSelectedTitle"
    />
    <!-- CV 部分 -->
    <CVComponent 
      :highlightTitle="currentSelectedTitle" 
      @selected-module-changed="handleSelectedModuleChanged"
    />
  </div>
</template>

<script>
import ChatComponent from '@/components/ChatComponent.vue'
import CVComponent from '@/components/CVComponent.vue'
import metadataInstance from '@/models/metadata_model.js'

export default {
  name: 'CreateResume',
  components: {
    ChatComponent,
    CVComponent
  },
  data() {
    return {
      // 当前正在讨论的标题，用于在 CV 中高亮
      currentSelectedTitle: ''
    }
  },
  computed: {
    /**
     * 动态生成聊天模块 tabs
     * （依然从 metadata_model 中取数据，自动生成教育/工作/项目等标签）
     */
    chatModules() {
      const result = []

      // 1) 遍历教育经历
      const educationList = metadataInstance.contentForType('education') || []
      educationList.forEach((edu, index) => {
        const eduTitle = edu.title || `教育经历-${index + 1}`
        result.push({
          type: 'education',
          title: eduTitle
        })
      })

      // 2) 遍历工作经历
      const workList = metadataInstance.contentForType('workExperience') || []
      workList.forEach((work, index) => {
        const workTitle = work.title || `工作经历-${index + 1}`
        result.push({
          type: 'workExperience',
          title: workTitle
        })
      })

      // 3) 遍历项目经历
      const projectList = metadataInstance.contentForType('projectExperience') || []
      projectList.forEach((proj, index) => {
        const projTitle = proj.title || `项目经历-${index + 1}`
        result.push({
          type: 'projectExperience',
          title: projTitle
        })
      })

      return result
    }
  },
  methods: {
    /**
     * 当 ChatComponent 得到 GPT 返回的简历 JSON 时
     * 会通过 update-resume 向父组件发射
     */
    handleUpdateResume(newMetaData) {
      console.log('handleUpdateResume newMetaData', newMetaData)
      // 根据新数据更新 metadata 模型
      metadataInstance.setContentForTitle(newMetaData.resumeData.title, newMetaData.resumeData)
    },

    /**
     * 接收从 ChatComponent 发射的 "selected-module-changed" 事件
     * 更新当前选择的标题，以便在 CV 中高亮
     */
    handleSelectedModuleChanged(moduleItem) {
      
      this.currentSelectedTitle = moduleItem.title
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
