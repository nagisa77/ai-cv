<!-- src/components/PersonalInfo.vue -->
<template>
  <div class="personal-info">
    <img v-if="personalInfo.avatar" :src="personalInfo.avatar" alt="头像" class="avatar">
    <div class="info-session">
      <h1 class="name" v-if="personalInfo.name">{{ personalInfo.name }}</h1>
      <h1 class="name" v-else>（您的名称）</h1>
      <p class="email-phone" v-if="personalInfo.email && personalInfo.phone">
        {{ personalInfo.email }} | {{ personalInfo.phone }}
      </p>
      <p class="email-phone" v-else-if="personalInfo.email">
        {{ personalInfo.email }}
      </p>
      <p class="email-phone" v-else-if="personalInfo.phone">
        {{ personalInfo.phone }}
      </p>
      <p class="email-phone" v-else>（您的联系方式）</p>
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
  margin-bottom: 2px; /* 减小名字下方的间距 */
  line-height: 1.1; /* 减小行高 */
}

.info-session {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0px;
}

.email-phone {
  font-size: 12px;
  margin-top: 0; /* 移除上方间距 */
  line-height: 1; /* 减小行高 */
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