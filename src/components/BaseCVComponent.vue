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
    }
  },
  computed: {
    // 若有更多字段可自行补充
    isFetching() {
      return metadataInstance.getIsFetching();
    }
  },
  mounted() {
    // 初次挂载后，进行一次缩放适配
    this.$nextTick(() => {
      this.fitScale(1000);
    });
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
        });
      }
    }
  },
  beforeUnmount() {
    // 移除监听
    window.removeEventListener('resize', () => this.fitScale(1000));
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
      console.log('delay', delay);
      // 添加延迟执行
      setTimeout(() => {
        // 参考设计稿的原始宽高（与 .cv-page-content 中的 width、height 一致）
        const DESIGN_HEIGHT = 960;

        const pageEl = this.$refs.page;
        const pageContentEl = this.$refs.pageContent;
        if (!pageEl || !pageContentEl) return;

        // 获取 .cv-page 的实际显示大小
        // const containerWidth = pageEl.clientWidth;
        const containerHeight = pageEl.clientHeight;

        // 计算需要的缩放比例，保证宽高都能完整显示
        // const scaleW = containerWidth / DESIGN_WIDTH;
        const scaleH = containerHeight / DESIGN_HEIGHT;
        // const finalScale = Math.min(scaleW, scaleH);

        // 应用 transform 缩放
        // pageContentEl.style.transform = `scale(${finalScale})`;
        pageContentEl.style.transform = `scale(${scaleH})`;
      }, 0); // 延迟100毫秒执行
    }
  }
};
</script>

<style scoped>
/* ===== 基础布局与公共样式 ===== */

/* 外层容器 */
.cv-component {
  /* 父级容器的大小，可以根据你的布局需要定制。
     这里维持原有逻辑：高=calc(100vh - 40px)，宽=calc(50vw - 40px - 40px) 等等。 */
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

/* 页面主容器：用于展示简历页面 */
.cv-page {
  /* 保持原逻辑：这里 aspect-ratio 3:4 并非必须，你也可换成固定宽高或其他写法。 */
  height: 80%;
  aspect-ratio: 3 / 4; /* 3:4 纸张比例，可根据需求定制 */
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  background-color: white;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative; /* 为后面自定义绝对定位做准备 */
  overflow: hidden;   /* 让超出部分隐藏，避免缩放造成滚动条 */
}
.cv-page:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

/* 固定尺寸：与 DESIGN_WIDTH、DESIGN_HEIGHT 对应 */
.cv-page-content {
  width: 680px;   /* 设计稿的宽度 */
  height: 920;  /* 设计稿的高度 */
  padding: 20px;
  transform-origin: top left; /* 以左上角为缩放参考点 */
  /* 默认不加 transform，这里由 JS 动态赋值 scale(...) */
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
