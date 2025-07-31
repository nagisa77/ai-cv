<template>
  <BaseDialog title="设置" @close="close">
    <div class="tabs">
      <div :class="['tab', {active: activeTab==='profile'}]" @click="activeTab='profile'">个人信息</div>
      <div :class="['tab', {active: activeTab==='privacy'}]" @click="activeTab='privacy'">隐私政策</div>
    </div>
    <div class="tab-content">
      <div v-if="activeTab==='profile'" class="profile-info">
        <label>用户名</label>
        <input type="text" placeholder="请输入用户名" />
      </div>
      <div v-else class="privacy-policy">
        <p>我们非常重视您的隐私。本应用仅会在必要时收集最少量的个人信息，且不会向第三方披露。</p>
        <p>在使用过程中，部分数据可能用于改进服务体验。继续使用即代表您同意我们的隐私政策。</p>
      </div>
    </div>
  </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/BaseDialog.vue'
export default {
  name: 'SettingsView',
  components: { BaseDialog },
  data() {
    return { activeTab: 'profile' }
  },
  methods: {
    close() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}
.tab {
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  background: #f5f5f5;
  font-size: 14px;
}
.tab.active {
  background: var(--color-primary, #409eff);
  color: #fff;
}
.tab-content {
  font-size: 14px;
}
.privacy-policy {
  line-height: 1.6;
}
</style>
