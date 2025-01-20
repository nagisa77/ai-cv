<!-- Home.vue -->
<template>
  <div class="home">
    <div class="session1">
      <h1 class="home-title">欢迎使用<span class="home-title-highlight">简历生成器</span>！</h1>
      <p class="home-description">
        该工具帮助用户轻松<span class="home-title-highlight">创建专业简历</span>，输入个人信息、教育背景和工作经历，自动生成<span class="home-title-highlight">美观简历</span>，助您求职成功！
      </p>
      <!-- 通过 router-link 跳转到填写表单页面 -->
      <router-link to="/resume-form">
        <button class="create-resume-button">创建简历 🎉</button>
      </router-link>
    </div>

    <div class="session2">
      <div class="session2-icon-content">
        <img :src="imChatConversationIcon" alt="im-chat-conversation-1 图标" class="session2-icon" />
        <img :src="arrowIcon" alt="arrow-142 图标" class="arrow-icon" />
        <img :src="formIcon" alt="form-7 图标" class="session2-icon" />
      </div>

      <h2 class="session2-title">
        通过对话
      </h2>
      <div class="session2-description">
        我们会通过对话的方式，与您沟通简历内容，并生成简历。我们的系统会根据您提供的信息，自动生成一份专业的简历，确保您的简历在求职过程中脱颖而出。无论是教育背景、工作经历还是个人技能，我们都会为您精心编排，打造一份完美的简历，助您在职场中取得成功。
      </div>
    </div>

    <div class="session3">  
      <div class="session3-title-content">
        <div class="session3-title">我们会处理困难的事情</div>
        <div class="session3-title-sub">通过以下三种方式生成简历：对话沟通、导入文件、使用模版。</div>
      </div>
      <div class="session3-button-content">
        <div class="session3-button">
          <img :src="createResumeIcon" alt="form-7 图标" class="session3-icon" />
          <div class="session3-button-title">创建简历</div>
          <div class="session3-button-description">通过对话的方式，与您沟通简历内容，并生成简历</div>
        </div>
        <div class="session3-button">
          <img :src="importResumeIcon" alt="form-7 图标" class="session3-icon" />
          <div class="session3-button-title">导入简历</div>
          <div class="session3-button-description">通过导入已有的简历文件，系统会自动解析并生成一份新的简历，帮助您节省时间和精力。</div>
        </div>
        <div class="session3-button">
          <img :src="modelIcon" alt="form-7 图标" class="session3-icon" />
          <div class="session3-button-title">简历模版</div>
          <div class="session3-button-description">通过简历模版，您可以快速生成一份专业的简历，节省时间并确保简历的质量和美观度。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      imChatConversationIcon: require('@/assets/icon/im-chat-conversation-1.svg'),
      formIcon: require('@/assets/icon/form-7.svg'),
      arrowIcon: require('@/assets/icon/arrow-142.svg'),
      createResumeIcon: require('@/assets/icon/create-7.svg'),
      importResumeIcon: require('@/assets/icon/import-19.svg'),
      modelIcon: require('@/assets/icon/model-24.svg')
    }
  }
}
</script>

<style scoped>
.home {
  /* 你的样式 */
  display: flex;
  flex-direction: column;
  transform: translateY(60px);
}

.home-title-highlight {
  color: var(--color-primary);
}

.home-title {
  font-size: 50px;
  font-weight: bold;
}

.create-resume-button {
  margin-top: 40px;
  padding: 20px 40px;
  font-size: 20px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  /* 添加过渡效果 */
}

.create-resume-button:hover {
  background-color: var(--color-primary-hover);
  transform: scale(1.05);
  transition: transform 0.3s;
}

.home-description {
  font-size: 20px;
  color: #666;
  max-width: 600px;
}

.session1 {
  height: calc(100vh - 60px);
  width: 100vw;
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.session2 {
  height: calc(100vh - 60px);
  width: 100vw;
  background-color: var(--color-primary);
}

.session3 {
  height: calc(100vh - 60px);
  width: 100vw;
  background-color: var(--color-secondary);
}

.session2-icon {
  width: 100px;
  height: 100px;
}

.arrow-icon {
  width: 30px;
  height: 30px;
  margin-left: 35px;
  margin-right: 30px;
}

.session2-icon-content {
  display: flex;
  margin-left: 200px;
  align-items: center;
  width: 100vw;
  margin-top: 200px;
}

.session2-title {
  margin-left: 200px;
  font-size: 26px;
  color: var(--color-secondary);
  margin-top: 80px;
}

.session2-description {
  margin-left: 200px;
  font-size: 18px;
  color: var(--color-secondary);
  margin-top: 10px;
  max-width: 600px;
  opacity: 0.8;
}

.session3-button-content {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.session3-button {
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  max-width: 200px;
  padding: 10px;
  border-radius: 10px;
}

.session3-button:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
  cursor: pointer;
}

.session3-icon {
  width: 20px;
  height: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--color-gray);
}

.session3-button-title {
  margin-top: 15px;
  font-size: 16px;
  color: var(--color-black);
}

.session3-button-description {
  margin-top: 10px;
  font-size: 14px;
  opacity: 0.3;
  color: var(--color-black);
}

.session3-title-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.session3-title {
  font-size: 30px;
  font-weight: bold;
  color: var(--color-black);
  margin-top: 150px;
}

.session3-title-sub {
  font-size: 16px;
  color: var(--color-black);
  opacity: 0.3;
  margin-top: 10px;
  text-align: center;
  max-width: 600px;
}

</style>
