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
    </header>

    <!-- 路由出口：这里会动态展示 Home.vue 或 CreateResume.vue -->
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
  /* 从左向右排 */
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  /* 毛玻璃效果 */
  -webkit-backdrop-filter: blur(10px);
  /* Safari 浏览器支持 */
  background-color: var(--color-header-background);
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

.header-logo {
  width: 20px;
  height: 20px;
}

</style>
