<template>
  <BaseCVComponent
    :isPreview="isPreview"
    :highlightTitle="highlightTitle"
    :modulesData="modulesData"
    :totalTitleAndItemCount="totalTitleAndItemCount"
    :changeParams="{marginBottom:marginBottom,lineHeight:lineHeight}"
    :TemplateType="TemplateType"    
    @selected-module-changed="handleSelectedModuleChanged"
    @capture-and-save-screenshot="captureAndSaveScreenshot"
    @edit-title="handleEdit"
    @delete-title="handleDelete"
    @add-title="handleAddTitle"
    @add-module="handleAddModule"
    @change-font="handleChangeFont"
    @smart-fit="handleSmartFit"
    @change-template="handleChangeTemplate"
  >
    <template #default="{ page }">
      <div :style="{ '--custom-color': customColor, 'font-family': getFontFamily() }">
        <component
          v-for="(module, moduleIndex) in page"
          :key="moduleIndex"
          :is="module.component"
          v-bind="module.props"
          v-on="module.listeners"
        />
      </div>
    </template>
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
import OtherExperienceSection from '@/components/template_ui/default/cv_components/OtherExperienceSection.vue';
import { useToast } from 'vue-toastification'
export default {
  name: "DefaultCVComponent",
  components: {
    BaseCVComponent,
    PersonalInfo,
    EducationSection,
    WorkSection,
    ProjectSection,
    SummarySection,
    OtherExperienceSection,
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
    },
    TemplateType: {
      type: String,
      default: 'default'
    },
  },
  data() {
    return {
      marginBottom: 10,
      currentFont: 'default',
      titleFontSize: 10,
      contentFontSize: 8,
      lineHeight: 12,
    }
  },
  setup(){
    const toast = useToast()
    return {
      toast
    }
  },
  computed: {
    customColor() {
      switch (this.color) {
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
    otherExperienceList() {
      // 如果是预览模式且有预览数据，则使用预览数据
      if (this.isPreview && this.previewData.otherExperience) {
        return this.previewData.otherExperience;
      }
      return metadataInstance.data.otherExperience;
    },
    totalTitleAndItemCount()
    {
      let count=2;
      if (this.educationList && this.educationList.length > 0) {
        count+=this.educationList.length+1;
      }
      if (this.workList && this.workList.length > 0) {
        count+=this.workList.length+1;
      }
      if (this.projectList && this.projectList.length > 0) {
        count+=this.projectList.length+1;
      }
      if (this.otherExperienceList && this.otherExperienceList.length > 0) {
        count+=this.otherExperienceList.length+1;
      }
      if (this.personalSummary && this.personalSummary.length > 0) {
        count+=2;
      }
      return count;
    },
    modulesData() {
      const modules = []
      modules.push({
        component: PersonalInfo,
        props: { personalInfo: this.personalInfo, color: this.color }
      })
      if (this.educationList && this.educationList.length > 0) {
      modules.push({
        component: EducationSection,
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
        }
      })
      }
      if (this.workList && this.workList.length > 0) {
        modules.push({
          component: WorkSection,
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
          }
        })
      }
      if (this.projectList && this.projectList.length > 0) {
        modules.push({
          component: ProjectSection,
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
          }
        })
      }
      if (this.personalSummary && this.personalSummary.length > 0) {
        modules.push({
          component: SummarySection,
          props: {
            personalSummary: this.personalSummary,
            enableHover: !this.isPreview,
            color: this.color
          }
        })
      }
      if (this.otherExperienceList && this.otherExperienceList.length > 0) {
        modules.push({
          component: OtherExperienceSection,
          props: {
            otherExperienceList: this.otherExperienceList,
            highlightTitle: this.highlightTitle,
            enableHover: !this.isPreview,
            color: this.color
          },
          listeners: {
            'selected-module-changed': this.handleSelectedModuleChanged,
            'edit-title': this.handleEdit,
            'delete-title': this.handleDelete,
            'add-title': this.handleAddTitle
          }
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
    handleChangeFont(font) {
      if (font) {
        this.currentFont = font;
      }
      this.$emit('change-font');
    },
    getFontFamily() {
      switch (this.currentFont) {
        case 'times':
          return "'Times New Roman', Times, serif";
        case 'arial':
          return "Arial, Helvetica, sans-serif";
        case 'courier':
          return "'Courier New', Courier, monospace";
        default:
          return "'Microsoft YaHei', '微软雅黑', sans-serif";
      }
    },
    handleSmartFit(marginBottom,adjustfontSize=false) {
      // 给当前组件根节点设置 CSS 变量
      if(marginBottom){
        marginBottom=Math.max(0,Math.floor(marginBottom))
        console.log('marginBottom',marginBottom)
        this.$el.style.setProperty('--session-title-margin', marginBottom + 'px')
        this.$el.style.setProperty('--session-item-margin', marginBottom + 'px')
        this.marginBottom = marginBottom
      }
      if(adjustfontSize){
        this.contentFontSize=this.contentFontSize-1
        this.lineHeight=this.lineHeight-1
        this.titleFontSize=this.titleFontSize-1
        this.$el.style.setProperty('--content-font-size', this.contentFontSize+ 'px')
        this.$el.style.setProperty('--title-font-size', this.titleFontSize+ 'px')
        this.$el.style.setProperty('--line-height', this.lineHeight+ 'px')
      }
    },
    handleChangeTemplate(template) {
      this.$emit('change-template', template);
    },
  }
};
</script>

<style scoped>
::v-deep .item-summary {
  font-size: var(--content-font-size, 8px);
  margin-bottom: var(--session-item-margin, 10px);
  margin-top: 0px;
}

::v-deep .email-phone{
  font-size: calc(var(--title-font-size, 10px) + 2px);
  margin-bottom: var(--session-item-margin,10px);
}

::v-deep .name {
  font-size: calc(var(--title-font-size, 10px) + 8px);
  font-weight: bold;
  margin-bottom: var(--session-title-margin,10px);
}

::v-deep .item-content-item {
  display: flex;
  font-size: var(--content-font-size, 8px);
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
  font-size: var(--title-font-size, 10px);
  position: relative;
  color: var(--custom-color, var(--color-primary)); 
  margin-top: 0px;
  margin-bottom: var(--session-title-margin, 10px);
}

::v-deep .session-title::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--custom-color, var(--color-primary)); 
  margin-top: 4px;
}

::v-deep .title-and-time {
  display: flex;
  height: var(--line-height, 12px);
  justify-content: space-between;
  align-items: center;
}

::v-deep .sub-title-and-city {
  display: flex;
  height: var(--line-height,12px);
  justify-content: space-between;
  align-items: center;
  font-size: var(--content-font-size, 8px);
}

::v-deep .item-title {
  font-size: var(--content-font-size, 8px);
}

::v-deep .item-time {
  font-size: var(--content-font-size, 8px);
}

::v-deep .session-item {
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: var(--session-item-margin, 10px);
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
  font-size: var(--content-font-size, 8px);
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

::v-deep .session-title-underline {
  background-color: var(--custom-color, var(--color-primary));
}
</style>