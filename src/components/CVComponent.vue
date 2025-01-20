<!-- src/components/CVComponent.vue -->
<template>
  <div class="cv-component">
    <div class="cv-page">
      <!-- Personal Information -->
      <PersonalInfo :personalInfo="personalInfo" />

      <!-- Education Section -->
      <EducationSection
        :educationList="educationList"
        :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged"
      />

      <!-- Work Experience Section -->
      <WorkSection
        :workList="workList"
        :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged"
      />

      <!-- Project Experience Section -->
      <ProjectSection
        :projectList="projectList"
        :highlightTitle="highlightTitle"
        @selected-module-changed="handleSelectedModuleChanged"
      />

      <!-- Personal Summary -->
      <SummarySection v-if="personalSummary" :personalSummary="personalSummary" />
    </div>
  </div>
</template>

<script>
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
    }
  }
};
</script>

<style scoped>
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
  aspect-ratio: 3/4; /* 3:4纸张比例，可按需调整 */
  padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>