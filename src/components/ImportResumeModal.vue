<template>
  <!-- 毛玻璃背景蒙层，点击蒙层空白处关闭弹窗 -->
  <div class="modal-overlay" @click.self="closeModal">
    <transition name="fade-scale">
      <div class="modal-container">
        <h2>导入简历</h2>
        <p>支持 PDF / DOC / DOCX / PNG 文件，你可以点击或拖入区域完成导入。</p>

        <!-- 拖拽/点击文件选择区域 -->
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
          <label for="fileInput">
            <span v-if="!selectedFile">点击或拖拽文件到此</span>
            <span v-else>重新选择文件</span>
          </label>
        </div>

        <!-- 文件预览区域 -->
        <div v-if="selectedFile" class="preview-container">
          <div class="preview-header">
            <p class="preview-file-name">{{ selectedFile.name }}</p>
            <button class="preview-remove" @click="removeFile">移除</button>
          </div>
          <!-- 根据文件类型显示不同的预览 -->
          <div class="preview-content">
            <!-- 图片预览 -->
            <img
              v-if="isImage(selectedFile)"
              :src="filePreviewUrl"
              alt="file preview"
            />
            <!-- PDF 预览（使用 <embed> 或 <iframe>） -->
            <embed
              v-else-if="isPDF(selectedFile)"
              :src="filePreviewUrl"
              type="application/pdf"
              class="pdf-preview"
            />
            <!-- 对 DOC/DOCX 暂时仅显示图标或简单提示，可根据需要改成更复杂的预览方式 -->
            <div v-else class="doc-preview">
              <i class="doc-icon"></i>
              <p>无法在线预览此文件类型</p>
            </div>
          </div>
        </div>

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
      this.$refs.fileInput.click()
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

      // 验证文件类型
      if (!validExtensions.includes(ext)) {
        alert('文件类型不符合要求，请选择 PDF / DOC / DOCX / PNG。')
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
      this.selectedFile = null
      this.filePreviewUrl = null
      // 清空 input
      this.$refs.fileInput.value = ''
    },
    // 确认按钮
    confirmImport() {
      // 将选择到的文件通过事件抛到父组件
      this.$emit('confirmImport', this.selectedFile)
    },
    // 判断是否图片类型
    isImage(file) {
      if (!file) return false
      return file.type.includes('image')
    },
    // 判断是否 PDF
    isPDF(file) {
      if (!file) return false
      return file.type === 'application/pdf'
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
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* 弹窗出现的过渡动画 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 容器 */
.modal-container {
  background-color: #fff;
  width: 420px;
  max-width: 90%;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: center;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.modal-container h2 {
  margin: 0;
  font-size: 22px;
  margin-bottom: 8px;
}

.modal-container p {
  margin: 0;
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

/* 拖拽区域 */
.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px 20px;
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s ease;
  margin-bottom: 16px;
}

.drop-zone label {
  display: block;
  font-size: 14px;
  color: #666;
  pointer-events: none; /* 使整个区域可点击 */
}

.drag-over {
  border-color: var(--color-primary, #409eff);
}

/* 预览容器 */
.preview-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  text-align: left;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.preview-file-name {
  font-size: 14px;
  color: #333;
  margin: 0;
  font-weight: bold;
}

.preview-remove {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.3s;
}
.preview-remove:hover {
  background-color: #f2f2f2;
}

/* 具体预览内容 */
.preview-content {
  text-align: center;
}

/* 图片预览 */
.preview-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

/* PDF 预览占位 */
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
  color: #666;
}
.doc-icon {
  width: 48px;
  height: 48px;
  background-color: #e5e5e5;
  display: inline-block;
  border-radius: 8px;
  margin-bottom: 8px;
}
.doc-preview p {
  margin: 0;
}

/* 底部按钮 */
.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
}

.btn {
  flex: 1;
  padding: 12px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--color-primary, #409eff);
  color: #fff;
}
.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-white {
  background-color: #fff;
  color: var(--color-primary, #409eff);
  border: 1.5px solid var(--color-primary, #409eff);
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-white:hover {
  background-color: var(--color-secondary, #f2f6fc);
}
</style>
