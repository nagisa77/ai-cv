<template>
  <div class="interview-page">
    <h2 class="page-title">面试题合集</h2>

    <div v-if="loadingMeta" class="loading-container">
      <l-waveform size="60" stroke="3.5" speed="1" color="var(--color-primary)" />
    </div>

    <div v-else class="filters">
      <div class="filter-section">
        <div class="filter-title">选择平台:</div>
        <div class="options">
          <label v-for="p in platforms" :key="p" class="option-item">
            <input type="checkbox" :value="p" v-model="selectedPlatforms" />
            {{ p }}
          </label>
        </div>
      </div>
      <div class="filter-section">
        <div class="filter-title">选择分类:</div>
        <div class="options">
          <label v-for="c in categories" :key="c" class="option-item">
            <input type="checkbox" :value="c" v-model="selectedCategories" />
            {{ c }}
          </label>
        </div>
      </div>
    </div>

    <div class="questions-container">
      <div v-if="loadingQuestions" class="loading-container">
        <l-waveform size="60" stroke="3.5" speed="1" color="var(--color-primary)" />
      </div>
      <div v-else>
        <div v-if="questions.length === 0" class="empty-state">暂无数据</div>
        <ul v-else class="question-list">
          <li v-for="q in questions" :key="q.id" class="question-item">
            <div class="question-text">{{ q.question }}</div>
            <div class="question-meta">
              <span class="meta-field">分类: {{ q.categories.join(', ') }}</span>
              <span class="meta-field">平台: {{ q.platform.join(', ') }}</span>
              <span class="meta-field">数据源: {{ q.sourcesCount }}</span>
            </div>
          </li>
        </ul>
        <div class="pagination">
          <button class="btn btn-white" :disabled="page === 1" @click="changePage(page - 1)">上一页</button>
          <span class="page-info">第 {{ page }} 页</span>
          <button class="btn btn-white" :disabled="page >= totalPages" @click="changePage(page + 1)">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import apiClient from '@/api/axios'
import { waveform } from 'ldrs'

waveform.register()

const platforms = ref([])
const categories = ref([])
const selectedPlatforms = ref([])
const selectedCategories = ref([])
const questions = ref([])
const page = ref(1)
const pageSize = 10
const totalPages = ref(1)
const loadingMeta = ref(false)
const loadingQuestions = ref(false)

const fetchMeta = async () => {
  loadingMeta.value = true
  try {
    const res = await apiClient.get('/interview/meta')
    platforms.value = res.data.data.platforms || []
    categories.value = res.data.data.categories || []
  } catch (err) {
    console.error(err)
  }
  loadingMeta.value = false
}

const fetchQuestions = async () => {
  loadingQuestions.value = true
  try {
    const params = { page: page.value, pageSize }
    if (selectedPlatforms.value.length) params.platform = selectedPlatforms.value.join(',')
    if (selectedCategories.value.length) params.categories = selectedCategories.value.join(',')
    const res = await apiClient.get('/interview/questions', { params })
    questions.value = res.data.data || []
    totalPages.value = questions.value.length === pageSize ? page.value + 1 : page.value
  } catch (err) {
    console.error(err)
  }
  loadingQuestions.value = false
}

const changePage = p => {
  page.value = p
  fetchQuestions()
}

onMounted(() => {
  fetchMeta()
  fetchQuestions()
})

watch([selectedPlatforms, selectedCategories], () => {
  page.value = 1
  fetchQuestions()
})
</script>

<style scoped>
.interview-page {
  padding: 20px;
}
.page-title {
  margin-bottom: 20px;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 20px;
}
.filter-title {
  font-weight: 600;
  margin-bottom: 8px;
}
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.option-item {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  font-size: 14px;
}
.question-list {
  list-style: none;
  padding: 0;
}
.question-item {
  background: #fff;
  margin-bottom: 12px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.question-text {
  font-weight: 600;
  margin-bottom: 8px;
}
.question-meta {
  font-size: 12px;
  color: #555;
}
.meta-field {
  margin-right: 12px;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}
.loading-container {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
.btn {
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
}
.btn-white {
  background-color: #fff;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
}
.btn-white:hover:not(:disabled) {
  background-color: var(--color-secondary);
}
.btn:disabled {
  background-color: var(--color-gray);
  color: var(--color-gray-dark);
  border: 1.5px solid var(--color-gray-dark);
  cursor: not-allowed;
}
.empty-state {
  text-align: center;
  color: #888;
  padding: 60px 0;
}
</style>

