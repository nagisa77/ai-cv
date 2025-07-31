<template>
  <div class="modal-overlay" @click.self="close">
    <transition name="fade-scale">
      <div class="modal-container" :style="{ width }">
        <div class="modal-header">
          <h2>{{ title }}</h2>
          <button class="close-btn" @click="close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '800px'
    }
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close')
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
  z-index: 9999;
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
.modal-body {
  flex: 1;
  overflow: auto;
}
</style>
