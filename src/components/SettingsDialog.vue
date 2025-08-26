<template>
  <div class="modal-overlay" @click.self="closeDialog">
    <transition name="fade-scale">
      <div class="modal-container">
        <div class="modal-header">
          <button class="close-btn" @click="closeDialog">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-top">
          系统设置
        </div>
        <div class="modal-user">
          <div class="user-head">
            <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/user-icon.svg" alt="user"
                class="user-icon">
          </div>
          <div class="user-imformation">
             <div user-id>
               {{ id }}
             </div>
          </div>
        </div>
        <div class="tab-header">
          <div :class="['tab-item', { active: activeTab === 'subscription' }]" @click="selectTab('subscription')">会员订阅</div>
          <div :class="['tab-item', { active: activeTab === 'legal' }]" @click="selectTab('legal')">使用协议</div>
        </div>
        <div class="tab-content">
          <div v-if="activeTab === 'subscription'" class="pay-card-content">
            <div class="pay-card" v-for="(card, index) in payCards" :key="index">
              <div class="pay-card-title">{{ card.title }}</div>
              <div class="pay-acitvity">
                <div class="pay-acitvity-item" v-for="(feature, fIndex) in card.features" :key="fIndex">
                  <svg class="pay-acitvity-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M512 992C246.896 992 32 777.104 32 512 32 246.896 246.896 32 512 32 777.104 32 992 246.896 992 512 992 777.104 777.104 992 512 992ZM792.832 359.168C780.704 347.04 761.024 347.04 748.896 359.168L447.536 660.528 276.032 489.024C264.16 477.136 244.896 477.136 233.024 489.024 221.136 500.896 221.136 520.16 233.024 532.032L419.664 718.672C421.12 721.584 422.688 724.464 425.12 726.896 437.232 739.024 456.912 739.024 469.04 726.896L792.832 403.104C804.96 390.976 804.96 371.296 792.832 359.168Z" />
                  </svg>
                  <div class="pay-acitvity-item-title">{{ feature }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="activeTab === 'legal'" class="legal-links">
            <div class="legal-grid">
              <div class="legal-item">
                <div class="legal-name">隐私政策</div>
                <router-link to="/privacy-policy" class="legal-view-btn">查看</router-link>
              </div>
              <div class="legal-item">
                <div class="legal-name">服务协议</div>
                <router-link to="/service-agreement" class="legal-view-btn">查看</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AuthService from '@/utils/auth'

export default {
  name: 'SettingsDialog',
  emits: ['close'],
  data() {
    return {
      activeTab: 'subscription',
      payCards: [
        {
          title: '免费版用户',
          features: ['简历模版免费使用', '每日20次AI对话', '每日1次简历下载'],
        },
        {
          title: 'Pro版会员',
          features: ['简历模版免费使用', '每日50次AI对话', '每日5次简历下载', '至多保存5份简历'],
        },
        {
          title: 'Plus版会员',
          features: ['简历模版免费使用', '每日无限次AI对话', '每日无限次简历下载', '至多保存10份简历', '支持一键模版、字体切换'],
        }
      ]
    }
  },
  computed: {
    contact() {
      return AuthService.getUserContact()
    },
    id() {
      return AuthService.getUserId()
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
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
  width: 856px;
  height: 609px;
  max-width: 95%;
  border-radius: 20px;
  padding: 20px 28px 28px 28px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.18);
  text-align: left;
  display: flex;
  flex-direction: column;
  position: relative;
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
  position: absolute;
  top: 12px;
  right: 12px;
}

.close-btn:hover {
  background-color: var(--color-secondary);
  color: var(--color-primary);
}

.tab-header {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  margin-left: 10px;
  justify-content: flex-start;
  gap: 8px;
}

.tab-item {
  text-align: center;
  padding: 10px;
  cursor: pointer;
  margin-left: 10px;
  font-weight: 500;
  flex: 0,0,auto;
}

.tab-item.active {
  color: black;
  font-size: 22px;
  font-weight: bold;
  position: relative;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background-color: black;
}

.legal-links {
  padding: 20px;
  width: 100%;
}

.legal-grid {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.legal-item {
  display: table-row;
  width: 100%;
}

.legal-name {
  display: table-cell;
  font-size: 16px;
  color: var(--color-text-primary);
  font-weight: 500;
  text-align: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  width: 50%;
}

.legal-view-btn {
  display: table-cell;
  color: rgb(90, 135, 157);
  text-decoration: none;
  padding: 15px 0;
  border: 1px solid rgb(90, 135, 157);
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-align: center;
  width: 50%;
  border: none;
  background: none;
}

.legal-item:last-child .legal-name {
  border-bottom: none;
}

.legal-link {
  color: var(--color-primary);
  text-decoration: none;
}
.modal-top {
  height: 40px;
  font-size: 22px;
  font-weight: bold;
}

.pay-card-content {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 43px;
  flex-wrap: nowrap;
  transform: scale(0.9);
  transform-origin: top center;
}

.pay-card {
  background-color: #f2f2f2;
  width: 342px;
  height: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
}

.pay-card-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-text-primary);
  text-align: center;
}

.pay-acitvity {
  margin-top: 12px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width:200px;
  justify-content: center;
}

.pay-acitvity-item {
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: left; 
}

.pay-acitvity-item-title {
  text-align: left;
}

.pay-acitvity-item-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  fill: var(--color-primary);
}

.pay-price-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--color-text-primary);
  text-align: center;
}

.pay-price-subtitle {
  font-size: 14px;
  margin-top: 6px;
  color: var(--color-text-primary);
  opacity: 0.6;
  text-align: center;
}

.user-icon {
  width: auto;
  height: 80px;
}

.modal-user
{
  display: flex;
  height: 100px;
  align-items: center;
}
</style>
