<!-- src/components/ProjectSection.vue -->
<template>
  <section v-if="projectList && projectList.length" class="project-section session">
    <h2 class="session-title">项目经历</h2>
    <div class="session-item" v-for="(project, index) in projectList" :key="index" @mouseenter="hoverIndex = index"
      @mouseleave="hoverIndex = null" :class="{ 'is-hovered': hoverIndex === index }">
      <!-- 灰色蒙层（hover时出现） -->
      <div class="item-hover-overlay" v-if="hoverIndex === index">
        <!-- 按钮区域 -->
        <div class="overlay-buttons">
          <button @click.stop="onEditClick('projectExperience', project.title)">编辑</button>
          <button @click="onTitleClick('projectExperience', project.title)">AI 对话</button>
        </div>
      </div>

      <div class="title-and-time">
        <h3 class="item-title">{{ project.title }}</h3>
        <p class="item-time">{{ project.content.from_time }} - {{ project.content.to_time }}</p>
      </div>
      <div class="item-content-item" v-for="(point, i2) in project.content.content" :key="i2">
        <div class="bullet-point-prefix">·</div>
        <div class="bullet-point-content">
          <span class="bullet-point">· {{ point.bullet_point }}:</span>
          <span class="bullet-content">{{ point.content }}</span>
        </div>
      </div>
      <div class="item-content-item" v-if="project.content.content.length === 0" style="opacity: 0.5;">
        (这里是描述，您可以在这里详细描述您的项目经历，包括项目的背景、您的角色、使用的技术以及取得的成果等。)
      </div>
      <div class="highlight" v-if="project.title === highlightTitle">
        <div class="highlight-left"></div>
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
  data() {
    return {
      hoverIndex: null // 记录当前鼠标悬停在哪个项目上
    }
  },
  methods: {
    onTitleClick(type, title) {
      this.$emit('selected-module-changed', { type, title });
    },

    onEditClick(type, title) {
      this.$emit('edit-title', type, title);
    }
  }
};
</script>
