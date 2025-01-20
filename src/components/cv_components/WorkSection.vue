<!-- src/components/WorkSection.vue -->
<template>
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
    methods: {
      onTitleClick(type, title) {
        this.$emit('selected-module-changed', { type, title });
      }
    }
  };
  </script>
  
  <style scoped>
  .work-section {
    margin-bottom: 24px;
  }
  
  .work-item {
    margin-bottom: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .work-item:hover {
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