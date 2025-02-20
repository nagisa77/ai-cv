<!-- src/App.vue -->
<template>
  <div id="app">
    <header class="header">
      <router-link class="header-link" to="/">
        <img src="@/assets/icon/logo1.png" alt="logo" class="header-logo">首页
      </router-link>
      <router-link class="header-link" to="/create-resume">创建简历</router-link>

      <div v-if="isLoggedIn" class="user-menu-container" 
           @mouseenter="showMenu = true" 
           @mouseleave="showMenu = false">
        <div class="header-link username">
          {{ username }}
        </div>
        <transition name="fade">
          <ul v-show="showMenu" class="dropdown-menu">
            <li @click="handleLogout">退出登录</li>
          </ul>
        </transition>
      </div>

      <router-link v-else class="header-link" to="/auth">登录</router-link>
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
/* 全局样式或布局 */
header {
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: var(--color-header-background);
  padding: 0 25px;
  /* 添加容器两侧内边距 */
}

.header-link {
  margin-left: 25px;
  font-size: 12px;
  text-decoration: none;
  color: var(--color-black);
  display: flex;
  gap: 5px;
  align-items: center;
}

.header-link:last-child {
  margin-left: auto;
  margin-right: 0;
}

.header-logo {
  width: 20px;
  height: 20px;
}


/* 新增下拉菜单样式 */
.user-menu-container {
  position: relative;
  margin-left: auto;
}

.username {
  cursor: pointer;
  transition: 0.3s;
}

.username:hover {
  color: var(--color-primary);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 8px 0;
  margin: 5px 0 0;
  min-width: 120px;
  border-radius: 10px;
}

.dropdown-menu li {
  padding: 8px 16px;
  font-size: 12px;
  cursor: pointer;
  transition: 0.3s;
}

.dropdown-menu li:hover {
  background: #f5f5f5;
  color: var(--color-primary);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>