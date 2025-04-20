<!-- src/components/PersonalInfo.vue -->
<template>
  <div class="personal-info">
    <div class="left-info">
      <h1 class="name" v-if="personalInfo.name">{{ personalInfo.name }}</h1>
      <p class="email-phone" v-if="personalInfo.email">
        {{ personalInfo.email }} | {{ personalInfo.phone }}
      </p>

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
  height: 100px;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.left-info {
  position: relative;
  width: calc(100% - 62px);
  text-align: center;
  left: 31px;
}

.email-phone {
  font-size: 12px;
}

.avatar {
  height: 100px;
  width: 62px;
}
</style>