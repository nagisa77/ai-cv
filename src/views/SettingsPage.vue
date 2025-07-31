<template>
  <div class="modal-overlay" @click.self="closeDialog">
    <transition name="fade-scale">
      <div class="modal-container">
        <div class="modal-header">
          <h2>设置</h2>
          <button class="close-btn" @click="closeDialog">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="tab-header">
          <div :class="['tab-item', { active: activeTab === 'profile' }]" @click="selectTab('profile')">个人信息</div>
          <div :class="['tab-item', { active: activeTab === 'privacy' }]" @click="selectTab('privacy')">隐私政策</div>
        </div>
        <div class="tab-content">
          <div v-if="activeTab === 'profile'">
            <p>用户名：{{ username }}</p>
            <p>联系方式：{{ contact }}</p>
          </div>
          <div v-else-if="activeTab === 'privacy'" class="privacy-text">
            <p>我们重视您的隐私，并致力于保护您的个人信息。本隐私政策解释了我们如何收集、使用以及共享您的信息。</p>
            <p>我们仅在为您提供服务所必需的情况下收集信息，不会出售或泄露您的数据。</p>
            <p>您可以随时联系我们了解更多详情。</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AuthService from '@/utils/auth'

export default {
  name: 'SettingsPage',
  data() {
    return {
      activeTab: 'profile'
    }
  },
  computed: {
    username() {
      return AuthService.getCurrentUser()?.username || ''
    },
    contact() {
      return AuthService.getUserContact()
    }
  },
  methods: {
    closeDialog() {
      this.$router.back()
    },
    selectTab(tab) {
      this.activeTab = tab
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-scale-enter,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.modal-container {
  background: var(--color-white);
  width: 500px;
  max-width: 95%;
  border-radius: 20px;
  padding: 20px 28px 28px 28px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.18);
  text-align: left;
  display: flex;
  flex-direction: column;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.close-btn {
  background: none;
  border: none;
  color: var(--color-gray-dark);
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 18px;
}
.close-btn:hover {
  background-color: var(--color-secondary);
  color: var(--color-primary);
}
.tab-header {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}
.tab-item {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  font-weight: 500;
}
.tab-item.active {
  border-bottom: 2px solid var(--color-primary);
  color: var(--color-primary);
}
.privacy-text {
  line-height: 1.6;
}
</style>
