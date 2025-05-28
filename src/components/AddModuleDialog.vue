<template>
  <div class="modal-overlay" @click.self="onCancel">
    <transition name="fade-scale">
      <div class="modal-container">
        <div class="modal-header">
          <h2>添加模块</h2>
          <button class="close-btn" @click="onCancel">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <label class="module-option">
            <input type="checkbox" value="education" v-model="selected" />
            教育经历
          </label>
          <label class="module-option">
            <input type="checkbox" value="workExperience" v-model="selected" />
            工作经历
          </label>
          <label class="module-option">
            <input type="checkbox" value="projectExperience" v-model="selected" />
            项目经历
          </label>
        </div>
        <div class="modal-actions">
          <button class="btn btn-white" @click="onCancel">取消</button>
          <button class="btn btn-primary" @click="onConfirm">确定</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AddModuleDialog',
  emits: ['cancel', 'confirm'],
  data() {
    return {
      selected: []
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    onConfirm() {
      this.$emit('confirm', this.selected)
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
  overflow: auto;
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
  background: linear-gradient(135deg, #fff 0%, #f9f9f9 100%);
  width: 400px;
  max-width: 95%;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.close-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  width: 32px;
  height: 32px;
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
.module-option {
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 12px;
  cursor: pointer;
}
.module-option input {
  margin-right: 8px;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 8px;
}
.btn {
  padding: 8px 20px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
.btn-primary {
  background-color: var(--color-primary, #409eff);
  color: #fff;
}
.btn-primary:hover {
  background-color: var(--color-primary-dark, #3a8ee6);
}
.btn-white {
  background-color: #fff;
  color: #666;
  border: 1px solid #ddd;
}
.btn-white:hover {
  background-color: #f8f8f8;
  border-color: #ccc;
  color: #333;
}
</style>
