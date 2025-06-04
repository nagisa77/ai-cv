<template>
  <MultiplePages :modulesData="modulesData">
    <template #default="{ page }">
      <BaseCVComponent :isPreview="isPreview" :highlightTitle="highlightTitle" @selected-module-changed="handleSelectedModuleChanged"
          @capture-and-save-screenshot="captureAndSaveScreenshot" @edit-title="handleEdit" @delete-title="handleDelete"
          @add-title="handleAddTitle" @add-module="handleAddModule" @change-font="handleChangeFont"
          @smart-fit="handleSmartFit">
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet" />

          <div :style="{ '--custom-color': customColor }" style="font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;">
              <component
                v-for="(module, moduleIndex) in page"
                :key="moduleIndex"
                :is="module.component"
                v-bind="module.props"
                v-on="module.listeners"
              />
          </div>
      </BaseCVComponent>
    </template>
  </MultiplePages>
</template>

<script>
import BaseCVComponent from '@/components/BaseCVComponent.vue';
import PersonalGeneralSimpleInfo from '@/components/template_ui/general_simple/cv_components/PersonalGeneralSimpleInfo.vue';
import EducationGeneralSimpleSection from '@/components/template_ui/general_simple/cv_components/EducationGeneralSimpleSection.vue';
import WorkGeneralSimpleSection from '@/components/template_ui/general_simple/cv_components/WorkGeneralSimpleSection.vue';
import ProjectGeneralSimpleSection from '@/components/template_ui/general_simple/cv_components/ProjectGeneralSimpleSection.vue';
import SummaryGeneralSimpleSection from '@/components/template_ui/general_simple/cv_components/SummaryGeneralSimpleSection.vue';
import metadataInstance from '@/models/metadata_model.js';
import MultiplePages from '@/components/MultiplePages.vue';
export default {
    name: "GeneralSimpleCVComponent",
    components: {
        BaseCVComponent,
        PersonalGeneralSimpleInfo,
        EducationGeneralSimpleSection,
        WorkGeneralSimpleSection,
        ProjectGeneralSimpleSection,
        SummaryGeneralSimpleSection,
        MultiplePages
    },
    props: {
        highlightTitle: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        isPreview: {
            type: Boolean,
            default: false
        },
        previewData: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        customColor() {
            switch(this.color) {
                case 'red':
                    return 'var(--color-primary)';
                case 'blue':
                    return 'var(--color-cv-blue)';
                case 'gray':
                    return 'var(--color-cv-gray)';
                default:
                    return this.color || 'var(--color-primary)';
            }
        },
        isFetching() {
            return metadataInstance.getIsFetching()
        },
        personalInfo() {
            // 如果是预览模式且有预览数据，则使用预览数据
            if (this.isPreview && this.previewData.personalInfo) {
                return this.previewData.personalInfo;
            }
            return metadataInstance.data.personalInfo;
        },
        educationList() {
            // 如果是预览模式且有预览数据，则使用预览数据
            if (this.isPreview && this.previewData.education) {
                return this.previewData.education;
            }
            return metadataInstance.data.education;
        },
        workList() {
            // 如果是预览模式且有预览数据，则使用预览数据
            if (this.isPreview && this.previewData.workExperience) {
                return this.previewData.workExperience;
            }
            return metadataInstance.data.workExperience;
        },
        projectList() {
            // 如果是预览模式且有预览数据，则使用预览数据
            if (this.isPreview && this.previewData.projectExperience) {
                return this.previewData.projectExperience;
            }
            return metadataInstance.data.projectExperience;
        },
        personalSummary() {
            // 如果是预览模式且有预览数据，则使用预览数据
            if (this.isPreview && this.previewData.personalSummary) {
                return this.previewData.personalSummary;
            }
            return metadataInstance.data.personalSummary;
        },
        modulesData() {
            const modules = []
            modules.push({
                component: PersonalGeneralSimpleInfo,
                props: { personalInfo: this.personalInfo, color: this.color },
                estimatedHeight: 120
            })
            if (this.educationList && this.educationList.length > 0) {
                modules.push({
                    component: EducationGeneralSimpleSection,
                    props: {
                        educationList: this.educationList,
                        highlightTitle: this.highlightTitle,
                        enableHover: !this.isPreview,
                        color: this.color
                    },
                    listeners: {
                        'selected-module-changed': this.handleSelectedModuleChanged,
                        'edit-title': this.handleEdit,
                        'delete-title': this.handleDelete,
                        'add-title': this.handleAddTitle
                    },
                    estimatedHeight: 160
                })
            }
            if (this.workList && this.workList.length > 0) {
                modules.push({
                    component: WorkGeneralSimpleSection,
                    props: {
                        workList: this.workList,
                        highlightTitle: this.highlightTitle,
                        enableHover: !this.isPreview,
                        color: this.color
                    },
                    listeners: {
                        'selected-module-changed': this.handleSelectedModuleChanged,
                        'edit-title': this.handleEdit,
                        'delete-title': this.handleDelete,
                        'add-title': this.handleAddTitle
                    },
                    estimatedHeight: 220
                })
            }
            if (this.projectList && this.projectList.length > 0) {
                modules.push({
                    component: ProjectGeneralSimpleSection,
                    props: {
                        projectList: this.projectList,
                        highlightTitle: this.highlightTitle,
                        enableHover: !this.isPreview,
                        color: this.color
                    },
                    listeners: {
                        'selected-module-changed': this.handleSelectedModuleChanged,
                        'edit-title': this.handleEdit,
                        'delete-title': this.handleDelete,
                        'add-title': this.handleAddTitle
                    },
                    estimatedHeight: 220
                })
            }
            if (this.personalSummary && this.personalSummary.length > 0) {
                modules.push({
                    component: SummaryGeneralSimpleSection,
                    props: {
                        personalSummary: this.personalSummary,
                        enableHover: !this.isPreview,
                        color: this.color
                    },
                    estimatedHeight: 120
                })
            }
            return modules
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
  background-color: var(--custom-color, var(--color-primary));
}

::v-deep .session-title {
  font-size: 10px;
  position: relative;
  font-weight: bold;
  margin: 0; 
  padding: 4px 8px;
  background-color: var(--custom-color, var(--color-primary)); 
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
  background-color: rgba(255, 0, 0, 1);
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