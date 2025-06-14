<template>
  <div class="template-select">
    <!-- 添加返回按钮 -->
    <button class="back-button" @click="goBack">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      返回
    </button>

    <h1 class="title">你好，欢迎来到<span style="color: var(--color-primary);">AI简历君</span></h1>
    <h2 class="subtitle">在开始为您创建AI智能简历前，请先选择你心仪的简历模板：</h2>

    <!-- 新增确认弹窗 -->
    <teleport to="body">
      <transition name="fade">
        <div v-if="isConfirmPopupVisible" class="modal-mask">
          <div class="modal-blur"></div>
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <h3>您确认要选择此模版吗？</h3>
              </div>

              <div class="modal-body" @wheel.prevent="handleWheel">
                <img ref="previewImage" :src="selectedTemplate.colorOptions[selectedTemplate.selectedColor]" alt="模板预览"
                  class="modal-preview" :style="{
                    transform: 'scale(' + scale + ')',
                    transformOrigin: transformOrigin
                  }">
              </div>

              <div class="modal-footer">
                <button class="modal-button cancel" @click="isConfirmPopupVisible = false">
                  取消
                </button>
                <button class="modal-button confirm" @click="confirmTemplate" :disabled="isModifying"
                  :class="{ modifying: isModifying }">
                  确认选择
                  <span v-if="isModifying" class="loading"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- 上传简历时的进度条 -->
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="selectionType === 'upload_resume' && isModifying"
          class="progress-mask"
        >
          <div class="progress-wrapper">
            <p class="progress-title">正在解析简历... {{ fakeProgress }}%</p>
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: fakeProgress + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- 类别选项卡 -->
    <div class="category-tabs">
      <button v-for="category in filteredCategories" :key="category"
        :class="['tab-button', { active: currentCategory === category }]" @click="currentCategory = category">
        {{ category }}
      </button>
    </div>

    <!-- 模板展示区 -->
    <div class="template-container">
      <div v-for="template in filteredTemplates" :key="template.id" class="template-card"
        @click="selectTemplate(template.id)">
        <div class="preview-wrapper">
          <!-- 这里根据当前选中颜色显示对应预览图 -->
          <img :src="template.colorOptions[template.selectedColor]" alt="模板预览" class="preview-image" />
          <div class="badge" v-if="template.isNew">NEW</div>
        </div>
        <div class="template-info">
          <h3>{{ template.name }}</h3>
          <!-- <p class="description">{{ template.description }}</p> -->
          <!-- <div class="tags">
            <span v-for="tag in template.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div> -->
          <!-- 颜色切换区：阻止点击冒泡，避免触发整卡片的选中 -->
          <div class="color-selector" @click.stop>
            <span v-for="(url, color) in template.colorOptions" :key="color"
              :class="['color-circle', color, { active: template.selectedColor === color }]"
              @click="changeTemplateColor(template, color)"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/api/axios'
import { useToast } from 'vue-toastification'
import metadataInstance from '@/models/metadata_model.js'
import { resumeModel } from '@/models/resume_model.js'
import ChatgptModel from '@/models/chatgpt_model.js'

const chatgptInstance = ChatgptModel.getInstance()

export default {
  name: 'TemplateSelection',
  props: {
    selectionType: {
      type: String,
      default: 'create_resume'
    },
    resumeId: {
      type: String,
      default: ''
    },
    userUploadedResumeUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentCategory: null,
      selectedTemplate: null,
      isModifying: false,
      fakeProgress: 0,
      progressTimer: null,
      isConfirmPopupVisible: false,
      scale: 1,
      transformOrigin: '0 0',
      categories: ['热门', '通用', '社招', '校招/实习', '零经验', '英文'],
      templatesByCategory: {
        '热门': [
          // 示例：无数据可根据需求自行添加
        ],
        '通用': [
          {
            id: 'default',
            name: '模版1',
            description: '2024年最受欢迎设计，适合大多数求职场景',
            tags: ['通用', '现代'],
            isNew: false,
            selectedColor: 'gray',
            colorOptions: {
              gray: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_1_1.jpg',
              blue: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_1_2.jpg',
              red: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_1_3.jpg'
            }
          },
          {
            id: 'general_simple',
            name: '模版2',
            description: '2024年最受欢迎设计，适合大多数求职场景',
            tags: ['通用', '简约'],
            isNew: false,
            selectedColor: 'gray',
            colorOptions: {
              gray: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_2_1.jpg',
              blue: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_2_2.jpg',
              red: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_2_3.jpg'
            }
          },
          {
            id: 'creative_modern',
            name: '模版3',
            description: '2024年最受欢迎设计，适合大多数求职场景',
            tags: ['创意', '独特'],
            isNew: false,
            selectedColor: 'gray',
            colorOptions: {
              gray: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_3_1.jpg',
              blue: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_3_2.jpg',
              red: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_3_3.jpg'
            }
          },
        ],
        '社招': [
          // {
          //   id: 'social',
          //   name: '社招模板, 现代',
          //   description: '社招模板, 适合社招场景',
          //   tags: ['有趣', '社招'],
          //   isNew: false,
          //   selectedColor: 'red',
          //   colorOptions: {
          //     red: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_1_1.jpg',
          //     blue: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_1_2.jpg',
          //     gray: 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/model_preview_v1/model_1_3.jpg'
          //   }
          // },
        ],
        '校招/实习': [
          // 示例：无数据可根据需求自行添加
        ],
        '零经验': [
          // 示例：无数据可根据需求自行添加
        ],
        '英文': [
          // 示例：无数据可根据需求自行添加
        ]
      }
    }
  },
  computed: {
    filteredCategories() {
      return Object.keys(this.templatesByCategory).filter(
        category => this.templatesByCategory[category].length > 0
      )
    },
    filteredTemplates() {
      return this.templatesByCategory[this.currentCategory]
    }
  },
  created() {
    if (this.filteredCategories.length > 0) {
      this.currentCategory = this.filteredCategories[0]
    }
  },
  setup() {
    const toast = useToast()
    return {
      toast
    }
  },
  methods: {
    // 处理滚轮缩放
    handleWheel(event) {
      const img = this.$refs.previewImage
      if (!img) return

      const rect = img.getBoundingClientRect()
      const offsetX = event.clientX - rect.left
      const offsetY = event.clientY - rect.top

      // 计算缩放中心点百分比
      const originX = (offsetX / rect.width) * 100
      const originY = (offsetY / rect.height) * 100

      // 调整缩放比例（步长0.05）
      const delta = event.deltaY > 0 ? -0.05 : 0.05
      let newScale = this.scale + delta

      // 限制最小缩放比例为1
      newScale = Math.max(newScale, 1)

      // 更新状态
      this.transformOrigin = originX + '% ' + originY + '%'
      this.scale = newScale
    },

    // 点击模板卡片
    selectTemplate(templateId) {
      this.scale = 1
      this.transformOrigin = '0 0'
      // 找到选中的模板
      this.selectedTemplate = this.filteredTemplates.find(t => t.id === templateId)
      this.isConfirmPopupVisible = true
    },

    // 切换模板颜色
    changeTemplateColor(template, color) {
      template.selectedColor = color
    },

    // 确认选择模板
    async confirmTemplate() {
      if (this.selectionType === 'create_resume') {
        // 新建简历，直接进入对应表单（可将颜色信息也一并传入下个路由）
        this.isConfirmPopupVisible = false
        // 使用统一的简历表单组件
        this.$router.push({
          name: 'ResumeFormUnified',
          params: {
            templateType: this.selectedTemplate.id,
            color: this.selectedTemplate.selectedColor
          }
        })
      } else if (this.selectionType === 'change_resume') {
        // 修改已有简历的模板
        this.isModifying = true // 进入修改状态
        try {
          // 将模板ID以及对应颜色等信息传给后端
          await apiClient.patch(`/user/resumes/${this.resumeId}`, {
            templateType: this.selectedTemplate.id,
            color: this.selectedTemplate.selectedColor
          })
          this.toast.success('模板修改成功')
          this.isConfirmPopupVisible = false
          this.$router.push({
            name: 'CreateResume',
            params: {
              templateType: this.selectedTemplate.id,
              resumeId: this.resumeId,
              color: this.selectedTemplate.selectedColor
            }
          })
        } catch (error) {
          this.toast.error('模板修改失败，请重试')
          console.error('模板修改失败:', error)
        } finally {
          this.isModifying = false // 无论成功失败都重置状态
        }
      } else if (this.selectionType === 'upload_resume') {
        // 上传简历，直接进入对应表单（可将颜色信息也一并传入下个路由）
        this.isModifying = true
        this.startFakeProgress()
        try {
          // 1. 组织 FormData
          const formData = new FormData()

          // 如果有文件对象，则使用 formData.append('image', file)
          // 如果仅有远程链接，就用 formData.append('url', this.userUploadedResumeUrl)
          formData.append('url', this.userUploadedResumeUrl)

          // 2. 传给后端的模板描述和模板 JSON
          //    下面只是示例，你可以改成实际想传的描述/JSON 结构
          //    如果"模板 JSON"就是个字符串，可以直接 append
          const resumeTemplateDescription = '请根据上传的简历，生成一份符合模版要求的简历, 请直接返回JSON字符串，不要返回任何其他内容'
          // 这里的 `resumeTemplate` 可以是后端需要的 JSON 字符串
          // 也可以把你已有的"选中模板id"或"选中模板字段"整理成 JSON
          const resumeTemplateJSON = {
            education: [metadataInstance.formatForType('education')],
            workExperience: [metadataInstance.formatForType('workExperience')],
            projectExperience: [metadataInstance.formatForType('projectExperience')],
            personalInfo: metadataInstance.formatForType('personalInfo'),
            personalSummary: metadataInstance.formatForType('personalSummary'),
          }

          // 以字符串形式发送
          formData.append('resumeTemplate', JSON.stringify(resumeTemplateJSON))
          formData.append('resumeTemplateDescription', resumeTemplateDescription)

          // 3. 发送请求到 /pic/ocr-resume
          const response = await apiClient.post('/pic/ocr-resume', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

          // 假设后端返回的数据结构为：
          // {
          //   code: 20020,
          //   data: {
          //     ocrText: 'xxx',
          //     resume: { ...AI生成的简历JSON... }
          //   }
          // }
          if (response.data.code === 20020) {
            let gptContent = response.data.data.resume.choices[0].message.content.trim();
            gptContent = this.extractJsonContent(gptContent);
            console.log(gptContent)
            resumeModel.isFetching = true
            apiClient
              .post('/user/resumes', {
                templateType: this.selectedTemplate.id,
                color: this.selectedTemplate.selectedColor
              })
              .then((response) => {
                const newResume = response.data.data
                resumeModel.setCurrentResumeId(newResume.resumeId)
                metadataInstance.clearMetadata()
                chatgptInstance.clearConversations()

                try {
                  const parsedContent = JSON.parse(gptContent);
                  if (typeof parsedContent.education === 'string') {
                    parsedContent.education = JSON.parse(parsedContent.education)
                  }
                  if (!Array.isArray(parsedContent.education)) {
                    parsedContent.education = [parsedContent.education]
                  }
                  parsedContent.education.forEach(edu => {
                    metadataInstance.setContentForType(
                      'education',
                      {
                        title: edu.school || edu.title || '',
                        major: edu.major || '',
                        degree: edu.degree || '',
                        gpa: edu.gpa || '',
                        city: edu.city || '',
                        honors: edu.honors || '',
                        courses: edu.courses || '',
                        from_time: edu.from_time || '',
                        to_time: edu.to_time || '',
                        content: edu.content || []
                      },
                      edu.school || edu.title || ''
                    )
                  })

                  if (typeof parsedContent.workExperience === 'string') {
                    parsedContent.workExperience = JSON.parse(parsedContent.workExperience)
                  }
                  if (!Array.isArray(parsedContent.workExperience)) {
                    parsedContent.workExperience = [parsedContent.workExperience]
                  }
                  parsedContent.workExperience.forEach(work => {
                    metadataInstance.setContentForType(
                      'workExperience',
                      {
                        title: work.company || work.title || '',
                        sub_title: work.position || work.sub_title || '',
                        city: work.city || '',
                        from_time: work.from_time || '',
                        to_time: work.to_time || '',
                        content: work.content || []
                      },
                      work.company || work.title || ''
                    )
                  })

                  if (typeof parsedContent.projectExperience === 'string') {
                    parsedContent.projectExperience = JSON.parse(parsedContent.projectExperience)
                  }
                  if (!Array.isArray(parsedContent.projectExperience)) {
                    parsedContent.projectExperience = [parsedContent.projectExperience]
                  }
                  parsedContent.projectExperience.forEach(proj => {
                    metadataInstance.setContentForType(
                      'projectExperience',
                      {
                        title: proj.company || proj.title || '',
                        sub_title: proj.position || proj.sub_title || '',
                        from_time: proj.from_time || '',
                        to_time: proj.to_time || '',
                        content: proj.content || []
                      },
                      proj.projectName || proj.title || ''
                    )
                  })

                  if (typeof parsedContent.personalInfo === 'string') {
                    parsedContent.personalInfo = JSON.parse(parsedContent.personalInfo)
                  }

                  metadataInstance.setContentForType('personalInfo', {
                    name: parsedContent.personalInfo?.name || '',
                    phone: parsedContent.personalInfo?.phone || '',
                    email: parsedContent.personalInfo?.email || '',
                    targetCompany: parsedContent.personalInfo?.targetCompany || '',
                    jobTitle: parsedContent.personalInfo?.jobTitle || '',
                    jobDescription: parsedContent.personalInfo?.jobDescription || '',
                    avatar: parsedContent.personalInfo?.avatar || ''
                  })
                  metadataInstance.setContentForType('personalSummary', parsedContent.personalSummary)
                } catch (error) {
                  console.error('解析JSON内容失败:', error);
                  this.toast.error('解析简历内容失败');
                }

                // 跳转到简历主编辑页面 (CreateResume)
                this.$router.push({
                  name: 'CreateResume',
                  params: {
                    templateType: this.selectedTemplate.id,
                    resumeId: newResume.resumeId,
                    color: this.selectedTemplate.selectedColor
                  }
                })

                this.toast.success('OCR识别成功，已生成简历内容')
              })
              .catch((error) => {
                resumeModel.isFetching = false;
                console.error('创建简历失败:', error);
                this.toast.error('创建简历失败，请稍后再试');
              });
          } else {
            this.toast.error('OCR识别失败，请重试或检查接口')
          }
        } catch (error) {
          console.error('上传简历识别失败:', error)
          this.toast.error('上传简历识别失败，请稍后再试')
        } finally {
          this.stopFakeProgress()
        }
      }
    },

    extractJsonContent(gptContent) {
      const text = gptContent.trim();
      if (text.startsWith('{') && text.endsWith('}')) {
        return text;
      }
      const jsonBlockMatch = text.match(/```json([\s\S]*?)```/);
      if (jsonBlockMatch && jsonBlockMatch[1]) {
        return jsonBlockMatch[1].trim();
      }
      const genericBlockMatch = text.match(/```([\s\S]*?)```/);
      if (genericBlockMatch && genericBlockMatch[1]) {
        return genericBlockMatch[1].trim();
      }
      return text;
    },

    startFakeProgress() {
      this.fakeProgress = 0;
      let slowIncrementCounter = 0;
      if (this.progressTimer) {
        clearInterval(this.progressTimer);
      }
      this.progressTimer = setInterval(() => {
        if (this.fakeProgress < 95) {
          this.fakeProgress += Math.floor(Math.random() * 5) + 1;
          if (this.fakeProgress > 95) this.fakeProgress = 95;
        } else if (this.fakeProgress < 100) {
          slowIncrementCounter += 500;
          if (slowIncrementCounter >= 3000) {
            this.fakeProgress += 1;
            slowIncrementCounter = 0;
          }
        }
      }, 500);
    },

    stopFakeProgress() {
      if (this.progressTimer) {
        clearInterval(this.progressTimer);
        this.progressTimer = null;
      }
      this.fakeProgress = 100;
      setTimeout(() => {
        this.fakeProgress = 0;
        this.isModifying = false;
      }, 300);
    },

    // 添加返回方法
    goBack() {
      if (this.selectionType === 'change_resume' && this.resumeId) {
        // 如果是从简历编辑页来的，返回到简历编辑页
        this.$router.push({
          name: 'CreateResume',
          params: { resumeId: this.resumeId }
        })
      } else {
        // 否则返回上一页
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-wrapper {
  position: relative;
  z-index: 9999;
}

.modal-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  width: 600px;
  padding: 30px;
  transition: all 0.3s ease;
}

.modal-header {
  margin-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 15px;
}

.modal-header h3 {
  margin: 0;
  color: var(--color-primary);
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
}

.modal-body {
  margin: 25px 0;
  overflow: auto;
  max-height: 65vh;
  display: flex;
  justify-content: center;
}

.modal-preview {
  width: 400px;
  max-width: 100%;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.modal-button {
  padding: 12px 30px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
}

.modal-button.confirm {
  background: var(--color-primary);
  color: white;
  border: none;
  font-weight: 500;
  padding: 14px 35px;
  box-shadow: 0 4px 15px rgba(204, 124, 94, 0.3);
}

.modal-button.confirm:disabled {
  background: var(--color-primary-disabled);
  cursor: not-allowed;
  opacity: 0.7;
}

.modal-button.confirm.modifying::after {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-left: 10px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.modal-button.confirm:hover {
  background: var(--color-primary-dark, #b96c4c);
  transform: translateY(-2px);
}

.modal-button.cancel {
  background: #f6f6f6;
  color: #606266;
  border: 1px solid #dcdfe6;
  font-weight: 500;
  padding: 14px 35px;
}

.modal-button.cancel:hover {
  background: #e6e6e6;
  transform: translateY(-2px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.template-select {
  padding-left: 60px;
  padding-top: 50px;
  margin-left: 60px;
  background-color: var(--color-background);
  height: calc(100vh - 80px);
  overflow-y: auto;
  overflow-x: hidden;
}

.title {
  color: var(--color-black);
}

.subtitle {
  margin-bottom: 23px;
  font-weight: 350;
  font-size: 18px;
  color: var(--color-black);
}

.category-tabs {
  display: flex;
  padding-top: 2px;
  gap: 15px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.tab-button {
  flex-shrink: 0;
  padding: 10px 22px;
  border: 1px solid var(--color-primary);
  border-radius: 25px;
  background: var(--color-secondary);
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.tab-button:hover:not(.active) {
  background: rgba(204, 124, 94, 0.05);
  transform: translateY(-2px);
}

.tab-button.active {
  background: var(--color-primary);
  color: var(--color-secondary);
  border: none;
  box-shadow: 0 4px 10px rgba(204, 124, 94, 0.25);
}

.template-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding-right: 80px;
  padding-bottom: 80px;
}

.template-card {
  border: 1px solid #eaeaea;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  background: white;
}

.template-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(204, 124, 94, 0.1);
  border-color: var(--color-primary-light);
}

.preview-wrapper {
  position: relative;
  background: #f8f9fa;
  aspect-ratio: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s;
}

.template-card:hover .preview-image {
  transform: scale(1.03);
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--color-primary);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 3px 8px rgba(204, 124, 94, 0.3);
}

.template-info {
  padding: 10px 20px;
  border-top: 1px solid #f5f5f5;
}

.template-info h3 {
  margin: 0 0 10px;
  color: #333;
  font-weight: 500;
  font-size: 18px;
}

.description {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: rgba(204, 124, 94, 0.1);
  color: var(--color-primary);
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  transition: all 0.2s;
}

.tag:hover {
  background: rgba(204, 124, 94, 0.2);
}

/* 颜色选择器样式 */
.color-selector {
  margin-top: 12px;
}

.color-circle {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  vertical-align: middle;
}

.color-circle.red {
  background-color: var(--color-cv-red);
  /* 红 */
}

.color-circle.blue {
  background-color: var(--color-cv-blue);
  /* 蓝 */
}

.color-circle.gray {
  background-color: var(--color-cv-gray);
  /* 灰 */
}

.color-circle.active {
  border-color: #333;
}


@media (max-width: 768px) {
  .template-select {
    padding-left: 15px;
    margin-left: 0;
    padding-top: 80px;
  }

  .template-container {
    grid-template-columns: repeat(2, 1fr);
    padding-right: 15px;
    gap: 15px;
  }

  .category-tabs {
    gap: 10px;
    padding-right: 15px;
    overflow-x: auto;
  }

  .tab-button {
    padding: 8px 15px;
    font-size: 14px;
  }

  .title {
    margin-top: 50px;
  }

  .subtitle {
    font-size: 16px;
    margin-bottom: 30px;
  }

  .back-button {
    left: 20px;
    top: 15px;
  }

  .modal-container {
    width: 90%;
    padding: 20px;
  }

  .modal-preview {
    width: 100%;
  }

  .modal-header h3 {
    font-size: 1.2rem;
  }
}

/* 添加平板电脑和中等屏幕的响应式支持 */
@media (min-width: 769px) and (max-width: 1024px) {
  .template-container {
    grid-template-columns: repeat(2, 1fr);
    padding-right: 40px;
  }

  .template-select {
    padding-left: 40px;
    margin-left: 40px;
  }

  .back-button {
    left: 60px;
  }
}

/* 确保小型设备上至少有双栏 */
@media (min-width: 481px) and (max-width: 768px) {
  .template-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .template-select {
    padding-left: 10px;
    padding-top: 70px;
  }

  .template-container {
    grid-template-columns: repeat(2, 1fr);
    padding-right: 10px;
    gap: 10px;
  }

  .modal-container {
    width: 90%;
    max-width: 400px;
  }

  .modal-preview {
    width: 100%;
  }

  .template-info {
    padding: 12px;
  }

  .template-info h3 {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .description {
    font-size: 12px;
    margin-bottom: 8px;
  }

  .tag {
    padding: 2px 8px;
    font-size: 10px;
  }

  .title {
    font-size: 22px;
  }

  .subtitle {
    font-size: 14px;
    margin-bottom: 20px;
  }
}

/* 增加特大屏幕支持 */
@media (min-width: 1440px) {
  .template-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    max-width: 1600px;
  }
}

/* 返回按钮样式 */
.back-button {
  position: absolute;
  top: 20px;
  left: 100px;
  /* 考虑到左侧菜单栏 */
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

/* 上传简历虚拟进度条样式 */
.progress-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 10000;
}

.progress-wrapper {
  width: 80%;
  max-width: 400px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.progress-title {
  margin-bottom: 15px;
  font-size: 16px;
  color: var(--color-primary);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  width: 0;
  transition: width 0.3s ease;
}
</style>
