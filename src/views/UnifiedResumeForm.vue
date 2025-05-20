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
            <i class="fas fa-user"></i> 基础信息
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
              <!-- 必填：姓名 -->
              <AppleStyleInput
                id="name"
                labelText="姓名"
                inputType="text"
                :required="true"
                :invalid="validationErrors.personalInfo.name"
                v-model="basicInfo.name"
              />

              <!-- 折叠/展开选填信息 -->
              <div
                class="optional-toggle clickable"
                @click.stop="personalInfoOptionalCollapsed = !personalInfoOptionalCollapsed"
              >
                <i class="fas" :class="[personalInfoOptionalCollapsed ? 'fa-chevron-down' : 'fa-chevron-up']"></i>
                更多选填信息
              </div>

              <transition name="expand">
                <div v-show="!personalInfoOptionalCollapsed" class="optional-block">
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
                    <!-- 手机号选填，这里不校验 -->
                    <AppleStyleInput
                      id="phone"
                      labelText="手机号 (选填)"
                      inputType="tel"
                      v-model="basicInfo.phone"
                    />
                    <!-- 邮箱选填，不做必填校验 -->
                    <AppleStyleInput
                      id="email"
                      labelText="邮箱 (选填)"
                      inputType="email"
                      v-model="basicInfo.email"
                    />
                  </div>

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
              </transition>
            </div>
          </div>
        </transition>

        <!-- ========== 教育经历 ========== -->
        <div class="block-title clickable" @click="toggleSection('education')">
          <div class="title-left">
            <i class="fas fa-graduation-cap"></i> 教育经历
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

                <!-- 必填字段 -->
                <AppleStyleInput
                  :id="'school-' + index"
                  labelText="学校名"
                  inputType="text"
                  :required="true"
                  :invalid="validationErrors.educationList[index]?.school"
                  v-model="edu.school"
                />

                <div class="form-line">
                  <AppleStyleDatePicker
                    :id="'edu-start-' + index"
                    labelText="开始时间"
                    :required="true"
                    :invalid="validationErrors.educationList[index]?.startDate"
                    v-model="edu.startDate"
                  />
                  <AppleStyleDatePicker
                    :id="'edu-end-' + index"
                    labelText="结束时间"
                    :required="true"
                    :invalid="validationErrors.educationList[index]?.endDate"
                    v-model="edu.endDate"
                  />
                  <AppleStyleInput
                    :id="'major-' + index"
                    labelText="专业"
                    inputType="text"
                    :required="true"
                    :invalid="validationErrors.educationList[index]?.major"
                    v-model="edu.major"
                  />
                </div>

                <div class="form-line">
                  <AppleStyleInput
                    :id="'degree-' + index"
                    labelText="学历"
                    inputType="text"
                    :required="true"
                    :invalid="validationErrors.educationList[index]?.degree"
                    v-model="edu.degree"
                  />

                  <AppleStyleInput
                    :id="'edu-city-' + index"
                    labelText="城市"
                    inputType="text"
                    :required="true"
                    :invalid="validationErrors.educationList[index]?.city"
                    v-model="edu.city"
                  />
                </div>

                <!-- 折叠/展开选填信息 (GPA、荣誉奖项、相关课程) -->
                <div
                  class="optional-toggle clickable"
                  @click.stop="educationListOptionalCollapsed[index] = !educationListOptionalCollapsed[index]"
                >
                  <i class="fas" :class="[educationListOptionalCollapsed[index] ? 'fa-chevron-down' : 'fa-chevron-up']"></i>
                  更多选填信息
                </div>
                <transition name="expand">
                  <div v-show="!educationListOptionalCollapsed[index]" class="optional-block">
                    <AppleStyleInput
                      :id="'gpa-' + index"
                      labelText="GPA (选填)"
                      inputType="text"
                      v-model="edu.gpa"
                    />
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
                </transition>
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
            <i class="fas fa-briefcase"></i> 工作经历
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
                  :invalid="validationErrors.workList[index]?.company"
                  v-model="work.company"
                />

                <div class="form-line">
                  <AppleStyleDatePicker
                    :id="'work-start-' + index"
                    labelText="开始时间"
                    :required="true"
                    :invalid="validationErrors.workList[index]?.startDate"
                    v-model="work.startDate"
                  />
                  <AppleStyleDatePicker
                    :id="'work-end-' + index"
                    labelText="结束时间"
                    :required="true"
                    :invalid="validationErrors.workList[index]?.endDate"
                    v-model="work.endDate"
                  />
                  <AppleStyleInput
                    :id="'title-' + index"
                    labelText="职位"
                    inputType="text"
                    :required="true"
                    :invalid="validationErrors.workList[index]?.title"
                    v-model="work.title"
                  />
                  <AppleStyleInput
                    :id="'work-city-' + index"
                    labelText="城市"
                    inputType="text"
                    :required="true"
                    :invalid="validationErrors.workList[index]?.city"
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
            <i class="fas fa-project-diagram"></i> 项目经历
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
                  :invalid="validationErrors.projectList[index]?.projectName"
                  v-model="proj.projectName"
                />

                <div class="form-line">
                  <AppleStyleDatePicker
                    :id="'project-start-' + index"
                    labelText="开始时间"
                    :required="true"
                    :invalid="validationErrors.projectList[index]?.startDate"
                    v-model="proj.startDate"
                  />
                  <AppleStyleDatePicker
                    :id="'project-end-' + index"
                    labelText="结束时间"
                    :required="true"
                    :invalid="validationErrors.projectList[index]?.endDate"
                    v-model="proj.endDate"
                  />
                  <AppleStyleInput
                    :id="'role-' + index"
                    labelText="职位/角色"
                    inputType="text"
                    :required="true"
                    :invalid="validationErrors.projectList[index]?.role"
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
            <i class="fas fa-ellipsis-h"></i> 其他
          </div>
          <!-- 折叠 / 展开图标 -->
          <i
            class="arrow-icon"
            :class="['fas', sectionsCollapsed.others ? 'fa-chevron-down' : 'fa-chevron-up']"
          ></i>
        </div>
        <transition name="expand">
          <div
            class="expanded-section"
            v-show="!sectionsCollapsed.others"
            @click="handleCardClick('otherModule', '')"
          >
            <div class="card">
              <!-- 均为选填，不做必填校验 -->
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
      /**
       * 基础信息 - 仅“姓名”必填
       */
      basicInfo: {
        name: '',
        avatar: '',
        phone: '',
        email: '',
        targetCompany: '',
        jobTitle: '',
        jobDescription: ''
      },
      /**
       * 教育经历 - 默认初始化1条空白记录
       */
      educationList: [
        {
          school: '',
          startDate: '',
          endDate: '',
          major: '',
          degree: '',
          gpa: '',
          city: '',
          honors: '',
          courses: ''
        }
      ],
      /**
       * 工作经历 - 默认初始化1条空白记录
       * （用户可删除到0条, 不做强制保留）
       */
      workList: [
        {
          company: '',
          startDate: '',
          endDate: '',
          title: '',
          city: ''
        }
      ],
      /**
       * 项目经历 - 默认初始化1条空白记录
       * （用户可删除到0条, 不做强制保留）
       */
      projectList: [
        {
          projectName: '',
          startDate: '',
          endDate: '',
          role: ''
        }
      ],
      // 其他模块 - 全部选填
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
      // 控制各个大模块是否折叠（默认只将 others 折叠）
      sectionsCollapsed: {
        personalInfo: false,
        education: false,
        work: false,
        project: false,
        others: true
      },
      // 控制“个人信息”中的选填部分是否折叠
      personalInfoOptionalCollapsed: true,

      // 控制每条教育经历中的选填部分是否折叠（与 educationList 同步长度）
      educationListOptionalCollapsed: [true],

      // 校验错误对象
      validationErrors: {
        personalInfo: {
          name: false
        },
        // 教育经历对应的校验初始值
        educationList: [
          {
            school: false,
            startDate: false,
            endDate: false,
            major: false,
            degree: false,
            city: false
          }
        ],
        // 工作经历对应的校验初始值
        workList: [
          {
            company: false,
            startDate: false,
            endDate: false,
            title: false,
            city: false
          }
        ],
        // 项目经历对应的校验初始值
        projectList: [
          {
            projectName: false,
            startDate: false,
            endDate: false,
            role: false
          }
        ]
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
     * 格式化日期(YYYY-MM)，若需要显示到日，可以自行修改
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
      // 先进行校验
      const hasError = this.validateForm()
      // 如果校验不通过，直接弹出提示并return
      if (hasError) {
        this.toast.error('请检查标红字段并填写必填信息')
        return
      }

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
          resumeModel.setCurrentResumeId(newResume.resumeId)
          metadataInstance.clearMetadata()
          chatgptInstance.clearConversations()

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

    // 校验必填字段的方法
    validateForm() {
      let hasError = false

      // 先重置所有错误状态
      this.validationErrors.personalInfo.name = false
      this.validationErrors.educationList.forEach((errItem) => {
        Object.keys(errItem).forEach((key) => {
          errItem[key] = false
        })
      })
      this.validationErrors.workList.forEach((errItem) => {
        Object.keys(errItem).forEach((key) => {
          errItem[key] = false
        })
      })
      this.validationErrors.projectList.forEach((errItem) => {
        Object.keys(errItem).forEach((key) => {
          errItem[key] = false
        })
      })

      // 基础信息：姓名必填
      if (!this.basicInfo.name) {
        this.validationErrors.personalInfo.name = true
        this.sectionsCollapsed.personalInfo = false
        hasError = true
      }

      // 教育经历 (学校、开始时间、结束时间、专业、学历、城市 均为必填)
      // 至少要有1条
      if (this.educationList.length === 0) {
        this.toast.error('请至少填写一条教育经历')
        this.sectionsCollapsed.education = false
        return true
      }
      this.educationList.forEach((edu, index) => {
        let errObj = this.validationErrors.educationList[index]
        if (!edu.school) {
          errObj.school = true
          this.sectionsCollapsed.education = false
          hasError = true
        }
        if (!edu.startDate) {
          errObj.startDate = true
          this.sectionsCollapsed.education = false
          hasError = true
        }
        if (!edu.endDate) {
          errObj.endDate = true
          this.sectionsCollapsed.education = false
          hasError = true
        }
        if (!edu.major) {
          errObj.major = true
          this.sectionsCollapsed.education = false
          hasError = true
        }
        if (!edu.degree) {
          errObj.degree = true
          this.sectionsCollapsed.education = false
          hasError = true
        }
        if (!edu.city) {
          errObj.city = true
          this.sectionsCollapsed.education = false
          hasError = true
        }
      })

      // ========= 关键需求点：工作经历、项目经历只需至少有一个不为空 =========
      if (this.workList.length === 0 && this.projectList.length === 0) {
        this.toast.error('请至少填写一条工作经历或项目经历')
        hasError = true
      }

      // 工作经历校验（若有内容，则必填字段需要填写）
      this.workList.forEach((work, index) => {
        let errObj = this.validationErrors.workList[index]
        if (!work.company) {
          errObj.company = true
          this.sectionsCollapsed.work = false
          hasError = true
        }
        if (!work.startDate) {
          errObj.startDate = true
          this.sectionsCollapsed.work = false
          hasError = true
        }
        if (!work.endDate) {
          errObj.endDate = true
          this.sectionsCollapsed.work = false
          hasError = true
        }
        if (!work.title) {
          errObj.title = true
          this.sectionsCollapsed.work = false
          hasError = true
        }
        if (!work.city) {
          errObj.city = true
          this.sectionsCollapsed.work = false
          hasError = true
        }
      })

      // 项目经历校验（若有内容，则必填字段需要填写）
      this.projectList.forEach((proj, index) => {
        let errObj = this.validationErrors.projectList[index]
        if (!proj.projectName) {
          errObj.projectName = true
          this.sectionsCollapsed.project = false
          hasError = true
        }
        if (!proj.startDate) {
          errObj.startDate = true
          this.sectionsCollapsed.project = false
          hasError = true
        }
        if (!proj.endDate) {
          errObj.endDate = true
          this.sectionsCollapsed.project = false
          hasError = true
        }
        if (!proj.role) {
          errObj.role = true
          this.sectionsCollapsed.project = false
          hasError = true
        }
      })

      return hasError
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
        city: '',
        honors: '',
        courses: ''
      })
      // 同步新增对应的校验对象
      this.validationErrors.educationList.push({
        school: false,
        startDate: false,
        endDate: false,
        major: false,
        degree: false,
        city: false
      })
      // 新增可选字段折叠状态
      this.educationListOptionalCollapsed.push(true)
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
      this.validationErrors.workList.push({
        company: false,
        startDate: false,
        endDate: false,
        title: false,
        city: false
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
      this.validationErrors.projectList.push({
        projectName: false,
        startDate: false,
        endDate: false,
        role: false
      })
    },
    // 删除对应经历（工作、项目允许清空；教育保留1条）
    removeCard(listName, index) {
      // === 对 educationList 做“至少1条”限制 ===
      if (listName === 'educationList') {
        if (this[listName].length <= 1) {
          this.toast.error('至少保留一条教育经历，无法删除')
          return
        }
        // 先删除对应折叠状态
        this.educationListOptionalCollapsed.splice(index, 1)
      }
      // 其他列表可删除到 0 条
      this[listName].splice(index, 1)
      this.validationErrors[listName].splice(index, 1)
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

/* 折叠区域动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}
.expand-enter,
.expand-leave-to {
  opacity: 0;
  height: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* 选填信息展开/折叠区 */
.optional-toggle {
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  opacity: 0.7;
}

.optional-block {
  margin-top: 10px;
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
