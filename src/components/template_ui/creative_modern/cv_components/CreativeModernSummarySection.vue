<!-- src/components/SummarySection.vue -->
<template>
    <section v-if="personalSummary" class="summary-section session">
      <h2 class="session-title">个人总结</h2>
      <p>{{ personalSummary }}</p>
    </section>
  </template>
  
  <script>
  export default {
    name: "CreativeModernSummarySection",
    props: {
      personalSummary: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .summary-section p {
    font-size: 9px;
  }
  </style>