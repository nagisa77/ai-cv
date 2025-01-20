<!-- src/components/ProjectSection.vue -->
<template>
    <section v-if="projectList && projectList.length" class="project-section session">
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
          <div
            class="item-content-item"
            v-for="(point, i2) in project.content.content"
            :key="i2"
          >
            <div class="bullet-point-prefix">·</div>  
            <div class="bullet-point-content">
              <span class="bullet-point">· {{ point.bullet_point }}:</span>
              <span class="bullet-content">{{ point.content }}</span>
            </div>
          </div>
          <div class="item-content-item" v-if="project.content.content.length === 0"  style="opacity: 0.5;">
            (这里是描述，您可以在这里详细描述您的项目经历，包括项目的背景、您的角色、使用的技术以及取得的成果等。)
          </div>
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
  .project-item {
    margin-bottom: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .project-item:hover {
    background-color: #f6f9fe;
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

  .bullet-point-prefix {
    margin-top: 2px;
  }

  .bullet-point-content {
    margin-top: 4px;
  }
  </style>