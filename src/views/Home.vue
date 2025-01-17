<!-- Home.vue -->
<template>
  <div class="home">
    <h1 class="home-title">欢迎使用简历生成器！</h1>
    <p class="home-description">
      该工具帮助用户轻松创建专业简历，输入个人信息、教育背景和工作经历，自动生成美观简历，助您求职成功！
    </p>
    <!-- 通过 router-link 跳转到填写表单页面 -->
    <router-link to="/resume-form">
      <button class="create-resume-button">创建简历</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home {
  /* 你的样式 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
  transform: translateY(-100px); 
}

.home-title {
  font-size: 24px;
  font-weight: bold;
}

.create-resume-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s; /* 添加过渡效果 */
}

.create-resume-button:hover {
  background-color: #0056b3; /* hover时的背景颜色 */
  transform: scale(1.15);
  transition: transform 0.3s;
}

.home-description {
  margin-top: 20px;
  font-size: 16px;
  color: #666;
  max-width: 400px;
}
</style>