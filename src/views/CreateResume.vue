<template>
  <div class="app">
    <!-- 左侧 -->
    <div class="left-container cv-container">
      <!-- 如果已选中某个title，就显示ChatComponent -->
      <div class="loading-container" v-if="isFetching">
        <l-waveform class="chat-loading-icon" size="60" stroke="3.5" speed="1"
        color="var(--color-primary)"></l-waveform>
      </div>
      <template v-else-if="currentEditingType != ''">
        <EditTitleComponent :currentEditingTitle="currentEditingTitle" :currentEditingType="currentEditingType"
          @cancel-changes="handleCloseEdit" :isNewTitle="isNewTitle" @changes-submitted="handleCloseEdit" />
      </template>
      <template v-else-if="currentSelectedTitle != ''">
        <ChatComponent :modules="chatModules" @update-resume="handleUpdateResume"
          :currentSelectedTitle="currentSelectedTitle" @close-chat="handleCloseChat" />
      </template>
      <!-- 否则，显示我们自定义的“选择模块”组件 -->
      <template v-else>
        <SelectModuleComponent :chatModules="chatModules" @selected-module-changed="handleSelectedModuleChanged" />
      </template>

      <button @click="handleChangeTemplate">修改模板</button>
    </div>

    <!-- 右侧 -->
    <div class="right-container cv-container">
      <component :is="currentTemplateComponent" :isNewTitle="isNewTitle" :highlightTitle="currentSelectedTitle" @selected-module-changed="handleSelectedModuleChanged"
        @edit-title="handleEditTitle" @cancel-changes="handleCancelChanges" @delete-title="handleDelete"
        @add-title="handleAddTitle"/>
    </div>
  </div>
</template>

<script>
import ChatComponent from '@/components/ChatComponent.vue'
import CVComponent from '@/components/template_ui/default/CVComponent.vue'
import CVGeneralSimpleComponent from '@/components/template_ui/general_simple/CVGeneralSimpleComponent.vue'
import CreativeModernCVComponent from '@/components/template_ui/creative_modern/CreativeModernCVComponent.vue'
import SelectModuleComponent from '@/components/SelectModuleComponent.vue' 
import EditTitleComponent from '@/components/EditTitleComponent.vue'
import metadataInstance from '@/models/metadata_model.js'
import ChatgptModel from '@/models/chatgpt_model.js'
import { waveform } from 'ldrs'
import { resumeModel } from '@/models/resume_model.js'

waveform.register()
const chatgptInstance = ChatgptModel.getInstance()

export default {
  name: 'CreateResume',
  components: {
    ChatComponent,
    CVComponent,
    SelectModuleComponent,
    EditTitleComponent
  },
  props: {
    templateType: {
      type: String,
      default: 'general_simple'
    }
  },
  created() {
    // 从路由参数获取 resumeId
    const resumeId = this.$route.params.resumeId;
    if (resumeId) {
      resumeModel.setCurrentResumeId(resumeId);
    } else {
      resumeModel.setCurrentResumeId(null);    
    }
  },
  data() {
    return {
      // 当前正在讨论的标题，用于在 CV 中高亮
      currentSelectedTitle: '',
      // 当前正在编辑的标题
      currentEditingTitle: '',
      // 当前正在编辑的类型
      currentEditingType: '',
      // 是否是新添加的标题
      isNewTitle: false
    }
  },
  computed: {
    isFetching() {
      return chatgptInstance.getIsFetching()
    },
    currentTemplateComponent() {
      if (this.templateType == 'default') {
        return CVComponent
      } else if (this.templateType == 'general_simple') {
        return CVGeneralSimpleComponent
      } else if (this.templateType == 'creative_modern') {
        return CreativeModernCVComponent
      }

      return CVComponent;
    },
    /**
     * 动态生成聊天模块 tabs
     * （依然从 metadata_model 中取数据，自动生成教育/工作/项目等标签）
     */
    chatModules() {
      const result = []

      // // 1) 遍历教育经历
      // const educationList = metadataInstance.contentForType('education') || []
      // educationList.forEach((edu, index) => {
      //   const eduTitle = edu.title || `教育经历-${index + 1}`
      //   result.push({
      //     type: 'education',
      //     title: eduTitle
      //   })
      // })

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
      this.currentEditingType = ''
    },

    /**
     * 接收从 ChatComponent 发射的 "close-chat" 事件
     * 关闭当前正在讨论的标题
     */
    handleCloseChat() {
      this.currentSelectedTitle = ''
    },

    /**
     * 接收从 CVComponent 发射的 "edit-title" 事件
     * 更新当前正在编辑的标题
     */
    handleEditTitle(type, title) {
      console.log('handleEditTitle', type, title)
      this.isNewTitle = false
      this.currentEditingTitle = title
      this.currentEditingType = type
    },

    /**
     * 接收从 EditTitleComponent 发射的 "cancel-changes" 事件
     * 取消当前正在编辑的标题
     */
    handleCloseEdit() {
      this.isNewTitle = false
      this.currentEditingTitle = ''
      this.currentEditingType = ''
    },

    /**
     * 接收从 CVComponent 发射的 "add-title" 事件
     * 添加一个新的标题
     */
    handleAddTitle(type) {
      this.isNewTitle = true
      this.currentEditingTitle = ''
      this.currentEditingType = type
    },

    /**
     * 接收从 CVComponent 发射的 "delete-title" 事件
     * 删除当前正在编辑的标题
     */
    handleDelete(type, title) {
      metadataInstance.deleteContentForTitle(type, title)
    },

    handleChangeTemplate() {
      this.$router.push({
        name: 'TemplateSelection',
        params: { selectionType: 'change_resume', resumeId: this.$route.params.resumeId }
      })
    }
  }
}
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
}

.cv-container {
  position: relative;
  height: calc(100vh - 60px);
  margin-top: 60px;
}

.loading-container {
  background-color: var(--color-background);
  height: calc(100vh - 60px);
  width: 38vw;
  display: flex;
  justify-content: center;
  align-items: center;  
}
</style>
