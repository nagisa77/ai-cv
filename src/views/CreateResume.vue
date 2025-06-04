<template>
  <div class="app" :class="{ 'mobile-layout': isMobile }">
    <!-- 左侧 -->
    <div class="left-container cv-container">
      <!-- 如果已选中某个title，就显示ChatComponent -->
      <div class="loading-container" v-if="isFetching">
        <l-waveform
          class="chat-loading-icon"
          size="60"
          stroke="3.5"
          speed="1"
          color="var(--color-primary)"
        />
      </div>
      <template v-else-if="currentEditingType != ''">
        <EditTitleComponent
          :currentEditingTitle="currentEditingTitle"
          :currentEditingType="currentEditingType"
          @cancel-changes="handleCloseEdit"
          :isNewTitle="isNewTitle"
          @changes-submitted="handleCloseEdit"
        />
      </template>
      <template v-else-if="currentSelectedTitle != ''">
        <ChatComponent
          :modules="chatModules"
          @update-resume="handleUpdateResume"
          :currentSelectedTitle="currentSelectedTitle"
          @close-chat="handleCloseChat"
        />
      </template>
      <!-- 否则，显示我们自定义的“选择模块”组件 -->
      <template v-else>
        <SelectModuleComponent
          :chatModules="chatModules"
          @selected-module-changed="handleSelectedModuleChanged"
        />
      </template>
    </div>

    <!-- 大屏下展示右侧简历；小屏下不展示，改用弹窗 -->
    <div class="right-container cv-container" v-if="!isMobile">
      <component
        class="resume-container"
        :is="currentTemplateComponent"
        :isNewTitle="isNewTitle"
        :color="color"
        :highlightTitle="currentSelectedTitle"
        :isDownloading="isDownloading"
        @selected-module-changed="handleSelectedModuleChanged"
        @edit-title="handleEditTitle"
        @cancel-changes="handleCancelChanges"
        @delete-title="handleDelete"
        @add-title="handleAddTitle"
        @capture-and-save-screenshot="handleCaptureAndSaveScreenshot"
        @add-module="handleAddModule"
      />
    </div>

    <!-- 
      新增一个按钮，统一使用同一个 .mobile-preview-button，
      让它在小屏下显示并固定到右上角。大屏下也可以显示或隐藏。
      这里演示大屏也显示，只是样式不同（也可加 v-if="isMobile" 做区分）。
    -->
    <button
      class="mobile-preview-button"
      @click="handleShowPreview"
    >
      预览简历 >>
    </button>

    <!-- 小屏下出现的“预览简历”弹窗，showPreview 为 true 时展示 -->
    <transition name="fade">
      <div class="mobile-preview-overlay" v-if="showPreview">
        <div class="mobile-preview-dialog">
          <div class="mobile-preview-header">
            <span>简历预览</span>
            <button class="close-btn" @click="showPreview = false">关闭</button>
          </div>
          <div class="mobile-preview-content">
            <component
              class="resume-container"
              :is="currentTemplateComponent"
              :isNewTitle="isNewTitle"
              :color="color"
              :highlightTitle="currentSelectedTitle"
              :isDownloading="isDownloading"
              @selected-module-changed="handleSelectedModuleChanged"
              @edit-title="handleEditTitle"
              @cancel-changes="handleCancelChanges"
              @delete-title="handleDelete"
              @add-title="handleAddTitle"
              @capture-and-save-screenshot="handleCaptureAndSaveScreenshot"
              @add-module="handleAddModule"
            />
          </div>
        </div>
      </div>
    </transition>
    <AddModuleDialog
      v-if="showAddModuleDialog"
      @cancel="showAddModuleDialog = false"
      @confirm="handleAddModuleConfirm"
    />
  </div>
</template>

<script>
import ChatComponent from '@/components/ChatComponent.vue';
import DefaultCV from '@/components/template_ui/default/DefaultCVComponent.vue';
import GeneralSimpleCV from '@/components/template_ui/general_simple/GeneralSimpleCVComponent.vue';
import CreativeModernCV from '@/components/template_ui/creative_modern/CreativeModernCV.vue';

import SelectModuleComponent from '@/components/SelectModuleComponent.vue';
import EditTitleComponent from '@/components/EditTitleComponent.vue';
import AddModuleDialog from '@/components/AddModuleDialog.vue';
import metadataInstance from '@/models/metadata_model.js';
import ChatgptModel from '@/models/chatgpt_model.js';
import { waveform } from 'ldrs';
import { resumeModel } from '@/models/resume_model.js';
import apiClient from '@/api/axios';
import { useToast } from 'vue-toastification';

waveform.register();
const chatgptInstance = ChatgptModel.getInstance();

export default {
  name: 'CreateResume',
  components: {
    ChatComponent,
    DefaultCV,
    GeneralSimpleCV,
    CreativeModernCV,
    SelectModuleComponent,
    EditTitleComponent,
    AddModuleDialog,
  },
  props: {
    templateType: {
      type: String,
      default: 'general_simple',
    },
    color: {
      type: String,
      default: ''
    }
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  created() {
    // 从路由参数获取 resumeId
    const resumeId = this.$route.params.resumeId;
    if (resumeId) {
      resumeModel.setCurrentResumeId(resumeId);
    } else {
      resumeModel.setCurrentResumeId(null);
    }

    // 监听窗口大小变化，实现响应式
    window.addEventListener('resize', this.checkIsMobile);
    this.checkIsMobile();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkIsMobile);
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
      isNewTitle: false,

      // 新增的响应式/预览控制
      isMobile: false, // 是否是窄屏
      showPreview: false, // 是否展示“简历预览”弹窗
      isDownloading: false, // 简历是否正在下载
      showAddModuleDialog: false, // 是否展示添加模块弹窗
    };
  },
  computed: {
    isFetching() {
      return chatgptInstance.getIsFetching();
    },
    currentTemplateComponent() {
      if (this.templateType == 'default') {
        return DefaultCV;
      } else if (this.templateType == 'general_simple') {
        return GeneralSimpleCV;
      } else if (this.templateType == 'creative_modern') {
        return CreativeModernCV;
      }
      return DefaultCV;
    },
    /**
     * 动态生成聊天模块 tabs
     */
    chatModules() {
      const result = [];

      // 2) 遍历工作经历
      const workList = metadataInstance.contentForType('workExperience') || [];
      workList.forEach((work, index) => {
        const workTitle = work.title || `工作经历-${index + 1}`;
        result.push({
          type: 'workExperience',
          title: workTitle,
        });
      });

      // 3) 遍历项目经历
      const projectList = metadataInstance.contentForType('projectExperience') || [];
      projectList.forEach((proj, index) => {
        const projTitle = proj.title || `项目经历-${index + 1}`;
        result.push({
          type: 'projectExperience',
          title: projTitle,
        });
      });

      return result;
    },
  },
  methods: {
    checkIsMobile() {
      this.isMobile = window.innerWidth < 768; 
    },
    handleShowPreview() {
      this.showPreview = true;
    },
    /**
     * 当 ChatComponent 得到 GPT 返回的简历 JSON 时
     */
    handleUpdateResume(newMetaData) {
      console.log('handleUpdateResume newMetaData', newMetaData);
      metadataInstance.setContentForTitle(
        newMetaData.resumeData.title,
        newMetaData.resumeData
      );
    },
    /**
     * 更新当前选择的标题（高亮）
     */
    handleSelectedModuleChanged(moduleItem) {
      this.currentSelectedTitle = moduleItem.title;
      this.currentEditingType = '';
    },
    /**
     * 关闭当前正在讨论的标题
     */
    handleCloseChat() {
      this.currentSelectedTitle = '';
    },
    handleAddModule() {
      this.currentSelectedTitle = '';
      this.showAddModuleDialog = true;
    },
    handleAddModuleConfirm(model) {
      console.log('selected module', model);
      this.showAddModuleDialog = false;
      this.handleAddTitle(model);
    },
    /**
     * 下载截图
     */
    handleCaptureAndSaveScreenshot() {
      if (this.isDownloading) return
      this.isDownloading = true

      // 提示下载开始
      this.toast.success('简历下载中')

      // 获取当前简历ID
      const resumeId = this.$route.params.resumeId

      // 使用新的截图接口获取实时截图
      apiClient
        .post('/pic/scf-screenshot', {
          resumeId,
          templateType: this.templateType,
          color: this.color,
        })
        .then((response) => {
          const urls = response.data.data.screenshotUrls
          if (response.data.code === 20009 && Array.isArray(urls) && urls.length) {
            urls.forEach((url, index) => {
              const link = document.createElement('a')
              link.href = url
              link.download = `${response.data.data.resumeId}_${index + 1}.png`
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            })
          } else if (response.data.data.screenshotUrl) {
            // 向后兼容旧接口
            const link = document.createElement('a')
            link.href = response.data.data.screenshotUrl
            link.download = `${response.data.data.resumeId}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } else {
            this.toast.error('下载失败，请重试')
            console.error('获取简历截图失败:', response.data.message)
          }
        })
        .catch((error) => {
          console.error('下载简历截图时出错:', error)
          this.toast.error('下载失败，请重试')
        })
        .finally(() => {
          this.isDownloading = false
        })
    },
    /**
     * 编辑某个标题
     */
    handleEditTitle(type, title) {
      console.log('handleEditTitle', type, title);
      this.isNewTitle = false;
      this.currentEditingTitle = title;
      this.currentEditingType = type;
    },
    /**
     * 关闭编辑弹窗
     */
    handleCloseEdit() {
      this.isNewTitle = false;
      this.currentEditingTitle = '';
      this.currentEditingType = '';
    },
    /**
     * 添加一个新的标题
     */
    handleAddTitle(type) {
      this.isNewTitle = true;
      this.currentEditingTitle = '';
      this.currentEditingType = type;
    },
    /**
     * 删除
     */
    handleDelete(type, title) {
      metadataInstance.deleteContentForTitle(type, title);
    },
    handleChangeTemplate() {
      this.$router.push({
        name: 'TemplateSelection',
        params: {
          selectionType: 'change_resume',
          resumeId: this.$route.params.resumeId,
        },
      });
    },
  },
};
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
  width: 100vw - 80px;
  overflow: hidden;
}

.cv-container {
  position: relative;
  height: 100vh;
}

.resume-container {
  overflow-y: auto;
}

.loading-container {
  height: 100vh;
  width: calc(47vw - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 预览按钮公共样式：在大屏/小屏都可能要用到 */
.mobile-preview-button {
  display: none;
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  background-color: var(--color-primary);
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.mobile-preview-button:hover {
  background-color: var(--color-primary-hover);
  transition: background-color 0.3s ease;
}

/* ============== 小屏样式 ============== */
@media screen and (max-width: 768px) {
  .app.mobile-layout {
    display: block;
  }
  .right-container {
    display: none; /* 隐藏右侧简历，改由弹窗来显示 */
  }
  .left-container {
    width: 100vw;
  }

  .loading-container {
    width: 100vw;
    height: calc(100vh - 60px);
    position: fixed;
    top: 60px;
    left: 0;
  }

  /* 让按钮固定在右上角，避免与输入框（fixed在底部）重叠 */
  .mobile-preview-button {
    display: block;
    position: fixed;
    top: 70px;
    right: 10px;
    z-index: 999;
  }
  
  .mobile-preview-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mobile-preview-dialog {
    background-color: #fff;
    width: 90%;
    height: 90%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .mobile-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-primary);
    color: #fff;
    padding: 10px;
  }
  .mobile-preview-content {
    flex: 1;
    overflow: auto;
    background-color: #f1f1f1;
    padding: 10px;
  }
  .close-btn {
    background: none;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }
}

/* 简单的过渡动画示例 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
