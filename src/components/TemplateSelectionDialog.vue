<template>
    <Teleport to="body">
      <Transition name="fade-scale" appear>
        <div class="modal-overlay" @click.self="closeDialog">
          <div class="modal-container">
            <button class="close-btn" @click="closeDialog">
              <i class="fas fa-times"></i>
            </button>
            <div class="modal-header">
              <h2 class="modal-title">选择模板</h2>
            </div>
            
            <div class="template-options">
              <div 
                v-for="template in templateOptions" 
                :key="template.value"
                class="template-option"
                :class="{ selected: selectedTemplate === template.value }"
                @click="selectTemplate(template.value)"
              >
                  {{ template.previewText }}
              </div>
            </div>
            
            <!-- 颜色选择区 -->
            <div class="color-selection" v-if="selectedTemplate">
              <h3 class="color-title">选择颜色</h3>
              <div class="color-options">
                <div
                  v-for="(color, key) in colorOptions"
                  :key="key"
                  class="color-option"
                  :class="{ selected: selectedColor === key }"
                  @click="selectColor(key)"
                >
                  <div class="color-circle" :class="key"></div>
                  <span class="color-name">{{ color.name }}</span>
                </div>
              </div>
            </div>
            
            <div class="modal-footer">
              <button class="btn btn-white" @click="closeDialog">取消</button>
              <button class="btn btn-primary" @click="confirmSelection" :disabled="!selectedTemplate">确定</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script>
  export default {
    name: 'TemplateSelectionDialog',
    emits: ['close', 'confirm'],
    props:{
      curTemplate:{
        type:String,
        default:'default'
      },
      curColor: {
        type: String,
        default: 'gray'
      }
    },
    data() {
      return {
        selectedTemplate: this.curTemplate,
        selectedColor: this.curColor,
        templateOptions: [
            {
                value: 'default',
                previewText: 'AI简历君 - 默认模板'
            },
            {
                value:'creative_modern',
                previewText:'AI简历君 - 创意模板'
            },
            {
                value:'general_simple',
                previewText:'AI简历君 - 简约模板'
            }
        ],
        colorOptions: {
          gray: {
            name: '灰色',
            value: 'gray'
          },
          blue: {
            name: '蓝色',
            value: 'blue'
          },
          red: {
            name: '红色',
            value: 'red'
          }
        }
      }
    },
    methods: {
      closeDialog() {
        this.$emit('close')
      },
      selectTemplate(templateValue) {
        this.selectedTemplate = templateValue
      },
      selectColor(colorKey) {
        this.selectedColor = colorKey
      },
      confirmSelection() {
        this.$emit('confirm', {
          template: this.selectedTemplate,
          color: this.selectedColor
        })
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
  
  .template-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .template-option {
    border: 2px solid var(--color-gray-light);
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .template-option:hover {
    border-color: var(--color-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .template-option.selected {
    border-color: var(--color-primary);
    background-color: rgba(0, 123, 255, 0.05);
  }
  
  .template-preview {   
    font-size: 16px;
    margin-bottom: 10px;
    min-height: 24px;
  }
  
  /* 颜色选择区样式 */
  .color-selection {
    margin-bottom: 30px;
  }
  
  .color-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .color-options {
    display: flex;
    gap: 15px;
  }
  
  .color-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  
  .color-option.selected .color-circle {
    border: 2px solid var(--color-primary);
    transform: scale(1.1);
  }
  
  .color-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-bottom: 5px;
    transition: all 0.2s ease;
  }
  
  .color-circle.gray {
    background-color: var(--color-cv-gray);
  }
  
  .color-circle.blue {
    background-color: var(--color-cv-blue);
  }
  
  .color-circle.red {
    background-color: var(--color-cv-red);
  }
  
  .color-name {
    font-size: 14px;
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
  
  .btn-primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }
  
  .btn-primary:disabled {
    background-color: var(--color-gray-light);
    cursor: not-allowed;
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