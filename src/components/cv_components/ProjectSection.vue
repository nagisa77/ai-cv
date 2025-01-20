<!-- src/components/ProjectSection.vue -->
<template>
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
  </template>
  
  <script>
  export default {
    name: "ProjectSection",
    props: {
      projectList: {
        type: Array,
        required: true
      },
      highlightTitle: {
        type: String,
        default: ''
      }
    },
    methods: {
      onTitleClick(type, title) {
        this.$emit('selected-module-changed', { type, title });
      }
    }
  };
  </script>
  
  <style scoped>
  .project-section {
    margin-bottom: 24px;
  }
  
  .project-item {
    margin-bottom: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .project-item:hover {
    background-color: #f6f9fe;
  }
  
  .session-title {
    font-size: 16px;
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
  
  .item-title {
    font-size: 12px;
    margin: 0 0 4px 0;
  }
  
  .item-time {
    font-size: 10px;
  }
  
  .title-and-time {
    display: flex;
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
    background-color: #a4bdea;
    border-radius: 4px;
  }
  
  .bullet-point {
    font-weight: bold;
  }
  
  .bullet-content {
    margin-left: 4px;
  }
  </style>