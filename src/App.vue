<template>
  <div id="app">
    <header class="header">
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
          <span class="nav-item">功能</span>
          <span class="nav-item">价格</span>
          <span class="nav-item">关于我们</span>
          <router-link to="/auth" class="user-icon-link">
            <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/user-icon.svg" alt="用户" class="user-icon">
          </router-link>
          <button class="free-trial">免费试用</button>
        </template>
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
      showMenu: false
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
    }
  },
  methods: {
    handleLogout() {
      AuthService.logout()
      this.toast.success('退出登录成功')
      this.showMenu = false
      this.$router.push('/')
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

/* 左侧logo样式 */
.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
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

/* 导航项通用样式 */
.nav-item {
  font-size: 14px;
  color: var(--color-text-primary);
  cursor: default;  /* 暂时禁用点击状态 */
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

/* 用户图标样式 */
.user-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.user-icon-link {
  display: flex;
  align-items: center;
}

/* 保持原有下拉菜单样式不变 */
.user-menu-container { position: relative; }
.username { cursor: pointer; }
.dropdown-menu {
  /* 原有样式保持不变 */
}
/* 其他过渡效果保持原样 */
</style>