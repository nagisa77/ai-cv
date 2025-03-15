<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&display=swap" rel="stylesheet">
  <div class="cv-component" ref="cvComponent">
    <!-- 顶部按钮区域 -->
    <div class="cv-top-buttons">
      <button class="cv-top-button" @click="handleAddModule">
        <i class="fas fa-plus-circle"></i> 添加模块
      </button>
      <button class="cv-top-button" @click="handleChangeFont">
        <i class="fas fa-font"></i> 更换字体
      </button>
      <button class="cv-top-button" @click="handleSmartFit">
        <i class="fas fa-compress-alt"></i> 智能一页
      </button>
      <button class="cv-top-button" @click="captureAndSaveScreenshot">
        <i class="fas fa-download"></i> 下载
      </button>
    </div>
    
    <div class="cv-page loading-container" v-if="isFetching">
      <l-waveform class="loading-icon" size="60" stroke="3.5" speed="1" color="var(--color-primary)"></l-waveform>
    </div>
    <div v-else class="cv-page">
      <!-- Personal Information -->
      <CreativeModernPersonalInfo :personalInfo="personalInfo" />

      <!-- Education Section -->
      <CreativeModernEducationSection :educationList="educationList" :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete"
        @add-title="handleAddTitle" />

      <!-- Work Experience Section -->
      <CreativeModernWorkSection :workList="workList" :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete"
        @add-title="handleAddTitle" />

      <!-- Project Experience Section -->
      <CreativeModernProjectSection :projectList="projectList" :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete"
        @add-title="handleAddTitle" />

      <!-- Personal Summary -->
      <CreativeModernSummarySection v-if="personalSummary" :personalSummary="personalSummary" />
    </div>
  </div>
</template>

<script>
import metadataInstance from '@/models/metadata_model.js';
import CreativeModernPersonalInfo from '@/components/template_ui/creative_modern/cv_components/CreativeModernPersonalInfo.vue';
import CreativeModernEducationSection from '@/components/template_ui/creative_modern/cv_components/CreativeModernEducationSection.vue';
import CreativeModernWorkSection from '@/components/template_ui/creative_modern/cv_components/CreativeModernComponentWorkSection.vue';
import CreativeModernProjectSection from '@/components/template_ui/creative_modern/cv_components/CreativeModernProjectSection.vue';
import CreativeModernSummarySection from '@/components/template_ui/creative_modern/cv_components/CreativeModernSummarySection.vue';

export default {
  name: "CVComponent",
  components: {
    CreativeModernPersonalInfo,
    CreativeModernEducationSection,
    CreativeModernWorkSection,
    CreativeModernProjectSection,
    CreativeModernSummarySection
  },
  props: {
    highlightTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    isFetching() {
      return metadataInstance.getIsFetching()
    },
    personalInfo() {
      return metadataInstance.data.personalInfo;
    },
    educationList() {
      return metadataInstance.data.education;
    },
    workList() {
      return metadataInstance.data.workExperience;
    },
    projectList() {
      return metadataInstance.data.projectExperience;
    },
    personalSummary() {
      return metadataInstance.data.personalSummary;
    }
  },
  methods: {
    /**
     * Handle the event emitted by child components when a title is clicked.
     */
    handleSelectedModuleChanged(payload) {
      this.$emit('selected-module-changed', payload);
    },

    /**
     * Capture the component as a screenshot and trigger download.
     */
    captureAndSaveScreenshot() {
      this.$emit('capture-and-save-screenshot');
    },

    handleEdit(type, title) {
      this.$emit('edit-title', type, title);
    },

    handleDelete(type, title) {
      this.$emit('delete-title', type, title);
    },

    handleAddTitle(type) {
      this.$emit('add-title', type);
    },
    
    // 新增的方法
    handleAddModule() {
      this.$emit('add-module');
    },
    
    handleChangeFont() {
      this.$emit('change-font');
    },
    
    handleSmartFit() {
      this.$emit('smart-fit');
    }
  }
}
</script>

<style scoped>
.cv-debug-settings {
  position: fixed;
  display: flex;
  gap: 10px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: var(--color-header-background);
  top: 60px;
  left: 38vw;
  width: 62vw;
}

/* 顶部按钮样式 */
.cv-top-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.cv-top-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  transition: background-color 0.2s;
}

.cv-top-button:hover {
  background-color: var(--color-primary-hover);
}

.cv-component {
  /* 基础布局 */
  height: calc(100vh - 60px);
  width: 62vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cv-page {
  height: 80%;
  aspect-ratio: 3/4;
  /* 3:4纸张比例，可按需调整 */
  padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  font-family: 'LXGW WenKai TC', serif;
  font-weight: 400;
  font-style: normal;
}

::v-deep .item-content-item {
  display: flex;
  font-size: 8px;
}

::v-deep .bullet-point {
  margin-right: 4px;
  margin-top: 4px;
  font-weight: bold;
}

::v-deep .bullet-point-content {
  margin-top: 2px;
}

::v-deep .session-title {
  font-size: 10px;
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  position: relative;
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

::v-deep .session-title-left-line {
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: var(--color-primary);
}

::v-deep .title-and-time {
  display: flex;
  height: 12px;
  justify-content: space-between;
  align-items: center;
}

::v-deep .sub-title-and-city {
  display: flex;
  height: 12px;
  justify-content: space-between;
  align-items: center;
  font-size: 8px;
}

::v-deep .item-title {
  font-size: 8px;
}

::v-deep .item-time {
  font-size: 8px;
}

::v-deep .session-item {
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 10px;
}

::v-deep .highlight {
  position: absolute;
  width: calc(100% + 40px);
  height: calc(100% + 10px);
  top: -5px;
  left: -20px;
  background-color: var(--color-session-selected);
  border-radius: 4px;
  z-index: -1;
}

::v-deep .highlight-left {
  width: 5px;
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 4px;
  z-index: -1;
}

/* —————————————————————————
   灰色蒙层 
   ————————————————————————— */
::v-deep .item-hover-overlay {
  position: absolute;
  top: -5px;
  left: -20px;
  width: calc(100% + 40px);
  height: calc(100% + 10px);
  border-radius: 4px;
  z-index: 1;

  /* 整体应用模糊滤镜 */
  backdrop-filter: blur(20px);

  /* 背景色等其它需求 */
  background-color: rgba(0, 0, 0, 0.3);
  transition: backdrop-filter 0.2s ease;

  /* 关键：使用渐变遮罩控制模糊的可见区域
     #000 表示该区域不透明（会显示blur），
     transparent 表示透明（不显示或不被遮罩） */
  -webkit-mask-image: linear-gradient(to left,
      #000 0%,
      /* 左侧开始完全被遮罩，可见模糊 */
      transparent 100%
      /* 右侧逐渐过渡到完全透明，不会显示模糊 */
    );
  mask-image: linear-gradient(to left,
      #000 0%,
      transparent 100%);
}

/* 按钮区域 */
::v-deep .overlay-buttons {
  position: absolute;
  top: 5px;
  right: 10px;
  display: flex;
  gap: 8px;
  /* 按钮间距 */
  z-index: 2;
  /* 按钮更上层，确保可点 */
}

::v-deep .overlay-button {
  cursor: pointer;
  padding: 4px 8px;
  border: none;
  outline: none;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

::v-deep .ai-dialog-button {
  color: var(--color-secondary);
  background-color: var(--color-primary);
}

::v-deep .ai-dialog-button:hover {
  background-color: var(--color-primary-hover);
  transition: background-color 0.2s ease;
}

::v-deep .bullet-point-prefix {
  font-size: 10px;
  font-weight: bold;
  margin-top: 2px;
  margin-right: 4px;
}

::v-deep .delete-button {
  color: var(--color-secondary);
  background-color: rgba(255, 0, 0, 0.485);
}

::v-deep .session-title-add-icon {
  margin-left: 4px;
  cursor: pointer;
}

::v-deep .loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>