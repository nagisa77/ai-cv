<template>
    <div class="section">
      <div class="section-header">
        <div>
          <div class="name" v-if="personalInfo.name">{{ personalInfo.name }}</div>
          <div class="name" v-else>（您的名称）</div>
          <div class="info">
            <span v-if="personalInfo.phone">
              <img class="icon" src="/icons/fa-phone.svg" alt="phone" />
              {{ personalInfo.phone }}
            </span>
            <span v-if="personalInfo.email">
              <img class="icon" src="/icons/fa-envelope.svg" alt="mail" />
              <a :href="`mailto:${personalInfo.email}`">{{ personalInfo.email }}</a>
            </span>
            <span v-if="!personalInfo.phone && !personalInfo.email">
              <img class="icon" :src="personalInfo.avatar || '/icons/fa-phone.svg'" alt="phone" />
              您的联系方式
            </span>
          </div>
        </div>
        <div class="photo">
          <img src="/profile.jpg" alt="profile" />
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "PersonalInfoModern",
  props: {
    personalInfo: {
      type: Object,
      required: true
    }
  }
};
</script>
<style>
.section {
  display: flow-root;
  background: #fff;
  /* 确认不是被撑开问题时，可以先强制一个高度看看效果 */
}
</style>