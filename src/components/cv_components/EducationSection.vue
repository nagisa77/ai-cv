<!-- src/components/EducationSection.vue -->
<template>
  <section v-if="educationList && educationList.length" class="education-section session">
    <h2 class="session-title">教育经历</h2>
    <div class="session-item" v-for="(edu, index) in educationList" :key="index"
      @click="onTitleClick('education', edu.title)">
      <div class="title-and-time">
        <h3 class="item-title">{{ edu.title }}</h3>
        <p class="item-time">{{ edu.content.from_time }} - {{ edu.content.to_time }}</p>
      </div>
      <div class="item-content-item" v-for="(point, i2) in edu.content.content" :key="i2">
        <div class="bullet-point-prefix">·</div>
        <div class="bullet-point-content">
          <span class="bullet-point">{{ point.bullet_point }}:</span>
          <span class="bullet-content">{{ point.content }}</span>
        </div>
      </div>

      <div class="item-content-item" v-if="edu.content.content.length === 0" style="opacity: 0.5;">
        (这里是描述，您可以在这里详细描述您的教育经历，包括所学课程、获得的荣誉、参与的活动以及取得的成就等。)
      </div>
      <div class="highlight" v-if="edu.title === highlightTitle">
        <div class="highlight-left"></div>
      </div>
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
