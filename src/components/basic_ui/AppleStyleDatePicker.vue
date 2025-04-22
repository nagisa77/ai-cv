<!-- ========== 新增的 AppleStyleDatePicker 组件 ========== -->
<!-- 也可拆分到单独的文件 AppleStyleDatePicker.vue，这里为了方便演示放在同一文件中 -->
<template>
  <div class="form-group">
    <input
      :id="id"
      type="date"
      class="form-input"
      placeholder=" "
      :required="required"
      :value="modelValue"
      :disabled="!enable"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label class="form-label" :for="id">{{ labelText }}</label>
  </div>
</template>

<script>
export default {
  name: 'AppleStyleDatePicker',
  props: {
    id: {
      type: String,
      required: true
    },
    labelText: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    },
    enable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.form-group {
  position: relative;
  width: calc(100% - 24px);
  height: calc(100% - 12px);
  padding: 20px 12px 4px 12px;
  border-radius: 10px;
  border: 1px solid var(--color-gray);
  margin-bottom: 10px;
}

.form-input {
  font-size: 14px;
  display: block;
  background-color: white;
  transition: all 0.3s ease;
  border: none;
}

.form-input:disabled {
  background-color: var(--color-light-gray);
  border-color: var(--color-light-gray);
  color: var(--color-gray-dark);
  cursor: not-allowed;
}

.form-input:focus {
  outline: none;
  border: 2px solid var(--color-primary);
}

.form-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-52%);
  font-size: 14px;
  color: var(--color-gray-dark);
  pointer-events: none;
  transition: all 0.3s ease;
}

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
  top: 10px;
  left: 12px;
  font-size: 10px;
}

.form-input:focus + .form-label {
  color: var(--color-primary);
}

.form-input:disabled + .form-label {
  color: var(--color-gray);
}
</style>
