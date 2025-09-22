<!-- src/components/SummarySection.vue -->
<template>
    <section v-if="personalSummary" class="summary-section session">
      <div class="session-title">个人总结</div>
      <div class="item-summary">{{ personalSummary }}</div>
    </section>
  </template>
  
  <script>
  export default {
    name: "SummarySection",
    props: {
      personalSummary: {
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