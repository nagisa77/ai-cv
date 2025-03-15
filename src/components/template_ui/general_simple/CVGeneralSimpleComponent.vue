<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet">

  <div class="cv-component" ref="cvComponent">
    <!-- <div class="cv-debug-settings">
      <span style="color: red;">[debug_area]:</span>
      <button @click="captureAndSaveScreenshot">截图并保存</button>
    </div> -->
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
      <PersonalGeneralSimpleInfo :personalInfo="personalInfo" />

      <!-- Education Section -->
      <EducationGeneralSimpleSection :educationList="educationList" :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete"
        @add-title="handleAddTitle" />

      <!-- Work Experience Section -->
      <WorkGeneralSimpleSection :workList="workList" :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete"
        @add-title="handleAddTitle" />

      <!-- Project Experience Section -->
      <ProjectGeneralSimpleSection :projectList="projectList" :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete"
        @add-title="handleAddTitle" />

      <!-- Personal Summary -->
      <SummaryGeneralSimpleSection v-if="personalSummary" :personalSummary="personalSummary" />
    </div>
  </div>
</template>

<script>
import metadataInstance from '@/models/metadata_model.js';
import PersonalGeneralSimpleInfo from '@/components/template_ui/general_simple/cv_components/PersonalGeneralSimpleInfo.vue';
import EducationGeneralSimpleSection from '@/components/template_ui/general_simple/cv_components/EducationGeneralSimpleSection.vue';
import WorkGeneralSimpleSection from '@/components/template_ui/general_simple/cv_components/WorkGeneralSimpleSection.vue';
import ProjectGeneralSimpleSection from '@/components/template_ui/general_simple/cv_components/ProjectGeneralSimpleSection.vue';
import SummaryGeneralSimpleSection from '@/components/template_ui/general_simple/cv_components/SummaryGeneralSimpleSection.vue';

export default {
  name: "CVComponent",
  components: {
    PersonalGeneralSimpleInfo,
    EducationGeneralSimpleSection,
    WorkGeneralSimpleSection,
    ProjectGeneralSimpleSection,
    SummaryGeneralSimpleSection
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
  font-family: "Ma Shan Zheng", sans-serif;
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

::v-deep .session-title-and-background {
  display: flex;
  padding: 0px;
  align-items: flex-start;
  line-height: 1;
}

::v-deep .session-title-underline {
  width: 100%;
  height: 1px;
  margin-top: 0px;
  background-color: var(--color-primary);
}

::v-deep .session-title {
  font-size: 10px;
  position: relative;
  font-weight: bold;
  margin: 0; 
  padding: 4px 8px;
  background-color: var(--color-primary);
  color: #fff;
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
  margin-top: 5px;
  margin-bottom: 5px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
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