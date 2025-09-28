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

    <!-- 否则，根据模块高度自动分页 -->
    <template v-else>
      <div
        v-for="(page, pageIndex) in paginatedModules"
        :key="pageIndex"
        class="cv-page"
        ref="pages"
      >
        <div class="cv-page-content" ref="pageContents">
          <!-- 默认渲染模块，如需自定义可使用作用域插槽 -->
          <slot :page="page" :page-index="pageIndex">
            <div
              v-for="(module, moduleIndex) in page"
              :key="moduleIndex"
              class="resume-module"
            >
              <component
                :is="module.component"
                v-bind="module.props"
                v-on="module.listeners"
              />
            </div>
          </slot>
        </div>
      </div>
    </template>
    <div class="measure-container" :style="{'font-family': getFontFamily()}">
      <div
        v-for="(module, moduleIndex) in modulesData"
        :key="'measure-' + moduleIndex"
        :ref="el => registerModuleRef(el, moduleIndex)"
      >
        <component
          :is="module.component"
          v-bind="module.props"
          v-on="module.listeners"
        />
      </div>
        <FontSelectionDialog 
      v-if="showFontSelectionDialog" 
      :curFont="curFont"
      @close="showFontSelectionDialog = false"
      @confirm="handleFontSelection"
    />
  </div>
</div>
</template>

<script>
import metadataInstance from '@/models/metadata_model.js';
import { useToast } from 'vue-toastification';
import FontSelectionDialog from '@/components/FontSelectionDialog.vue';

export default {
  name: 'BaseCVComponent',
  components: {
    FontSelectionDialog
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
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
    modulesData: {
      type: Array,
      default: () => []
    },
    pageMaxHeight: {
      type: Number,
      default: 613
    },
    totalTitleAndItemCount: {
      type: Number,
      default: 0
    },
    marginBottom: {
      type: Number,
      default: 10
    },
    TemplateType: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      moduleRefs: [],
      measuredHeights: [],
      paginatedModules: [],
      totalHeight:0,
      showFontSelectionDialog: false,
      curFont: 'default',
    }
  },
  computed: {
    // 若有更多字段可自行补充
    isFetching() {
      if (this.isPreview) {
        return false;
      }
      return metadataInstance.getIsFetching();
    },
  },
     
  mounted() {
    // this.fitScale(0);
    // 监听窗口大小变化，动态缩放（可自行去掉）
    window.addEventListener('resize', () => this.fitScale(1000));

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(this.measureAll);
    }
    this.$nextTick(() => {
      this.measureAll();
      this.ro = new ResizeObserver(this.measureAll);
      this.moduleRefs.forEach(el => el && this.ro.observe(el));
    });
  },
  // 添加 watch 选项，监听 isFetching 的变化
  watch: {
    modulesData: {
      handler() {
        this.$nextTick(() => {
          this.moduleRefs = []
          this.measuredHeights = []
          this.paginatedModules = []
          this.$nextTick(this.measureAll)
        })
      },
      deep: true
    },
    marginBottom: {
      handler() {
        this.$nextTick(() => {
          this.moduleRefs = []
          this.measuredHeights = []
          this.paginatedModules = []
          this.$nextTick(this.measureAll)
        })
      }
    },
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
    this.ro && this.ro.disconnect()
  },
  methods: {
    handleAddModule() {
      this.$emit('add-module');
    },
    getFontFamily() {
      switch (this.curFont) {
        case 'times':
          return "'Times New Roman', Times, serif";
        case 'arial':
          return "Arial, Helvetica, sans-serif";
        case 'courier':
          return "'Courier New', Courier, monospace";
        default:
          return "'Microsoft YaHei', '微软雅黑', sans-serif";
      }
    },
    handleChangeFont() {
      this.showFontSelectionDialog = true;
    },
    handleFontSelection(font) {
      this.curFont=font
      this.$emit('change-font', font);
    },
    handleSmartFit() {
      if(this.paginatedModules.length === 1){
        this.toast.success("当前页面已经是一页")
      }else{
        this.adjustSpace();
      }
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
    registerModuleRef(el, idx) {
      if (el) {
        this.moduleRefs[idx] = el
      }
    },
    measureAll() {
      this.totalHeight = 0
      this.measuredHeights = this.moduleRefs.map(el => {
        if (!el) return 0
        const rect = el.getBoundingClientRect()
        const style = getComputedStyle(el)
        const marginBottom = parseFloat(style.marginBottom) || 0
        this.totalHeight += rect.height + marginBottom
        return rect.height + marginBottom
      })
      console.log(this.measuredHeights)
      this.buildPages()
    },
    buildPages() {
      const pages = []
      let cur = []
      let curH = 0 // padding-top,padding不算在宽高里面
      this.measuredHeights.forEach((h, i) => {
        const mod = this.modulesData[i]
        if (curH + h <= this.pageMaxHeight ) { // padding-bottom
          cur.push(mod)
          curH += h
        } else {
          if (cur.length) pages.push(cur)
          cur = [mod]
          curH = h
        }
      })
      if (cur.length) pages.push(cur)
      this.paginatedModules = pages
      this.$nextTick(() => this.fitScale(0))
    },
    /**
     * 根据外层 .cv-page 大小，自动计算缩放比例，并对 .cv-page-content 做 transform: scale
     */
    fitScale(delay = 0) {
      setTimeout(() => {
        const DESIGN_WIDTH = 493;
        const pageEls = this.$refs.pages || this.$refs.page;
        const contentEls = this.$refs.pageContents || this.$refs.pageContent;
        if (!pageEls || !contentEls) return;
        const firstPage = Array.isArray(pageEls) ? pageEls[0] : pageEls;
        if(!firstPage) return
        const containerWidth = firstPage.clientWidth;
        const scaleW = containerWidth / DESIGN_WIDTH;
        const finalScale = scaleW;

        const contents = Array.isArray(contentEls) ? contentEls : [contentEls];
        contents.forEach(el => {
          el.style.transform = `scale(${finalScale})`;
        });
      }, delay);
    },
    adjustSpace(){
      let everyHeight=(this.totalHeight-this.pageMaxHeight)/this.totalTitleAndItemCount;
      console.log(everyHeight)
      const curHeight=parseFloat(getComputedStyle(this.$refs.pageContents[0].querySelectorAll('.session-title')[0]).marginBottom)
      if(everyHeight>curHeight){
        this.toast.error('简历内容太多,智能一页失败')
      }else{
        this.$emit('smart-fit',curHeight-everyHeight)
      }
      
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
  margin-bottom: 20px;
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

.measure-container {
  visibility: hidden;
  position: absolute;
  left: -9999px;
  width: 453px;
  top: 0;
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
