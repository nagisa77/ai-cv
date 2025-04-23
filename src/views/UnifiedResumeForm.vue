<template>
  <!-- 引入图标资源 (font-awesome) 和其他字体 -->
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
    integrity="sha384-DyZ88mC6Up2lfX2B1R2FVr3lMH26n/dXK0NTP8TWx93X/h6p2J7c3hsa5S1p36Md"
    crossorigin="anonymous"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap"
    rel="stylesheet"
  />

  <div class="main-layout">
    <div class="scroll-container">
      <button class="back-button" @click="goBack">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 19L5 12L12 5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        返回
      </button>

      <!-- 主体容器 -->
      <div class="container">
        <h1 class="title">
          你好，欢迎来到 <span class="highlight-content">AI 简历君</span>
        </h1>
        <p class="subtitle">
          在开始为您创建 AI 智能简历前，请先完善以下基础信息：
        </p>

        <!-- ========== 基础信息 ========== -->
        <div class="block-title clickable" @click="toggleSection('personalInfo')">
          <div class="title-left">
            <i class="fas fa-file-alt"></i> 基础信息
          </div>
          <!-- 折叠 / 展开图标 -->
          <i
            class="arrow-icon"
            :class="['fas', sectionsCollapsed.personalInfo ? 'fa-chevron-down' : 'fa-chevron-up']"
          ></i>
        </div>
        <transition name="expand">
          <div
            class="expanded-section"
            v-show="!sectionsCollapsed.personalInfo"
            @click="handleCardClick('personalInfo', '')"
          >
            <div class="card">
              <div class="avatar-upload">
                <UploadableImage
                  v-model="basicInfo.avatar"
                  width="90"
                  height="120"
                  default-image="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/uploadAvatar.png"
                />
                <div class="upload-tip">点击上传证件照 (可选)</div>
              </div>
              <div class="form-line">
                <AppleStyleInput
                  id="name"
                  labelText="姓名"
                  inputType="text"
                  :required="true"
                  v-model="basicInfo.name"
                />
                <AppleStyleInput
                  id="phone"
                  labelText="手机号 (选填)"
                  inputType="tel"
                  v-model="basicInfo.phone"
                />
              </div>

              <AppleStyleInput
                id="email"
                labelText="邮箱 (选填)"
                inputType="email"
                v-model="basicInfo.email"
              />

              <div class="form-line">
                <AppleStyleInput
                  id="targetCompany"
                  labelText="目标公司 (选填)"
                  inputType="text"
                  v-model="basicInfo.targetCompany"
                />
                <AppleStyleInput
                  id="jobTitle"
                  labelText="岗位名称 (选填)"
                  inputType="text"
                  v-model="basicInfo.jobTitle"
                />
              </div>
              <AppleStyleInput
                id="jobDescription"
                labelText="岗位描述 (选填)"
                inputType="text"
                v-model="basicInfo.jobDescription"
              />
            </div>
          </div>
        </transition>

        <!-- ========== 教育经历 ========== -->
        <div class="block-title clickable" @click="toggleSection('education')">
          <div class="title-left">
            <i class="fas fa-file-alt"></i> 教育经历
          </div>
          <!-- 折叠 / 展开图标 -->
          <i
            class="arrow-icon"
            :class="['fas', sectionsCollapsed.education ? 'fa-chevron-down' : 'fa-chevron-up']"
          ></i>
        </div>
        <transition name="expand">
          <div class="expanded-section" v-show="!sectionsCollapsed.education">
            <div id="education-experience" class="education-list">
              <div
                class="card"
                v-for="(edu, index) in educationList"
                :key="index"
                @click="handleCardClick('educationExperience', edu.school)"
              >
                <div class="card-header">
                  <div class="card-title">教育经历{{ index + 1 }}</div>
                  <button
                    class="remove-btn"
                    type="button"
                    @click.stop="removeCard('educationList', index)"
                  >
                    ×
                  </button>
                </div>

                <AppleStyleInput
                  :id="'school-' + index"
                  labelText="学校名"
                  inputType="text"
                  :required="true"
                  v-model="edu.school"
                />

                <div class="form-line">
                  <AppleStyleDatePicker
                    :id="'edu-start-' + index"
                    labelText="开始时间"
                    :required="true"
                    v-model="edu.startDate"
                  />
                  <AppleStyleDatePicker
                    :id="'edu-end-' + index"
                    labelText="结束时间"
                    :required="true"
                    v-model="edu.endDate"
                  />
                  <AppleStyleInput
                    :id="'major-' + index"
                    labelText="专业"
                    inputType="text"
                    :required="true"
                    v-model="edu.major"
                  />
                </div>

                <div class="form-line">
                  <AppleStyleInput
                    :id="'degree-' + index"
                    labelText="学历"
                    inputType="text"
                    :required="true"
                    v-model="edu.degree"
                  />
                  <AppleStyleInput
                    :id="'gpa-' + index"
                    labelText="GPA (选填)"
                    inputType="text"
                    v-model="edu.gpa"
                  />
                  <AppleStyleInput
                    :id="'edu-city-' + index"
                    labelText="城市"
                    inputType="text"
                    :required="true"
                    v-model="edu.city"
                  />
                </div>
                <AppleStyleInput
                  :id="'honors-' + index"
                  labelText="荣誉奖项 (选填)"
                  inputType="text"
                  v-model="edu.honors"
                />
                <AppleStyleInput
                  :id="'courses-' + index"
                  labelText="相关课程 (选填)"
                  inputType="text"
                  v-model="edu.courses"
                />
              </div>
            </div>
            <div>
              <button class="add-button" type="button" @click="addEducationExperience">
                + 新增教育经历
              </button>
            </div>
          </div>
        </transition>

        <!-- ========== 工作经历 ========== -->
        <div class="block-title clickable" @click="toggleSection('work')">
          <div class="title-left">
            <i class="fas fa-file-alt"></i> 工作经历
          </div>
          <!-- 折叠 / 展开图标 -->
          <i
            class="arrow-icon"
            :class="['fas', sectionsCollapsed.work ? 'fa-chevron-down' : 'fa-chevron-up']"
          ></i>
        </div>
        <transition name="expand">
          <div class="expanded-section" v-show="!sectionsCollapsed.work">
            <div id="work-experience" class="experience-list">
              <div
                class="card"
                v-for="(work, index) in workList"
                :key="index"
                @click="handleCardClick('workExperience', work.company)"
              >
                <div class="card-header">
                  <div class="card-title">工作经历{{ index + 1 }}</div>
                  <button
                    class="remove-btn"
                    type="button"
                    @click.stop="removeCard('workList', index)"
                  >
                    ×
                  </button>
                </div>

                <AppleStyleInput
                  :id="'company-' + index"
                  labelText="公司名"
                  inputType="text"
                  :required="true"
                  v-model="work.company"
                />

                <div class="form-line">
                  <AppleStyleDatePicker
                    :id="'work-start-' + index"
                    labelText="开始时间"
                    :required="true"
                    v-model="work.startDate"
                  />
                  <AppleStyleDatePicker
                    :id="'work-end-' + index"
                    labelText="结束时间"
                    :required="true"
                    v-model="work.endDate"
                  />
                  <AppleStyleInput
                    :id="'title-' + index"
                    labelText="职位"
                    inputType="text"
                    :required="true"
                    v-model="work.title"
                  />
                  <AppleStyleInput
                    :id="'work-city-' + index"
                    labelText="城市"
                    inputType="text"
                    :required="true"
                    v-model="work.city"
                  />
                </div>
              </div>
            </div>
            <div>
              <button class="add-button" type="button" @click="addWorkExperience">
                + 新增工作经历
              </button>
            </div>
          </div>
        </transition>

        <!-- ========== 项目经历 ========== -->
        <div class="block-title clickable" @click="toggleSection('project')">
          <div class="title-left">
            <i class="fas fa-file-alt"></i> 项目经历
          </div>
          <!-- 折叠 / 展开图标 -->
          <i
            class="arrow-icon"
            :class="['fas', sectionsCollapsed.project ? 'fa-chevron-down' : 'fa-chevron-up']"
          ></i>
        </div>
        <transition name="expand">
          <div class="expanded-section" v-show="!sectionsCollapsed.project">
            <div id="project-experience" class="project-list">
              <div
                class="card"
                v-for="(proj, index) in projectList"
                :key="index"
                @click="handleCardClick('projectExperience', proj.projectName)"
              >
                <div class="card-header">
                  <div class="card-title">项目经历{{ index + 1 }}</div>
                  <button
                    class="remove-btn"
                    type="button"
                    @click.stop="removeCard('projectList', index)"
                  >
                    ×
                  </button>
                </div>

                <AppleStyleInput
                  :id="'project-' + index"
                  labelText="项目名"
                  inputType="text"
                  :required="true"
                  v-model="proj.projectName"
                />

                <div class="form-line">
                  <AppleStyleDatePicker
                    :id="'project-start-' + index"
                    labelText="开始时间"
                    :required="true"
                    v-model="proj.startDate"
                  />
                  <AppleStyleDatePicker
                    :id="'project-end-' + index"
                    labelText="结束时间"
                    :required="true"
                    v-model="proj.endDate"
                  />
                  <AppleStyleInput
                    :id="'role-' + index"
                    labelText="职位/角色"
                    inputType="text"
                    :required="true"
                    v-model="proj.role"
                  />
                </div>
              </div>
            </div>
            <div>
              <button class="add-button" type="button" @click="addProjectExperience">
                + 新增项目经历
              </button>
            </div>
          </div>
        </transition>

        <!-- ========== 其他模块 ========== -->
        <div class="block-title clickable" @click="toggleSection('others')">
          <div class="title-left">
            <i class="fas fa-file-alt"></i> 其他
          </div>
          <!-- 折叠 / 展开图标 -->
          <i
            class="arrow-icon"
            :class="['fas', sectionsCollapsed.others ? 'fa-chevron-down' : 'fa-chevron-up']"
          ></i>
        </div>
        <transition name="expand">
          <div class="expanded-section" v-show="!sectionsCollapsed.others" @click="handleCardClick('otherModule', '')">
            <div class="card">
              <AppleStyleInput
                id="skills"
                labelText="技能 (选填)"
                inputType="text"
                v-model="others.skills"
              />
              <AppleStyleInput
                id="certificates"
                labelText="证书/执照 (选填)"
                inputType="text"
                v-model="others.certificates"
              />
              <AppleStyleInput
                id="languages"
                labelText="语言 (选填)"
                inputType="text"
                v-model="others.languages"
              />
              <AppleStyleInput
                id="interests"
                labelText="兴趣爱好 (选填)"
                inputType="text"
                v-model="others.interests"
              />
            </div>
          </div>
        </transition>

        <!-- ========== 提交按钮 ========== -->
        <button
          :disabled="isCreatingResume"
          class="submit-btn"
          type="button"
          @click="handleSubmit"
        >
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

// 新增：导入我们自定义的 AppleStyleDatePicker
import AppleStyleDatePicker from '@/components/basic_ui/AppleStyleDatePicker.vue'

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
    AppleStyleDatePicker,
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
          startDate: '2018-09-01',
          endDate: '2022-06-30',
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
          startDate: '2020-07-01',
          endDate: '2023-01-31',
          title: '全栈工程师',
          city: '北京'
        }
      ],
      projectList: [
        {
          projectName: '智能推荐系统',
          startDate: '2021-02-01',
          endDate: '2021-04-30',
          role: '项目经理'
        }
      ],
      // 新增 其他模块
      others: {
        skills: '',
        certificates: '',
        languages: '',
        interests: ''
      },
      personalSummary: '',
      selectedModule: {
        type: '',
        title: ''
      },
      // 控制各个模块是否折叠
      sectionsCollapsed: {
        personalInfo: false,
        education: false,
        work: false,
        project: false,
        others: false
      }
    }
  },
  computed: {
    // 判断是否在创建简历中
    isCreatingResume() {
      return resumeModel.isFetching
    },
    // 判断是否为移动端，这里仅做示例
    isMobile() {
      return window.innerWidth < 1200
    },
    currentTemplateComponent() {
      if (this.templateType === 'default') {
        return DefaultCV;
      } else if (this.templateType === 'general_simple') {
        return GeneralSimpleCV;
      } else if (this.templateType === 'creative_modern') {
        return CreativeModernCV;
      }
      return DefaultCV;
    },

    /**
     * 这里提供一个格式化日期(YYYY.MM)的函数
     * 若需要显示到日，可以自行修改
     */
    mappedEducationList() {
      return this.educationList.map((edu) => {
        const from_time = this.formatYearMonth(edu.startDate)
        const to_time = this.formatYearMonth(edu.endDate)
        return {
          title: edu.school,
          content: {
            major: edu.major,
            degree: edu.degree,
            gpa: edu.gpa,
            city: edu.city,
            honors: edu.honors,
            courses: edu.courses,
            from_time,
            to_time,
            content: []
          }
        }
      })
    },
    mappedWorkList() {
      return this.workList.map((work) => {
        const from_time = this.formatYearMonth(work.startDate)
        const to_time = this.formatYearMonth(work.endDate)
        return {
          title: work.company,
          content: {
            from_time,
            to_time,
            title: work.company,
            sub_title: work.title,
            city: work.city,
            content: []
          }
        }
      })
    },
    mappedProjectList() {
      return this.projectList.map((proj) => {
        const from_time = this.formatYearMonth(proj.startDate)
        const to_time = this.formatYearMonth(proj.endDate)
        return {
          title: proj.projectName,
          content: {
            from_time,
            to_time,
            content: []
          }
        }
      })
    }
  },
  methods: {
    // 简单把 YYYY-MM-DD 转成 YYYY.MM
    formatYearMonth(dateStr) {
      if (!dateStr) return ''
      const dateObj = new Date(dateStr)
      if (isNaN(dateObj.getTime())) return ''
      const year = dateObj.getFullYear()
      const month = String(dateObj.getMonth() + 1).padStart(2, '0')
      return `${year}.${month}`
    },

    /**
     * 折叠/展开切换
     */
    toggleSection(sectionKey) {
      this.sectionsCollapsed[sectionKey] = !this.sectionsCollapsed[sectionKey];
    },

    /**
     * 提交创建简历的逻辑
     */
    handleSubmit() {
      const {
        name,
        phone,
        email,
        targetCompany,
        jobTitle,
        jobDescription,
        avatar
      } = this.basicInfo
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
            jobDescription,
            avatar
          })

          // 保存教育经历
          educationList.forEach((edu) => {
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
                from_time: this.formatYearMonth(edu.startDate),
                to_time: this.formatYearMonth(edu.endDate),
                content: []
              },
              edu.school
            )
          })

          // 保存工作经历
          workList.forEach((work) => {
            metadataInstance.setContentForType(
              'workExperience',
              {
                title: work.company,
                sub_title: work.title,
                city: work.city,
                from_time: this.formatYearMonth(work.startDate),
                to_time: this.formatYearMonth(work.endDate),
                content: []
              },
              work.company
            )
          })

          // 保存项目经历
          projectList.forEach((proj) => {
            metadataInstance.setContentForType(
              'projectExperience',
              {
                title: proj.projectName,
                from_time: this.formatYearMonth(proj.startDate),
                to_time: this.formatYearMonth(proj.endDate),
                content: []
              },
              proj.projectName
            )
          })

          // 保存其他模块
          metadataInstance.setContentForType(
            'otherModule',
            {
              skills: this.others.skills,
              certificates: this.others.certificates,
              languages: this.others.languages,
              interests: this.others.interests,
              content: []
            },
            ''
          )

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

    // 添加返回方法
    goBack() {
      this.$router.go(-1)
    },

    // 新增教育经历
    addEducationExperience() {
      this.educationList.push({
        school: '',
        startDate: '',
        endDate: '',
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
        startDate: '',
        endDate: '',
        title: '',
        city: ''
      })
    },
    // 新增项目经历
    addProjectExperience() {
      this.projectList.push({
        projectName: '',
        startDate: '',
        endDate: '',
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
  },
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
  display: flex;
  align-items: center;
}

.upload-tip {
  font-size: 12px;
  color: var(--color-black);
  opacity: 0.5;
  margin-left: 20px;
}

/* 返回按钮样式 */
.back-button {
  position: absolute;
  top: 20px;
  left: 100px; /* 考虑到左侧菜单栏 */
  display: flex;
  align-items: center;
  gap: 5px;
  background: transparent;
  border: none;
  color: var(--color-primary);
  font-size: 16px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(204, 124, 94, 0.1);
}

.back-button svg {
  width: 20px;
  height: 20px;
}

/* 标题（折叠触发器） */
.block-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between; /* 让箭头靠右 */
}

/* 左侧图标 + 文字 */
.title-left {
  display: flex;
  align-items: center;
  gap: 5px;
}

.clickable {
  cursor: pointer;
}

/* 折叠/展开图标 */
.arrow-icon {
  font-size: 16px;
  transition: transform 0.3s;
}

/* 卡片 */
.card {
  position: relative;
  border-radius: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  padding: 10px;
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

/* 
  ========== 折叠动画相关 ========== 
  这里我们使用 name="expand" 的 <transition>，配合以下 CSS 实现高度和透明度动画
*/

.expand-enter,
.expand-leave-to {
  opacity: 0;
  height: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

/* 折叠展开的内容容器背景色 */
.expanded-section {
  border-radius: 8px;
  padding: 10px;
}
</style>
