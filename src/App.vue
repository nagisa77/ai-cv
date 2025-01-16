<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- 可以放一些全局导航或头部信息 -->
    <header class="header">
        <!-- 跳转首页 -->
        <router-link class="header-link" to="/">首页</router-link>
        <!-- 跳转创建简历 -->
        <router-link class="header-link" to="/create-resume">创建简历</router-link>
    </header>

    <!-- 路由出口：这里会动态展示 Home.vue 或 CreateResume.vue -->
    <router-view />
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
  background-color: #f0f0f0;
  display: flex;
  justify-content: flex-start; /* 从左向右排 */
  align-items: center;
}

.header-link {
  margin-left: 20px;
  text-decoration: none;
  color: #333;
}
</style>