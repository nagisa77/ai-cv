<template>
    <BaseCVComponent :highlightTitle="highlightTitle" @selected-module-changed="handleSelectedModuleChanged"
        @capture-and-save-screenshot="captureAndSaveScreenshot" @edit-title="handleEdit" @delete-title="handleDelete"
        @add-title="handleAddTitle" @add-module="handleAddModule" @change-font="handleChangeFont"
        @smart-fit="handleSmartFit">
        <!-- Personal Information -->
        <PersonalInfo :personalInfo="personalInfo" :color="color" />

        <!-- Education Section -->
        <EducationSection :educationList="educationList" :highlightTitle="highlightTitle" :color="color"
            @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete"
            @add-title="handleAddTitle" />

        <!-- Work Experience Section -->
        <WorkSection :workList="workList" :highlightTitle="highlightTitle" :color="color"
            @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete"
            @add-title="handleAddTitle" />

        <!-- Project Experience Section -->
        <ProjectSection :projectList="projectList" :highlightTitle="highlightTitle" :color="color"
            @selected-module-changed="handleSelectedModuleChanged" @edit-title="handleEdit" @delete-title="handleDelete"
            @add-title="handleAddTitle" />

        <!-- Personal Summary -->
        <SummarySection v-if="personalSummary" :personalSummary="personalSummary" :color="color" />
    </BaseCVComponent>
</template>

<script>
import BaseCVComponent from '@/components/BaseCVComponent.vue';
import PersonalInfo from '@/components/template_ui/default/cv_components/PersonalInfo.vue';
import EducationSection from '@/components/template_ui/default/cv_components/EducationSection.vue';
import WorkSection from '@/components/template_ui/default/cv_components/WorkSection.vue';
import ProjectSection from '@/components/template_ui/default/cv_components/ProjectSection.vue';
import SummarySection from '@/components/template_ui/default/cv_components/SummarySection.vue';
import metadataInstance from '@/models/metadata_model.js';
export default {
    name: "DefaultCVComponent",
    components: {
        BaseCVComponent,
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
        }, 
        color: {
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
        handleSelectedModuleChanged(payload) {
            this.$emit('selected-module-changed', payload);
        },
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
};
</script>

<style scoped>

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
  position: relative;
  color: v-bind('props.color');
}

::v-deep .session-title::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background-color: #000;
  margin-top: 4px;
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
  -webkit-mask-image: linear-gradient(
    to left,
    #000 0%,       /* 左侧开始完全被遮罩，可见模糊 */
    transparent 100%  /* 右侧逐渐过渡到完全透明，不会显示模糊 */
  );
  mask-image: linear-gradient(
    to left,
    #000 0%,
    transparent 100%
  );
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

::v-deep .session-title-underline {
  background-color: v-bind('props.color');
}
</style>