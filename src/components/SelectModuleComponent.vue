<template>
  <div class="select-module">
    <h2>请选择一个经历，开始与AI聊吧</h2>
    <ul>
      <li
        v-for="module in chatModules"
        :key="module.title"
        @click="selectModule(module)"
      >
        {{ module.title }}
      </li>
    </ul>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  height: calc(100vh - 60px);
  width: 38vw;
  box-shadow: inset 0 0 20px 0 rgba(0, 0, 0, 0.2);
  justify-content: space-between;
}
.select-module h2 {
  margin-bottom: 20px;
}
.select-module ul {
  list-style: none;
  padding: 0;
}
.select-module li {
  cursor: pointer;
  margin: 8px 0;
  padding: 8px 16px;
  border: 1px solid #bbb;
  border-radius: 4px;
  transition: 0.3s;
}
.select-module li:hover {
  background-color: #f5f5f5;
}
</style>