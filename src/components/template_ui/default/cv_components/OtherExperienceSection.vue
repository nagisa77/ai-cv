<!-- src/components/template_ui/default/cv_components/OtherExperienceSection.vue -->
<template>
  <section class="other-experience-section session">
    <h2 class="session-title" @mouseenter="titleHover = true" @mouseleave="titleHover = false">其他经历
      <span v-if="titleHover" class="session-title-add-icon" @click="onAddTitleClick">
        <svg enable-background="new 0 0 512 512" fill="var(--color-primary)" height="10px" id="Layer_1" version="1.1"
          viewBox="0 0 512 512" width="10px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
          <path d="M256,512C114.625,512,0,397.391,0,256C0,114.609,114.625,0,256,0c141.391,0,256,114.609,256,256  
        C512,397.391,397.391,512,256,512z M256,64C149.969,64,64,149.969,64,256s85.969,192,192,192c106.047,0,192-85.969,192-192  
        S362.047,64,256,64z M288,384h-64v-96h-96v-64h96v-96h64v96h96v64h-96V384z" />
        </svg>
      </span>
    </h2>
    <div class="session-item" v-for="(other, index) in otherExperienceList" :key="index" @mouseenter="handleMouseEnter(index)"
      @mouseleave="handleMouseLeave" :class="{ 'is-hovered': hoverIndex === index }">
      <!-- 灰色蒙层（hover时出现） -->
      <div class="item-hover-overlay" v-if="hoverIndex === index">
        <!-- 按钮区域 -->
        <div class="overlay-buttons">
          <button class="overlay-button" @click.stop="onEditClick('otherExperience', other.title)">编辑</button>
          <button class="overlay-button ai-dialog-button" @click="onTitleClick('otherExperience', other.title)">AI 对话</button>
          <button class="overlay-button delete-button" @click="onTitleDelete('otherExperience', other.title)">删除</button>
        </div>
      </div>
      <div class="title-and-time">
        <h3 v-if="other.title" class="item-title">{{ other.title }}</h3>
        <h3 v-else class="item-title">（您的其他经历）</h3>
        <p class="item-time">{{ other.content.from_time }} - {{ other.content.to_time }}</p>
      </div>
      <div class="sub-title-and-city">
        <div v-if="other.content.desc">{{ other.content.desc }}</div>
        <div v-else>（您的其他经历描述）</div>
      </div>
      <div class="item-content-item" v-for="(point, i2) in other.content.content" :key="i2">
        <div class="bullet-point-prefix">·</div>
        <div class="bullet-point-content">
          <span class="bullet-point">{{ point.bullet_point }}:</span>
          <span class="bullet-content">{{ point.content }}</span>
        </div>
      </div>

      <div class="item-content-item" v-if="other.content.content.length === 0" style="opacity: 0.5;">
        (这里是描述，您可以在这里详细描述您的其他经历，包括您的职责、使用的技术以及取得的成果等。)
      </div>
      <div class="highlight" v-if="other.title === highlightTitle && other.title != ''">
        <div class="highlight-left"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "OtherExperienceSection",
  props: {
    otherExperienceList: {
      type: Array,
      required: true
    },
    highlightTitle: {
      type: String,
      default: ''
    },
    enableHover: {  
      type: Boolean,
      default: true
    }
  },
  watch: {
    otherExperienceList(newVal, oldVal) {
      console.log('otherExperienceList changed:', oldVal, '->', newVal);
    },
    highlightTitle(newVal, oldVal) {
      console.log('highlightTitle changed:', oldVal, '->', newVal);
    }
  },
  data() {
    return {
      hoverIndex: null, // 记录当前鼠标悬停在哪个项目上
      titleHover: false
    }
  },
  methods: {
    onTitleClick(type, title) {
      this.$emit('selected-module-changed', { type, title });
    },

    onEditClick(type, title) {
      this.$emit('edit-title', type, title);
    },

    onTitleDelete(type, title) {
      this.$emit('delete-title', type, title);
    },

    onAddTitleClick() {
      this.$emit('add-title', 'otherExperience');
    },

    handleMouseEnter(index) {
      if (this.enableHover) {
        this.hoverIndex = index;
      }
    },

    handleMouseLeave() {
      if (this.enableHover) {
        this.hoverIndex = null;
      }
    }
  }
};
</script>