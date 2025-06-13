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
            <img :src="platformIconMap[p]" alt="icon" class="option-icon" />
            {{ platformNameMap[p] }}
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
        <div ref="loadMoreTrigger" class="load-trigger"></div>
        <div v-if="!hasMore && questions.length" class="end-text">没有更多了</div>
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
const hasMore = ref(true)
const loadMoreTrigger = ref(null)
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
  if (loadingQuestions.value || !hasMore.value) return
  loadingQuestions.value = true
  try {
    const params = { page: page.value, pageSize }
    if (selectedPlatforms.value.length) params.platform = selectedPlatforms.value.join(',')
    if (selectedCategories.value.length) params.categories = selectedCategories.value.join(',')
    const res = await apiClient.get('/interview/questions', { params })
    const data = res.data.data || []
    if (page.value === 1) {
      questions.value = data
    } else {
      questions.value = questions.value.concat(data)
    }
    if (data.length < pageSize) {
      hasMore.value = false
    } else {
      page.value += 1
    }
  } catch (err) {
    console.error(err)
  }
  loadingQuestions.value = false
}

const platformNameMap = {
  'xhs': '小红书',
  'zhihu': '知乎',
}

const platformIconMap = {
  'xhs': 'https://s1.aigei.com/src/img/png/ac/acf1db67ec814ae0840d0a5a94dcd1d8.png?imageMogr2/auto-orient/thumbnail/!282x320r/gravity/Center/crop/282x320/quality/85/%7CimageView2/2/w/282&e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:bgG2RuXXzmiM9ajue1FY4R9Rl4Q=',
  'zhihu': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAwFBMVEUPiOv///8GhusAgeoAhu0+jt3V3ORbmNb09va+2vnV6fsAf+nu+P6KufNFm+4Ae+l0sfG00veq0Pcjj+3k8Pzc7PsdlO1fpvA0k+2wzvaJwvQAd+lerfHj7PvQ5fr5/P84jOwAgODg6O7Dz9+VwvR0otZOoe/G4fq+0eWzx905jdd5q+EAe98th9mhv93T3+5qot5VlMpIi86juM2KqcaOtuChw+gPftWxyemdt9uZyfV2uPOGqNCJs+VrncgAb8YOwBCAAAAKLUlEQVR4nO2dC3eiuhbHyU7agiCg4KPWK1NrtW97z70z09HTc7//t7qAShIIiFinO13zX7PWrHEi5GfeOzs7BinT/ZkBBj4x43ZalmVD/bF5/+Cxz853iah9e34AjLl8fKKfnecKec8vytJRwZgvZ08YaxgXu75YmrVglo8G1hqWCdjzr2LhFGDMuwf7s7NaR4wWO4I8jPl2hr5YtoLX5R6Y+zPcrUXSxbQS5v5aIxaD5WhkmHtt6lgqYBfnpTA3erHEohdmCcxUO5aY5t9qGPMvLfrknK7+o4T579VnZ6yJ4PpcAXP+U6eOjIvxZpPBmK+Yp5ZVun4pwLxcf3ammgqez3MwU51G/pzgNgfzXV+WuGhuJJhzDYcYLnidijAzlOv9uoLhnQCznOvMEndo72YGY/4K9IZh82UGM33Vtl/e6ulHBrPUuvknomkXkMBEP/SuZLHg53ILM9V2JsNlv21hlppOMUXRW3MDc3fEOobZNor2Bv0whTF/NYQB6nl9fzXAQAPGTQozvWiWG2qMu44TLVwMMIbxYiYwvUZTGWYPJunsoYNjsc3eowTmptF3h90oZXF8HDB04MQw5kuDr8J8sl07tJDUMnZ2nsA0WMqweW/LEnWRdOvJejOGeX86+It9a7faDn2GhOb6PoaJDh7/wVhFO5jFEAmLYV8mMIODYbJKRqIZmpmQPYthpvODW/AqM7Y5B/8SJxN9N40Gy//hJIPp4VnVxbOzBjBsnrEQyztNzhqoGYzX5TB9HINMokYw4HEWgsjWzi4awNg+Z+ngqWXNYDze/Mn48HkZNNDJYJjrcJiA1ckcn5WDMfAbaFAHpwmM3c5GfzIJ6il7ARhW5BysaEJr0DSAAaPDC6bXrScfsm9bpIFaJ4Jhbm//y/MK1zZGGGCjaP/LC3JwwjTLDRlThDBs2KCWkWzagwvGnjWpZXGrQQgDxqIRCwk3Yw0qGDpvVsswwgBbNatlMYxRgHHCap0Yhs35vCwKe1zCDCfqKRQuFCUzCvpVmjunhTF84QX+INO8ywvMGqg033xfgml7wMplu6eFgUCoZZ3AplsxTxhJux5ViKlgKqfc7NQwQi1z2oKF2hZhqiwceGDAmAltUrTpaAjDBKsM6YhbBxrC0AHPiOOLedYQRszIRLKX6QfDhI7fWUuWDBFmpAMMgGAus+TNNhFmrQMMc/n8opUzT4sw46qnIYEBOuLPdnPZ0A2GBVnBTOZ27tm6wWR2zMgqsEjWZw1gwGtti6U9LCb3LK1gNgXjTGYuU6TWCybOhGN1ZmNXfRpNLxjDcN3AKDVh6wYTJy5/oAhT6eOABqZCIsy3qvf+gfkD01xXk68E8y8BpiqhZjBOZULNYMLKhJrBfK2S+VaVUDOYRWXCPzC/Fwb4KlQjGAAm/dn8DazPYbpQkggbDBjBUKm5AKNOMdw9AQsMG7Y7llILbs8I1SksP7W0oYGBoNtwDzBRb56sh7DAiP6/DRStDEQwia/9MUpN7UhgAJr5mWQKk/U0EhjmHsey2dFBAmOPFBk8CCbJOxKYq1CRwYOUOKfigGFwLEvq2IQDhq6/EoxvdUpl8deG5clmeNoM9Up1Jbg6dVhpsiTrSGCqOAWPmm5QmVQDmDZ/7ao6KX4Yg7s6RnvCV6CHgaCTwThrzWHYkPtthn51WvwwbovD7Dm0jR0G2JjPdHp7jtOih4E1f2tnz3k69DDiCnRfLB70MAHPn+yFpkqMHIbNefufxE2GVc0BsMNQX/Cojf/ZX/nlz8MOwwQv1JntuYuoN/DK3o0chg159sKB7Sd1ruWW+QxghxFMswt3Fm7bTsnbccOAseZNZrEzeUadQP1M5DBCx0wEi2dXPeDghjHGJXbOlZIGOQyPc0AckcuZqVKjhmF94UBNdyTRtBVlgxoGhBEzahvSnkeoGDxRw1DhPF04t11LonELMzXMMBAIeV8AiMe4kk8KqxvMMFdC849Wdry2GUsm6U7epRMxjBQaIEr3X9hYrGhRfrjBCwNU8M3enpEFeesjmskO3Xhh5NP021PyjEk7bI4cmAItDNCVmO1d0BYWtMSPw7HYpR0AQ38rDB2IzcPKfJ6ZIdFMxLC2e2CkLP9WGLk+CWeAxCNQRI6zJcFMLi8vO0KsJ4CgfcnF7aQnhwHmi1kWYzZJxqdYwkygeFD7cvefQAPfKvE0ODVMbnwciVUGjJlIY/GiKcJMsoHVXZU6GpwYJud70pKNf0z634jbbIswUZttvtGekFKdFgYMXxrqR7lHMFeYtEXripIh3eR3oG63yv/jtDCi5T+WU5iEsYEAyxdqCpi4nlF73ar0yzlxNZtJLytaZQGEouvyj4sw4cCeT/a45ZwSBtha+iHzJx3TNJSnqYRxVqM9KKeFYXIkjWilssgCy2ZplTCkhuPXCWFoIIc4KYtxerVLVg1TQ6eEkTPktEvsl+AtijCr3mQrpTNONFGoZ9Xyu2oAA0bOv8kqDQtKt9ZOwewEPE6Yr0Bp+eqYYjUKplFIMGjLlTws35OJu7S0bY+kz7aiQSGETbhy7Y0nsSBWN/Rcg8BT0Jb7nqjKjQGMJHXkqzIDdkdGcTqDo67xaxB4ys9VdavEqrzNcbJHGKm3oKlczybtoE4zr8jawbGaxi2ZJdwT6xWGHdJSHCBOXt4X6qvTncORjiKHepyzQY6FDPYFOAZ30lFvDALjD1uMg5oxGct1YKgWOsjPbFele2T8HeNByRZ05pAXjT4igu2B0U3y7SVeK9c5sF72m8Nw85TW/EPiVx8EQ9f5OVR149+vb0nnHM6Mj4mSfIhfc25ymXbKR7pDwYpEnT49suHvVDuQLsRrRxnFWYyPzgX4Lf+jUOrDALgyizOZ9Y8bFdLHBupOu5lSmDphwaVuLGpZa/fYUSHV0d2xKPpIjFphyv1La5GGkGstrMv2PGBY4ucLSgO2R/u8d2IxGribCHJuQG32ob/oR2kTSv+xxiUHyfR1I5Qgia7fGl4/gVDJnXoNLwbBp83FIM2ubEEnOjjiMh1sYq/pZTrThw8cuj5N8D0tGfNvHHf7HCUw7jdXg719BZhg+YUubXt1ttfpNbwbDJO83XV60Y+DLzrCJrjeXXRI7p51r2f0YncFJZm+6g7z9D0i2bWtmt90ys7Sy463F+q6ehfN9S2/UJeY75+dnaMEwRvhMORG49vBjfwl1ORR46EGgs0d1BnMuca9M7yaMozON7fvCobDTP/StaLBO8nDkPtrPcuGPUyLMOQfRPd8HSB2RxQw5v90rGjeP0QFQ3oaVjT2M1LDkBftTBv0bEpKYMyXI7ePfrfY2R0pg4mnz1qVDTtbknKYuGzQ3Cm7VwA5ljwMMX985AbQSQVyHVPAEPP+Gc21spWiFzfmPhhC7i7QbltwMePvZSHnChgy/Y69cIA+vOWLpQSGmDfF2P+YRJ/epwoWNUxcOL9+orXZMu+h0FoqYRKzAJ4rmUXFHfKdGoWQ/wNqJ+Rd5RkKrwAAAABJRU5ErkJggg==',
}

onMounted(() => {
  fetchMeta()
  fetchQuestions()
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      fetchQuestions()
    }
  })
  if (loadMoreTrigger.value) observer.observe(loadMoreTrigger.value)
})

watch([selectedPlatforms, selectedCategories], () => {
  page.value = 1
  hasMore.value = true
  questions.value = []
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
.load-trigger {
  height: 1px;
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
.end-text {
  text-align: center;
  color: #888;
  padding: 20px 0;
}
.option-icon {
  width: 20px;
  height: 20px;
}
</style>

