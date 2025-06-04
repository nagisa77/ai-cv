<template>
  <div class="cv-component" ref="cvComponent">
    <!-- 顶部按钮区域（公共） -->
    <div v-if="!isPreview" class="cv-top-buttons">
      <button class="cv-top-button" @click="handleAddModule">
        <i class="fas fa-plus-circle"></i>
        <span class="button-text">添加模块</span>
      </button>
      <button class="cv-top-button" @click="handleChangeFont">
        <i class="fas fa-font"></i>
        <span class="button-text">更换字体</span>
      </button>
      <button class="cv-top-button" @click="handleChangeTemplate">
        <i class="fas fa-file-alt"></i>
        <span class="button-text">更换模板</span>
      </button>
      <button class="cv-top-button" @click="handleSmartFit">
        <i class="fas fa-compress-alt"></i>
        <span class="button-text">智能一页</span>
      </button>
      <button
        class="cv-top-button"
        :class="{ 'loading-state': isDownloading }"
        @click="captureAndSaveScreenshot"
        :disabled="isDownloading"
      >
        <i v-if="!isDownloading" class="fas fa-download"></i>
        <i v-else class="fas fa-spinner fa-spin"></i>
        <span class="button-text">{{ isDownloading ? '下载中' : '下载' }}</span>
      </button>
    </div>

    <!-- 预览模式下，不展示顶部按钮 -->
    <div v-else class="cv-top-buttons">
      <div class="preview-mode-indicator">当前为预览模式</div>
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

    <!-- 否则，显示简历主体（插槽），并将其包裹在一个固定"设计稿尺寸"的容器里 -->
    <div v-else class="cv-page" ref="page">
      <div class="cv-page-content" ref="pageContent">
        <!-- 
          不同简历风格（CreativeModern、Default、GeneralSimple 等）通过 <slot> 注入。
          注意：slot 内部如果有固定 px，会保持原设计尺寸。
        -->
        <slot></slot>
      </div>
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
    },
    isPreview: {
      type: Boolean,
      default: false
    },
    isDownloading: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    // 若有更多字段可自行补充
    isFetching() {
      if (this.isPreview) {
        return false;
      }
      return metadataInstance.getIsFetching();
    }
  },
  data() {
    return {
      additionalPages: []
    };
  },
  mounted() {
    this.fitScale(0);
    this.paginateContent();
    // 监听窗口大小变化，动态缩放（可自行去掉）
    window.addEventListener('resize', () => this.fitScale(1000));
  },
  // 添加 watch 选项，监听 isFetching 的变化
  watch: {
    isFetching(newVal, oldVal) {
      // 当 isFetching 从 true 变为 false 时（即加载完成后）
      if (oldVal === true && newVal === false) {
        this.$nextTick(() => {
          this.fitScale();
          this.paginateContent();
        });
      }
    }
  },
  beforeUnmount() {
    // 移除监听
    window.removeEventListener('resize', () => this.fitScale(1000));
    this.additionalPages.forEach(p => p.remove());
    this.additionalPages = [];
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
    },
    /**
     * 根据外层 .cv-page 大小，自动计算缩放比例，并对 .cv-page-content 做 transform: scale
     */
    fitScale(delay = 0) {
      setTimeout(() => {
        const DESIGN_WIDTH = 493;
        const pageEls = this.$el.querySelectorAll('.cv-page');
        pageEls.forEach(pageEl => {
          const pageContentEl = pageEl.querySelector('.cv-page-content');
          if (!pageContentEl) return;
          const containerWidth = pageEl.clientWidth;
          const scaleW = containerWidth / DESIGN_WIDTH;
          pageContentEl.style.transform = `scale(${scaleW})`;
        });
      }, delay);
    },

    paginateContent() {
      this.$nextTick(() => {
        const DESIGN_HEIGHT = 613;
        const componentEl = this.$refs.cvComponent;
        const firstPage = this.$refs.page;
        const firstContent = this.$refs.pageContent;
        if (!componentEl || !firstPage || !firstContent) return;

        // 收集所有模块节点
        const allModules = Array.from(componentEl.querySelectorAll('.cv-page-content'))
          .reduce((acc, pc) => acc.concat(Array.from(pc.children)), []);

        // 清空并移除旧分页
        firstContent.innerHTML = '';
        this.additionalPages.forEach(p => p.remove());
        this.additionalPages = [];

        let currentPageContent = firstContent;
        let currentHeight = 0;

        allModules.forEach(mod => {
          const modHeight = mod.offsetHeight;
          if (currentHeight + modHeight > DESIGN_HEIGHT && currentHeight > 0) {
            const newPage = document.createElement('div');
            newPage.className = 'cv-page';
            const newContent = document.createElement('div');
            newContent.className = 'cv-page-content';
            newPage.appendChild(newContent);
            componentEl.appendChild(newPage);
            this.additionalPages.push(newPage);
            currentPageContent = newContent;
            currentHeight = 0;
          }
          currentPageContent.appendChild(mod);
          currentHeight += modHeight;
        });

        this.fitScale();
      });
    }
  }
};
</script>

<style scoped>
/* ===== 基础布局与公共样式 ===== */

/* 外层容器 */
.cv-component {
  width: calc(53vw - 40px - 40px);
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  background-color: var(--color-background);
  transition: all 0.3s ease;
  height: calc(100vh - 40px); 
  overflow-y: auto;
}

.preview-mode-indicator {
  font-size: 12px;
  opacity: 0.5;
}

/* 顶部按钮区 */
.cv-top-buttons {
  display: flex;
  justify-content: right;
  gap: 9px; /* 增加按钮间距 */
  margin-bottom: 15px;
  margin-top: 15px;
  width: 90%;
  padding: 0 15px;
  flex-wrap: wrap;
}

.cv-top-button {
  background-color: transparent; 
  border: none;
  border-radius: 50%; 
  color: var(--color-primary); 
  cursor: pointer;
  display: flex; 
  align-items: center;
  justify-content: center; 
  font-size: 18px; 
  transition: color 0.2s ease, background-color 0.2s ease; 
  position: relative; 
  width: 24px; 
  height: 24px; 
}

.cv-top-button i {
  line-height: 1; 
}

.cv-top-button .button-text {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: -120%; 
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8); 
  color: white; 
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px; 
  white-space: nowrap; 
  z-index: 10;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none; 
}

.cv-top-button:hover {
  color: var(--color-primary-hover); /* Hover 时改变图标颜色 */
  background-color: rgba(0, 0, 0, 0.05); /* 轻微背景反馈 */
}

.cv-top-button.loading-state {
  cursor: not-allowed;
  color: #999;
}

.cv-top-button.loading-state:hover {
  background-color: transparent;
  color: #999;
}

.cv-top-button:hover .button-text {
  visibility: visible;
  opacity: 1;
}

.cv-top-button:active {
  background-color: rgba(0, 0, 0, 0.1); /* 点击时的背景反馈 */
}

/* 页面主容器：用于展示简历页面 */
.cv-page {
  width: 90%;
  aspect-ratio: 3 / 4; 
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  background-color: white;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.cv-page:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

/* 固定尺寸：与 DESIGN_WIDTH、DESIGN_HEIGHT 对应 */
.cv-page-content {
  width: 453px;   
  height: 613px;  
  padding: 20px;
  transform-origin: top left; 
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
    width: calc(90vw - 40px);
  }
}
</style>
