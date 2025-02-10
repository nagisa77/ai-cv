<template>
  <div class="template-select">
    <h1 class="template-select-title">选择<span class="template-select-title-highlight">简历模板</span></h1>
    <div class="category-select">
      <div class="category-select-item" v-for="category in categories" :key="category.id"
        :class="{ 'active': selectedCategory === category.id }" @click="selectCategory(category.id)">
        {{ category.name }}
      </div>
    </div>

    <div class="template-card-container">
      <div v-for="template in filteredTemplates" :key="template.id" class="template-card"
        @click="selectTemplate(template.id)">
        <img class="template-card-preview" :src="template.preview" alt="模板预览">
        <h3 class="template-card-name">{{ template.name }}</h3>
        <p class="template-card-description">{{ template.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateSelection',
  data() {
    return {
      selectedCategory: 'hot',  // 默认选择热门分类
      categories: [
        { id: 'hot', name: '热门' },
        { id: 'general', name: '通用' },
        { id: 'experienced', name: '社招' },
        { id: 'freshgraduate', name: '校招/实习' },
        { id: 'zeroexperience', name: '零经验' },
        { id: 'english', name: '英文' }
      ],
      templates: [
        {
          id: 'default',
          category: 'hot',
          name: '经典模板',
          preview: require('../../img/model_preview/template-default.png'),
          description: '标准简历格式，适合大多数求职场景'
        },
        {
          id: 'default',
          category: 'hot',
          name: '经典模板2',
          preview: require('../../img/model_preview/template-default.png'),
          description: '标准简历格式，适合大多数求职场景'
        },
        {
          id: 'default',
          category: 'hot',
          name: '经典模板3',
          preview: require('../../img/model_preview/template-default.png'),
          description: '标准简历格式，适合大多数求职场景'
        },
        {
          id: 'modern',
          category: 'general',
          name: '现代风格',
          preview: require('../../img/model_preview/template-default.png'),
          description: '简洁现代的设计风格，突出核心信息'
        },
        {
          id: 'creative',
          category: 'experienced',
          name: '创意模板',
          preview: require('../../img/model_preview/template-default.png'),
          description: '适合设计类岗位的创意版式'
        },
        {
          id: 'simple',
          category: 'freshgraduate',
          name: '简约模板',
          preview: require('../../img/model_preview/template-default.png'),
          description: '简约大气，适合应届生'
        },
        {
          id: 'elegant',
          category: 'zeroexperience',
          name: '优雅模板',
          preview: require('../../img/model_preview/template-default.png'),
          description: '适合零经验的求职者，简洁美观'
        },
        {
          id: 'bilingual',
          category: 'english',
          name: '双语模板',
          preview: require('../../img/model_preview/template-default.png'),
          description: '适合申请国际职位的简历'
        }
      ]
    }
  },
  computed: {
    filteredTemplates() {
      return this.templates.filter(template => template.category === this.selectedCategory);
    }
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
    },
    selectTemplate(templateId) {
      console.log(templateId);
      this.$router.push({
        name: 'ResumeForm',
      })
    }
  }
}
</script>

<style scoped>
.template-select {
  margin-top: 100px;
  margin-left: 50px;
}

.template-select-title {
  font-size: 24px;
  font-weight: bold;
}

.template-select-title-highlight {
  color: var(--color-primary);
}

.category-select {
  display: flex;
  margin-top: 40px;
  flex-direction: row;
  gap: 50px;
}

.category-select-item {
  cursor: pointer;
}

.category-select-item.active {
  color: var(--color-primary);
}

.template-card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
}

.template-card {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 190px;
}

.template-card:hover {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  scale: 1.05;
  transition: all 0.3s ease;
} 

.template-card-preview {
  width: 170px;
  margin-left: 10px;
}

.template-card-name {
  font-size: 16px;
  font-weight: bold;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.template-card-description {
  font-size: 12px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 6px;
  margin-bottom: 20px;
  opacity: 0.7;
}
</style>
