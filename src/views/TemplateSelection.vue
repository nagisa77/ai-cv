<template>
  <div class="template-select">
    <h1 class="title">选择<span style="color: #409eff;">简历模板</span></h1>

    <!-- 类别选项卡 -->
    <div class="category-tabs">
      <button v-for="category in categories" :key="category"
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
      currentCategory: '热门',
      categories: ['热门', '通用', '社招', '校招/实习', '零经验', '英文'],
      templatesByCategory: {
        '热门': [
          {
            id: 'modern',
            name: '现代极简',
            preview: require('@/assets/model_preview/template-default.png'), 
            description: '2024年最受欢迎设计，适合大多数求职场景',
            tags: ['有趣', 'crazy'],
            isNew: true
          },
          {
            id: 'modern',
            name: '现代极简',
            preview: require('@/assets/model_preview/template-default.png'), 
            description: '2024年最受欢迎设计，适合大多数求职场景',
            tags: ['有趣', 'crazy'],
            isNew: true
          },
          {
            id: 'modern',
            name: '现代极简',
            preview: require('@/assets/model_preview/template-default.png'), 
            description: '2024年最受欢迎设计，适合大多数求职场景',
            tags: ['有趣', 'crazy'],
            isNew: true
          },
          {
            id: 'modern',
            name: '现代极简',
            preview: require('@/assets/model_preview/template-default.png'), 
            description: '2024年最受欢迎设计，适合大多数求职场景',
            tags: ['有趣', 'crazy'],
            isNew: true
          },
          {
            id: 'professional',
            name: '专业经典',
            preview: require('@/assets/model_preview/template-default.png'), 
            description: '传统稳重的版式设计，适合金融、法律等传统行业',
            tags: ['好玩', 'shit']
          }
        ],
        '通用': [
          // 通用模板数据...
        ],
        '社招': [
          // 社招模板数据...
        ],
        '校招/实习': [
          {
            id: 'campus',
            name: '应届生专用',
            preview: require('@/assets/model_preview/template-default.png'), 
            description: '突出教育经历和实习经验，适合应届毕业生',
            tags: ['校招', '实习'],
            isNew: true
          }
        ],
        '零经验': [
          // 零经验模板数据...
        ],
        '英文': [
          // 英文模板数据...
        ]
      }
    }
  },
  computed: {
    filteredTemplates() {
      return this.templatesByCategory[this.currentCategory]
    }
  },
  methods: {
    selectTemplate(templateId) {
      this.$router.push({
        name: 'ResumeForm',
        params: { templateType: templateId }
      })
    }
  }
}
</script>

<style scoped>
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
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
  height: 350px;
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