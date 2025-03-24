<template>
  <div class="app-container" id="app">
    <header v-if="showTopHeader" class="header">
      <!-- 左侧logo部分 -->
      <router-link class="logo-link" to="/">
        <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/logo1.png" alt="logo" class="header-logo">
        <span class="app-title">AI简历君</span>
      </router-link>

      <!-- 右侧导航部分 -->
      <div class="nav-right">
        <!-- 登录状态显示用户菜单 -->
        <div v-if="isLoggedIn" 
             class="user-menu-container"
             @mouseenter="showMenu = true"
             @mouseleave="showMenu = false">
          <div class="username">{{ username }}</div>
          <transition name="fade">
            <ul v-show="showMenu" class="dropdown-menu">
              <li @click="handleLogout">退出登录</li>
            </ul>
          </transition>
        </div>

        <!-- 未登录状态显示常规导航 -->
        <template v-else>
          <!-- 桌面端导航项 -->
          <div class="desktop-nav">
            <span class="nav-item">功能</span>
            <span class="nav-item">价格</span>
            <span class="nav-item">关于我们</span>
            <router-link to="/auth" class="user-icon-link">
              <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/user-icon.svg" alt="用户" class="user-icon">
            </router-link>
            <button class="free-trial">免费试用</button>
          </div>
          
          <!-- 移动端菜单图标 -->
          <div class="mobile-menu-icon" @click="toggleMobileMenu">
            <div class="menu-icon-bar" :class="{ 'menu-open': showMobileMenu }"></div>
            <div class="menu-icon-bar" :class="{ 'menu-open': showMobileMenu }"></div>
            <div class="menu-icon-bar" :class="{ 'menu-open': showMobileMenu }"></div>
          </div>
        </template>
      </div>
    </header>

    <!-- 移动端菜单面板 -->
    <div class="mobile-menu-panel" :class="{ 'menu-open': showMobileMenu, 'logged-in': isLoggedIn }">
      <div class="mobile-menu-items">
        <!-- 未登录状态的菜单项 -->
        <template v-if="!isLoggedIn">
          <span class="mobile-nav-item">功能</span>
          <span class="mobile-nav-item">价格</span>
          <span class="mobile-nav-item">关于我们</span>
          <router-link to="/auth" class="mobile-nav-item" @click="showMobileMenu = false">
            <span>登录/注册</span>
          </router-link>
          <button class="mobile-free-trial">免费试用</button>
        </template>
        
        <!-- 登录状态的菜单项 -->
        <template v-else>
          <router-link to="/dashboard" class="mobile-nav-item" @click="showMobileMenu = false">
            <span>我的简历</span>
          </router-link>
          <router-link to="/settings" class="mobile-nav-item" @click="showMobileMenu = false">
            <span>账户设置</span>
          </router-link>
          <div class="mobile-nav-item" @click="handleLogout">退出登录</div>
        </template>
      </div>
    </div>

    <header v-if="showLeftHeader" class="header-left">
      <router-link class="logo-link-left" to="/">
        <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/logo1.png" alt="logo" class="header-logo">
        <span class="app-title-left">AI简历君</span>
      </router-link>
    
      <!-- 将底部元素包裹到一个容器中 -->
      <div class="bottom-section">
        <div class="user-profile" @click="showMenu = !showMenu">
          <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/user-icon.svg" alt="user" class="user-icon">
          <div class="username mobile-username">{{ username }}</div>
          <!-- 移动端下拉菜单 -->
          <transition name="fade">
            <ul v-show="showMenu" class="dropdown-menu mobile-dropdown">
              <li @click="handleLogout">退出登录</li>
            </ul>
          </transition>
        </div>
        <!-- 移动端菜单图标 -->
        <div class="mobile-menu-icon logged-in-menu" @click="toggleMobileMenu">
          <div class="menu-icon-bar" :class="{ 'menu-open': showMobileMenu }"></div>
          <div class="menu-icon-bar" :class="{ 'menu-open': showMobileMenu }"></div>
          <div class="menu-icon-bar" :class="{ 'menu-open': showMobileMenu }"></div>
        </div>
      </div>
    </header>

    <router-view class="router-view" />
  </div>
</template>

<script>
import AuthService from '@/utils/auth'
import { useToast } from 'vue-toastification'

export default {
  name: 'App',
  data() {
    return {
      showMenu: false,
      showMobileMenu: false
    }
  },
  setup() {
    const toast = useToast()
    return { toast }
  },
  computed: {
    isLoggedIn() {
      return AuthService.isLoggedIn()
    },
    username() {
      return AuthService.getUserContact()
    },
    showTopHeader() {
      return !this.isLoggedIn
    },
    showLeftHeader() {
      return this.isLoggedIn
    }
  },
  methods: {
    handleLogout() {
      AuthService.logout()
      this.toast.success('退出登录成功')
      this.showMenu = false
      this.$router.push('/')
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    }
  }
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: var(--color-header-background);
}

.header-left {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 100vh;
  width: 80px;
  flex-direction: column;
  background-color: var(--color-left-header-background);
  align-items: center;
  z-index: 1000;
}

/* 新增底部容器样式 */
.bottom-section {
  margin-top: auto;  /* 关键样式 - 将容器推到最底部 */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; /* 底部留白 */
}

.phone-icon {
  width: 40px;
  height: 40px;
}

.user-icon {
  margin-top: 20px;
}

/* 左侧logo样式 */
.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-link-left {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  margin-top: 20px;
  align-items: center;
}

.app-title-left {
  font-size: 15px;
  margin-top: 3px;
  color: var(--color-black);
}

.header-logo {
  width: 28px;
  height: 28px;
}
.app-title {
  font-size: 15px;
  color: var(--color-black);
  margin-left: 12px;
}

/* 右侧导航容器 */
.nav-right {
  display: flex;
  align-items: center;
  gap: 30px;  /* 元素间距统一控制 */
}

/* 桌面端导航样式 */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 30px;  /* 确保导航项之间间距一致 */
}

/* 导航项通用样式 */
.nav-item {
  font-size: 14px;
  color: var(--color-text-primary);
  cursor: default;  /* 暂时禁用点击状态 */
}

/* 用户图标样式 */
.user-icon {
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.user-icon-link {
  display: flex;
  align-items: center;
}

/* 免费试用按钮 */
.free-trial {
  background: var(--color-black);
  color: var(--color-text-secondary);
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.free-trial:hover {
  opacity: 0.9;
}

/* 保持原有下拉菜单样式不变 */
.user-menu-container { position: relative; }
.username { cursor: pointer; }
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--color-white);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px 0;
  min-width: 120px;
  z-index: 1002;
}

.dropdown-menu li {
  list-style: none;
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-menu li:hover {
  background-color: var(--color-secondary);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 移动端菜单图标 */
.mobile-menu-icon {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  width: 24px;
  height: 18px;
  position: relative;
  z-index: 1001;
}

.menu-icon-bar {
  width: 24px;
  height: 2px;
  background-color: var(--color-black);
  transition: all 0.3s ease;
}

/* 菜单打开状态的图标样式 */
.menu-icon-bar.menu-open:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.menu-icon-bar.menu-open:nth-child(2) {
  opacity: 0;
}

.menu-icon-bar.menu-open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* 移动端菜单面板 */
.mobile-menu-panel {
  position: fixed;
  top: 60px;
  right: -100%;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: var(--color-white);
  z-index: 999;
  transition: right 0.3s ease;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

.mobile-menu-panel.menu-open {
  right: 0;
}

.mobile-menu-items {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.mobile-nav-item {
  font-size: 18px;
  color: var(--color-text-primary);
  text-decoration: none;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-free-trial {
  background: var(--color-black);
  color: var(--color-text-secondary);
  border: none;
  padding: 12px 20px;
  border-radius: 20px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  align-self: center;
  width: 80%;
}

/* 其他过渡效果保持原样 */

/* 响应式设计 */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-icon {
    display: flex;
  }

  .header {
    padding: 0 20px;
  }
  
  .header-left {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .logo-link-left {
    flex-direction: row;
    margin-top: 0;
    align-items: center;
  }
  
  .app-title-left {
    margin-top: 0;
    margin-left: 10px;
  }
  
  .bottom-section {
    margin-top: 0;
    flex-direction: row;
    margin-bottom: 0;
    gap: 20px;
    align-items: center;
  }
  
  .user-icon {
    margin-top: 0;
  }
  
  .router-view {
    padding-left: 0 !important;
  }
  
  /* 登录状态下的用户菜单移动端适配 */
  .user-menu-container {
    display: flex;
    align-items: center;
  }
  
  .username {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .dropdown-menu {
    right: 0;
    left: auto;
  }
}

/* 超小屏幕设备适配 */
@media (max-width: 480px) {
  .app-title, .app-title-left {
    font-size: 14px;
  }
  
  .header-logo {
    width: 24px;
    height: 24px;
  }
  
  .user-icon {
    width: 28px;
    height: 28px;
  }
  
  .mobile-menu-panel {
    width: 100%;
  }
  
  .username {
    max-width: 80px;
  }
}

.user-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.mobile-username {
  display: none;
}

.mobile-dropdown {
  position: fixed;
  top: 60px;
  right: 20px;
}

.logged-in-menu {
  display: none;
}

@media (max-width: 768px) {
  .mobile-username {
    display: block;
    margin-left: 10px;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .logged-in-menu {
    display: flex;
    margin-left: 20px;
  }
  
  /* 登录状态下的移动菜单样式 */
  .mobile-menu-panel.logged-in {
    z-index: 999;
  }
}

.router-view {
  flex: 1;
}

/* 未登录状态下的布局 */
.router-view {
  width: 100%;
}

/* 登录状态下的布局 */
.header-left + .router-view {
  margin-left: 80px;
  width: calc(100% - 80px);
}

@media (max-width: 768px) {
  .header-left + .router-view {
    margin-left: 0;
    margin-top: 60px;
    width: 100%;
  }
}
</style>