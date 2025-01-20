<!-- src/components/SummarySection.vue -->
<template>
    <section v-if="personalSummary" class="summary-section">
      <h2 class="session-title">个人总结</h2>
      <p>{{ personalSummary }}</p>
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
    margin-bottom: 24px;
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
  
  .summary-section p {
    font-size: 12px;
  }
  </style>