<!-- src/components/SummaryGeneralSimpleSection.vue -->
<template>
  <section v-if="personalSummary" class="summary-section session">
    <div class="session-title-and-background">
      <h2 class="session-title">个人总结</h2>
    </div>
    <div class="session-title-underline"></div>
    <p>{{ personalSummary }}</p>
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
  .summary-section p {
    font-size: 9px;
  }
  
  .summary-section {
    display: flow-root;
  }
  </style>