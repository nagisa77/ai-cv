<template>
  <div class="multiple-pages">
    <template v-for="(page, pageIndex) in paginatedModules" :key="pageIndex">
      <slot :page="page" :page-index="pageIndex">
        <div class="cv-page">
          <div class="cv-page-content">
            <div
              v-for="(module, moduleIndex) in page"
              :key="moduleIndex"
              class="resume-module"
            >
              <component :is="module.component" v-bind="module.props" v-on="module.listeners" />
            </div>
          </div>
        </div>
      </slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MultiplePages',
  props: {
    modulesData: {
      type: Array,
      default: () => []
    },
    pageMaxHeight: {
      type: Number,
      default: 600
    }
  },
  computed: {
    paginatedModules() {
      const pages = []
      let currentPage = []
      let currentHeight = 0
      this.modulesData.forEach(mod => {
        const modHeight = mod.estimatedHeight || 100
        if (currentHeight + modHeight <= this.pageMaxHeight) {
          currentPage.push(mod)
          currentHeight += modHeight
        } else {
          pages.push(currentPage)
          currentPage = [mod]
          currentHeight = modHeight
        }
      })
      if (currentPage.length > 0) {
        pages.push(currentPage)
      }
      return pages
    }
  }
}
</script>

<style scoped>
.multiple-pages {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.cv-page {
  width: 493px;
  background: #fff;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  padding: 20px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
}

.cv-page-content {
  width: 100%;
}

.resume-module {
  margin-bottom: 16px;
}
</style>
