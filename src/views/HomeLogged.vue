<template>
  <div class="home-logged">
    <div class="home-logged-left">
      <div class="home-card-left">
        <div class="home-card-left-top-buttons-container">
          <button class="btn btn-primary" @click="createResume">
            <img
              src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/add.svg"
              alt="icon"
              class="btn-icon"
            />
            <span>新建简历</span>
          </button>

          <!-- 修改：导入简历按钮，点击后显示导入弹窗 -->
          <button class="btn btn-white" @click="importModalVisible = true">
            <img
              src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/import.png"
              alt="icon"
              class="btn-icon btn-icon-import"
            />
            <span>导入简历</span>
          </button>

          <button class="btn btn-white">
            <img
              src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/model.png"
              alt="icon"
              class="btn-icon btn-icon-model"
            />
            <span>简历模版</span>
          </button>
          <button class="btn btn-white">
            <img
              src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/interview.png"
              alt="icon"
              class="btn-icon btn-icon-interview"
            />
            <span>模拟面试</span>
          </button>
        </div>

        <!-- 改进的标签页导航 -->
        <div class="resume-tabs">
          <div
            class="resume-tab"
            :class="{ active: activeTab === 'myResumes' }"
            @click="activeTab = 'myResumes'"
          >
            <span class="tab-icon">
              <i class="fas fa-file-alt"></i>
            </span>
            我的简历
            <span class="resume-count" v-if="resumes.length > 0"
              >{{ resumes.length }}</span
            >
          </div>
          <div
            class="resume-tab"
            :class="{ active: activeTab === 'trash' }"
            @click="activeTab = 'trash'"
          >
            <span class="tab-icon">
              <i class="fas fa-trash-alt"></i>
            </span>
            回收站
            <span class="resume-count" v-if="trashResumes.length > 0"
              >{{ trashResumes.length }}</span
            >
          </div>
        </div>

        <!-- 简历内容区域 -->
        <div class="resume-content">
          <!-- 我的简历标签页内容 -->
          <div v-if="activeTab === 'myResumes'" class="resume-view">
            <div v-if="loading" class="empty-state">
              <l-waveform
                size="60"
                stroke="3.5"
                speed="1"
                color="var(--color-primary)"
              ></l-waveform>
            </div>
            <div v-else-if="resumes.length === 0" class="empty-state">
              <div class="empty-icon">📄</div>
              <h3>暂无简历</h3>
              <p>点击"新建简历"开始创建您的第一份简历</p>
            </div>

            <div v-else>
              <div class="batch-toggle" v-if="!batchMode">
                <button class="btn btn-white" @click="startBatchDelete">批量删除</button>
              </div>
              <div class="batch-actions" v-if="batchMode">
                <button class="btn btn-primary" @click="confirmBatchDelete">确认删除</button>
                <button class="btn btn-white" @click="cancelBatchDelete">取消</button>
              </div>
              <div class="resume-grid">
              <div
                class="resume-item"
                v-for="resume in resumes"
                :key="resume.resumeId"
                @click="openResume(resume)"
              >
                <input type="checkbox" v-if="batchMode" v-model="selectedResumes" :value="resume.resumeId" @click.stop class="batch-checkbox" />
                <div class="resume-header-info">
                  <div class="resume-edit-time">
                    最后编辑时间：
                    {{ formatDate(resume.updatedAt || resume.createdAt) }}
                  </div>
                  <div class="resume-actions-dropdown">
                    <div
                      class="resume-dropdown-trigger"
                      @click.stop="toggleDropdown(resume.resumeId)"
                    >
                      <i class="fas fa-ellipsis-h"></i>
                    </div>
                    <div
                      class="resume-dropdown-menu"
                      v-if="resume.showDropdown"
                    >
                      <div
                        class="resume-dropdown-item"
                        @click.stop="downloadResume(resume)"
                        :class="{ disabled: resume.isDownloading }"
                      >
                        <i
                          v-if="!resume.isDownloading"
                          class="fas fa-download"
                        ></i>
                        <i
                          v-else
                          class="fas fa-spinner fa-spin"
                        ></i>
                        {{ resume.isDownloading ? '下载中...' : '下载简历' }}
                      </div>
                      <div
                        class="resume-dropdown-item resume-dropdown-item-delete"
                        @click.stop="deleteResume(resume.resumeId)"
                      >
                        <i class="fas fa-trash"></i> 删除简历
                      </div>
                      <div
                        class="resume-dropdown-item"
                        @click.stop="renameResume(resume)"
                      >
                        <i class="fas fa-edit"></i> 修改名称
                      </div>
                    </div>
                  </div>
                </div>
                <div class="resume-preview">
                  <img
                    class="resume-pic"
                    :src="getResumeImage(resume)"
                    alt="简历预览"
                  />
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

            <div v-else>
              <div class="batch-toggle" v-if="!batchMode">
                <button class="btn btn-white" @click="startBatchDelete">批量删除</button>
              </div>
              <div class="batch-actions" v-if="batchMode">
                <button class="btn btn-primary" @click="confirmBatchDelete">确认删除</button>
                <button class="btn btn-white" @click="cancelBatchDelete">取消</button>
              </div>
              <div class="resume-grid">
              <div
                class="resume-item"
                v-for="resume in trashResumes"
                :key="resume.resumeId"
              >
                <input type="checkbox" v-if="batchMode" v-model="selectedTrashResumes" :value="resume.resumeId" @click.stop class="batch-checkbox" />
                <div class="resume-header-info">
                  <div class="resume-edit-time">
                    最后编辑时间：
                    {{ formatDate(resume.updatedAt || resume.createdAt) }}
                  </div>
                  <div class="resume-actions-dropdown">
                    <div
                      class="resume-dropdown-trigger"
                      @click.stop="toggleTrashDropdown(resume.resumeId)"
                    >
                      <i class="fas fa-ellipsis-h"></i>
                    </div>
                    <div
                      class="resume-dropdown-menu"
                      v-if="resume.showDropdown"
                    >
                      <div
                        class="resume-dropdown-item"
                        @click.stop="restoreResume(resume.resumeId)"
                      >
                        <i class="fas fa-undo"></i> 恢复简历
                      </div>
                      <div
                        class="resume-dropdown-item resume-dropdown-item-delete"
                        @click.stop="permanentDelete(resume.resumeId)"
                      >
                        <i class="fas fa-trash"></i> 彻底删除
                      </div>
                    </div>
                  </div>
                </div>
                <div class="resume-preview">
                  <img
                    class="resume-pic"
                    :src="getResumeImage(resume)"
                    alt="简历预览"
                  />
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
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="tips-content-title">
                <i class="fas fa-lightbulb"></i>
                今日求职 Tips
              </div>
              <div class="tips-content">{{ currentTip }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="home-logged-right-bottom">
        <div class="home-card-right-bottom">
          <img
            class="home-card-right-bottom-bg"
            src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/images/1d84bbe5-3be3-4bc8-9839-260c5820f92a.png"
            alt="活动图标"
          />
          <img
            class="home-card-right-bottom-qrcode"
            src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/images/23a6e556-b967-4f79-bab3-5d292592dfce.png"
            alt="活动图标"
          />
          <img
            class="home-card-right-bottom-logo"
            src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/logo1.png"
            alt="活动图标"
          />
        </div>
      </div>
    </div>

    <!-- 新增：导入简历弹窗组件 -->
    <ImportResumeModal
      v-if="importModalVisible"
      @close="importModalVisible = false"
      @confirmImport="handleImportFiles"
    />
  </div>
</template>

<script>
import AuthService from '@/utils/auth'
import apiClient from '@/api/axios'
import { waveform } from 'ldrs'
import { useToast } from 'vue-toastification'
import { Solar } from 'lunar-javascript'

// ====== 新增：导入简历弹窗组件 ======
import ImportResumeModal from '@/components/ImportResumeModal.vue'

waveform.register()

export default {
  name: 'HomeLogged',
  components: {
    ImportResumeModal
  },
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
        // ... 省略其他示例数据 ...
        { avoid: '放弃学习，停滞成长', suitable: '保持勇气，珍惜机会' }
      ],
      tips: [
        '简历排版简洁清晰，关键信息一目了然，模块化设计展示核心能力！',
        '“摸鱼式投简历”：早上6-8点网速快，HR上班立刻看！',
        // ... 省略其他示例数据 ...
        '保持勇气，珍惜机会'
      ],
      trashResumes: [],
      batchMode: false,
      selectedResumes: [],
      selectedTrashResumes: [],
      renamingResume: null, // 正在重命名的简历

      // ===== 新增：导入弹窗控制
      importModalVisible: false
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
        const [activeRes, trashRes] = await Promise.all([
          apiClient.get('/user/resumes'),
          apiClient.get('/user/resumes', { params: { trash: true } })
        ])

        if (activeRes.data.code === 20002) {
          this.resumes = activeRes.data.data.map((resume) => ({
            ...resume,
            showDropdown: false,
            isDownloading: false
          }))
        }

        if (trashRes.data.code === 20002) {
          this.trashResumes = trashRes.data.data.map((resume) => ({
            ...resume,
            showDropdown: false,
            isDownloading: false
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
        await apiClient.post(`/user/resumes/${resumeId}/recycle`)
        this.toast.success('已移入回收站')
        this.fetchResumes()
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
    async restoreResume(resumeId) {
      try {
        await apiClient.post(`/user/resumes/${resumeId}/restore`)
        this.toast.success('已恢复简历')
        this.fetchResumes()
      } catch (error) {
        console.error('恢复失败:', error)
        this.toast.error('恢复失败')
      }
    },

    async permanentDelete(resumeId) {
      if (!confirm('确定要永久删除这个简历吗？此操作无法撤销')) return

      try {
        await apiClient.delete(`/user/resumes/${resumeId}`)
        this.toast.success('已永久删除简历')
        this.fetchResumes()
      } catch (error) {
        console.error('删除失败:', error)
        this.toast.error('删除失败')
      }
    },

    updateDateTime() {
      const now = new Date()
      const months = [
        'JANUARY',
        'FEBRUARY',
        'MARCH',
        'APRIL',
        'MAY',
        'JUNE',
        'JULY',
        'AUGUST',
        'SEPTEMBER',
        'OCTOBER',
        'NOVEMBER',
        'DECEMBER'
      ]
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

      this.currentMonth = months[now.getMonth()]
      this.currentDay = now.getDate()
      this.currentWeekday = weekdays[now.getDay()]

      // 这里使用 lunar-javascript 来获取农历日期
      const solar = Solar.fromDate(now)
      const lunar = solar.getLunar()
      this.currentLunar = `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`
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
      this.resumes.forEach((resume) => {
        if (resume.resumeId !== resumeId) {
          resume.showDropdown = false
        }
      })

      // 切换当前简历的下拉菜单状态
      const resume = this.resumes.find((r) => r.resumeId === resumeId)
      if (resume) {
        resume.showDropdown = !resume.showDropdown
      }

      // 点击其他地方关闭下拉菜单
      document.addEventListener('click', this.closeAllDropdowns, { once: true })
    },
    toggleTrashDropdown(resumeId) {
      // 关闭其他所有下拉菜单
      this.trashResumes.forEach((resume) => {
        if (resume.resumeId !== resumeId) {
          resume.showDropdown = false
        }
      })

      // 切换当前简历的下拉菜单状态
      const resume = this.trashResumes.find((r) => r.resumeId === resumeId)
      if (resume) {
        resume.showDropdown = !resume.showDropdown
      }

      // 点击其他地方关闭下拉菜单
      document.addEventListener('click', this.closeAllTrashDropdowns, { once: true })
    },
    closeAllDropdowns() {
      this.resumes.forEach((resume) => {
        resume.showDropdown = false
      })
    },
    closeAllTrashDropdowns() {
      this.trashResumes.forEach((resume) => {
        resume.showDropdown = false
      })
    },
    async downloadResume(resume) {
      if (resume.isDownloading) return
      resume.isDownloading = true
      try {
        this.toast.success('简历下载中')
        const response = await apiClient.post('/pic/scf-screenshot', {
          resumeId: resume.resumeId,
          templateType: resume.templateType,
          color: resume.color,
        })

        if (response.data.code === 20009 && response.data.data.screenshotUrl) {
          const a = document.createElement('a')
          a.href = response.data.data.screenshotUrl
          a.download = `${resume.name || '简历'}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
         } else {
          this.toast.error('下载失败，请重试')
        }
      } catch (error) {
        console.error('下载失败:', error)
        this.toast.error('下载失败，请重试')
      } finally {
        resume.isDownloading = false
      }
    },
    renameResume(resume) {
      const newName = prompt('请输入新的简历名称', resume.name)

      if (newName && newName !== resume.name) {
        // 这里应当调用API更新简历名称
        // 示例: apiClient.put(`/user/resumes/${resume.resumeId}`, { name: newName })

        // 模拟更新
        resume.name = newName
        this.toast.success('名称已更新')
      }
    },

    startBatchDelete() {
      this.batchMode = true
      this.selectedResumes = []
      this.selectedTrashResumes = []
    },

    async confirmBatchDelete() {
      const ids = this.activeTab === 'myResumes' ? this.selectedResumes : this.selectedTrashResumes
      if (ids.length === 0) {
        this.batchMode = false
        return
      }
      try {
        if (this.activeTab === 'myResumes') {
          await apiClient.post('/user/resumes/batch/recycle', { resumeIds: ids })
        } else {
          await apiClient.delete('/user/resumes/batch', { data: { resumeIds: ids } })
        }
        this.toast.success('批量删除成功')
        this.fetchResumes()
      } catch (error) {
        console.error('批量删除失败:', error)
        this.toast.error('批量删除失败')
      } finally {
        this.batchMode = false
      }
    },

    cancelBatchDelete() {
      this.batchMode = false
      this.selectedResumes = []
      this.selectedTrashResumes = []
    },

    async handleImportFiles(file) {
      // 检查是否有文件
      if (!file) {
        this.toast.error('请选择文件')
        return
      }
      
      try {
        // 创建FormData对象并添加文件
        const formData = new FormData()
        formData.append('image', file)
        
        // 调用上传接口
        const { data } = await apiClient.post('/pic', formData, {})
        
        // 关闭弹窗
        this.importModalVisible = false
        this.toast.success('简历文件上传成功')


        this.$router.push({
        name: 'TemplateSelection',
        params: {
          selectionType: 'upload_resume',
          userUploadedResumeUrl: data.data.url
        },
      });
      } catch (error) {
        console.error('上传失败:', error)
        this.toast.error('上传失败，请重试')
      }
    }
  }
}
</script>

<style scoped>
.home-logged {
  margin-left: 60px;
  background-color: var(--color-background);
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.home-logged-left {
  height: 100vh;
  width: calc(100vw - 500px - 40px);
  transition: width 0.3s ease;
}

.home-logged-right {
  display: flex;
  flex-direction: column;
  width: 500px;
  transition: width 0.3s ease;
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
  position: relative;
  background-color: white;
  height: calc(100% - 80px);
  width: calc(100% - 40px);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-top: 40px;
}

.home-card-right-bottom-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.home-card-right-bottom-qrcode {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-49%, -50%);
  width: 53%;
  height: 53%;
  object-fit: contain;
}

.home-card-right-bottom-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10%;
  height: 10%;
  object-fit: contain;
  z-index: 100;
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
  filter: invert(58%) sepia(19%) saturate(1155%) hue-rotate(333deg)
    brightness(92%) contrast(84%);
}

/* 改进的标签页样式 */
.resume-tabs {
  display: flex;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  .resume-dropdown-item.disabled {
    cursor: not-allowed;
    color: #999;
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
  object-fit: contain;
  transition: transform 0.3s ease;
}

.resume-pic {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
.resume-dropdown-item.disabled {
  cursor: not-allowed;
  color: #999;
}

.resume-dropdown-item:hover {
  background-color: #f5f5f5;
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

.resume-restore-btn,
.resume-delete-btn {
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

/* 顶部日期与Tips区 */
.date-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  position: relative;
  left: -10px;
}

.fortune-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fortune-label {
  padding: 10px 0px;
  border-radius: 8px;
  font-size: 16px;
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
  margin-left: 10px;
}

.tips-button {
  padding: 8px 40px;
  margin-top: 10px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.tips-button:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
}

.tips-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-primary);
  position: relative;
  justify-content: center;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 2px solid #eee;
  color: white;
  background-color: transparent;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}

.fa-arrow-left {
  position: relative;
  left: 1px;
}

.tips-content-title {
  font-size: 18px;
  color: white;
  line-height: 1.6;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.tips-content {
  font-size: 16px;
  color: white;
  line-height: 1.6;
  max-width: 90%;
  margin: 0 auto;
  margin-top: 10px;
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

  .batch-toggle,
  .batch-actions {
    margin-bottom: 10px;
  }

  .batch-checkbox {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 5;
  }
}
</style>
