<!-- src/components/AppleStyleInput.vue -->
<template>
    <div class="form-group">
      <input 
        :id="id"
        :type="inputType"
        class="form-input"
        placeholder=" "
        :required="required"
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
  </style>