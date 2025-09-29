<template>
    <div class="section">
      <div class="session-title">
        <img class="icon" src="/icons/fa-lightbulb.svg" alt="" /> 个人总结
      </div>
      <div class="summary">{{ personalSummary }}</div>
    </div>
</template>
<script>
export default {
  name: "SummarySectionModern",
  props: {
    personalSummary: {
      type: String,
      required: true
    }
  }
};
</script>