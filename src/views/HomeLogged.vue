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
            <!-- <div class="resume-header">
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
            </div> -->

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
                <div class="resume-header-info">
                  <div class="resume-edit-time">最后编辑时间：{{ formatDate(resume.updatedAt || resume.createdAt) }}</div>
                  <div class="resume-actions-dropdown">
                    <div class="resume-dropdown-trigger" @click.stop="toggleDropdown(resume.resumeId)">
                      <i class="fas fa-ellipsis-h"></i>
                    </div>
                    <div class="resume-dropdown-menu" v-if="resume.showDropdown">
                      <div class="resume-dropdown-item" @click.stop="downloadResume(resume)">
                        <i class="fas fa-download"></i> 下载简历
                      </div>
                      <div class="resume-dropdown-item resume-dropdown-item-delete" @click.stop="deleteResume(resume.resumeId)">
                        <i class="fas fa-trash"></i> 删除简历
                      </div>
                      <div class="resume-dropdown-item" @click.stop="renameResume(resume)">
                        <i class="fas fa-edit"></i> 修改名称
                      </div>
                    </div>
                  </div>
                </div>
                <div class="resume-preview">
                  <img class="resume-pic" :src="getResumeImage(resume)" alt="简历预览">
                </div>
                <div class="resume-pic-after"></div>
                <div class="resume-info">
                  <div class="resume-name">{{ resume.name }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 回收站标签页内容 -->
          <div v-if="activeTab === 'trash'" class="resume-view">
            <div v-if="trashResumes.length === 0" class="empty-state">
              <div class="empty-icon">🗑️</div>
              <h3>回收站为空</h3>
              <p>已删除的简历将会显示在这里</p>
            </div>
            
            <div v-else class="resume-grid">
              <div class="resume-item" v-for="resume in trashResumes" :key="resume.resumeId">
                <div class="resume-header-info">
                  <div class="resume-edit-time">最后编辑时间：{{ formatDate(resume.updatedAt || resume.createdAt) }}</div>
                  <div class="resume-actions-dropdown">
                    <div class="resume-dropdown-trigger" @click.stop="toggleTrashDropdown(resume.resumeId)">
                      <i class="fas fa-ellipsis-h"></i>
                    </div>
                    <div class="resume-dropdown-menu" v-if="resume.showDropdown">
                      <div class="resume-dropdown-item" @click.stop="restoreResume(resume.resumeId)">
                        <i class="fas fa-undo"></i> 恢复简历
                      </div>
                      <div class="resume-dropdown-item resume-dropdown-item-delete" @click.stop="permanentDelete(resume.resumeId)">
                        <i class="fas fa-trash"></i> 彻底删除
                      </div>
                    </div>
                  </div>
                </div>
                <div class="resume-preview">
                  <img class="resume-pic" :src="getResumeImage(resume)" alt="简历预览">
                </div>
                <div class="resume-pic-after"></div>
                <div class="resume-info">
                  <div class="resume-name">{{ resume.name }}</div>
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
                <span class="fortune-label fortune-label-suitable">宜</span>
                <span class="fortune-content">{{ currentFortune.suitable }}</span>
              </div>
              <div class="fortune-item">
                <span class="fortune-label fortune-label-avoid">忌</span>
                <span class="fortune-content">{{ currentFortune.avoid }}</span>
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
        { avoid: '懒惰拖延，自我否定', suitable: '保持专注，高效执行' },
        { avoid: '焦虑不安，过度比较', suitable: '自信微笑，主动沟通' },
        { avoid: '抱怨环境，畏惧挑战', suitable: '目标明确，积极复盘' },
        { avoid: '犹豫退缩，借口敷衍', suitable: '展现优势，灵活应变' },
        { avoid: '消极对待，急功近利', suitable: '坚持到底，乐观心态' },
        { avoid: '敷衍准备，紧张焦虑', suitable: '注重细节，正向思考' },
        { avoid: '迷失方向，情绪失控', suitable: '学习知识，提升技能' },
        { avoid: '草率应对，过度依赖', suitable: '保持冷静，思路清晰' },
        { avoid: '自我设限，放弃尝试', suitable: '主动争取，谦逊待人' },
        { avoid: '忽视反馈，封闭内心', suitable: '学习新知，积累经验' },
        { avoid: '过度敏感，否定自我', suitable: '提前规划，充分准备' },
        { avoid: '患得患失，瞻前顾后', suitable: '展现热情，把握机会' },
        { avoid: '消极对比，执意攀比', suitable: '耐心倾听，冷静应对' },
        { avoid: '回避问题，推卸责任', suitable: '逻辑清晰，表达流畅' },
        { avoid: '思维固化，拒绝改变', suitable: '调整节奏，从容不迫' },
        { avoid: '过度完美，苛求细节', suitable: '分析需求，精准匹配' },
        { avoid: '急于求成，忽略积累', suitable: '拓展人脉，扩大视野' },
        { avoid: '言行不一，缺乏行动', suitable: '保持愉悦，精力充沛' },
        { avoid: '过度焦急，丧失耐心', suitable: '复盘总结，优化策略' },
        { avoid: '沉迷幻想，脱离实际', suitable: '突破局限，挑战自我' },
        { avoid: '逃避沟通，封闭自我', suitable: '强化优势，补齐短板' },
        { avoid: '过度消耗，透支精力', suitable: '保持真诚，赢得信任' },
        { avoid: '盲目自信，轻视面试', suitable: '把握时机，果断行动' },
        { avoid: '忽视仪表，随意邋遢', suitable: '模仿榜样，借鉴经验' },
        { avoid: '过度紧张，动作僵硬', suitable: '关注行业，紧跟趋势' },
        { avoid: '被动等待，错失良机', suitable: '强化抗压，稳定心态' },
        { avoid: '过度解读，徒增压力', suitable: '重视礼仪，塑造形象' },
        { avoid: '情绪波动，影响判断', suitable: '设定节点，逐步推进' },
        { avoid: '盲目妥协，丧失立场', suitable: '保持专注，主动沟通' },
        { avoid: '负面暗示，削弱动力', suitable: '保持好奇，探索可能' },
        { avoid: '过度倾诉，暴露弱点', suitable: '细化目标，拆分步骤' },
        { avoid: '纠结过去，忽略当下', suitable: '保持热情，感染他人' },
        { avoid: '过度依赖，丧失主动', suitable: '理性评估，避免冲动' },
        { avoid: '消极语言，打击士气', suitable: '强化执行，拒绝空想' },
        { avoid: '过度承诺，难以兑现', suitable: '保持独立，适度求助' },
        { avoid: '忽视规划，杂乱无章', suitable: '专注当下，减少杂念' },
        { avoid: '否定自我，丧失兴趣', suitable: '平衡心态，避免焦虑' },
        { avoid: '过度防备，难以合作', suitable: '保持开放，接纳反馈' },
        { avoid: '放大困难，丧失勇气', suitable: '强化自信，减少犹豫' },
        { avoid: '忽视细节，漏洞频出', suitable: '保持韧性，持续精进' },
        { avoid: '盲目忙碌，缺乏方向', suitable: '量化成果，增强说服' },
        { avoid: '过度保守，错失创新', suitable: '保持自律，规律作息' },
        { avoid: '消极标签，固化认知', suitable: '强化行动，减少内耗' },
        { avoid: '忽视健康，透支身体', suitable: '保持活力，传递能量' },
        { avoid: '过度内卷，丧失平衡', suitable: '强化专业，凸显价值' },
        { avoid: '盲目模仿，失去特色', suitable: '保持敏锐，捕捉机遇' },
        { avoid: '过度迎合，迷失自我', suitable: '强化责任，赢得认可' },
        { avoid: '忽视复盘，重复错误', suitable: '保持谦逊，持续成长' },
        { avoid: '消极预期，提前退缩', suitable: '强化创新，避免僵化' },
        { avoid: '放弃学习，停滞成长', suitable: '保持勇气，珍惜机会' }
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
      trashResumes: [],
      renamingResume: null, // 正在重命名的简历
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
          // 为每个简历添加showDropdown属性
          this.resumes = response.data.data.map(resume => ({
            ...resume,
            showDropdown: false
          }))
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
          // 添加到回收站
          this.trashResumes.unshift({
            ...deletedResume,
            showDropdown: false
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

    // 回收站功能
    restoreResume(resumeId) {
      const resumeIndex = this.trashResumes.findIndex(r => r.resumeId === resumeId)
      if (resumeIndex !== -1) {
        const restoredResume = this.trashResumes[resumeIndex]
        // 移除showDropdown属性，防止界面显示问题
        restoredResume.showDropdown = false
        // 添加到简历列表
        this.resumes.unshift(restoredResume)
        // 从回收站移除
        this.trashResumes.splice(resumeIndex, 1)
        this.toast.success('已恢复简历')
      }
    },

    permanentDelete(resumeId) {
      if (!confirm('确定要永久删除这个简历吗？此操作无法撤销')) return
      
      const resumeIndex = this.trashResumes.findIndex(r => r.resumeId === resumeId)
      if (resumeIndex !== -1) {
        this.trashResumes.splice(resumeIndex, 1)
        this.toast.success('已永久删除简历')
      }
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
    },
    toggleDropdown(resumeId) {
      // 关闭其他所有下拉菜单
      this.resumes.forEach(resume => {
        if (resume.resumeId !== resumeId) {
          resume.showDropdown = false
        }
      })
      
      // 切换当前简历的下拉菜单状态
      const resume = this.resumes.find(r => r.resumeId === resumeId)
      if (resume) {
        resume.showDropdown = !resume.showDropdown
      }
      
      // 点击其他地方关闭下拉菜单
      document.addEventListener('click', this.closeAllDropdowns, { once: true })
    },
    toggleTrashDropdown(resumeId) {
      // 关闭其他所有下拉菜单
      this.trashResumes.forEach(resume => {
        if (resume.resumeId !== resumeId) {
          resume.showDropdown = false
        }
      })
      
      // 切换当前简历的下拉菜单状态
      const resume = this.trashResumes.find(r => r.resumeId === resumeId)
      if (resume) {
        resume.showDropdown = !resume.showDropdown
      }
      
      // 点击其他地方关闭下拉菜单
      document.addEventListener('click', this.closeAllTrashDropdowns, { once: true })
    },
    closeAllDropdowns() {
      this.resumes.forEach(resume => {
        resume.showDropdown = false
      })
    },
    closeAllTrashDropdowns() {
      this.trashResumes.forEach(resume => {
        resume.showDropdown = false
      })
    },
    downloadResume(resume) {
      try {
        // 使用简历的截图链接
        const imageUrl = resume.screenshotUrl || this.getResumeImage(resume)
        
        // 创建一个临时链接
        const a = document.createElement('a')
        a.href = imageUrl
        a.download = `${resume.name || '简历'}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        
        this.toast.success('简历下载中')
      } catch (error) {
        console.error('下载失败:', error)
        this.toast.error('下载失败，请重试')
      }
    },
    renameResume(resume) {
      const newName = prompt('请输入新的简历名称', resume.name)
      
      if (newName && newName !== resume.name) {
        // 这里应当调用API更新简历名称
        // 示例: apiClient.put(`/user/resumes/${resume.resumeId}`, { name: newName })
        // 然后刷新简历列表
        
        // 模拟更新
        resume.name = newName
        this.toast.success('名称已更新')
      }
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
  width: calc(100vw - 500px - 40px);
  transition: width 0.3s ease; /* 添加过渡效果 */
}

.home-logged-right {
  display: flex;
  flex-direction: column;
  width: 500px;
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
  background-color: var(--color-left-header-background);
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

.resume-info {
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}

.resume-pic-after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background-color: #00000033;
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
  margin-top: 80px;
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

/* 简历网格布局的优化 */
.resume-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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

/* 优化悬停操作按钮在触摸设备上的显示 */
@media (hover: none) {
  .resume-header-info {
    padding: 6px 10px;
  }
  
  .resume-edit-time {
    font-size: 10px;
    max-width: 60%;
  }
  
  .resume-dropdown-trigger {
    width: 24px;
    height: 24px;
  }
  
  .resume-dropdown-menu {
    width: 130px;
  }
  
  .resume-dropdown-item {
    padding: 10px 12px;
    font-size: 12px;
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

/* 新增的简历头部信息区域 */
.resume-header-info {
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  font-family: var(--font-family);
}

.resume-edit-time {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.resume-actions-dropdown {
  position: relative;
}

.resume-dropdown-trigger {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.resume-dropdown-trigger:hover {
  background-color: #f5f5f5;
}

.resume-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 110px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  margin-top: 5px;
}

.resume-dropdown-item {
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s ease;
  cursor: pointer;
}

.resume-dropdown-item:hover {
  background-color: #f5f5f5;
}

/* 删除原来的悬停操作区域 */
.resume-hover-actions {
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
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
  border-right: 1px solid black;
  min-width: 170px;
}

.month {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-black);
  font-family: Georgia, serif;
}

.day {
  font-size: 70px;
  font-weight: bold;
  color: var(--color-black);
  font-family: Times New Roman, serif;
}

.weekday {
  font-size: 16px;
  font-weight: bold;
  color: var(--color-black);
  margin-bottom: 4px;
}

.lunar {
  font-size: 14px;
  color: var(--color-black);
}

.content-section {
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: center;
}

.fortune-section {
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
}

.fortune-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fortune-label {
  padding: 10px 0px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  min-width: 40px;
  text-align: center;
}

.fortune-label-avoid {
   background-color: #333;
}

.fortune-label-suitable {
  background-color: var(--color-primary);
}

.fortune-content {
  font-size: 16px;
  color: #333;
}

.tips-button {
  padding: 8px 24px;
  margin-top: 10px;
  background-color: var(--color-primary);
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
  justify-content: center;
  height: 100%;
  background-color: var(--color-primary);
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
