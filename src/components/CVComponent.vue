<template>
  <div class="cv-component" ref="cvComponent">
    <div class="cv-debug-settings">
      <span style="color: red;">[debug_area]:</span>
      <button @click="captureAndSaveScreenshot">截图并保存</button>
    </div>
    <div class="cv-page">
      <!-- Personal Information -->
      <PersonalInfo :personalInfo="personalInfo" />

      <!-- Education Section -->
      <EducationSection :educationList="educationList" :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete" />

      <!-- Work Experience Section -->
      <WorkSection :workList="workList" :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete" />

      <!-- Project Experience Section -->
      <ProjectSection :projectList="projectList" :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete" />

      <!-- Personal Summary -->
      <SummarySection v-if="personalSummary" :personalSummary="personalSummary" />
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import metadataInstance from '@/models/metadata_model.js';
import PersonalInfo from '@/components/cv_components/PersonalInfo.vue';
import EducationSection from '@/components/cv_components/EducationSection.vue';
import WorkSection from '@/components/cv_components/WorkSection.vue';
import ProjectSection from '@/components/cv_components/ProjectSection.vue';
import SummarySection from '@/components/cv_components/SummarySection.vue';

export default {
  name: "CVComponent",
  components: {
    PersonalInfo,
    EducationSection,
    WorkSection,
    ProjectSection,
    SummarySection
  },
  props: {
    highlightTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
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
      const cvComponent = this.$refs.cvComponent;

      // 使用html2canvas捕捉组件
      html2canvas(cvComponent).then(canvas => {
        // 将canvas转化为图片URL
        const imgUrl = canvas.toDataURL('image/png');

        // 创建下载链接
        const link = document.createElement('a');
        link.href = imgUrl;
        link.download = 'cv-screenshot.png';
        link.click();
      });
    },

    handleEdit(type, title) {
      this.$emit('edit-title', type, title);
    },

    handleDelete(type, title) {
      this.$emit('delete-title', type, title);
    }
  }
}
</script>

<style>
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

.cv-component {
  /* 基础布局 */
  height: calc(100vh - 60px);
  width: 62vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cv-page {
  height: 80%;
  aspect-ratio: 3/4;
  /* 3:4纸张比例，可按需调整 */
  padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.item-content-item {
  display: flex;
  font-size: 8px;
}

.bullet-point {
  margin-right: 4px;
  margin-top: 4px;
  font-weight: bold;
}

.bullet-point-content {
  margin-top: 2px;
}

.session-title {
  font-size: 12px;
  position: relative;
}

.session-title::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background-color: #000;
  margin-top: 4px;
}

.title-and-time {
  display: flex;
  height: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.item-title {
  font-size: 10px;
}

.item-time {
  font-size: 8px;
}

.session-item {
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 10px;
}

.highlight {
  position: absolute;
  width: calc(100% + 40px);
  height: calc(100% + 10px);
  top: -5px;
  left: -20px;
  background-color: var(--color-session-selected);
  border-radius: 4px;
  z-index: -1;
}

.highlight-left {
  width: 5px;
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 4px;
  z-index: -1;
}

/* —————————————————————————
   灰色蒙层 
   ————————————————————————— */
.item-hover-overlay {
  position: absolute;
  /* 同 highlight 一样的计算方式，以保证区域大于 .session-item 本身 */
  top: -5px;
  left: -20px;
  width: calc(100% + 40px);
  height: calc(100% + 10px);
  border-radius: 4px;
  z-index: 1;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.1);
  transition: backdrop-filter 0.2s ease;
}

/* 按钮区域 */
.overlay-buttons {
  position: absolute;
  top: 5px;
  right: 10px;
  display: flex;
  gap: 8px;
  /* 按钮间距 */
  z-index: 2;
  /* 按钮更上层，确保可点 */
}

.overlay-button {
  cursor: pointer;
  padding: 4px 8px;
  border: none;
  outline: none;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.ai-dialog-button {
  color: var(--color-secondary);
  background-color: var(--color-primary);
}

.ai-dialog-button:hover {
  background-color: var(--color-primary-hover);
  transition: background-color 0.2s ease;
}

.bullet-point-prefix {
  font-size: 10px;
  font-weight: bold;
  margin-top: 2px;
  margin-right: 4px;
}

</style>