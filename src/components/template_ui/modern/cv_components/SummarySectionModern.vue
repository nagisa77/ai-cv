<template>
    <div class="section">
      <div class="section-title">
        <img class="icon" src="/icons/fa-lightbulb.svg" alt="" /> 个人总结
      </div>
      <p class="summary">{{ personalSummary }}</p>
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