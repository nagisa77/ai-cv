<template>
  <!-- 毛玻璃背景蒙层，点击蒙层空白处关闭弹窗 -->
  <div class="modal-overlay" @click.self="closeModal">
    <transition name="fade-scale">
      <div class="modal-container">
        <div class="modal-header">
          <h2>导入简历</h2>
          <button class="close-btn" @click="closeModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <p class="modal-desc">
          支持 PDF / DOC / DOCX / PNG 文件，你可以点击或拖入区域完成导入。
        </p>

        <div class="modal-body">
          <!-- 左侧：上传（拖拽/点击），只有当未选择文件时展示 -->
          <div
            class="upload-section"
            v-if="!selectedFile"
          >
            <div
              class="drop-zone"
              @dragover.prevent="onDragOver"
              @dragleave.prevent="onDragLeave"
              @drop.prevent="onDropFiles"
              @click="triggerFileInput"
            >
              <!-- 隐藏的 file input，通过 ref="fileInput" 触发 -->
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png"
                id="fileInput"
                ref="fileInput"
                style="display: none"
                @change="onFileChange"
              />
              <div class="drop-zone-content">
                <div class="upload-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <span class="upload-text">点击或拖拽文件到此</span>
                <span class="upload-hint"
                  >允许的格式: PDF, DOC, DOCX, PNG</span
                >
              </div>
            </div>
          </div>

          <!-- 右侧：预览区域 -->
          <!-- 使用新的 fade-slide 过渡动画 -->
          <transition name="fade-slide">
            <div class="preview-section" v-if="selectedFile">
              <div class="preview-container">
                <div class="preview-header">
                  <div class="preview-file-info">
                    <div
                      class="file-type-icon"
                      :class="{
                        'pdf-icon': isPDF(selectedFile),
                        'doc-icon': isDoc(selectedFile),
                        'img-icon': isImage(selectedFile)
                      }"
                    ></div>
                    <p
                      class="preview-file-name"
                      :title="selectedFile.name"
                    >
                      {{ selectedFile.name }}
                    </p>
                  </div>
                  <button
                    class="preview-remove"
                    @click="removeFile"
                    title="移除文件"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M3 6h18"></path>
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
                      ></path>
                      <path
                        d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      ></path>
                    </svg>
                  </button>
                </div>

                <!-- 根据文件类型显示不同的预览 -->
                <div class="preview-content">
                  <!-- 图片预览 -->
                  <div
                    v-if="isImage(selectedFile)"
                    class="preview-wrapper"
                  >
                    <img
                      :src="filePreviewUrl"
                      alt="file preview"
                      class="image-preview"
                    />
                  </div>
                  <!-- PDF 预览 -->
                  <div
                    v-else-if="isPDF(selectedFile)"
                    class="preview-wrapper"
                  >
                    <embed
                      :src="filePreviewUrl"
                      type="application/pdf"
                      class="pdf-preview"
                    />
                  </div>
                  <!-- DOC/DOCX 显示图标 -->
                  <div v-else class="doc-preview">
                    <div class="doc-icon-large"></div>
                    <p>无法在线预览此文件类型</p>
                    <span class="file-size"
                      >{{ formatFileSize(selectedFile.size) }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 操作按钮 -->
        <div class="modal-actions">
          <button class="btn btn-white" @click="closeModal">取消</button>
          <button
            class="btn btn-primary"
            :disabled="!selectedFile"
            @click="confirmImport"
          >
            确认导入
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ImportResumeModal',
  data() {
    return {
      selectedFile: null,
      filePreviewUrl: null
    }
  },
  methods: {
    // 关闭弹窗
    closeModal() {
      this.$emit('close')
    },
    // 点击区域时，触发系统文件选择
    triggerFileInput() {
      this.$refs.fileInput && this.$refs.fileInput.click()
    },
    // 手动选择文件
    onFileChange(e) {
      const file = e.target.files[0]
      this.handleFile(file)
    },
    // 拖拽进入时高亮边框
    onDragOver(e) {
      e.currentTarget.classList.add('drag-over')
    },
    // 拖拽离开时取消高亮
    onDragLeave(e) {
      e.currentTarget.classList.remove('drag-over')
    },
    // 拖拽放下时处理文件
    onDropFiles(e) {
      e.currentTarget.classList.remove('drag-over')
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0]
        this.handleFile(file)
      }
    },
    // 过滤并记录有效文件
    handleFile(file) {
      if (!file) return
      // 允许的扩展名
      const validExtensions = ['pdf', 'doc', 'docx', 'png']
      const ext = file.name.split('.').pop().toLowerCase()

      if (!validExtensions.includes(ext)) {
        this.$swal({
          icon: 'error',
          title: '文件类型不符合要求',
          text: '请选择 PDF / DOC / DOCX / PNG。'
        })
        return
      }

      this.selectedFile = file
      // 如果需要预览图片或 PDF，这里创建预览 URL
      if (ext === 'png' || ext === 'pdf') {
        this.filePreviewUrl = URL.createObjectURL(file)
      } else {
        this.filePreviewUrl = null
      }
    },
    // 移除文件
    removeFile() {
      if (this.filePreviewUrl) {
        URL.revokeObjectURL(this.filePreviewUrl)
      }
      this.selectedFile = null
      this.filePreviewUrl = null
      // 防止 ref 不存在时报错
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },
    // 确认按钮
    confirmImport() {
      // 将选择到的文件通过事件抛到父组件
      this.$emit('confirmImport', this.selectedFile)
    },
    // 判断是否图片类型
    isImage(file) {
      return file && file.type.includes('image')
    },
    // 判断是否 PDF
    isPDF(file) {
      return file && file.type === 'application/pdf'
    },
    // 判断是否 DOC/DOCX
    isDoc(file) {
      // 有些浏览器可能只返回doc/docx的MIME类型，也可能只是名称结尾
      return file && (
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.name.endsWith('.doc') ||
        file.name.endsWith('.docx')
      )
    },
    // 格式化文件大小
    formatFileSize(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
  }
}
</script>

<style scoped>
/* 毛玻璃/高斯模糊效果的蒙层 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 弹窗出现的过渡动画 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-scale-enter,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* 新增：预览区域的淡入淡出+向上位移动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}
.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 弹窗整体容器，采用轻微渐变背景 */
.modal-container {
  background: linear-gradient(135deg, #fff 0%, #f9f9f9 100%);
  width: 800px;
  max-width: 95%;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  text-align: left;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.close-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: #f5f5f5;
  color: #333;
}

.modal-container h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.modal-desc {
  margin: 0 0 20px;
  font-size: 14px;
  color: #666;
}

/* 弹窗主体布局（左右分栏） */
.modal-body {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
  flex: 1;
  min-height: 350px;
  overflow: hidden;
}

/* 左侧上传区域 */
.upload-section {
  flex: 1;
  transition: flex 0.3s ease;
}

/* 右侧预览区域 */
.preview-section {
  flex: 1.6;
  transition: all 0.3s ease;
}

/* 拖拽区域 */
.drop-zone {
  border: 2px dashed #d9d9d9;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  text-align: center;
  height: calc(100% - 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  overflow: hidden;
}

.drop-zone:hover {
  border-color: var(--color-primary, #409eff);
  background-color: #f5f9ff;
}

.drop-zone-content {
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.upload-icon {
  color: var(--color-primary, #409eff);
  margin-bottom: 16px;
  opacity: 0.8;
}

.upload-text {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.upload-hint {
  font-size: 12px;
  color: #999;
}

.drag-over {
  border-color: var(--color-primary, #409eff);
  background-color: rgba(64, 158, 255, 0.05);
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

/* 预览容器 */
.preview-container {
  border-radius: 12px;
  padding: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.preview-file-info {
  display: flex;
  align-items: center;
  max-width: 80%;
}

.file-type-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-right: 12px;
  background-color: #f0f0f0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 16px;
}

.pdf-icon {
  background-color: #fee2e2;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ef4444' stroke-width='2'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'%3E%3C/path%3E%3Cpolyline points='14 2 14 8 20 8'%3E%3C/polyline%3E%3Cline x1='16' y1='13' x2='8' y2='13'%3E%3C/line%3E%3Cline x1='16' y1='17' x2='8' y2='17'%3E%3C/line%3E%3Cpolyline points='10 9 9 9 8 9'%3E%3C/polyline%3E%3C/svg%3E");
}

.doc-icon {
  background-color: #e0f2fe;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230ea5e9' stroke-width='2'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'%3E%3C/path%3E%3Cpolyline points='14 2 14 8 20 8'%3E%3C/polyline%3E%3Cline x1='16' y1='13' x2='8' y2='13'%3E%3C/line%3E%3Cline x1='16' y1='17' x2='8' y2='17'%3E%3C/line%3E%3Cpolyline points='10 9 9 9 8 9'%3E%3C/polyline%3E%3C/svg%3E");
}

.img-icon {
  background-color: #dcfce7;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2322c55e' stroke-width='2'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E");
}

.preview-file-name {
  font-size: 15px;
  color: #333;
  margin: 0;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.preview-remove {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 14px;
  padding: 8px;
  border-radius: 8px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-remove:hover {
  background-color: #f2f2f2;
  color: #f56c6c;
}

/* 具体预览内容 */
.preview-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  border-radius: 8px;
  background-color: #fcfcfc;
}

.preview-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 图片预览 */
.image-preview {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* PDF 预览 */
.pdf-preview {
  width: 100%;
  height: 300px;
  border: none;
  border-radius: 8px;
}

/* DOC 预览提示 */
.doc-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  padding: 30px;
  height: 100%;
}
.doc-icon-large {
  width: 64px;
  height: 64px;
  background-color: #e0f2fe;
  display: inline-flex;
  border-radius: 16px;
  margin-bottom: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%230ea5e9' stroke-width='2'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'%3E%3C/path%3E%3Cpolyline points='14 2 14 8 20 8'%3E%3C/polyline%3E%3Cline x1='16' y1='13' x2='8' y2='13'%3E%3C/line%3E%3Cline x1='16' y1='17' x2='8' y2='17'%3E%3C/line%3E%3Cpolyline points='10 9 9 9 8 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 32px;
}
.doc-preview p {
  margin: 4px 0 12px;
  font-size: 15px;
}

.file-size {
  font-size: 13px;
  color: #999;
}

/* 底部按钮 */
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 16px;
}

.btn {
  padding: 10px 24px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--color-primary, #409eff);
  color: #fff;
}
.btn-primary:disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-white {
  background-color: #fff;
  color: #666;
  border: 1px solid #ddd;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark, #3a8ee6);
}

.btn-white:hover {
  background-color: #f8f8f8;
  border-color: #ccc;
  color: #333;
}

/* 媒体查询：在较小屏幕上调整布局 */
@media (max-width: 768px) {
  .modal-body {
    flex-direction: column;
  }

  .upload-section,
  .preview-section {
    width: 100%;
  }

  .preview-container {
    margin-top: 16px;
  }

  .modal-actions {
    justify-content: space-between;
  }

  .btn {
    flex: 1;
  }
}
</style>
