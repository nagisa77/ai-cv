<template>
  <div class="modal-container">
    <div class="modal-header">
      <button class="close-btn" @click="closeDialog">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="tab-header">
      <div :class="['tab-item', { active: activeTab === 'profile' }]" @click="selectTab('profile')">个人信息</div>
      <div :class="['tab-item', { active: activeTab === 'legal' }]" @click="selectTab('legal')">隐私政策和服务协议</div>
    </div>
    <div class="tab-content">
      <div v-if="activeTab === 'profile'">
        <p>{{ contact }}</p>
      </div>
      <div v-else-if="activeTab === 'legal'" class="legal-links">
        <router-link to="/privacy-policy" class="legal-link">隐私政策</router-link>
        <router-link to="/service-agreement" class="legal-link">服务协议</router-link>
      </div>
    </div>
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
  position: absolute;
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
  max-width: calc(100% - 120px);
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

.legal-links {
  line-height: 1.6;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.legal-link {
  color: var(--color-primary);
  text-decoration: none;
}
</style>
