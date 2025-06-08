<!-- ========== AppleStyleInput 组件 ========== -->
<!-- src/components/basic_ui/AppleStyleInput.vue -->
<template>
  <div class="form-group" :style="{ height: rows * 50 + 'px' }">
    <input
      v-if="rows === 1"
      :id="id"
      :type="inputType"
      class="form-input"
      :class="{'error': invalid}"
      placeholder=" "
      :required="required"
      :value="modelValue"
      :disabled="!enable"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <textarea
      v-else
      :id="id"
      class="form-input textarea-input"
      :class="{'error': invalid}"
      :rows="rows"
      placeholder=" "
      :required="required"
      :disabled="!enable"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label class="form-label" :for="id">{{ labelText }}</label>
  </div>
</template>

<script>
export default {
  name: 'AppleStyleInput',
  props: {
    id: {
      type: String,
      required: true
    },
    labelText: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    enable: {
      type: Boolean,
      default: true
    },
    rows: {
      type: Number,
      default: 1
    },
    /**
     * invalid: 是否标记为错误
     */
    invalid: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.form-group {
  position: relative;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
}

.form-input {
  width: calc(100% - 24px);
  height: calc(100% - 12px);
  padding: 12px 12px 0 12px;
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  font-size: 14px;
  display: block;
  background-color: white;
  transition: all 0.3s ease;
}

.textarea-input {
  overflow-y: auto;
  resize: vertical;
}

/* 当invalid=true时，边框变红色 */
.form-input.error {
  background-color: rgba(255, 0, 0, 0.173); /* 红色 */
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
