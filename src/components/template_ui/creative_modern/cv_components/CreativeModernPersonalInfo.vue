<!-- src/components/PersonalInfo.vue -->
<template>
  <div class="personal-info">
    <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/pic.jpg" alt="头像" class="avatar">
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
  height: 100px;
  width: 62px;
}
</style>