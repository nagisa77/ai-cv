<template>
  <div class="select-module">
    <div class="select-module-title">请<span class="select-module-title-highlight">选择</span>一个经历...</div>
    <div class="select-module-subtitle">
      Hi少侠，欢迎来到神奇的AI简历创建之旅，我是你的好伙伴简历君，你也可以叫我菌菌：）右边已经根据您提供的基础信息生成了初步的简历框架，下面就由俺来协助少侠完善它吧！请选择要先开始攻略的板块：
    </div>
    <div class="select-module-list">
      <div class="select-module-item" v-for="module in chatModules" :key="module.title" @click="selectModule(module)">
        {{ module.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectModuleComponent',
  props: {
    // 父组件会把所有经历模块数组 (chatModules) 传进来
    chatModules: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectModule(module) {
      // 通知父组件：用户点击了某个经历
      this.$emit('selected-module-changed', module)
    }
  }
}
</script>

<style scoped>

.select-module {
  padding: 100px 20px;
  background-color: var(--color-background);

  height: calc(100vh - 60px - 200px);
  width: calc(38vw - 40px);
}

.select-module-title {
  font-size: 24px;
  font-weight: bold;
}

.select-module-title-highlight {
  color: var(--color-primary);
}

.select-module-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-top: 20px;
  opacity: 0.6;
  line-height: 1.7;
}

.select-module-list {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.select-module-item {
  cursor: pointer;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 25px;
  padding: 8px 16px;
  font-size: 13px;
}

.select-module-item:hover {
  background-color: var(--color-primary);
  color: white;
  transition: all 0.3s ease;
}

</style>
