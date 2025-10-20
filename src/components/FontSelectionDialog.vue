<template>
  <Teleport to="body">
    <Transition name="fade-scale" appear>
      <div class="modal-overlay" @click.self="closeDialog">
        <div class="modal-container">
          <button class="close-btn" @click="closeDialog">
            <i class="fas fa-times"></i>
          </button>
          <div class="modal-header">
            <h2 class="modal-title">选择字体</h2>
          </div>
          
          <div class="font-options">
            <div 
              v-for="font in fontOptions" 
              :key="font.value"
              class="font-option"
              :class="{ selected: selectedFont === font.value }"
              @click="selectFont(font.value)"
            >
              <div class="font-preview" :style="{ fontFamily: font.fontFamily }">
                {{ font.previewText }}
              </div>
              <div class="font-name">{{ font.name }}</div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-white" @click="closeDialog">取消</button>
            <button class="btn btn-primary" @click="confirmSelection">确定</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: 'FontSelectionDialog',
  emits: ['close', 'confirm'],
  props:{
    curFont:{
      type:String,
      default:'default'
    }
  },
  data() {
    return {
      selectedFont: this.curFont,
      fontOptions: [
        {
          name: '默认字体',
          value: 'default',
          fontFamily: "'Microsoft YaHei', '微软雅黑', sans-serif",
          previewText: 'AI简历君 - 默认字体'
        },
        {
          name: '楷体',
          value: 'kaiti',
          fontFamily: "'KaiTi', '楷体', serif",
          previewText: 'AI简历君 - 楷体'
        },
        {
          name: '等线',
          value: 'dengxian',
          fontFamily: "'DengXian', '等线', sans-serif",
          previewText: 'AI简历君 - 等线'
        },
        {
          name: '宋体',
          value: 'simsun',
          fontFamily: "'SimSun', '宋体', serif",
          previewText: 'AI简历君 - 宋体'
        },
        {
          name: 'Times New Roman',
          value: 'times',
          fontFamily: "'Times New Roman', Times, serif",
          previewText: 'AI简历君 - Times New Roman'
        },
        {
          name: 'Arial',
          value: 'arial',
          fontFamily: "Arial, Helvetica, sans-serif",
          previewText: 'AI简历君 - Arial'
        }, 
        {
          name: 'Courier New',
          value: 'courier',
          fontFamily: "'Courier New', Courier, monospace",
          previewText: 'AI简历君 - Courier New'
        }
    ]

    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    selectFont(fontValue) {
      this.selectedFont = fontValue
    },
    confirmSelection() {
      this.$emit('confirm', this.selectedFont)
      this.closeDialog()
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-container {
  background: var(--color-white);
  width: 500px;
  max-width: 95%;
  border-radius: 20px;
  padding: 20px 28px 28px 28px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.18);
  text-align: left;
  display: flex;
  flex-direction: column;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-title {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-gray-dark);
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 18px;
  position: absolute;
  top: 12px;
  right: 12px;
}

.close-btn:hover {
  background-color: var(--color-secondary);
  color: var(--color-primary);
}

.font-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 30px;
}

@media (max-width: 600px) {
  .font-options {
    grid-template-columns: repeat(2, 1fr);
  }
}

.font-option {
  border: 2px solid var(--color-gray-light);
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.font-option:hover {
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.font-option.selected {
  border-color: var(--color-primary);
  background-color: rgba(0, 123, 255, 0.05);
}

.font-preview {
  font-size: 16px;
  margin-bottom: 10px;
  min-height: 24px;
}

.font-name {
  font-size: 14px;
  color: var(--color-gray-dark);
  text-align: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: auto;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

.btn-white {
  background-color: var(--color-white);
  color: var(--color-gray-dark);
  border: 1px solid var(--color-gray-light);
}

.btn-white:hover {
  background-color: var(--color-gray-light);
}
</style>