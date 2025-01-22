<!-- src/components/WorkSection.vue -->
<template>
  <section v-if="workList && workList.length" class="work-section session">
    <h2 class="session-title">工作经历</h2>
    <div class="session-item" v-for="(work, index) in workList" :key="index" @mouseenter="hoverIndex = index"
      @mouseleave="hoverIndex = null" :class="{ 'is-hovered': hoverIndex === index }">
      <!-- 灰色蒙层（hover时出现） -->
      <div class="item-hover-overlay" v-if="hoverIndex === index">
        <!-- 按钮区域 -->
        <div class="overlay-buttons">
          <button @click.stop="onEditClick(project)">编辑</button>
          <button @click="onTitleClick('workExperience', work.title)">AI 对话</button>
        </div>
      </div>
      <div class="title-and-time">
        <h3 class="item-title">{{ work.title }}</h3>
        <p class="item-time">{{ work.content.from_time }} - {{ work.content.to_time }}</p>
      </div>
      <div class="item-content-item" v-for="(point, i2) in work.content.content" :key="i2">
        <div class="bullet-point-prefix">·</div>
        <div class="bullet-point-content">
          <span class="bullet-point">{{ point.bullet_point }}:</span>
          <span class="bullet-content">{{ point.content }}</span>
        </div>
      </div>

      <div class="item-content-item" v-if="work.content.content.length === 0" style="opacity: 0.5;">
        (这里是描述，您可以在这里详细描述您的工作经历，包括您的职责、使用的技术以及取得的成果等。)
      </div>
      <div class="highlight" v-if="work.title === highlightTitle">
        <div class="highlight-left"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "WorkSection",
  props: {
    workList: {
      type: Array,
      required: true
    },
    highlightTitle: {
      type: String,
      default: ''
    }
  },
  watch: {
    workList(newVal, oldVal) {
      console.log('workList changed:', oldVal, '->', newVal);
    },
    highlightTitle(newVal, oldVal) {
      console.log('highlightTitle changed:', oldVal, '->', newVal);
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
    }
  }
};
</script>