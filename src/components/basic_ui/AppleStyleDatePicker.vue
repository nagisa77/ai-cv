<template>
  <div
    class="form-group"
    :class="{ invalid: invalid }"
  >
    <input
      :id="id"
      type="month"
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
    },
    /**
     * 新增 invalid，用于标记校验是否出错
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
  width: calc(100% - 24px);
  height: 26px;
  padding: 20px 4px 4px 4px;
  border-radius: 10px;
  border: 1px solid var(--color-gray);
  margin-bottom: 10px;
  transition: border-color 0.3s ease;
}

/* 当 invalid 为 true 时，使用红色边框。 */
.form-group.invalid {
  border: 1px solid #ff4d4f;
}

.form-input {
  font-size: 14px;
  display: block;
  background-color: white;
  transition: all 0.3s ease;
  border: none;
  width: 100%;
}

.form-input:disabled {
  background-color: var(--color-light-gray);
  color: var(--color-gray-dark);
  cursor: not-allowed;
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

.form-input:focus {
  outline: none;
}

/* label上移与原来的 AppleStyleInput 保持一致 */
.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
  top: 10px;
  left: 12px;
  font-size: 10px;
}

/* 当 invalid=true 时，让 label 也变红 */
.form-group.invalid .form-label {
  color: #ff4d4f;
}
</style>
