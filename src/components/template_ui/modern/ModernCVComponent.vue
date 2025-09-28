<template>
    <BaseCVComponent
      :isPreview="isPreview"
      :highlightTitle="highlightTitle"
      :modulesData="modulesData"
      :totalTitleAndItemCount="totalTitleAndItemCount"
      :changeParams="{marginBottom:marginBottom,lineHeight:lineHeight}"
      :TemplateType="TemplateType"    
      :color="color"
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
  import PersonalInfoModern from '@/components/template_ui/modern/cv_components/PersonalInfoModern.vue';
  import EducationSectionModern from '@/components/template_ui/modern/cv_components/EducationSectionModern.vue';
  import WorkSectionModern from '@/components/template_ui/modern/cv_components/WorkSectionModern.vue';
  import ProjectSectionModern from '@/components/template_ui/modern/cv_components/ProjectSectionModern.vue';
  import SummarySectionModern from '@/components/template_ui/modern/cv_components/SummarySectionModern.vue';
  import metadataInstance from '@/models/metadata_model.js';
  import OtherExperienceSectionModern from '@/components/template_ui/modern/cv_components/OtherExperienceSectionModern.vue';
  import { useToast } from 'vue-toastification'
  export default {
    name: "ModernCVComponent",
    components: {
      BaseCVComponent,
      PersonalInfoModern,
      EducationSectionModern,
      WorkSectionModern,
      ProjectSectionModern,
      SummarySectionModern,
      OtherExperienceSectionModern,
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
        if (this.isPreview ) {
          return '';
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
          component: PersonalInfoModern,
          props: { personalInfo: this.personalInfo, color: this.color }
        })
        
        if (this.educationList && this.educationList.length > 0) {
        modules.push({
          component: EducationSectionModern,
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
            component: WorkSectionModern,
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
            component: ProjectSectionModern,
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
            component: SummarySectionModern,
            props: {
              personalSummary: this.personalSummary,
              enableHover: !this.isPreview,
              color: this.color
            }
          })
        }
        if (this.otherExperienceList && this.otherExperienceList.length > 0) {
          modules.push({
            component: OtherExperienceSectionModern,
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
      handleChangeTemplate(templateWithColor) {  
        this.$emit('change-template', templateWithColor);
      },
    }
  };
  </script>
  
<style scoped>
::v-deep .section-header {
  display: grid;
  position: static;
  grid-template-columns: 1fr auto;
  align-items: center;
}

::v-deep .name {
  font-size: calc(var(--title-font-size, 14px) + 4px);
  color: var(--theme-color);
  font-weight: bold;
  margin-bottom: var(--session-title-margin,10px);
}

::v-deep .info {
  color: var(--theme-color);
  display: flex;
  font-size: var(--content-font-size, 10px);
  margin-bottom: var(--session-item-margin,10px);
  gap: 16px;
  flex-wrap: wrap;
}

::v-deep .info a {
  color: var(--theme-color);
  text-decoration: none;
}

::v-deep .icon {
  width: 14px;
  height: 14px;
  vertical-align: -2px;
  margin-right: 3px;
  filter: brightness(0) saturate(100%) invert(18%) sepia(93%) saturate(2060%)
    hue-rotate(218deg) brightness(90%) contrast(94%);
}

::v-deep .photo img {
  width: 90px;
  border-radius: 6px;
}
/* 模块标题 */
::v-deep(.section-title) {
  font-size: var(--title-font-size, 14px);
  color: var(--theme-color);
  font-weight: 700;
  padding-bottom: 4px;
  border-bottom: 2px solid var(--theme-color);
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px; /* 标题与内容距离 */
}

/* 经历条目 */
::v-deep(.entry) {
  margin-bottom: 10px; /* 间距由条目撑开 */
}

::v-deep(.entry-top) {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

::v-deep(.entry-title) {
  font-weight: 700;
  color: var(--theme-color);
  font-size: calc(var(--title-font-size, 14px) - 2px);
}

::v-deep(.entry-right) {
  color: var(--gray);
  font-size: calc(var(--content-font-size, 10px) - 2px);
  text-align: right;
}

::v-deep(.entry-sub) {
  font-size: calc(var(--content-font-size, 10px) - 2px);
  color: var(--text-sec);
  line-height: 2.0;
}

::v-deep(.entry li) {
  line-height: 1.4;
  font-size: var(--content-font-size, 10px);
  margin-left: 0px;
}

::v-deep(.entry ul) {
  margin: 0;
  padding-left: 12px;
}

::v-deep(.honors) {
  font-size: var(--content-font-size, 10px);
  line-height: 2.0;
}

::v-deep(.point-title) {
  font-weight: 600;
  color: var(--theme-color);
  margin-right: 4px;
  font-size: var(--content-font-size, 10px);
}

::v-deep(.point-content) {
  color: var(--text-sec);
  font-size: var(--content-font-size, 10px);
}

::v-deep(.summary) {
  line-height: 1.4;
  font-size: var(--content-font-size, 10px);
}
</style>