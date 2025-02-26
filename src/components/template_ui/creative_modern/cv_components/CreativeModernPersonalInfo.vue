<!-- src/components/PersonalInfo.vue -->
<template>
  <div class="personal-info">
    <img src="@/assets/icon/pic.jpg" alt="头像" class="avatar">
    <div class="info-session">
      <h1 class="name" v-if="personalInfo.name">{{ personalInfo.name }}</h1>
      <p class="email-phone" v-if="personalInfo.email">
        {{ personalInfo.email }} | {{ personalInfo.phone }}
      </p>
    </div>


  </div>
</template>

<script>
export default {
  name: "CreativeModernPersonalInfo",
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.info-session {
  text-align: center;
}

.email-phone {
  font-size: 12px;
}

.avatar {
  height: 100px;
  width: 62px;
}
</style>