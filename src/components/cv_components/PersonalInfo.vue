<!-- src/components/PersonalInfo.vue -->
<template>
    <div class="personal-info">
      <h1 class="name" v-if="personalInfo.name">{{ personalInfo.name }}</h1>
      <p class="email-phone" v-if="personalInfo.email">
        {{ personalInfo.email }} | {{ personalInfo.phone }}
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "PersonalInfo",
    props: {
      personalInfo: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .personal-info {
    text-align: center;
    margin-bottom: 24px;
  }
  
  .name {
    font-size: 20px;
    font-weight: bold;
  }
  
  .email-phone {
    font-size: 12px;
  }
  </style>