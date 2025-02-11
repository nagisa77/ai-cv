<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- 可以放一些全局导航或头部信息 -->
    <header class="header">
      <!-- 跳转首页 -->
      <router-link class="header-link" to="/"> 
        <img src="@/assets/icon/logo1.png" alt="logo"
          class="header-logo">首页</router-link>
      <router-link class="header-link" to="/create-resume">创建简历</router-link>
      <router-link class="header-link" to="/auth">登录</router-link>
    </header>

    <router-view class="router-view" />
  </div>
</template>

<script>
export default {
  name: 'App'
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
  padding: 0 25px; /* 添加容器两侧内边距 */
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

</style>
