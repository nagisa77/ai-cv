<!-- src/components/SummaryGeneralSimpleSection.vue -->
<template>
  <section v-if="personalSummary" class="summary-section session">
    <div class="session-title-and-background">
      <div class="session-title">个人总结</div>
    </div>
    <div class="session-title-underline"></div>
    <div class="item-summary">{{ personalSummary }}</div>
  </section>
  </template>
  
  <script>
  export default {
    name: "SummaryGeneralSimpleSection",
    props: {
      personalSummary: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .summary-section {
    display: flow-root;
  }
  </style>