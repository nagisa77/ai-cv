<!-- src/components/WorkSection.vue -->
<template>
    <section v-if="workList && workList.length" class="work-section session">
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
          <div
            class="item-content-item"
            v-for="(point, i2) in work.content.content"
            :key="i2"
          >
            <div class="bullet-point-prefix">·</div>
            <div class="bullet-point-content">
              <span class="bullet-point">{{ point.bullet_point }}:</span>
              <span class="bullet-content">{{ point.content }}</span>
            </div>
          </div>

          <div class="item-content-item" v-if="work.content.content.length === 0" style="opacity: 0.5;">
            (这里是描述，您可以在这里详细描述您的工作经历，包括您的职责、使用的技术以及取得的成果等。)
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
    methods: {
      onTitleClick(type, title) {
        this.$emit('selected-module-changed', { type, title });
      }
    }
  };
  </script>
  
  <style scoped>
  .work-item {
    margin-bottom: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .work-item:hover {
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
  </style>