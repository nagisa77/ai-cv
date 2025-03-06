<!-- src/views/HomeLogged.vue -->
<template>
  <div class="logged-home">
    <div class="page-left">
      <button class="create-resume-button" @click="createResume">创建简历 🎉</button>

      <div class="resume-list-empty">
        <div class="resume-list-empty-title">最近简历</div>
        <div class="resume-list-empty-subtitle">最近简历将会在这里展示</div>
      </div>
    </div>

    <div class="page-right">
      <div class="page-right-card">
        <div class="page-ad-container">
          <div class="page-ad-title">试用AI简历菌高级版，为期30天</div>
          <button class="page-ad-button">立即试用 🔥</button>
        </div>

        <div class="options-container">
          <div class="options-item">
            <div class="options-icon options-icon-create">
              <svg class="svg-icon"
                style="width: 1.5em;height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M695.168 140.501333a42.666667 42.666667 0 0 1 60.330667 0l128 128a42.666667 42.666667 0 0 1 0 60.330667l-384 384A42.666667 42.666667 0 0 1 469.333333 725.333333H341.333333a42.666667 42.666667 0 0 1-42.666666-42.666666v-128a42.666667 42.666667 0 0 1 12.501333-30.165334l384-384zM384 572.330667V640h67.669333l341.333334-341.333333L725.333333 230.997333l-341.333333 341.333334zM128 298.666667a85.333333 85.333333 0 0 1 85.333333-85.333334h213.333334a42.666667 42.666667 0 1 1 0 85.333334H213.333333v512h512v-213.333334a42.666667 42.666667 0 1 1 85.333334 0v213.333334a85.333333 85.333333 0 0 1-85.333334 85.333333H213.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V298.666667z"
                  fill="var(--color-primary)" />
              </svg>
            </div>
            <div class="options-title">创建简历</div>
          </div>
          <div class="options-item">
            <div class="options-icon options-icon-import">
              <svg class="svg-icon"
                style="width: 2em;height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M512 85.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v451.669333l97.834666-97.834666a42.666667 42.666667 0 0 1 60.330667 60.330666l-170.666667 170.666667a42.666667 42.666667 0 0 1-60.330666 0l-170.666667-170.666667a42.666667 42.666667 0 1 1 60.330667-60.330666L469.333333 579.669333V128a42.666667 42.666667 0 0 1 42.666667-42.666667zM213.333333 725.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333h512v-85.333333a42.666667 42.666667 0 1 1 85.333333 0v85.333333a85.333333 85.333333 0 0 1-85.333333 85.333334H256a85.333333 85.333333 0 0 1-85.333333-85.333334v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z"
                  fill="#FFFFFF" />
              </svg>
            </div>
            <div class="options-title">导入简历</div>
          </div>

          <div class="options-item">
            <div class="options-icon options-icon-template">
              <svg class="svg-icon"
                style="width: 1.5em;height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M512 193.194667a256 256 0 0 0-351.701333 371.84l291.370666 291.328a85.333333 85.333333 0 0 0 120.661334 0l291.370666-291.328A256 256 0 0 0 512 193.194667z m-50.005333 70.144l19.84 19.797333a42.666667 42.666667 0 0 0 60.330666 0l19.84-19.797333a170.666667 170.666667 0 1 1 241.322667 241.322666L512 796.032l-291.328-291.370667a170.666667 170.666667 0 0 1 241.322667-241.322666z"
                  fill="#FFFFFF" />
              </svg>
            </div>
            <div class="options-title">简历模版</div>
          </div>

          <div class="options-item">
            <div class="options-icon options-icon-interview">
              <svg class="svg-icon"
                style="width: 1.5em;height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M748.650667 804.053333A362.901333 362.901333 0 0 0 533.333333 149.333333h-42.666666a362.773333 362.773333 0 0 0-12.8 725.333334h302.933333a26.304 26.304 0 0 0 17.066667-8.533334 23.061333 23.061333 0 0 0-4.266667-29.866666z m-162.133334-136.938666h-213.333333a49.685333 49.685333 0 0 1-49.066667-49.216 48.341333 48.341333 0 0 1 49.066667-49.216h213.333333a49.216 49.216 0 0 1 0 98.432z m64-192.576h-277.333333a49.685333 49.685333 0 0 1-49.066667-49.216 48.341333 48.341333 0 0 1 49.066667-49.216h277.333333a49.216 49.216 0 0 1 0 98.432z"
                  fill="#FFFFFF" />
              </svg>
            </div>
            <div class="options-title">模拟面试</div>
          </div>

          <div class="last-item">
            更多功能请期待...
          </div>
        </div>

        <div class="resume-list-container">
          <div class="resume-list-title">最近简历</div>
          <div class="empty-tip" v-if="loading">
            <l-waveform class="chat-loading-icon" size="60" stroke="3.5" speed="1"
              color="var(--color-primary)"></l-waveform>
          </div>
          <div v-else-if="resumes.length === 0" class="empty-tip">
            <div class="empty-tip-title">暂无简历</div>
            <div class="empty-tip-subtitle">点击上方按钮创建</div>
          </div>
          <div v-else class="resume-item-list-container">
            <div v-for="resume in resumes" :key="resume.resumeId" class="resume-item-list-item"
              @click="openResume(resume)">
              <!-- 新增删除按钮 -->
              <div class="delete-btn" @click.stop="deleteResume(resume.resumeId)">
                <svg class="svg-icon"
                  style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M938.667 202.667h-160v-32A117.547 117.547 0 0 0 661.333 53.333H362.667a117.547 117.547 0 0 0-117.334 117.334v32h-160a32 32 0 0 0 0 64h853.334a32 32 0 0 0 0-64z m-629.334-32a53.333 53.333 0 0 1 53.334-53.334h298.666a53.333 53.333 0 0 1 53.334 53.334v32H309.333z m128 618.666V384a32 32 0 0 0-64 0v405.333a32 32 0 0 0 64 0z m213.334 0V384a32 32 0 0 0-64 0v405.333a32 32 0 0 0 64 0z"
                    fill="var(--color-secondary)" />
                  <path
                    d="M832 330.667a32 32 0 0 0-32 32v490.666a53.333 53.333 0 0 1-53.333 53.334H277.333A53.333 53.333 0 0 1 224 853.333V362.667a32 32 0 0 0-64 0v490.666a117.547 117.547 0 0 0 117.333 117.334h469.334A117.547 117.547 0 0 0 864 853.333V362.667a32 32 0 0 0-32-32z"
                    fill="var(--color-secondary)" />
                </svg>
              </div>
              <div class="resume-pic-container">
                <img v-if="resume.templateType === 'default'" class="resume-pic"
                  src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview/template-general1.png" alt="resume-pic">
                <img v-else-if="resume.templateType === 'general_simple'" class="resume-pic"
                  src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview/template-general2.png" alt="resume-pic">
                <img v-else class="resume-pic" src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview/template-general3.png" alt="resume-pic">
              </div>
              <div class="resume-item-list-item-title">{{ resume.name }}</div>
              <div class="resume-item-list-item-subtitle">{{ formatDate(resume.createdAt) }}</div>
            </div>
          </div>
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
  data() {
    return {
      resumes: [],
      loading: false
    }
  },
  setup() {
    const toast = useToast()
    return { toast }
  },
  computed: {
    username() {
      return AuthService.getUserContact()
    },
  },
  mounted() {
    this.fetchResumes()
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

    async deleteResume(resumeId) {
      if (!confirm('确定要永久删除这个简历吗？')) return

      try {
        await apiClient.delete(`/user/resumes/${resumeId}`)
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
          resumeId: resume.resumeId  // 新增参数
        }
      })
    },
    createResume() {
      this.$router.push({
        name: 'TemplateSelection',
        params: { selectionType: 'create_resume' }
      })
    }
  }
}
</script>
<style scoped>
.logged-home {
  padding-top: 60px;
  display: flex;
}

.page-left {
  width: 300px;
  height: calc(100vh - 60px);
  background-color: var(--color-header-background);
}

.page-right {
  width: calc(100vw - 300px);
  height: calc(100vh - 60px);
  background-color: var(--color-header-background);
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-right-card {
  position: relative;
  width: calc(100% - 30px);
  height: calc(100% - 14px);
  top: -4px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 300;

  overflow-y: auto;
}

.create-resume-button {
  width: calc(100% - 20px);
  height: 50px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  margin-left: 20px;
  margin-top: 20px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  text-indent: 15px;
  /* 文字向右偏移10px */


  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
}

.create-resume-button:hover {
  background-color: var(--color-primary-hover);
  transition: background-color 0.3s ease;
}

.resume-list-empty {
  width: calc(100% - 40px);
  border-radius: 10px;
  border: 1px dashed var(--color-gray-dark);
  margin-left: 28px;
  margin-top: 20px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.resume-list-empty-title {
  font-size: 14px;
  font-weight: 600;
  opacity: 0.5;
}

.resume-list-empty-subtitle {
  font-size: 11px;
  margin-top: 5px;
  opacity: 0.5;
}

.page-ad-container {
  width: calc(100% - 40px);
  height: 200px;
  border-radius: 10px;
  margin-left: 20px;
  margin-top: 20px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-black) 100%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page-ad-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--color-secondary);
  opacity: 0.8;
}

.page-ad-button {
  background-color: var(--color-secondary);
  color: var(--color-primary-dark);
  border: none;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 10px;
  opacity: 0.6;
  cursor: pointer;
  text-indent: 10px;
}

.page-ad-button:hover {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.options-container {
  width: calc(100% - 40px);
  height: 100px;
  margin-left: 20px;
  gap: 20px;
  margin-top: 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.options-item {
  width: 100px;
  height: 100px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
}

.options-item:hover {
  scale: 1.15;
  transition: scale 0.3s ease;
}

.options-icon {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.options-icon-import {
  background-color: rgba(128, 0, 128, 0.515);
}

.options-icon-template {
  background-color: rgba(255, 0, 0, 0.502);
}

.options-icon-create {
  background-color: var(--color-secondary);
}

.options-icon-interview {
  background-color: rgba(0, 128, 0, 0.502);
}

.options-title {
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.5;
}

.last-item {
  margin-left: 40px;
  font-size: 12px;
  opacity: 0.5;
}

.resume-list-container {
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-top: 20px;
}

.resume-list-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
}

.resume-item-list-container {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.resume-item-list-item {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* 调整悬停缩放效果 */
.resume-item-list-item:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
  z-index: 2;
  /* 确保悬停项在上层 */
}

.resume-pic {
  width: 250px;
  border-radius: 10px 10px 0 0;
}

.resume-item-list-item-title {
  font-size: 16px;
  font-weight: bold;
  margin-left: 12px;
  margin-top: 6px;
}

.resume-item-list-item-subtitle {
  font-size: 12px;
  opacity: 0.5;
  margin-left: 12px;
  margin-top: 6px;
  margin-bottom: 12px;
}

.empty-tip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-secondary);
  border-radius: 10px;
  height: 200px;
  margin-top: 20px;
}

.empty-tip-title {
  font-size: 16px;
  font-weight: bold;
}

.empty-tip-subtitle {
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.5;
}

/* 添加删除按钮样式 */
.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
  background: #ff4d4d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  opacity: 0;
  /* 初始完全透明 */
  transition: opacity 0.2s ease;
  /* 添加过渡效果 */
}

.delete-btn:hover {
  background: #ff7878;
}

.resume-item-list-item {
  position: relative;
}

/* 当鼠标悬停在简历项上时显示删除按钮 */
.resume-item-list-item:hover .delete-btn {
  opacity: 1;
  /* 完全不透明 */
}
</style>