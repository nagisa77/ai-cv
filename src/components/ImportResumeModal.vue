<template>
  <!-- 蒙层，带毛玻璃效果 -->
  <div class="modal-overlay" @click.self="closeModal">
    <transition name="fade-scale">
      <div class="modal-container">
        <h2>导入简历</h2>
        <p>支持 PDF / DOC / PNG 文件，您可以点击或拖入区域完成导入。</p>

        <!-- 拖拽/点击文件选择区域 -->
        <div
          class="drop-zone"
          @dragover.prevent="onDragOver"
          @dragleave.prevent="onDragLeave"
          @drop.prevent="onDropFiles"
        >
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.png"
            id="fileInput"
            @change="onFileChange"
          />
          <label for="fileInput">点击或拖拽文件到此</label>
        </div>

        <ul v-if="selectedFiles.length" class="file-list">
          <li v-for="(file, index) in selectedFiles" :key="index">
            {{ file.name }}
          </li>
        </ul>

        <div class="modal-actions">
          <button class="btn btn-white" @click="closeModal">取消</button>
          <button
            class="btn btn-primary"
            :disabled="!selectedFiles.length"
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
      selectedFiles: []
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    onFileChange(e) {
      this.selectedFiles = Array.from(e.target.files)
    },
    onDragOver(e) {
      e.currentTarget.classList.add('drag-over')
    },
    onDragLeave(e) {
      e.currentTarget.classList.remove('drag-over')
    },
    onDropFiles(e) {
      e.currentTarget.classList.remove('drag-over')
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        this.selectedFiles = Array.from(e.dataTransfer.files)
      }
    },
    confirmImport() {
      // 将选择到的文件通过事件抛到父组件
      this.$emit('confirmImport', this.selectedFiles)
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
  backdrop-filter: blur(5px); /* 毛玻璃 */
  background-color: rgba(0, 0, 0, 0.4); /* 半透明黑色覆盖 */
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
  background-color: white;
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
  pointer-events: none;
}

.drop-zone input[type='file'] {
  display: none;
}

.drag-over {
  border-color: var(--color-primary);
}

/* 文件列表 */
.file-list {
  text-align: left;
  margin-bottom: 16px;
  max-height: 150px;
  overflow-y: auto;
}

.file-list li {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

/* 底部按钮 */
.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
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
  background-color: var(--color-primary);
  color: #fff;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-white {
  background-color: #fff;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-white:hover {
  background-color: var(--color-secondary);
}
</style>
