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
        <button class="cv-top-button" @click="handleChangeTemplate">
          <i class="fas fa-file-alt"></i> 更换模板
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
        <l-waveform
          class="loading-icon"
          size="60"
          stroke="3.5"
          speed="1"
          color="var(--color-primary)"
        />
      </div>
  
      <!-- 否则，显示插槽内容（即各自简历主体） -->
      <div v-else class="cv-page">
        <!-- 
          不同简历风格（CreativeModern、Default、GeneralSimple 等）通过 <slot> 注入 
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
      // 若有更多字段可自行补充
      isFetching() {
        return metadataInstance.getIsFetching();
      }
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
      handleSelectedModuleChanged(payload) {
        this.$emit('selected-module-changed', payload);
      },
      handleEdit(type, title) {
        this.$emit('edit-title', type, title);
      },
      handleDelete(type, title) {
        this.$emit('delete-title', type, title);
      },
      handleAddTitle(type) {
        this.$emit('add-title', type);
      },
      handleChangeTemplate() {
        this.$emit('change-template');
      }
    }
  };
  </script>
  
  <style scoped>
  /* ===== 基础布局与公共样式 ===== */
  
  /* 外层容器 */
  .cv-component {
    height: calc(100vh - 40px);
    width: calc(50vw - 40px - 40px);
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    background-color: var(--color-background);
    transition: all 0.3s ease;
  }
  
  /* 顶部按钮区 */
  .cv-top-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 15px;
    width: 100%;
    padding: 0 15px;
    flex-wrap: wrap; /* 当按钮过多或屏幕变窄时自动换行 */
  }
  
  .cv-top-button {
    padding: 8px 15px;
    border: none;
    border-radius: 6px;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .cv-top-button:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  .cv-top-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  }
  
  /* 页面主容器 */
  .cv-page {
    height: 80%;
    aspect-ratio: 3 / 4; /* 3:4 纸张比例，可根据需求定制 */
    padding: 20px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
    background-color: white;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .cv-page:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-3px);
  }
  
  /* 加载状态时的容器 */
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
  }
  
  /* ===== 宽屏适配 ===== */
  @media (max-width: 1024px) {
    .cv-component {
      width: calc(70vw - 40px);
    }
  }
  
  /* ===== 小屏（移动端）适配 ===== */
  @media (max-width: 768px) {
    .cv-component {
      width: calc(90vw - 40px);
      margin: 10px auto; /* 居中 */
      height: auto;      /* 根据内容自适应高度 */
    }
  
    /* 如果你希望在小屏也保持固定高度，可以酌情去掉这行 */
    .cv-page {
      /* 去掉 aspect-ratio，避免过度拉伸 */
      aspect-ratio: unset;
      height: auto;
      min-height: 60vh; /* 给个最小高度，防止内容太少时页面过小 */
    }
  }
  </style>
  