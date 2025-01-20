<!-- src/components/EducationSection.vue -->
<template>
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
  </template>
  
  <script>
  export default {
    name: "EducationSection",
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
    methods: {
      onTitleClick(type, title) {
        this.$emit('selected-module-changed', { type, title });
      }
    }
  };
  </script>
  
  <style scoped>
  .education-section {
    margin-bottom: 24px;
  }
  
  .education-item {
    margin-bottom: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .education-item:hover {
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