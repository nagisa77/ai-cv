<!-- src/views/ResumeForm.vue -->
<template>
  <div class="scroll-container">
    <!-- 主体容器 -->
    <div class="container">
      <h1 class="title">你好，欢迎来到 AI 简历君</h1>
      <p class="subtitle">在开始为您创建 AI 智能简历前，请先完善以下基础信息：</p>

      <!-- 基础信息表单 -->
      <div class="form-group">
        <label class="form-label" for="name">
          姓名<span class="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          class="form-input"
          placeholder="请输入您的姓名"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="phone">手机号 (选填)</label>
        <input
          type="tel"
          id="phone"
          class="form-input"
          placeholder="请输入您的手机号"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="email">邮箱 (选填)</label>
        <input
          type="email"
          id="email"
          class="form-input"
          placeholder="请输入您的邮箱"
        />
      </div>

      <!-- 教育经历 -->
      <div class="block-title">教育经历</div>
      <div id="education-experience" class="education-list">
        <!-- 只留 1 条默认教育经历 -->
        <div class="card">
          <button class="remove-btn" type="button" @click="removeCard($event)">
            ×
          </button>
          <div class="form-group">
            <label class="form-label">学校名</label>
            <input type="text" class="form-input" placeholder="如：北京大学" />
          </div>
          <div class="form-group">
            <label class="form-label">时间</label>
            <input
              type="text"
              class="form-input"
              placeholder="如：2018.09 - 2022.06"
            />
          </div>
          <div class="form-group">
            <label class="form-label">专业</label>
            <input type="text" class="form-input" placeholder="如：计算机科学" />
          </div>
          <div class="form-group">
            <label class="form-label">学历</label>
            <input
              type="text"
              class="form-input"
              placeholder="如：本科 / 硕士 / 博士"
            />
          </div>
          <div class="form-group">
            <label class="form-label">GPA (选填)</label>
            <input type="text" class="form-input" placeholder="如：3.8" />
          </div>
          <div class="form-group">
            <label class="form-label">城市</label>
            <input type="text" class="form-input" placeholder="如：北京" />
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
        <div class="card">
          <button class="remove-btn" type="button" @click="removeCard($event)">
            ×
          </button>
          <div class="form-group">
            <label class="form-label">公司名</label>
            <input type="text" class="form-input" placeholder="如：腾讯" />
          </div>
          <div class="form-group">
            <label class="form-label">时间</label>
            <input
              type="text"
              class="form-input"
              placeholder="如：2020.05 - 2022.12"
            />
          </div>
          <div class="form-group">
            <label class="form-label">职位</label>
            <input type="text" class="form-input" placeholder="如：后端开发" />
          </div>
          <div class="form-group">
            <label class="form-label">城市</label>
            <input type="text" class="form-input" placeholder="如：深圳" />
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
        <div class="card">
          <button class="remove-btn" type="button" @click="removeCard($event)">
            ×
          </button>
          <div class="form-group">
            <label class="form-label">项目名</label>
            <input type="text" class="form-input" placeholder="如：AI 简历系统" />
          </div>
          <div class="form-group">
            <label class="form-label">时间</label>
            <input
              type="text"
              class="form-input"
              placeholder="如：2021.02 - 2021.04"
            />
          </div>
          <div class="form-group">
            <label class="form-label">职位/角色</label>
            <input
              type="text"
              class="form-input"
              placeholder="如：产品负责人"
            />
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

    <!-- 隐藏模板区域（各模块各一份） -->
    <div id="template-area" style="display: none;">
      <!-- 教育经历模板 -->
      <div id="education-card-template" class="card">
        <button class="remove-btn" type="button" @click="removeCard($event)">×</button>
        <div class="form-group">
          <label class="form-label">学校名</label>
          <input type="text" class="form-input" placeholder="如：北京大学" />
        </div>
        <div class="form-group">
          <label class="form-label">时间</label>
          <input
            type="text"
            class="form-input"
            placeholder="如：2018.09 - 2022.06"
          />
        </div>
        <div class="form-group">
          <label class="form-label">专业</label>
          <input type="text" class="form-input" placeholder="如：计算机科学" />
        </div>
        <div class="form-group">
          <label class="form-label">学历</label>
          <input
            type="text"
            class="form-input"
            placeholder="如：本科 / 硕士 / 博士"
          />
        </div>
        <div class="form-group">
          <label class="form-label">GPA (选填)</label>
          <input type="text" class="form-input" placeholder="如：3.8" />
        </div>
        <div class="form-group">
          <label class="form-label">城市</label>
          <input type="text" class="form-input" placeholder="如：北京" />
        </div>
      </div>

      <!-- 工作经历模板 -->
      <div id="work-card-template" class="card">
        <button class="remove-btn" type="button" @click="removeCard($event)">×</button>
        <div class="form-group">
          <label class="form-label">公司名</label>
          <input type="text" class="form-input" placeholder="如：腾讯" />
        </div>
        <div class="form-group">
          <label class="form-label">时间</label>
          <input type="text" class="form-input" placeholder="如：2020.05 - 2022.12" />
        </div>
        <div class="form-group">
          <label class="form-label">职位</label>
          <input type="text" class="form-input" placeholder="如：后端开发" />
        </div>
        <div class="form-group">
          <label class="form-label">城市</label>
          <input type="text" class="form-input" placeholder="如：深圳" />
        </div>
      </div>

      <!-- 项目经历模板 -->
      <div id="project-card-template" class="card">
        <button class="remove-btn" type="button" @click="removeCard($event)">×</button>
        <div class="form-group">
          <label class="form-label">项目名</label>
          <input
            type="text"
            class="form-input"
            placeholder="如：AI 简历系统"
          />
        </div>
        <div class="form-group">
          <label class="form-label">时间</label>
          <input type="text" class="form-input" placeholder="如：2021.02 - 2021.04" />
        </div>
        <div class="form-group">
          <label class="form-label">职位/角色</label>
          <input
            type="text"
            class="form-input"
            placeholder="如：产品负责人"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumeForm',
  methods: {
    // ========= 提交按钮处理 =========
    handleSubmit() {
      // 1. 采集表单数据，这里仅作简单示例
      const name = document.getElementById('name').value
      const phone = document.getElementById('phone').value
      const email = document.getElementById('email').value

      // 教育经历
      const educationCards = document
        .getElementById('education-experience')
        .querySelectorAll('.card')
      const educationList = Array.from(educationCards).map((card) => {
        const inputs = card.querySelectorAll('input')
        return {
          school: inputs[0]?.value || '',
          time: inputs[1]?.value || '',
          major: inputs[2]?.value || '',
          degree: inputs[3]?.value || '',
          gpa: inputs[4]?.value || '',
          city: inputs[5]?.value || ''
        }
      })

      // 工作经历
      const workCards = document
        .getElementById('work-experience')
        .querySelectorAll('.card')
      const workList = Array.from(workCards).map((card) => {
        const inputs = card.querySelectorAll('input')
        return {
          company: inputs[0]?.value || '',
          time: inputs[1]?.value || '',
          title: inputs[2]?.value || '',
          city: inputs[3]?.value || ''
        }
      })

      // 项目经历
      const projectCards = document
        .getElementById('project-experience')
        .querySelectorAll('.card')
      const projectList = Array.from(projectCards).map((card) => {
        const inputs = card.querySelectorAll('input')
        return {
          projectName: inputs[0]?.value || '',
          time: inputs[1]?.value || '',
          role: inputs[2]?.value || ''
        }
      })

      // 2. 可以把数据存到 localStorage，也可以通过 Vuex / Pinia / query 参数等方式传递
      const formData = {
        name,
        phone,
        email,
        educationList,
        workList,
        projectList
      }
      localStorage.setItem('resumeFormData', JSON.stringify(formData))

      // 3. 跳转到创建简历的页面
      this.$router.push('/create-resume')
    },

    // ================== 教育经历 ==================
    addEducationExperience() {
      const container = document.getElementById('education-experience')
      let firstCard = container.querySelector('.card')
      if (firstCard) {
        const newCard = firstCard.cloneNode(true)
        this.clearInputs(newCard)
        container.appendChild(newCard)
      } else {
        const template = document.getElementById('education-card-template')
        const clone = template.cloneNode(true)
        this.clearInputs(clone)
        container.appendChild(clone)
      }
    },

    // ================== 工作经历 ==================
    addWorkExperience() {
      const container = document.getElementById('work-experience')
      let firstCard = container.querySelector('.card')
      if (firstCard) {
        const newCard = firstCard.cloneNode(true)
        this.clearInputs(newCard)
        container.appendChild(newCard)
      } else {
        const template = document.getElementById('work-card-template')
        const clone = template.cloneNode(true)
        this.clearInputs(clone)
        container.appendChild(clone)
      }
    },

    // ================== 项目经历 ==================
    addProjectExperience() {
      const container = document.getElementById('project-experience')
      let firstCard = container.querySelector('.card')
      if (firstCard) {
        const newCard = firstCard.cloneNode(true)
        this.clearInputs(newCard)
        container.appendChild(newCard)
      } else {
        const template = document.getElementById('project-card-template')
        const clone = template.cloneNode(true)
        this.clearInputs(clone)
        container.appendChild(clone)
      }
    },

    // ================== 删除卡片 ==================
    removeCard(event) {
      const btn = event.currentTarget
      const card = btn.closest('.card')
      if (card) {
        card.remove()
      }
    },

    clearInputs(cardElement) {
      const inputs = cardElement.querySelectorAll('input')
      inputs.forEach((inp) => (inp.value = ''))
    }
  }
}
</script>

<style scoped>
.scroll-container {
  height: 100vh;
  overflow-y: auto;
  background-color: #f0f2f5; /* Optional: Add a light background for better contrast */
}

/* 容器外框与标题 */
.container {
  max-width: 900px;
  margin: 2rem auto;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
.title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.subtitle {
  font-size: 1rem;
  color: #999999;
  margin-bottom: 2rem;
}

/* 表单与卡片样式 */
.form-group {
  margin-bottom: 1rem;
}
.form-label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
}
.required {
  color: red;
  margin-left: 0.25rem;
}
.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s ease;
}
.form-input:focus {
  border-color: #69a7ff;
  box-shadow: 0 0 0 2px rgba(105, 167, 255, 0.2);
}

/* 分块标题(教育/工作/项目经历) */
.block-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: #69a7ff;
}

/* 卡片样式 */
.card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  background-color: #fafafa;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  position: relative;
}
.card .remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s ease;
}
.card .remove-btn:hover {
  color: #ff4d4f;
}

/* 添加按钮 */
.add-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #69a7ff;
  font-weight: 600;
  font-size: 0.9rem;
  border: 2px dashed #69a7ff;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  background-color: #fff;
}
.add-button:hover {
  background-color: #69a7ff;
  color: #ffffff;
}

/* 提交按钮 */
.submit-btn {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 2rem auto 0;
  background-color: #69a7ff;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}
.submit-btn:hover {
  background-color: #578deb;
  box-shadow: 0 3px 8px rgba(105, 167, 255, 0.2);
}

/* 响应式 */
@media (max-width: 600px) {
  .card {
    grid-template-columns: 1fr; /* 小屏时单列 */
  }
}
</style>