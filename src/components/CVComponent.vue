<template>
  <div class="cv-component">
    <div class="cv-page">
      <h1 class="name" v-if="personalInfo.name">{{ personalInfo.name }}</h1>
      <p class="email-phone" v-if="personalInfo.email">
        {{ personalInfo.email }} | {{ personalInfo.phone }}
      </p>

      <!-- 教育经历 -->
      <section v-if="educationList && educationList.length" class="education-section">
        <h2 class="session-title">教育经历</h2>
        <div
          class="education-item"
          v-for="(edu, index) in educationList"
          :key="index"
          :class="{ highlight: edu.title === highlightTitle }"
          @click="onTitleClick('education', edu.title)"
        >
          <div class="title-and-time">
            <h3 class="item-title">{{ edu.title }}</h3>
            <p class="item-time">{{ edu.content.from_time }} - {{ edu.content.to_time }}</p>
          </div>
          <ul class="item-content">
            <li
              class="item-content-item"
              v-for="(point, i2) in edu.content.content"
              :key="i2"
            >
              <span class="bullet-point">{{ point.bullet_point }}:</span>
              <span class="bullet-content">{{ point.content }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- 工作经历 -->
      <section v-if="workList && workList.length" class="work-section">
        <h2 class="session-title">工作经历</h2>
        <div
          class="work-item"
          v-for="(work, index) in workList"
          :key="index"
          :class="{ highlight: work.title === highlightTitle }"
          @click="onTitleClick('workExperience', work.title)"
        >
          <div class="title-and-time">
            <h3 class="item-title">{{ work.title }}</h3>
            <p class="item-time">{{ work.content.from_time }} - {{ work.content.to_time }}</p>
          </div>
          <ul class="item-content">
            <li
              class="item-content-item"
              v-for="(point, i2) in work.content.content"
              :key="i2"
            >
              <span class="bullet-point">{{ point.bullet_point }}:</span>
              <span class="bullet-content">{{ point.content }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- 项目经历 -->
      <section v-if="projectList && projectList.length" class="project-section">
        <h2 class="session-title">项目经历</h2>
        <div
          class="project-item"
          v-for="(project, index) in projectList"
          :key="index"
          :class="{ highlight: project.title === highlightTitle }"
          @click="onTitleClick('projectExperience', project.title)"
        >
          <div class="title-and-time">
            <h3 class="item-title">{{ project.title }}</h3>
            <p class="item-time">{{ project.content.from_time }} - {{ project.content.to_time }}</p>
          </div>
          <ul class="item-content">
            <li
              class="item-content-item"
              v-for="(point, i2) in project.content.content"
              :key="i2"
            >
              <span class="bullet-point">{{ point.bullet_point }}:</span>
              <span class="bullet-content">{{ point.content }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- 个人总结 -->
      <section v-if="personalSummary" class="summary-section">
        <h2 class="session-title">个人总结</h2>
        <p>{{ personalSummary }}</p>
      </section>
    </div>
  </div>
</template>

<script>
import metadataInstance from '@/models/metadata_model.js'

export default {
  name: "CVComponent",

  // 父组件会传入 highlightTitle 用于高亮显示
  props: {
    highlightTitle: {
      type: String,
      default: ''
    }
  },

  computed: {
    personalInfo() {
      return metadataInstance.data.personalInfo
    },
    educationList() {
      return metadataInstance.data.education
    },
    workList() {
      return metadataInstance.data.workExperience
    },
    projectList() {
      return metadataInstance.data.projectExperience
    },
    personalSummary() {
      return metadataInstance.data.personalSummary
    }
  },

  methods: {
    /**
     * 当用户点击某一段教育/工作/项目时，向外部发射事件，
     * 告知父组件我想“选中”这个区块
     */
    onTitleClick(type, title) {
      // 触发自定义事件，让父组件去处理如何切换 Chat 模块
      this.$emit('selected-module-changed', { type, title })
    }
  }
}
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

.education-section,
.work-section,
.project-section,
.summary-section {
  margin-bottom: 24px;
}

.education-item,
.work-item,
.project-item {
  margin-bottom: 12px;
  cursor: pointer; /* 鼠标悬停时指示可点击 */
  transition: background-color 0.2s ease;
}

.education-item:hover,
.work-item:hover,
.project-item:hover {
  background-color: #f6f9fe; /* 悬停时给个淡色 */
}

.education-item h3,
.work-item h3,
.project-item h3 {
  margin: 0 0 4px 0;
}

.name {
  font-size: 20px;
  font-weight: bold;
  text-align: center; /* 水平居中 */
}

.email-phone {
  font-size: 12px;
  text-align: center; /* 水平居中 */
}

.session-title {
  font-size: 16px;
}

.session-title::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background-color: #000;
  margin-top: 4px;
}

.item-title {
  font-size: 12px;
}

.item-time {
  font-size: 10px;
}

.title-and-time {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.item-content {
  margin-top: 4px;
}

.item-content-item {
  font-size: 10px;
}

.highlight {
  background-color: #a4bdea; /* 浅蓝色高亮 */
  border-radius: 4px;
}

.bullet-point {
  font-weight: bold;
}

.bullet-content {
  margin-left: 4px;
}

</style>
