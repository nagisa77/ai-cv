<!-- src/components/EducationGeneralSimpleSection.vue -->
<template>
  <section class="education-section session">
    <div class="session-title-and-background">
      <h2 class="session-title" @mouseenter="titleHover = true" @mouseleave="titleHover = false">教育经历
        <span v-if="titleHover" class="session-title-add-icon" @click="onAddTitleClick">
        <svg enable-background="new 0 0 512 512" fill="var(--color-primary)" height="10px" id="Layer_1" version="1.1"
          viewBox="0 0 512 512" width="10px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
          <path d="M256,512C114.625,512,0,397.391,0,256C0,114.609,114.625,0,256,0c141.391,0,256,114.609,256,256  
        C512,397.391,397.391,512,256,512z M256,64C149.969,64,64,149.969,64,256s85.969,192,192,192c106.047,0,192-85.969,192-192  
        S362.047,64,256,64z M288,384h-64v-96h-96v-64h96v-96h64v96h96v64h-96V384z" />
        </svg>
      </span>
      </h2>
    </div>
    <div class="session-title-underline"></div>

    <div class="session-item" v-for="(edu, index) in educationList" :key="index" @mouseenter="hoverIndex = index"
      @mouseleave="hoverIndex = null" :class="{ 'is-hovered': hoverIndex === index }">
      <div class="item-hover-overlay" v-if="hoverIndex === index">
        <div class="overlay-buttons">
          <button class="overlay-button" @click.stop="onEditClick('education', edu.title)">编辑</button>
          <!-- <button class="overlay-button ai-dialog-button" @click="onTitleClick('education', edu.title)">AI 对话</button> -->
          <button class="overlay-button delete-button" @click="onTitleDelete('education', edu.title)">删除</button>
        </div>
      </div>
      <div class="title-and-time">
        <h3 class="item-title">{{ edu.title }}</h3>
        <p class="item-time">{{ edu.content.from_time }} - {{ edu.content.to_time }}</p>
      </div>
      <div class="sub-title-and-city">
        <div>{{ edu.content.major }} {{ edu.content.degree }}</div>
        <div>{{ edu.content.city }}</div>
      </div>

      <div class="item-content-item">
        <div class="bullet-point-prefix">·</div>
        <div class="bullet-point-content">
          <span class="bullet-point">GPA:</span>
          <span class="bullet-content">{{ edu.content.gpa }}</span>
        </div>
      </div>

      <div class="item-content-item">
        <div class="bullet-point-prefix">·</div>
        <div class="bullet-point-content">
          <span class="bullet-point">荣誉奖项:</span>
          <span class="bullet-content">{{ edu.content.honors }}</span>
        </div>
      </div>

      <div class="item-content-item">
        <div class="bullet-point-prefix">·</div>
        <div class="bullet-point-content">
          <span class="bullet-point">相关课程:</span>
          <span class="bullet-content">{{ edu.content.courses }}</span>
        </div>
      </div>

      <!-- <div class="highlight" v-if="edu.title === highlightTitle">
        <div class="highlight-left"></div>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  name: "EducationGeneralSimpleSection",
  props: {
    educationList: {
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
      this.$emit('add-title', 'education');
    }
  }
};
</script>