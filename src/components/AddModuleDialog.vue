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
          <div class="module-list">
            <div class="module-option" @click="onSelect('education')">
              <i class="icon fas fa-graduation-cap education"></i>
              <span>教育经历</span>
            </div>
            <div class="module-option" @click="onSelect('workExperience')">
              <i class="icon fas fa-briefcase work"></i>
              <span>工作经历</span>
            </div>
            <div class="module-option" @click="onSelect('projectExperience')">
              <i class="icon fas fa-project-diagram project"></i>
              <span>项目经历</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AddModuleDialog',
  emits: ['cancel', 'confirm'],
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    onSelect(module) {
      this.$emit('confirm', [module])
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
  background: linear-gradient(135deg, var(--color-white) 0%, var(--color-secondary-dark) 100%);
  width: 400px;
  max-width: 95%;
  border-radius: 20px;
  padding: 20px 28px 28px 28px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.18);
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
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
}
.close-btn:hover {
  background-color: var(--color-secondary);
  color: var(--color-primary);
}
.module-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 10px;
}
.module-option {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 17px;
  font-weight: 500;
  background: var(--color-secondary);
  border-radius: 12px;
  padding: 18px 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(217, 119, 87, 0.06);
  border: 2px solid transparent;
  transition: border 0.2s, box-shadow 0.2s, background 0.2s;
}
.module-option:hover {
  border: 2px solid var(--color-primary);
  background: var(--color-primary-light);
  box-shadow: 0 4px 16px rgba(217, 119, 87, 0.10);
}
.icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 2px;
}
.icon.education {
  background: linear-gradient(135deg, var(--color-primary) 60%, var(--color-primary-light) 100%);
  color: #fff;
}
.icon.work {
  background: linear-gradient(135deg, var(--color-cv-blue) 60%, #b3d1ff 100%);
  color: #fff;
}
.icon.project {
  background: linear-gradient(135deg, var(--color-cv-gray) 60%, #bdbdbd 100%);
  color: #fff;
}
</style>
