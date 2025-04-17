<template>
  <!-- 可以统一引入一些字体等资源（也可根据 templateType 条件化引入） -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet" />

  <div class="main-layout">
    <div class="scroll-container">
      <!-- 主体容器 -->
      <div class="container">
        <h1 class="title">
          你好，欢迎来到 <span class="highlight-content">AI 简历君</span>
        </h1>
        <p class="subtitle">
          在开始为您创建 AI 智能简历前，请先完善以下基础信息：
        </p>

        <!-- 基础信息卡片 -->
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
    </div>

    <!-- 大屏下展示右侧简历；小屏下不展示，改用弹窗 -->
    <div class="right-container cv-container" v-if="!isMobile">
      <component
        class="resume-container"
        :is="currentTemplateComponent"
        :color="color"
        :isPreview="true"
        :previewData="{
          personalInfo: basicInfo,
          education: mappedEducationList,
          workExperience: mappedWorkList,
          projectExperience: mappedProjectList,
        }"
      />
    </div>
  </div>
</template>

<script>
/**
 * ========== 1. 引入公共组件 ========== 
 */
import AppleStyleInput from '@/components/basic_ui/AppleStyleInput.vue'
import UploadableImage from '@/components/basic_ui/UploadableImage.vue'
import DefaultCV from '@/components/template_ui/default/DefaultCVComponent.vue';
import GeneralSimpleCV from '@/components/template_ui/general_simple/GeneralSimpleCVComponent.vue';
import CreativeModernCV from '@/components/template_ui/creative_modern/CreativeModernCV.vue';

/**
 * ========== 3. 其他业务相关的模块 ========== 
 */
import { useToast } from 'vue-toastification'
import metadataInstance from '@/models/metadata_model.js'
import ChatgptModel from '@/models/chatgpt_model.js'
import { resumeModel } from '@/models/resume_model.js'
import apiClient from '@/api/axios'

const chatgptInstance = ChatgptModel.getInstance()

export default {
  name: 'UnifiedResumeForm',
  components: {
    AppleStyleInput,
    UploadableImage,
  },
  props: {
    /**
     * templateType：控制使用哪一套模板进行预览
     * 可以是 'default' | 'general_simple' | 'creative_modern'
     */
    templateType: {
      type: String,
      default: 'default'
    },
    /**
     * color: 主题颜色，可选
     */
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
      }
    }
  },
  computed: {
    // 判断是否在创建简历中
    isCreatingResume() {
      return resumeModel.isFetching
    },
    currentTemplateComponent() {
      if (this.templateType == 'default') {
        return DefaultCV;
      } else if (this.templateType == 'general_simple') {
        return GeneralSimpleCV;
      } else if (this.templateType == 'creative_modern') {
        return CreativeModernCV;
      }
      return DefaultCV;
    },
    // 将 educationList 转换为模板可直接渲染的结构
    mappedEducationList() {
      return this.educationList.map((edu) => {
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
    // 将 workList 转换为模板可直接渲染的结构
    mappedWorkList() {
      return this.workList.map((work) => {
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
    // 将 projectList 转换为模板可直接渲染的结构
    mappedProjectList() {
      return this.projectList.map((proj) => {
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
    /**
     * 根据 selectedModule.type 来获取对应的动态预览组件
     * 并根据 templateType 区分到底用哪套 Education/Work/Project/PersonalInfo 组件
     */
    getPreviewComponent(type) {
      // 三套模板组件映射
      const templatesMap = {
        default: {
          educationExperience: 'EducationSection',
          workExperience: 'WorkSection',
          projectExperience: 'ProjectSection',
          personalInfo: 'PersonalInfo',
          personalSummary: 'SummarySection'
        },
        general_simple: {
          educationExperience: 'EducationGeneralSimpleSection',
          workExperience: 'WorkGeneralSimpleSection',
          projectExperience: 'ProjectGeneralSimpleSection',
          personalInfo: 'PersonalGeneralSimpleInfo',
          personalSummary: 'SummaryGeneralSimpleSection'
        },
        creative_modern: {
          educationExperience: 'CreativeModernEducationSection',
          workExperience: 'CreativeModernWorkSection',
          projectExperience: 'CreativeModernProjectSection',
          personalInfo: 'CreativeModernPersonalInfo',
          personalSummary: 'CreativeModernSummarySection'
        }
      }

      const mapForCurrentTemplate = templatesMap[this.templateType] || templatesMap.default
      return mapForCurrentTemplate[type] || null
    },

    /**
     * 提交创建简历的逻辑
     */
    handleSubmit() {
      // 取出基础信息
      const { name, phone, email, targetCompany, jobTitle, jobDescription } = this.basicInfo
      const educationList = this.educationList
      const workList = this.workList
      const projectList = this.projectList

      // 开始创建简历
      resumeModel.isFetching = true

      // 向后端发送创建请求，带上对应的 templateType 和 color
      apiClient
        .post('/user/resumes', {
          templateType: this.templateType,
          color: this.color
        })
        .then((response) => {
          const newResume = response.data.data

          // 清理模型缓存
          metadataInstance.clearMetadata()
          chatgptInstance.clearConversations()

          // 设置当前简历 ID
          resumeModel.setCurrentResumeId(newResume.resumeId)

          // 保存个人信息到 metadata
          metadataInstance.setContentForType('personalInfo', {
            name,
            phone,
            email,
            targetCompany,
            jobTitle,
            jobDescription
          })

          // 保存教育经历
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

          // 保存工作经历
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

          // 保存项目经历
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

          // 跳转到简历主编辑页面 (CreateResume)
          this.$router.push({
            name: 'CreateResume',
            params: {
              templateType: this.templateType,
              resumeId: newResume.resumeId,
              color: this.color
            }
          })

          this.toast.success('简历创建成功！')
        })
        .catch((error) => {
          console.error('简历创建失败:', error)
          const errorMsg = error.response?.data?.message || '创建失败，请重试'
          this.toast.error(errorMsg)
        })
        .finally(() => {
          resumeModel.isFetching = false
        })
    },

    // 新增教育经历
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
    // 新增工作经历
    addWorkExperience() {
      this.workList.push({
        company: '',
        time: '',
        title: '',
        city: ''
      })
    },
    // 新增项目经历
    addProjectExperience() {
      this.projectList.push({
        projectName: '',
        time: '',
        role: ''
      })
    },
    // 删除对应经历
    removeCard(listName, index) {
      this[listName].splice(index, 1)
    },
    /**
     * 点击卡片时，记录当前所在模块，右侧预览部分会匹配对应的组件
     */
    handleCardClick(type, name) {
      this.selectedModule = { type, title: name }
    }
  }
}
</script>

<style scoped>
/* ========== 布局与容器相关 ========== */

.main-layout {
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
}

.scroll-container {
  flex: 0 0 50%;
  max-width: calc(50vw - 60px);
  margin-left: 60px;
  height: 100vh;
  overflow-y: auto;
  padding: 0;
}

.preview-container {
  flex: 0 0 50%;
  max-width: calc(50vw - 60px);
  overflow-y: auto;
  background-color: #f8f9fa;
  border-left: 1px solid #dee2e6;
  position: sticky;
  top: 0;
}

/* 主体容器：最大宽度限制 */
.container {
  margin: 0 auto;
  /* 水平居中 */
  margin-top: 100px;
  padding-bottom: 60px;
  max-width: 600px;
}

/* 右侧预览标题 */
.preview-title {
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  opacity: 0.5;
}

.preview-content {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.no-selection {
  text-align: center;
  color: #888;
  margin-top: 50px;
}

/* ========== 响应式处理 ========== */

/* 当屏幕宽度小于 1200px 时，让布局变成上下结构 */
@media (max-width: 1200px) {
  .main-layout {
    flex-direction: column;
  }

  .scroll-container,
  .preview-container {
    flex: 0 0 100%;
    max-width: 100%;
    height: auto;
  }

  .preview-container {
    border-left: none;
    border-top: 1px solid #dee2e6;
    margin-top: 20px;
  }
}

/* 当屏幕宽度较窄时，表单内部的行容器可自动换行，让控件单列显示 */
@media (max-width: 768px) {
  .form-line {
    flex-wrap: wrap;
  }
}

/* ========== 文字和局部样式 ========== */

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

.highlight-content {
  color: var(--color-primary);
}

/* ========== 基本表单 + 卡片样式 ========== */

.form-line {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.avatar-upload {
  margin-bottom: 10px;
}

.block-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
}

/* 卡片 */
.card {
  position: relative;
  border-radius: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  padding: 10px;
  /* 给卡片内部一些间距 */
  background: #fff;
}

.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
}

.card-title {
  font-size: 12px;
  opacity: 0.5;
}

/* 删除按钮 */
.remove-btn {
  font-size: 12px;
  cursor: pointer;
  border: none;
  background: none;
  color: red;
  position: relative;
  right: -3px;
}

/* 新增经历按钮 */
.add-button {
  color: var(--color-primary);
  background-color: transparent;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.add-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* 提交按钮 */
.submit-btn {
  width: 90%;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  border: none;
  padding: 15px 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  text-align: center;
}

.submit-btn:hover {
  background-color: var(--color-primary-hover);
}

.submit-btn:disabled {
  background-color: var(--color-primary-disabled);
  cursor: not-allowed;
}

/* 右侧预览组件外框 */
.preview-component {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 10px;
  transition: all 0.3s ease;

  /* 这里为了兼容创意简历里用到的一些中文手写风格字体 */
  font-family: "Ma Shan Zheng", sans-serif;
}
</style>
