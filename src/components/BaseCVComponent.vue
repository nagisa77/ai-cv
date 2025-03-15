<template>
    <div class="cv-component" ref="cvComponent">
      <!-- 顶部按钮区域（公共） -->
      <div class="cv-top-buttons">
        <button class="cv-top-button" @click="handleAddModule">
          <i class="fas fa-plus-circle"></i> 添加模块
        </button>
        <button class="cv-top-button" @click="handleChangeFont">
          <i class="fas fa-font"></i> 更换字体
        </button>
        <button class="cv-top-button" @click="handleSmartFit">
          <i class="fas fa-compress-alt"></i> 智能一页
        </button>
        <button class="cv-top-button" @click="captureAndSaveScreenshot">
          <i class="fas fa-download"></i> 下载
        </button>
      </div>
  
      <!-- 如果在请求数据，显示加载动画 -->
      <div class="cv-page loading-container" v-if="isFetching">
        <l-waveform class="loading-icon" size="60" stroke="3.5" speed="1" color="var(--color-primary)" />
      </div>
  
      <!-- 否则，显示插槽内容（即各自简历主体） -->
      <div v-else class="cv-page">
        <!-- 
          将要在这里渲染不同风格的简历模板（CreativeModern、Default、GeneralSimple 等），
          由子组件通过 <slot> 注入。
        -->
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  import metadataInstance from '@/models/metadata_model.js';
  
  export default {
    name: 'BaseCVComponent',
    props: {
      highlightTitle: {
        type: String,
        default: ''
      }
    },
    computed: {
      // 常用数据，若有更多字段可自行补充
      isFetching() {
        return metadataInstance.getIsFetching();
      },
    },
    methods: {
      handleAddModule() {
        this.$emit('add-module');
      },
      handleChangeFont() {
        this.$emit('change-font');
      },
      handleSmartFit() {
        this.$emit('smart-fit');
      },
      captureAndSaveScreenshot() {
        this.$emit('capture-and-save-screenshot');
      },
  
      // 处理子组件点击某个模块标题时，可能需要告知父级
      handleSelectedModuleChanged(payload) {
        this.$emit('selected-module-changed', payload);
      },
  
      // 这些编辑/删除等操作同理，统一做透传
      handleEdit(type, title) {
        this.$emit('edit-title', type, title);
      },
      handleDelete(type, title) {
        this.$emit('delete-title', type, title);
      },
      handleAddTitle(type) {
        this.$emit('add-title', type);
      }
    }
  }
  </script>
  
  <style scoped>
  /* 基础布局与公共样式 */
  
  /* 外层容器 */
  .cv-component {
    height: calc(100vh - 60px);
    width: 62vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  /* 顶部按钮区 */
  .cv-top-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
    width: 100%;
  }
  .cv-top-button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  .cv-top-button:hover {
    background-color: var(--color-primary-hover);
  }
  
  /* 页面主容器 */
  .cv-page {
    height: 80%;
    aspect-ratio: 3 / 4; /* 3:4纸张比例，可自定义 */
    padding: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  
  /* 加载状态 */
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  