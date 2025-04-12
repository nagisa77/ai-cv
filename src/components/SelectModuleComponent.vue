<template>
  <div class="select-module">
    <div class="select-module-title">
      请<span class="select-module-title-highlight">选择</span>你想要攻略的经历
    </div>
    <div class="select-module-subtitle">
      您好，欢迎使用AI简历君！我是您的智能简历助手，已根据您提供的基础信息生成了初步的简历框架。接下来，我将协助您完善各个模块，打造一份专业而有竞争力的简历。请选择您想要优先完善的板块：
    </div>
    <div class="select-module-list">
      <div
        class="select-module-item"
        v-for="module in chatModules"
        :key="module.title"
        @click="selectModule(module)"
      >
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
  /* 桌面端布局 */
  padding: 75px 20px;
  height: calc(100vh - 200px);
  width: calc(47vw - 80px);
}

.select-module-title {
  font-size: 35px;
  font-weight: bold;
}

.select-module-title-highlight {
  color: var(--color-primary);
}

.select-module-subtitle {
  font-size: 18px;
  color: var(--color-text-primary);
  margin-top: 40px;
  opacity: 0.6;
  line-height: 1.7;
}

.select-module-list {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.select-module-item {
  cursor: pointer;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 25px;
  padding: 12px 25px;
  font-size: 18px;
  transition: all 0.3s ease;
}

.select-module-item:hover {
  background-color: var(--color-primary);
  color: white;
}

/* 响应式：当屏幕宽度小于等于 768px 时，适配移动端全屏 */
@media screen and (max-width: 768px) {
  .select-module {
    width: calc(100vw - 40px);         
    height: calc(100vh - 60px);

    position: fixed;
    top: 60px;
    left: 0;
  }

  .select-module-title {
    font-size: 20px;
  }

  .select-module-subtitle {
    font-size: 14px;
  }
}
</style>
