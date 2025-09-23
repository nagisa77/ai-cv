<!-- src/components/PersonalInfo.vue -->
<template>
  <div class="personal-info">
    <div class="left-info">
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

    <div class="right-info">
      <img v-if="personalInfo.avatar" :src="personalInfo.avatar" alt="头像" class="avatar">
    </div>
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
  display: flex;
  justify-content: space-between;
}

.left-info {
  position: relative;
  width: calc(100% - 62px);
  text-align: center;
  left: 31px;
  display: flow-root;
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