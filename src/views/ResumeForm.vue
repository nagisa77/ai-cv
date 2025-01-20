<!-- src/views/ResumeForm.vue -->
<template>
  <div class="scroll-container">
    <!-- 主体容器 -->
    <div class="container">
      <h1 class="title">你好，欢迎来到 <span class="highlight">AI 简历君</span></h1>
      <p class="subtitle">在开始为您创建 AI 智能简历前，请先完善以下基础信息：</p>

      <div class="card" @click="handleCardClick('personalInfo', '')">
        <div class="block-title">基础信息</div>
        <div class="form-line">
          <div class="form-group">
            <input type="text" id="name" class="form-input" placeholder=" " required v-model="basicInfo.name" />
            <label class="form-label" for="name">姓名</label>
          </div>

          <div class="form-group">
            <input type="tel" id="phone" class="form-input" placeholder=" " v-model="basicInfo.phone" />
            <label class="form-label" for="phone">手机号 (选填)</label>
          </div>
        </div>

        <div class="form-group">
          <input type="email" id="email" class="form-input" placeholder=" " v-model="basicInfo.email" />
          <label class="form-label" for="email">邮箱 (选填)</label>
        </div>
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
          <div class="form-group">
            <input type="text" class="form-input" placeholder=" " v-model="edu.school" required />
            <label class="form-label">学校名</label>
          </div>
          <div class="form-line">
            <div class="form-group">
              <input type="text" class="form-input" placeholder=" " v-model="edu.time" required />
              <label class="form-label">时间</label>
            </div>
            <div class="form-group">
              <input type="text" class="form-input" placeholder=" " v-model="edu.major" required />
              <label class="form-label">专业</label>
            </div>
          </div>
          <div class="form-line">
            <div class="form-group">
              <input type="text" class="form-input" placeholder=" " v-model="edu.degree" required />
              <label class="form-label">学历</label>
            </div>
            <div class="form-group">
              <input type="text" class="form-input" placeholder=" " v-model="edu.gpa" />
              <label class="form-label">GPA (选填)</label>
            </div>
            <div class="form-group">
              <input type="text" class="form-input" placeholder=" " v-model="edu.city" required />
              <label class="form-label">城市</label>
            </div>
          </div>
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
          <div class="form-group">
            <input type="text" class="form-input" placeholder=" " v-model="work.company" required />
            <label class="form-label">公司名</label>
          </div>
          <div class="form-line">
            <div class="form-group">
              <input type="text" class="form-input" placeholder=" " v-model="work.time" required />
              <label class="form-label">时间</label>
            </div>
            <div class="form-group">
              <input type="text" class="form-input" placeholder=" " v-model="work.title" required />
              <label class="form-label">职位</label>
            </div>
            <div class="form-group">
              <input type="text" class="form-input" placeholder=" " v-model="work.city" required />
              <label class="form-label">城市</label>
            </div>
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
          <div class="form-group">
            <input type="text" class="form-input" placeholder=" " v-model="proj.projectName" required />
            <label class="form-label">项目名</label>
          </div>
          <div class="form-line">
            <div class="form-group">
              <input type="text" class="form-input" placeholder=" " v-model="proj.time" required />
              <label class="form-label">时间</label>
            </div>
            <div class="form-group">
              <input type="text" class="form-input" placeholder=" " v-model="proj.role" required />
              <label class="form-label">职位/角色</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="add-button" type="button" @click="addProjectExperience">
          + 新增项目经历
        </button>
      </div>

      <!-- 提交按钮 -->
      <button class="submit-btn" type="button" @click="handleSubmit">
        开始创建我的简历
      </button>
    </div>

    <!-- 预览窗格 -->
    <div class="preview-pane">
      <div v-if="selectedModule.type">
        <div class="preview-title"> 这是您的输入在简历的大致样子，您可以在此基础上进行修改 </div>
        <component class="preview-component" :is="getComponent(selectedModule.type)"
          :educationList="mappedEducationList" :workList="mappedWorkList" :projectList="mappedProjectList"
          :personalInfo="basicInfo" :personalSummary="personalSummary" />
      </div>
    </div>
  </div>
</template>

<script>
import EducationSection from '@/components/cv_components/EducationSection.vue'
import WorkSection from '@/components/cv_components/WorkSection.vue'
import ProjectSection from '@/components/cv_components/ProjectSection.vue'
import PersonalInfo from '@/components/cv_components/PersonalInfo.vue'
import SummarySection from '@/components/cv_components/SummarySection.vue'

import metadataInstance from '@/models/metadata_model.js' // 这行是你需要新增的导入

export default {
  name: 'ResumeForm',
  components: {
    EducationSection,
    WorkSection,
    ProjectSection,
    PersonalInfo,
    SummarySection
  },
  data() {
    return {
      basicInfo: {
        name: 'Tim',
        phone: '13800000000',
        email: 'tim@example.com'
      },
      educationList: [
        {
          school: '清华大学',
          time: '2018.09 - 2022.06',
          major: '软件工程',
          degree: '本科',
          gpa: '3.9',
          city: '北京'
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
      personalSummary: '', // 如果有个人总结，可以在表单中添加相应的输入项
      selectedModule: {
        type: '',
        title: ''
      }
    }
  },
  computed: {
    // 映射教育经历数据
    mappedEducationList() {
      return this.educationList.map(edu => {
        const [from_time, to_time] = edu.time.split(' - ')
        return {
          title: edu.school,
          content: {
            from_time: from_time ? from_time.trim() : '',
            to_time: to_time ? to_time.trim() : '',
            content: [
              {
                "bullet_point": "xxxx",
                "content": "xxxx"
              },
              {
                "bullet_point": "xxxx",
                "content": "xxxx"
              },
            ]
          }
        }
      })
    },
    // 映射工作经历数据
    mappedWorkList() {
      return this.workList.map(work => {
        const [from_time, to_time] = work.time.split(' - ')
        return {
          title: work.company,
          content: {
            from_time: from_time ? from_time.trim() : '',
            to_time: to_time ? to_time.trim() : '',
            content: [
              {
                "bullet_point": "xxxx",
                "content": "xxxx"
              },
              {
                "bullet_point": "xxxx",
                "content": "xxxx"
              },
            ]
          }
        }
      })
    },
    // 映射项目经历数据
    mappedProjectList() {
      return this.projectList.map(proj => {
        const [from_time, to_time] = proj.time.split(' - ')
        return {
          title: proj.projectName,
          content: {
            from_time: from_time ? from_time.trim() : '',
            to_time: to_time ? to_time.trim() : '',
            content: [
              {
                "bullet_point": "xxxx",
                "content": "xxxx"
              },
              {
                "bullet_point": "xxxx",
                "content": "xxxx"
              },
            ]
          }
        }
      })
    }
  },
  methods: {
    // ========= 提交按钮处理 =========
    handleSubmit() {
      // 1. 采集表单数据
      const { name, phone, email } = this.basicInfo
      const educationList = this.educationList
      const workList = this.workList
      const projectList = this.projectList

      // 2. 写入 metadata_model
      // ---- 2.1 填写 personalInfo ----
      metadataInstance.setContentForType('personalInfo', {
        name,
        phone,
        email
      })

      // ---- 2.2 填写 education(educationList) ----
      educationList.forEach((edu) => {
        // 假设 time 是 "2016.09 - 2020.06" 格式
        const [fromTime, toTime] = edu.time.split(' - ')
        const title = `${edu.school}`
        metadataInstance.setContentForType(
          'education',
          {
            title,
            from_time: fromTime ? fromTime.trim() : '',
            to_time: toTime ? toTime.trim() : '',
            // 初始化一个空数组或占位内容，后续可由 AI 进行亮点总结
            content: []
          },
          title // 同步作为title索引
        )
      })

      // ---- 2.3 填写 workExperience(workList) ----
      workList.forEach((work) => {
        const [fromTime, toTime] = work.time.split(' - ')
        const title = `${work.company}`
        metadataInstance.setContentForType(
          'workExperience',
          {
            title,
            from_time: fromTime ? fromTime.trim() : '',
            to_time: toTime ? toTime.trim() : '',
            content: []
          },
          title
        )
      })

      // ---- 2.4 填写 projectExperience(projectList) ----
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

      // 3. 将原始表单数据（非 metadata_model 结构）继续存入 localStorage，方便后续使用
      const formData = {
        name,
        phone,
        email,
        educationList,
        workList,
        projectList,
        personalSummary: this.personalSummary
      }
      localStorage.setItem('resumeFormData', JSON.stringify(formData))

      // 4. 跳转到创建简历的页面
      this.$router.push('/create-resume')
    },

    // ================== 教育经历 ==================
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

    // ================== 工作经历 ==================
    addWorkExperience() {
      this.workList.push({
        company: '',
        time: '',
        title: '',
        city: ''
      })
    },

    // ================== 项目经历 ==================
    addProjectExperience() {
      this.projectList.push({
        projectName: '',
        time: '',
        role: ''
      })
    },

    // ================== 删除卡片 ==================
    removeCard(listName, index) {
      this[listName].splice(index, 1)
    },

    // ================== 点击卡片处理 ==================
    handleCardClick(type, name) {
      console.log(`Currently editing ${type}: ${name}`)
      this.selectedModule = { type, title: name }
    },

    // 动态获取组件
    getComponent(type) {
      switch (type) {
        case 'educationExperience':
          return 'EducationSection'
        case 'workExperience':
          return 'WorkSection'
        case 'projectExperience':
          return 'ProjectSection'
        case 'personalInfo':
          return 'PersonalInfo'
        case 'personalSummary':
          return 'SummarySection'
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
.container .title {
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: var(--color-black);
}

.container .subtitle {
  font-size: 14px;
  color: var(--color-black);
  opacity: 0.5;
}

.container .form-group {
  position: relative;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
}

.container .form-input {
  width: calc(100% - 24px);
  height: calc(100% - 12px);
  padding: 12px 12px 0 12px;
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  font-size: 14px;
  display: block;
}

.container .highlight {
  color: var(--color-primary);
}

.container .form-input:focus {
  outline: none;
  border: 2px solid var(--color-primary);
}

.container .form-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-52%);
  font-size: 14px;
  color: var(--color-gray-dark);
  pointer-events: none;
  transition: all 0.3s ease;
}

.container .form-input:focus+.form-label,
.container .form-input:not(:placeholder-shown)+.form-label {
  top: 10px;
  left: 12px;
  font-size: 10px;
}

.container .form-input:focus+.form-label {
  color: var(--color-primary);
}

.container .card {
  position: relative;
  border-radius: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.container .remove-btn {
  font-size: 12px;
  cursor: pointer;
  border: none;
  background: none;
  color: red;
  position: relative;
  right: -3px;
}

.container .add-button {
  color: var(--color-primary);
  background-color: transparent;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.container .submit-btn {
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

.container .submit-btn:hover {
  background-color: var(--color-primary-hover);
}

.container .form-line {
  display: flex;
  gap: 10px;
}

.container .block-title {
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 20px;
}

.container .card-title {
  font-size: 12px;
  opacity: 0.5;
}

.container .card-header {
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
}

.preview-title {
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
