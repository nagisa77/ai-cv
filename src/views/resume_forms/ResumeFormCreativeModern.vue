<!-- src/views/ResumeFormGeneralSimple.vue -->
<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet">

  <div class="scroll-container">
    <!-- 主体容器 -->
    <div class="container">
      <h1 class="title">你好，欢迎来到 <span class="highlight-content">AI 简历君</span></h1>
      <p class="subtitle">在开始为您创建 AI 智能简历前，请先完善以下基础信息：</p>

      <div class="card" @click="handleCardClick('personalInfo', '')">
        <div class="block-title">基础信息</div>
        <div class="avatar-upload">
          <UploadableImage v-model="basicInfo.avatar" width="80" height="120"
            default-image="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/uploadAvatar.png" />
        </div>
        <div class="form-line">
          <AppleStyleInput id="name" labelText="姓名" inputType="text" :required="true" v-model="basicInfo.name" />
          <AppleStyleInput id="phone" labelText="手机号 (选填)" inputType="tel" v-model="basicInfo.phone" />
        </div>

        <AppleStyleInput id="email" labelText="邮箱 (选填)" inputType="email" v-model="basicInfo.email" />

        <div class="form-line">
          <AppleStyleInput id="targetCompany" labelText="目标公司 (选填)" inputType="text"
            v-model="basicInfo.targetCompany" />
          <AppleStyleInput id="jobTitle" labelText="岗位名称 (选填)" inputType="text" v-model="basicInfo.jobTitle" />
        </div>

        <AppleStyleInput id="jobDescription" labelText="岗位描述 (选填)" inputType="text"
          v-model="basicInfo.jobDescription" />
      </div>

      <!-- 教育经历 -->
      <div class="block-title">教育经历</div>
      <div id="education-experience" class="education-list">
        <div class="card" v-for="(edu, index) in educationList" :key="index"
          @click="handleCardClick('educationExperience', edu.school)">
          <div class="card-header">
            <div class="card-title">教育经历{{ index + 1 }}</div>
            <button class="remove-btn" type="button" @click.stop="removeCard('educationList', index)">
              ×
            </button>
          </div>

          <AppleStyleInput :id="`school-${index}`" labelText="学校名" inputType="text" :required="true"
            v-model="edu.school" />

          <div class="form-line">
            <AppleStyleInput :id="`edu-time-${index}`" labelText="时间" inputType="text" :required="true"
              v-model="edu.time" />

            <AppleStyleInput :id="`major-${index}`" labelText="专业" inputType="text" :required="true"
              v-model="edu.major" />
          </div>

          <div class="form-line">
            <AppleStyleInput :id="`degree-${index}`" labelText="学历" inputType="text" :required="true"
              v-model="edu.degree" />

            <AppleStyleInput :id="`gpa-${index}`" labelText="GPA (选填)" inputType="text" v-model="edu.gpa" />

            <AppleStyleInput :id="`edu-city-${index}`" labelText="城市" inputType="text" :required="true"
              v-model="edu.city" />
          </div>
          <AppleStyleInput :id="`honors-${index}`" labelText="荣誉奖项 (选填)" inputType="text" v-model="edu.honors" />
          <AppleStyleInput :id="`courses-${index}`" labelText="相关课程 (选填)" inputType="text" v-model="edu.courses" />
        </div>
      </div>
      <div>
        <button class="add-button" type="button" @click="addEducationExperience">
          + 新增教育经历
        </button>
      </div>

      <!-- 工作经历 -->
      <div class="block-title">工作经历</div>
      <div id="work-experience" class="experience-list">
        <div class="card" v-for="(work, index) in workList" :key="index"
          @click="handleCardClick('workExperience', work.company)">
          <div class="card-header">
            <div class="card-title">工作经历{{ index + 1 }}</div>
            <button class="remove-btn" type="button" @click.stop="removeCard('workList', index)">
              ×
            </button>
          </div>

          <AppleStyleInput :id="`company-${index}`" labelText="公司名" inputType="text" :required="true"
            v-model="work.company" />

          <div class="form-line">
            <AppleStyleInput :id="`work-time-${index}`" labelText="时间" inputType="text" :required="true"
              v-model="work.time" />

            <AppleStyleInput :id="`title-${index}`" labelText="职位" inputType="text" :required="true"
              v-model="work.title" />

            <AppleStyleInput :id="`work-city-${index}`" labelText="城市" inputType="text" :required="true"
              v-model="work.city" />
          </div>
        </div>
      </div>
      <div>
        <button class="add-button" type="button" @click="addWorkExperience">
          + 新增工作经历
        </button>
      </div>

      <!-- 项目经历 -->
      <div class="block-title">项目经历</div>
      <div id="project-experience" class="project-list">
        <div class="card" v-for="(proj, index) in projectList" :key="index"
          @click="handleCardClick('projectExperience', proj.projectName)">
          <div class="card-header">
            <div class="card-title">项目经历{{ index + 1 }}</div>
            <button class="remove-btn" type="button" @click.stop="removeCard('projectList', index)">
              ×
            </button>
          </div>

          <AppleStyleInput :id="`project-${index}`" labelText="项目名" inputType="text" :required="true"
            v-model="proj.projectName" />

          <div class="form-line">
            <AppleStyleInput :id="`project-time-${index}`" labelText="时间" inputType="text" :required="true"
              v-model="proj.time" />

            <AppleStyleInput :id="`role-${index}`" labelText="职位/角色" inputType="text" :required="true"
              v-model="proj.role" />
          </div>
        </div>
      </div>
      <div>
        <button class="add-button" type="button" @click="addProjectExperience">
          + 新增项目经历
        </button>
      </div>

      <!-- 提交按钮 -->
      <button :disabled="isCreatingResume" class="submit-btn" type="button" @click="handleSubmit">
        {{ isCreatingResume ? '正在创建...' : '开始创建我的简历' }}
      </button>
    </div>

    <!-- 预览窗格 -->
    <div class="preview-pane">
      <div v-if="selectedModule.type">
        <div class="preview-title"> 这是您的输入在简历的大致样子，您可以在此基础上进行修改 </div>
        <component class="preview-component" :is="getComponent(selectedModule.type)"
          :educationList="mappedEducationList" :workList="mappedWorkList" :projectList="mappedProjectList"
          :personalInfo="basicInfo" :personalSummary="personalSummary" :enableHover="false" />
      </div>
    </div>
  </div>
</template>

<script>
import AppleStyleInput from '@/components/basic_ui/AppleStyleInput.vue'
import CreativeModernEducationSection from '@/components/template_ui/creative_modern/cv_components/CreativeModernEducationSection.vue'
import CreativeModernWorkSection from '@/components/template_ui/creative_modern/cv_components/CreativeModernComponentWorkSection.vue'
import CreativeModernProjectSection from '@/components/template_ui/creative_modern/cv_components/CreativeModernProjectSection.vue'
import CreativeModernPersonalInfo from '@/components/template_ui/creative_modern/cv_components/CreativeModernPersonalInfo.vue'
import CreativeModernSummarySection from '@/components/template_ui/creative_modern/cv_components/CreativeModernSummarySection.vue'

import metadataInstance from '@/models/metadata_model.js'
import ChatgptModel from '@/models/chatgpt_model.js'
import UploadableImage from '@/components/basic_ui/UploadableImage.vue'
import { resumeModel } from '@/models/resume_model.js'
import { useToast } from 'vue-toastification'
import apiClient from '@/api/axios'

const chatgptInstance = ChatgptModel.getInstance()

export default {
  name: 'ResumeFormCreativeModern',
  components: {
    AppleStyleInput,
    CreativeModernEducationSection,
    CreativeModernWorkSection,
    CreativeModernProjectSection,
    CreativeModernPersonalInfo,
    CreativeModernSummarySection,
    UploadableImage
  },
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      basicInfo: {
        name: 'Tim',
        avatar: '',
        phone: '13800000000',
        email: 'tim@example.com',
        targetCompany: '阿里巴巴',
        jobTitle: '前端工程师',
        jobDescription: '负责前端开发相关工作'
      },
      educationList: [
        {
          school: '清华大学',
          time: '2018.09 - 2022.06',
          major: '软件工程',
          degree: '本科',
          gpa: '3.9',
          city: '北京',
          honors: '优秀学生干部',
          courses: '数据结构, 操作系统, 计算机网络'
        }
      ],
      workList: [
        {
          company: '阿里巴巴',
          time: '2020.07 - 2023.01',
          title: '全栈工程师',
          city: '北京'
        }
      ],
      projectList: [
        {
          projectName: '智能推荐系统',
          time: '2021.02 - 2021.04',
          role: '项目经理'
        }
      ],
      personalSummary: '',
      selectedModule: {
        type: '',
        title: ''
      },
    }
  },
  computed: {
    isCreatingResume() {
      return resumeModel.isFetching
    },
    mappedEducationList() {
      return this.educationList.map(edu => {
        const [from_time, to_time] = edu.time.split(' - ')
        return {
          title: edu.school,
          content: {
            major: edu.major,
            degree: edu.degree,
            gpa: edu.gpa,
            city: edu.city,
            honors: edu.honors,
            courses: edu.courses,
            from_time: from_time ? from_time.trim() : '',
            to_time: to_time ? to_time.trim() : '',
            content: []
          }
        }
      })
    },
    mappedWorkList() {
      return this.workList.map(work => {
        const [from_time, to_time] = work.time.split(' - ')
        return {
          title: work.company,
          content: {
            from_time: from_time ? from_time.trim() : '',
            to_time: to_time ? to_time.trim() : '',
            title: work.company,
            sub_title: work.title,
            city: work.city,
            content: []
          }
        }
      })
    },
    mappedProjectList() {
      return this.projectList.map(proj => {
        const [from_time, to_time] = proj.time.split(' - ')
        return {
          title: proj.projectName,
          content: {
            from_time: from_time ? from_time.trim() : '',
            to_time: to_time ? to_time.trim() : '',
            content: []
          }
        }
      })
    }
  },
  methods: {
    handleSubmit() {
      const { name, phone, email, targetCompany, jobTitle, jobDescription } = this.basicInfo
      const educationList = this.educationList
      const workList = this.workList
      const projectList = this.projectList

      resumeModel.isFetching = true

      apiClient.post('/user/resumes', { templateType: 'creative_modern', color: this.color })
        .then(response => {
          const newResume = response.data.data

          metadataInstance.clearMetadata()
          chatgptInstance.clearConversations()
          resumeModel.setCurrentResumeId(newResume.resumeId)

          metadataInstance.setContentForType('personalInfo', {
            name,
            phone,
            email,
            targetCompany,
            jobTitle,
            jobDescription
          })

          educationList.forEach((edu) => {
            const [fromTime, toTime] = edu.time.split(' - ')
            metadataInstance.setContentForType(
              'education',
              {
                title: edu.school,
                major: edu.major,
                degree: edu.degree,
                gpa: edu.gpa,
                city: edu.city,
                honors: edu.honors,
                courses: edu.courses,
                from_time: fromTime ? fromTime.trim() : '',
                to_time: toTime ? toTime.trim() : '',
                content: []
              },
              edu.school
            )
          })

          workList.forEach((work) => {
            const [fromTime, toTime] = work.time.split(' - ')
            metadataInstance.setContentForType(
              'workExperience',
              {
                title: work.company,
                sub_title: work.title,
                city: work.city,
                from_time: fromTime ? fromTime.trim() : '',
                to_time: toTime ? toTime.trim() : '',
                content: []
              },
              work.company
            )
          })

          projectList.forEach((proj) => {
            const [fromTime, toTime] = proj.time.split(' - ')
            const title = `${proj.projectName}`
            metadataInstance.setContentForType(
              'projectExperience',
              {
                title,
                from_time: fromTime ? fromTime.trim() : '',
                to_time: toTime ? toTime.trim() : '',
                content: []
              },
              title
            )
          })

          // 路由跳转
          this.$router.push({
            name: 'CreateResume',
            params: {
              templateType: 'creative_modern',
              resumeId: newResume.resumeId,
              color: this.color
            }
          })

          this.toast.success('简历创建成功！')
        })
        .catch(error => {
          console.error('简历创建失败:', error)
          const errorMsg = error.response?.data?.message || '创建失败，请重试'
          this.toast.error(errorMsg)
        })
        .finally(() => {
          resumeModel.isFetching = false
        })
    },
    addEducationExperience() {
      this.educationList.push({
        school: '',
        time: '',
        major: '',
        degree: '',
        gpa: '',
        city: ''
      })
    },
    addWorkExperience() {
      this.workList.push({
        company: '',
        time: '',
        title: '',
        city: ''
      })
    },
    addProjectExperience() {
      this.projectList.push({
        projectName: '',
        time: '',
        role: ''
      })
    },
    removeCard(listName, index) {
      this[listName].splice(index, 1)
    },
    handleCardClick(type, name) {
      this.selectedModule = { type, title: name }
    },
    getComponent(type) {
      switch (type) {
        case 'educationExperience':
          return 'CreativeModernEducationSection'
        case 'workExperience':
          return 'CreativeModernWorkSection'
        case 'projectExperience':
          return 'CreativeModernProjectSection'
        case 'personalInfo':
          return 'CreativeModernPersonalInfo'
        case 'personalSummary':
          return 'CreativeModernSummarySection'
        default:
          return null
      }
    }
  }
}
</script>

<style scoped>
.container {
  background-color: var(--color-white);
  margin-left: 100px;
  margin-top: 100px;
  padding-bottom: 60px;
  max-width: 600px;
}

.preview-pane {
  position: fixed;
  top: 100px;
  left: 750px;
  width: 400px;
  overflow-y: auto;
}

.preview-title {
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  opacity: 0.5;
}

.no-selection {
  text-align: center;
  color: #888;
  margin-top: 50px;
}

@media (max-width: 1200px) {
  .scroll-container {
    flex-direction: column;
  }

  .preview-pane {
    border-left: none;
    border-top: 1px solid #ccc;
    max-width: 100%;
    height: auto;
  }
}

/* Existing styles remain unchanged */
.title {
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: var(--color-black);
}

.subtitle {
  font-size: 14px;
  color: var(--color-black);
  opacity: 0.5;
}

.form-group {
  position: relative;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
}

.form-input {
  width: calc(100% - 24px);
  height: calc(100% - 12px);
  padding: 12px 12px 0 12px;
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  font-size: 14px;
  display: block;
}

.avatar-upload {
  margin-bottom: 10px;
}

.highlight-content {
  color: var(--color-primary);
}

.form-input:focus {
  outline: none;
  border: 2px solid var(--color-primary);
}

.form-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-52%);
  font-size: 14px;
  color: var(--color-gray-dark);
  pointer-events: none;
  transition: all 0.3s ease;
}

.form-input:focus+.form-label,
.form-input:not(:placeholder-shown)+.form-label {
  top: 10px;
  left: 12px;
  font-size: 10px;
}

.form-input:focus+.form-label {
  color: var(--color-primary);
}

.card {
  position: relative;
  border-radius: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.remove-btn {
  font-size: 12px;
  cursor: pointer;
  border: none;
  background: none;
  color: red;
  position: relative;
  right: -3px;
}

.add-button {
  color: var(--color-primary);
  background-color: transparent;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.submit-btn {
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  border: none;
  padding: 15px 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
}

.submit-btn:hover {
  background-color: var(--color-primary-hover);
}

.submit-btn:disabled {
  background-color: var(--color-primary-disabled);
  cursor: not-allowed;
}

.form-line {
  display: flex;
  gap: 10px;
}

.block-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
}

.card-title {
  font-size: 12px;
  opacity: 0.5;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
}

.preview-component {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 10px;
  transition: all 0.3s ease;
  font-family: "Ma Shan Zheng", sans-serif;
}

.preview-title {
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
}



::v-deep .item-content-item {
  display: flex;
  font-size: 8px;
}

::v-deep .bullet-point {
  margin-right: 4px;
  margin-top: 4px;
  font-weight: bold;
}

::v-deep .bullet-point-content {
  margin-top: 2px;
}

::v-deep .session-title {
  font-size: 10px;
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  position: relative;
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

::v-deep .session-title-left-line {
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: var(--color-primary);
}

::v-deep .title-and-time {
  display: flex;
  height: 12px;
  justify-content: space-between;
  align-items: center;
}

::v-deep .sub-title-and-city {
  display: flex;
  height: 12px;
  justify-content: space-between;
  align-items: center;
  font-size: 8px;
}

::v-deep .item-title {
  font-size: 8px;
}

::v-deep .item-time {
  font-size: 8px;
}

::v-deep .session-item {
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 10px;
}

::v-deep .highlight {
  position: absolute;
  width: calc(100% + 40px);
  height: calc(100% + 10px);
  top: -5px;
  left: -20px;
  background-color: var(--color-session-selected);
  border-radius: 4px;
}

::v-deep .highlight-left {
  width: 5px;
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 4px;
  z-index: -1;
}

/* —————————————————————————
   灰色蒙层 
   ————————————————————————— */
::v-deep .item-hover-overlay {
  position: absolute;
  top: -5px;
  left: -20px;
  width: calc(100% + 40px);
  height: calc(100% + 10px);
  border-radius: 4px;
  z-index: 1;
}

/* 按钮区域 */
::v-deep .overlay-buttons {
  position: absolute;
  top: 5px;
  right: 10px;
  display: flex;
  gap: 8px;
  /* 按钮间距 */
  z-index: 2;
  /* 按钮更上层，确保可点 */
}

::v-deep .overlay-button {
  cursor: pointer;
  padding: 4px 8px;
  border: none;
  outline: none;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

::v-deep .ai-dialog-button {
  color: var(--color-secondary);
  background-color: var(--color-primary);
}

::v-deep .ai-dialog-button:hover {
  background-color: var(--color-primary-hover);
  transition: background-color 0.2s ease;
}

::v-deep .bullet-point-prefix {
  font-size: 10px;
  font-weight: bold;
  margin-top: 2px;
  margin-right: 4px;
}

::v-deep .delete-button {
  color: var(--color-secondary);
  background-color: rgba(255, 0, 0, 1);
}

::v-deep .session-title-add-icon {
  margin-left: 4px;
  cursor: pointer;
}

::v-deep .loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>