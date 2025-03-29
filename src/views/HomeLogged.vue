<template>
  <div class="home-logged">
    <div class="home-logged-left">
      <div class="home-card-left">
        <div class="home-card-left-top-buttons-container">
          <button class="btn btn-primary" @click="createResume">
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
        
        <!-- 改进的标签页导航 -->
        <div class="resume-tabs">
          <div 
            class="resume-tab" 
            :class="{ 'active': activeTab === 'myResumes' }" 
            @click="activeTab = 'myResumes'"
          >
            <span class="tab-icon"><i class="fas fa-file-alt"></i></span>
            我的简历
            <span class="resume-count" v-if="resumes.length > 0">{{ resumes.length }}</span>
          </div>
          <div 
            class="resume-tab" 
            :class="{ 'active': activeTab === 'trash' }" 
            @click="activeTab = 'trash'"
          >
            <span class="tab-icon"><i class="fas fa-trash-alt"></i></span>
            回收站
            <span class="resume-count" v-if="trashResumes.length > 0">{{ trashResumes.length }}</span>
          </div>
        </div>
        
        <!-- 简历内容区域 -->
        <div class="resume-content">
          <!-- 我的简历标签页内容 -->
          <div v-if="activeTab === 'myResumes'" class="resume-view">
            <div class="resume-header">
              <h2 class="resume-section-title">我的简历</h2>
              <div class="resume-actions-top">
                <div class="view-toggle">
                  <button class="view-btn active">
                    <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3 5v14h18V5H3zm16 2v10H5V7h14z"/></svg>
                  </button>
                  <button class="view-btn">
                    <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3 5v14h18V5H3zm2 2h3.5v2H5V7zm5.5 0h3.5v2h-3.5V7zm5.5 0h3.5v2H16V7zM5 11h3.5v2H5v-2zm5.5 0h3.5v2h-3.5v-2zm5.5 0h3.5v2H16v-2zM5 15h3.5v2H5v-2zm5.5 0h3.5v2h-3.5v-2zm5.5 0h3.5v2H16v-2z"/></svg>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="loading" class="empty-state">
              <l-waveform size="60" stroke="3.5" speed="1" color="var(--color-primary)"></l-waveform>
            </div>
            <div v-else-if="resumes.length === 0" class="empty-state">
              <div class="empty-icon">📄</div>
              <h3>暂无简历</h3>
              <p>点击"新建简历"开始创建您的第一份简历</p>
            </div>
            
            <div v-else class="resume-grid">
              <div class="resume-item" v-for="resume in resumes" :key="resume.resumeId" @click="openResume(resume)">
                <div class="resume-preview">
                  <img class="resume-pic" :src="getResumeImage(resume)" alt="简历预览">
                  <div class="resume-hover-actions">
                    <button class="resume-action-icon edit" @click.stop="openResume(resume)">
                      <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                    </button>
                    <button class="resume-action-icon delete" @click.stop="deleteResume(resume.resumeId)">
                      <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    </button>
                  </div>
                </div>
                <div class="resume-info">
                  <div class="resume-name">{{ resume.name }}</div>
                  <div class="resume-date">{{ formatDate(resume.createdAt) }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 回收站标签页内容 -->
          <div v-if="activeTab === 'trash'" class="resume-view">
            <div class="resume-header">
              <h2 class="resume-section-title">回收站</h2>
              <button v-if="trashResumes.length > 0" class="empty-trash-btn" @click="emptyTrash">
                清空回收站
              </button>
            </div>

            <div v-if="trashResumes.length === 0" class="empty-state">
              <div class="empty-icon">🗑️</div>
              <h3>回收站为空</h3>
              <p>已删除的简历将会显示在这里</p>
            </div>
            
            <div v-else class="resume-grid">
              <div class="resume-item deleted" v-for="(resume, index) in trashResumes" :key="index">
                <div class="resume-preview">
                  <img :src="resume.imageUrl" alt="简历预览">
                  <div class="resume-deleted-overlay">
                    <span>已删除</span>
                  </div>
                </div>
                <div class="resume-info">
                  <div class="resume-name">{{ resume.name }}</div>
                  <div class="resume-date">{{ resume.date }}</div>
                  <div class="resume-actions">
                    <button class="resume-restore-btn" @click="restoreResume(resume.id)">
                      <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/></svg>
                      恢复
                    </button>
                    <button class="resume-delete-btn" @click="permanentDelete(resume.id)">
                      <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      永久删除
                    </button>
                  </div>
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
          <div class="date-section">
            <div class="month">{{ currentMonth }}</div>
            <div class="day">{{ currentDay }}</div>
            <div class="weekday">{{ currentWeekday }}</div>
            <div class="lunar">{{ currentLunar }}</div>
          </div>
          <div class="content-section">
            <div v-if="!showTips" class="fortune-section">
              <div class="fortune-item">
                <span class="fortune-label fortune-label-avoid">忌</span>
                <span class="fortune-content">{{ currentFortune.avoid }}</span>
              </div>
              <div class="fortune-item">
                <span class="fortune-label fortune-label-suitable">宜</span>
                <span class="fortune-content">{{ currentFortune.suitable }}</span>
              </div>
              <button class="tips-button" @click="showTips = true">
                查看今日求职 Tips
              </button>
            </div>
            <div v-if="showTips" class="tips-section">
              <button class="back-button" @click="showTips = false">
                <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                返回
              </button>
              <div class="tips-content">{{ currentTip }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="home-logged-right-bottom">
        <div class="home-card-right-bottom">
          <img  class="home-card-right-bottom-img" src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/images/CleanShot%202025-03-25%20at%2011%E2%80%AF.47.38%402x.png" alt="活动图标">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/utils/auth'
import apiClient from '@/api/axios'
import { waveform } from 'ldrs'
import { useToast } from 'vue-toastification'

waveform.register()

export default {
  name: 'HomeLogged',
  data() {
    return {
      activeTab: 'myResumes', // 默认显示"我的简历"标签页
      resumes: [],
      loading: false,
      showTips: false,
      currentMonth: '',
      currentDay: '',
      currentWeekday: '',
      currentLunar: '',
      currentFortune: {
        avoid: '',
        suitable: ''
      },
      currentTip: '',
      fortunes: [
        { avoid: '冲动购物', suitable: '制定新计划' },
        { avoid: '熬夜追剧', suitable: '整理房间' },
        { avoid: '沉迷刷手机', suitable: '出门晒太阳' },
        { avoid: '加班', suitable: '吃顿美味犒劳自己' },
        { avoid: '纠结琐事', suitable: '和朋友聚餐聊天' },
        { avoid: '与人争执', suitable: '独处放松心情' },
        { avoid: '忙中出错', suitable: '慢下来喝杯咖啡' },
        { avoid: '回忆过去', suitable: '主动认识新朋友' },
        { avoid: '偷懒拖延', suitable: '学习新技能' },
        { avoid: '暗自烦恼', suitable: '早睡早起' }
      ],
      tips: [
        '再坚持一下，你比自己想象的还要厉害！',
        '每一步都算数，微小的进步终会累积成巨大成功。',
        '努力从来不会白费，你所付出的，都在未来等着你。',
        '不用害怕慢一点，只要方向对了，终点一定会到达。',
        '你已经走了这么远，别放弃，最好的风景就在前方。',
        '相信自己，每一次挑战都是变得更强的机会。',
        '不完美又怎样？你勇敢尝试的样子，比完美更迷人。',
        '只要开始行动，困难就已经输了一半。',
        '愿你熬过所有的不安，迎来属于自己的高光时刻。',
        '今天的你，已经比昨天更加优秀了，再加油一点点！'
      ],
      trashResumes: [
        // 回收站数据模拟
        {
          id: 'trash-1',
          imageUrl: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview/template-general3.png',
          name: '已删除简历',
          date: '2023-05-20'
        }
      ]
    }
  },
  setup() {
    const toast = useToast()
    return { toast }
  },
  computed: {
    username() {
      return AuthService.getUserContact()
    }
  },
  mounted() {
    this.fetchResumes()
    this.updateDateTime()
    this.updateFortune()
    this.updateTip()
  },
  methods: {
    async fetchResumes() {
      try {
        this.loading = true
        const response = await apiClient.get('/user/resumes')
        if (response.data.code === 20002) {
          this.resumes = response.data.data
        }
      } catch (error) {
        console.error('获取简历列表失败:', error)
        this.toast.error('获取简历列表失败')
      } finally {
        this.loading = false
      }
    },

    getResumeImage(resume) {
      if (resume.screenshotUrl) {
        return resume.screenshotUrl
      }
      
      // 根据模板类型返回不同的默认图片
      if (resume.templateType === 'default') {
        return 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview/template-general1.png'
      } else if (resume.templateType === 'general_simple') {
        return 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview/template-general2.png'
      } else {
        return 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview/template-general3.png'
      }
    },

    async deleteResume(resumeId) {
      if (!confirm('确定要删除这个简历吗？')) return

      try {
        await apiClient.delete(`/user/resumes/${resumeId}`)
        // 将删除的简历从列表中移除
        const deletedResume = this.resumes.find(r => r.resumeId === resumeId)
        if (deletedResume) {
          // 模拟添加到回收站
          this.trashResumes.unshift({
            id: deletedResume.resumeId,
            imageUrl: this.getResumeImage(deletedResume),
            name: deletedResume.name,
            date: new Date().toLocaleDateString()
          })
        }
        this.resumes = this.resumes.filter(r => r.resumeId !== resumeId)
        this.toast.success('删除成功')
      } catch (error) {
        console.error('删除失败:', error)
        this.toast.error('删除失败')
      }
    },

    formatDate(isoString) {
      return new Date(isoString).toLocaleDateString()
    },

    openResume(resume) {
      this.$router.push({
        name: 'CreateResume',
        params: {
          templateType: resume.templateType,
          resumeId: resume.resumeId,
          color: resume.color
        }
      })
    },

    createResume() {
      this.$router.push({
        name: 'TemplateSelection',
        params: { selectionType: 'create_resume' }
      })
    },

    // 回收站功能 - 这些是模拟功能
    restoreResume(resumeId) {
      const resumeIndex = this.trashResumes.findIndex(r => r.id === resumeId)
      if (resumeIndex !== -1) {
        this.trashResumes.splice(resumeIndex, 1)
        this.toast.success('已恢复简历')
        this.fetchResumes() // 重新获取简历列表
      }
    },

    permanentDelete(resumeId) {
      if (!confirm('确定要永久删除这个简历吗？此操作无法撤销')) return
      
      const resumeIndex = this.trashResumes.findIndex(r => r.id === resumeId)
      if (resumeIndex !== -1) {
        this.trashResumes.splice(resumeIndex, 1)
        this.toast.success('已永久删除简历')
      }
    },

    emptyTrash() {
      if (!confirm('确定要清空回收站吗？此操作无法撤销')) return
      
      this.trashResumes = []
      this.toast.success('回收站已清空')
    },

    updateDateTime() {
      const now = new Date()
      const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      
      this.currentMonth = months[now.getMonth()]
      this.currentDay = now.getDate()
      this.currentWeekday = weekdays[now.getDay()]
      // 这里需要添加农历转换的逻辑，暂时使用占位符
      this.currentLunar = '农历正月初一'
    },
    updateFortune() {
      const randomIndex = Math.floor(Math.random() * this.fortunes.length)
      this.currentFortune = this.fortunes[randomIndex]
    },
    updateTip() {
      const randomIndex = Math.floor(Math.random() * this.tips.length)
      this.currentTip = this.tips[randomIndex]
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
  flex-direction: row; /* 明确设置为行布局 */
  overflow: hidden; /* 防止溢出 */
}

.home-logged-left {
  height: 100vh;
  width: calc(65vw - 40px);
  transition: width 0.3s ease; /* 添加过渡效果 */
}

.home-logged-right {
  display: flex;
  flex-direction: column;
  width: 35vw;
  transition: width 0.3s ease; /* 添加过渡效果 */
}

.home-logged-right-top {
  height: 30vh;
  width: 100%;
}

.home-logged-right-bottom {
  height: 70vh;
  width: 100%;
}

.home-card-left {
  background-color: white;
  height: calc(100% - 80px);
  width: calc(100% - 80px);
  margin-top: 40px;
  margin-left: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.home-card-right-top {
  background-color: white;
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  margin-top: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  gap: 20px;
}

.home-card-right-bottom {
  background-color: white;
  height: calc(100% - 80px);
  width: calc(100% - 40px);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-top: 40px;
}

.home-card-right-bottom-img {
  width: 100%;
  height: 100%;
  object-fit: fit;
}

/* 顶部按钮容器 */
.home-card-left-top-buttons-container {
  padding: 0 20px;
  width: calc(100% - 40px);
  height: 100px;
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 按钮样式美化 */
.btn {
  padding: 12px 18px;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn-white {
  background-color: white;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

.btn-white:hover {
  background-color: var(--color-secondary);
}

.btn-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

/* 为白色按钮的图标添加主题色 */
.btn-white .btn-icon {
  filter: invert(58%) sepia(19%) saturate(1155%) hue-rotate(333deg) brightness(92%) contrast(84%);
}

/* 改进的标签页样式 */
.resume-tabs {
  display: flex;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  background-color: #fff;
}

.resume-tab {
  padding: 18px 24px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  color: #666;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.resume-tab:hover {
  color: var(--color-primary);
}

.tab-icon {
  margin-right: 8px;
  font-size: 18px;
}

.resume-count {
  margin-left: 8px;
  background-color: #f0f0f0;
  color: #666;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  min-width: 16px;
  text-align: center;
}

.resume-tab.active {
  color: var(--color-primary);
  font-weight: 600;
}

.resume-tab.active .resume-count {
  background-color: var(--color-primary);
  color: white;
}

.resume-tab.active:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--color-primary);
}

/* 内容区域样式 */
.resume-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.resume-view {
  padding: 24px;
}

.resume-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.resume-section-title {
  margin: 0;
  font-size: 22px;
  color: #333;
  font-weight: 600;
}

.resume-actions-top {
  display: flex;
  align-items: center;
  gap: 16px;
}

.view-toggle {
  display: flex;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 2px;
}

.btn-icon-import {
  position: relative;
  scale: 1.3;
}

.btn-icon-interview {
  position: relative;
  scale: 1.1;
}

.view-btn {
  border: none;
  background: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  color: #888;
}

.view-btn.active {
  background-color: white;
  color: var(--color-primary);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #888;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state h3 {
  margin: 0 0 8px;
  color: #555;
  font-weight: 600;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

/* 清空回收站按钮 */
.empty-trash-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.empty-trash-btn:hover {
  background-color: #d32f2f;
}

/* 简历网格样式优化 */
.resume-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* 添加响应式布局媒体查询 */
@media (max-width: 1200px) {
  .home-logged {
    flex-direction: column;
    overflow-y: auto;
    height: auto;
  }
  
  .home-logged-left,
  .home-logged-right {
    width: calc(100vw - 80px);
    height: auto;
  }
  
  .home-card-left {
    margin-right: 40px;
    height: auto;
    min-height: 600px;
  }
  
  .home-card-right-top,
  .home-card-right-bottom {
    width: calc(100% - 80px);
    margin-left: 40px;
   }
  
  .home-card-right-top {
    height: 400px;
    margin-top: 40px;
  }
  
  .home-logged-right-top {
    height: auto;
  }
  
  .home-logged-right-bottom {
    height: auto;
  }
  
  .home-card-right-bottom {
    margin-bottom: 40px;
    min-height: 300px;
  }
}

@media (max-width: 768px) {
  .home-logged {
    margin-left: 0;
    margin-top: 0;
  }
  
  .home-logged-left,
  .home-logged-right {
    width: 100vw;
  }
  
  .home-card-left,
  .home-card-right-top,
  .home-card-right-bottom {
    width: calc(100% - 40px);
    margin-left: 20px;
    margin-right: 20px;
  }
  
  .home-card-left-top-buttons-container {
    flex-wrap: wrap;
    height: auto;
    padding: 20px;
  }
  
  .btn {
    min-width: calc(50% - 10px);
    margin-bottom: 10px;
  }
  
  .resume-grid {
    grid-template-columns: 1fr;
  }
}

/* 简历网格布局的优化 */
.resume-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  gap: 20px;
}

/* 优化悬停操作按钮在触摸设备上的显示 */
@media (hover: none) {
  .resume-hover-actions {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  .resume-action-icon {
    width: 36px;
    height: 36px;
  }
}

/* 简历卡片样式 */
.resume-item {
  border-radius: 14px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

.resume-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

.resume-preview {
  width: 100%;
  aspect-ratio: 0.7071;  /* A4纸张比例 */
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
}

.resume-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 改为 contain 确保图片完整显示 */
  transition: transform 0.3s ease;
}

.resume-pic {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 确保不裁剪图片 */
  background-color: #f5f5f5;
}

.resume-item:hover .resume-preview img {
  transform: scale(1.05);
}

/* 悬停操作按钮 */
.resume-hover-actions {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.resume-item:hover .resume-hover-actions {
  opacity: 1;
}

.resume-action-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.resume-action-icon.edit {
  background-color: var(--color-primary);
}

.resume-action-icon.delete {
  background-color: #f44336;
}

.resume-action-icon:hover {
  transform: scale(1.1);
}

.resume-info {
  padding: 16px;
}

.resume-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.resume-date {
  font-size: 12px;
  color: #888;
}

/* 已删除简历样式 */
.resume-item.deleted {
  opacity: 0.9;
  cursor: default;
}

.resume-deleted-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(244, 67, 54, 0.9);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

/* 简历操作按钮 */
.resume-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.resume-restore-btn, .resume-delete-btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.resume-restore-btn {
  background-color: var(--color-primary);
  color: white;
  flex: 1;
}

.resume-restore-btn:hover {
  background-color: var(--color-primary-hover);
}

.resume-delete-btn {
  background-color: #f44336;
  color: white;
  flex: 1;
}

.resume-delete-btn:hover {
  background-color: #d32f2f;
}

/* 右侧卡片内容 */
.premium-banner {
  background: linear-gradient(135deg, var(--color-primary) 0%, #a85a3b 100%);
  color: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.premium-banner h2 {
  margin: 0 0 12px;
  font-size: 24px;
}

.premium-banner p {
  margin: 0 0 24px;
  opacity: 0.9;
}

.premium-btn {
  background-color: white;
  color: var(--color-primary);
  border: none;
  padding: 10px 24px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.premium-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.recent-activity {
  margin: 20px;
  height: 100%;
}

.recent-activity h3 {
  margin-top: 0;
  color: #333;
  font-size: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.activity-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #888;
  font-size: 14px;
}

/* 优化顶部按钮区域的响应式布局 */
@media (max-width: 576px) {
  .home-card-left-top-buttons-container {
    gap: 10px;
  }
  
  .btn {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
  
  .btn-icon {
    width: 16px;
    height: 16px;
  }
  
  .resume-tabs {
    padding: 0 10px;
  }
  
  .resume-tab {
    padding: 14px 16px;
    font-size: 14px;
  }
  
  .resume-view {
    padding: 16px;
  }
  
  .resume-section-title {
    font-size: 18px;
  }

  .resume-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 5px;
  }

  .resume-name {
    font-size: 10px;
  }

  .resume-date {
    font-size: 8px;
  }
}

.date-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #eee;
  padding-right: 20px;
  min-width: 200px;
}

.month {
  font-size: 24px;
  font-weight: 500;
  color: #666;
  margin-bottom: 8px;
}

.day {
  font-size: 48px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.weekday {
  font-size: 16px;
  color: #666;
  margin-bottom: 4px;
}

.lunar {
  font-size: 14px;
  color: #999;
}

.content-section {
  flex: 2;
  position: relative;
}

.fortune-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  height: 100%;
}

.fortune-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fortune-label {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  min-width: 40px;
  text-align: center;
}

.fortune-label-avoid {
  background-color: var(--color-primary);
}

.fortune-label-suitable {
  background-color: #333;
}

.fortune-content {
  font-size: 16px;
  color: #333;
}

.tips-button {
  margin-top: 20px;
  padding: 12px 24px;
  background-color: var(--color-primary);
  margin-right: 50px;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tips-button:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
}

.tips-section {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  height: 100%;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: #f5f5f5;
  transform: translateX(-2px);
}

.tips-content {
  font-size: 18px;
  color: #333;
  line-height: 1.6;
  max-width: 90%;
  margin: 0 auto;
  padding-top: 40px;
}

@media (max-width: 768px) {
  .home-card-right-top {
    flex-direction: column;
    padding: 15px;
  }

  .date-section {
    border-right: none;
    border-bottom: 1px solid #eee;
    padding-right: 0;
    padding-bottom: 15px;
    margin-bottom: 15px;
    min-width: 100%;
  }

  .content-section {
    width: 100%;
  }

  .back-button {
    top: 15px;
    left: 15px;
    padding: 6px 12px;
  }

  .tips-content {
    font-size: 16px;
    max-width: 90%;
    padding-top: 35px;
  }
}

</style>
