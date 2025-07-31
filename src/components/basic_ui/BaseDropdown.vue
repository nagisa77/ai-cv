<template>
  <div ref="root" class="dropdown-wrapper" @click.stop>
    <div class="dropdown-trigger">
      <slot name="trigger"></slot>
    </div>
    <transition name="fade">
      <div v-if="modelValue" ref="menu" class="dropdown-content">
        <slot name="menu"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseDropdown',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  methods: {
    close () {
      this.$emit('update:modelValue', false)
    },
    onClickOutside (e) {
      if (!this.$refs.root.contains(e.target)) {
        this.close()
      }
    },
    reposition () {
      this.$nextTick(() => {
        const menu = this.$refs.menu
        if (!menu) return
        const rect = menu.getBoundingClientRect()
        let offsetX = 0
        let offsetY = 0
        if (rect.right > window.innerWidth) {
          offsetX = window.innerWidth - rect.right - 8
        }
        if (rect.bottom > window.innerHeight) {
          offsetY = window.innerHeight - rect.bottom - 8
        }
        menu.style.transform = offsetX || offsetY ? `translate(${offsetX}px, ${offsetY}px)` : ''
      })
    }
  },
  watch: {
    modelValue (val) {
      if (val) {
        document.addEventListener('click', this.onClickOutside)
        window.addEventListener('resize', this.reposition)
        this.reposition()
      } else {
        document.removeEventListener('click', this.onClickOutside)
        window.removeEventListener('resize', this.reposition)
      }
    }
  },
  mounted () {
    if (this.modelValue) {
      document.addEventListener('click', this.onClickOutside)
      window.addEventListener('resize', this.reposition)
      this.reposition()
    }
  },
  beforeUnmount () {
    document.removeEventListener('click', this.onClickOutside)
    window.removeEventListener('resize', this.reposition)
  }
}
</script>

<style scoped>
.dropdown-content {
  position: absolute;
  z-index: 10;
}
</style>
