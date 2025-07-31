<template>
  <div ref="root" class="dropdown-wrapper" @click.stop>
    <div class="dropdown-trigger">
      <slot name="trigger"></slot>
    </div>
    <transition name="fade">
      <div v-if="modelValue" class="dropdown-content">
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
    }
  },
  watch: {
    modelValue (val) {
      if (val) {
        document.addEventListener('click', this.onClickOutside)
      } else {
        document.removeEventListener('click', this.onClickOutside)
      }
    }
  },
  mounted () {
    if (this.modelValue) {
      document.addEventListener('click', this.onClickOutside)
    }
  },
  beforeUnmount () {
    document.removeEventListener('click', this.onClickOutside)
  }
}
</script>

<style scoped>
.dropdown-content {
  position: absolute;
  z-index: 10;
}
</style>
