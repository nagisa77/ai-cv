<template>
  <div 
    class="uploadable-image"
    :style="{ width: width + 'px', height: height + 'px' }"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="handleClick"
  >
    <!-- 图片显示 -->
    <img
      :src="displayImage"
      class="image-preview"
      :class="{ 'loading': isLoading }"
      style="object-fit: cover;"
    />
    
    <!-- Hover蒙层 -->
    <div v-show="isHovered && !isLoading" class="overlay">
      <svg class="upload-icon" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
    </div>

    <!-- 上传中状态 -->
    <div v-show="isLoading" class="overlay loading-overlay">
      <div class="loading-spinner"></div>
      <div class="loading-text">上传中...</div>
    </div>

    <input
      type="file"
      ref="fileInput"
      class="file-input"
      accept="image/*"
      @change="handleFileUpload"
    />
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import apiClient from '@/api/axios'

export default {
  props: {
    width: {
      type: Number,
      default: 120
    },
    height: {
      type: Number,
      default: 120
    },
    value: String // 支持v-model
  },
  setup() {
        const toast = useToast()
        return { toast }
  },
  data() {
    return {
      isHovered: false,
      isLoading: false,
      currentImage: this.value
    }
  },
  computed: {
    displayImage() {
      return this.currentImage || 'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/uploadAvatar.png'
    }
  },
  methods: {
    handleClick() { 
      if (!this.isLoading) {
        this.$refs.fileInput.click()
      }
    },

    async handleFileUpload(e) {
      const file = e.target.files[0]
      if (!file) return

      this.isLoading = true
      
      try {
        const formData = new FormData()
        formData.append('image', file)

        const { data } = await apiClient.post('/pic', formData, {})

        console.log(data)

        this.currentImage = data.data.url
        this.$emit('input', data.data.url) 
        this.toast.success('图片上传成功')
      } catch (error) {
        this.toast.error('图片上传失败')
      } finally {
        this.isLoading = false
        this.$refs.fileInput.value = '' 
      }
    }
  },
  watch: {
    value(newVal) {
      this.currentImage = newVal
    }
  }
}
</script>

<style scoped>
.uploadable-image {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
  transition: all 0.3s ease;
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-icon {
  width: 32px;
  height: 32px;
  fill: white;
}

.file-input {
  display: none;
}

.loading-overlay {
  flex-direction: column;
  color: white;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 8px;
  font-size: 0.9em;
}
</style>