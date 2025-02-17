<template>
  <div class="template-select">
    <h1 class="title">选择<span style="color: #409eff;">简历模板</span></h1>

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

              <div class="modal-body">
                <img v-if="selectedTemplate" :src="selectedTemplate.preview" alt="模板预览" class="modal-preview">
              </div>

              <div class="modal-footer">
                <button class="modal-button cancel" @click="isConfirmPopupVisible = false">
                  取消
                </button>
                <button class="modal-button confirm" @click="confirmTemplate">
                  确认选择
                </button>
              </div>
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
          <img :src="template.preview" alt="模板预览" class="preview-image">
          <div class="badge" v-if="template.isNew">NEW</div>
        </div>
        <div class="template-info">
          <h3>{{ template.name }}</h3>
          <p class="description">{{ template.description }}</p>
          <div class="tags">
            <span v-for="tag in template.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateSelection',
  data() {
    return {
      currentCategory: null,
      selectedTemplate: null,
      isConfirmPopupVisible: false,
      categories: ['热门', '通用', '社招', '校招/实习', '零经验', '英文'],
      templatesByCategory: {
        '热门': [
        ],
        '通用': [
          {
            id: 'default',
            name: '现代极简',
            preview: require('@/assets/model_preview/template-general1.png'),
            description: '2024年最受欢迎设计，适合大多数求职场景',
            tags: ['通用', '现代'],
            isNew: false
          },
          {
            id: 'general_simple',
            name: '简约现代模板',
            preview: require('@/assets/model_preview/template-general2.png'),
            description: '2024年最受欢迎设计，适合大多数求职场景',
            tags: ['通用', '简约'],
            isNew: false
          },
          {
            id: 'creative',
            name: '创意模板, 现代',
            preview: require('@/assets/model_preview/template-general3.png'),
            description: '2024年最受欢迎设计，适合大多数求职场景',
            tags: ['创意', '独特'],
            isNew: false
          },
        ],
        '社招': [
          {
            id: 'social',
            name: '社招模板, 现代',
            preview: require('@/assets/model_preview/template-social-recruitment1.png'),
            description: '社招模板, 适合社招场景',
            tags: ['有趣', '社招'],
            isNew: false
          },
        ],
        '校招/实习': [
        ],
        '零经验': [
        ],
        '英文': [
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
  methods: {
    selectTemplate(templateId) {
      // 找到选中的模板
      this.selectedTemplate = this.filteredTemplates.find(t => t.id === templateId)
      this.isConfirmPopupVisible = true
    },
    confirmTemplate() {
      this.isConfirmPopupVisible = false
      this.$router.push({
        name: 'ResumeForm',
        params: { templateType: this.selectedTemplate.id }
      })
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
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  width: 400px;
  padding: 20px;
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  text-align: center;
}

.modal-body {
  margin: 20px 0;
}

.modal-preview {
  width: 400px;
  border-radius: 8px;
  border: 1px solid #eee;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.modal-button {
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-button.confirm {
  background: var(--color-primary);
  color: white;
  border: none;
}

.modal-button.confirm:hover {
  background: var(--color-primary);
}

.modal-button.cancel {
  background: #f0f0f0;
  color: #606266;
  border: 1px solid #dcdfe6;
}

.modal-button.cancel:hover {
  background: #e6e6e6;
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
  max-width: 1200px;
  margin: 40px auto;
  margin-top: 100px;
  padding: 0 20px;
}

.title {
  text-align: center;
  margin-bottom: 40px;
  color: #2c3e50;
}

.category-tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.tab-button {
  flex-shrink: 0;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background: #f0f0f0;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-button.active {
  background: #409eff;
  color: white;
}

.template-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 20px;
}

.template-card {
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.template-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.preview-wrapper {
  position: relative;
  background: #f8f9fa;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4757;
  color: white;
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 12px;
}

.template-info {
  padding: 20px;
}

.template-info h3 {
  margin: 0 0 10px;
  color: #333;
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
  background: #e8f4ff;
  color: #409eff;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .template-container {
    grid-template-columns: 1fr;
  }

  .category-tabs {
    gap: 10px;
  }

  .tab-button {
    padding: 8px 15px;
    font-size: 14px;
  }
}
</style>