<template>
  <div class="home-logged">
    <div class="home-logged-left">
      <div class="home-card-left">
        <div class="home-card-left-top-buttons-container">
          <button class="btn">
            <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/add.svg" alt="icon" class="btn-icon">
            <span>新建简历</span>
          </button>
          <button class="btn btn-white">
            <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/import.png" alt="icon" class="btn-icon btn-icon-import">
            <span>导入简历</span>
          </button>
          <button class="btn btn-white">
            <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/model.png" alt="icon" class="btn-icon btn-icon-model">
            <span>简历模版</span>
          </button>
          <button class="btn btn-white">
            <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/interview.png" alt="icon" class="btn-icon btn-icon-interview">
            <span>模拟面试</span>
          </button>
        </div>
        
        <!-- 添加顶部标签页导航 -->
        <div class="resume-tabs">
          <div 
            class="resume-tab" 
            :class="{ 'active': activeTab === 'myResumes' }" 
            @click="activeTab = 'myResumes'"
          >
            我的简历
          </div>
          <div 
            class="resume-tab" 
            :class="{ 'active': activeTab === 'trash' }" 
            @click="activeTab = 'trash'"
          >
            回收站
          </div>
        </div>
        
        <!-- 简历内容区域 -->
        <div class="resume-content">
          <!-- 我的简历标签页内容 -->
          <div v-if="activeTab === 'myResumes'" class="resume-grid">
            <!-- 示例简历项，实际应使用v-for循环从数据源渲染 -->
            <div class="resume-item" v-for="(resume, index) in myResumes" :key="index">
              <div class="resume-preview">
                <img :src="resume.imageUrl" alt="简历预览">
              </div>
              <div class="resume-info">
                <div class="resume-name">{{ resume.name }}</div>
                <div class="resume-date">{{ resume.date }}</div>
              </div>
            </div>
          </div>
          
          <!-- 回收站标签页内容 -->
          <div v-if="activeTab === 'trash'" class="resume-grid">
            <div class="resume-item deleted" v-for="(resume, index) in trashResumes" :key="index">
              <div class="resume-preview">
                <img :src="resume.imageUrl" alt="简历预览">
              </div>
              <div class="resume-info">
                <div class="resume-name">{{ resume.name }}</div>
                <div class="resume-date">{{ resume.date }}</div>
                <div class="resume-actions">
                  <button class="resume-restore-btn">恢复</button>
                  <button class="resume-delete-btn">永久删除</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home-logged-right">
      <div class="home-logged-right-top">
        <div class="home-card-right-top">
        </div>
      </div>

      <div class="home-logged-right-bottom">
        <div class="home-card-right-bottom">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeLogged',
  data() {
    return {
      activeTab: 'myResumes', // 默认显示"我的简历"标签页
      myResumes: [
        {
          imageUrl: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview/template-general1.png',
          name: '个人简历',
          date: '2023-06-15'
        },
        {
          imageUrl: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview/template-general2.png',
          name: '求职简历',
          date: '2023-06-10'
        },
        {
          imageUrl: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview/template-general3.png',
          name: '实习简历',
          date: '2023-05-28'
        }
      ],
      trashResumes: [
        {
          imageUrl: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview/template-general3.png',
          name: '已删除简历',
          date: '2023-05-20'
        }
      ]
    }
  }
}
</script>

<style scoped>
.home-logged {
  margin-left: 80px;
  background-color: var(--color-background);
  height: 100vh;
  display: flex;
}

.home-logged-left {
  height: 100vh;
  width: calc(60vw - 40px);
}

.home-logged-right-top {
  height: 40vh;
  width: 40vw;
}

.home-logged-right-bottom {
  height: 60vh;
  width: 40vw;
}

.home-card-left {
  background-color: white;
  height: calc(100% - 80px);
  width: calc(100% - 80px);
  margin-top: 40px;
  margin-left: 40px;
  border-radius: 30px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.home-card-right-top {
  background-color: white;
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  margin-top: 40px;
  border-radius: 30px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}   

.home-card-right-bottom {
  background-color: white;
  height: calc(100% - 80px);
  width: calc(100% - 40px);
  border-radius: 30px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.home-card-left-top-buttons-container {
  padding: 0 20px;
  width: calc(100% - 40px);
  height: 100px;
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: var(--color-secondary);
  /* 如果需要按钮靠左排列，可去掉 justify-content: space-between */
  /* justify-content: space-between; */
}

.btn {
  /* 按钮宽度尽量撑开 */
  padding: 12px 20px;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: none;

  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: 15px;
  font-size: 20px;
}

.btn-white {
  background-color: white;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 10px 15px;
}

.btn:hover {
  background-color: var(--color-primary-hover);
  transition: background-color 0.3s ease;
}

.btn-white:hover {
  background-color: var(--color-secondary);
  transition: background-color 0.3s ease;
}

.btn-icon {
  width: 25px;
  height: 25px;
  margin-right: 5px;
}

.btn:last-child {
  margin-right: 0;
}

/* 添加图标滤镜以改变颜色 */
.btn-white .btn-icon {
  filter: invert(58%) sepia(19%) saturate(1155%) hue-rotate(333deg) brightness(92%) contrast(84%);
}

/* 如果需要hover状态保持图标颜色 */
.btn-white:hover .btn-icon {
  filter: invert(58%) sepia(19%) saturate(1155%) hue-rotate(333deg) brightness(92%) contrast(84%);
}

/* 标签页样式 */
.resume-tabs {
  display: flex;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
}

.resume-tab {
  padding: 15px 20px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  color: #888;
}

.resume-tab.active {
  color: var(--color-primary);
  font-weight: 600;
}

.resume-tab.active:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: 3px 3px 0 0;
}

/* 简历内容区域 */
.resume-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* 简历网格 */
.resume-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .resume-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1600px) {
  .resume-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 简历项目 */
.resume-item {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
}

.resume-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.resume-preview {
  width: 100%;
  overflow: hidden;
}

.resume-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resume-info {
  padding: 15px;
}

.resume-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.resume-date {
  font-size: 12px;
  color: #888;
}

/* 已删除简历样式 */
.resume-item.deleted {
  opacity: 0.8;
  position: relative;
}

.resume-item.deleted:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  pointer-events: none;
}

/* 简历操作按钮 */
.resume-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.resume-restore-btn, .resume-delete-btn {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  border: none;
}

.resume-restore-btn {
  background-color: var(--color-primary);
  color: white;
}

.resume-delete-btn {
  background-color: #f44336;
  color: white;
}
</style>
