<!-- src/components/PersonalInfo.vue -->
<template>
  <div class="personal-info">
    <img v-if="personalInfo.avatar" :src="personalInfo.avatar" alt="头像" class="avatar">
    <div class="info-session">
      <div class="name" v-if="personalInfo.name">{{ personalInfo.name }}</div>
      <div class="name" v-else>（您的名称）</div>
      <div class="email-phone" v-if="personalInfo.email && personalInfo.phone">
        {{ personalInfo.email }} | {{ personalInfo.phone }}
      </div>
      <div class="email-phone" v-else-if="personalInfo.email">
        {{ personalInfo.email }}
      </div>
      <div class="email-phone" v-else-if="personalInfo.phone">
        {{ personalInfo.phone }}
      </div>
      <div class="email-phone" v-else>（您的联系方式）</div>
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

.info-session {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0px;
}

.avatar {
  height: 80px;
  width: 60px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  object-fit: cover;
  object-position: center;
}
</style>