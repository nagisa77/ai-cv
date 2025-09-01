<template>
  <div class="form-group" :class="{ invalid }">
    <!-- 月份选择器 -->
    <flat-pickr
      v-model="innerValue"
      :config="fpConfig"
      class="form-input"
      placeholder=""
      :disabled="!enable"
      ref="dateRef"
      :id="id"
    />

    <label class="form-label" :for="id">{{ labelText }}</label>

    <!-- 至今按钮（可选） -->
    <button
      v-if="allowPresent"
      type="button"
      class="present-btn"
      :disabled="!enable"
      @click="setPresent"
    >
      至今
    </button>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js'
import 'flatpickr/dist/plugins/monthSelect/style.css'

// 简体中文本地化（flatpickr 4.6.13+ 已内置）
import { Mandarin as Chinese } from 'flatpickr/dist/l10n/zh.js'

export default {
  name: 'AppleStyleDatePicker',
  components: { FlatPickr },
  props: {
    id:            { type: String,  required: true },
    labelText:     { type: String,  required: true },
    required:      { type: Boolean, default: false },
    modelValue:    { type: [String, null], default: '' },
    enable:        { type: Boolean, default: true },
    invalid:       { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  data () {
    return { innerValue: this.modelValue }
  },
  watch: {
    /* 双向同步 */
    innerValue (v) { this.$emit('update:modelValue', v) },
    modelValue (v) { this.innerValue = v }
  },
  computed: {
    fpConfig () {
      return {
        locale: Chinese,
        disableMobile: true,         // 始终使用自定义 UI（修复 iOS / Safari）
        allowInput: true,
        // monthSelect 插件：只选年+月
        plugins: [
          new monthSelectPlugin({
            shorthand: true,          // Jul、Aug …（false=完整月份）
            dateFormat: 'Y-m',        // 提交值  ——  2025-06
            altFormat : 'Y年m月'       // 显示值  ——  2025年06月
          })
        ]
      }
    },
    //控制至今按钮是否显示
    allowPresent () {
      return this.labelText.trim() === '结束时间'
    },
  },
  methods: {
    setPresent () {
      // 自定义“至今”值，可根据业务换成空串、null 等
      const PRESENT = '至今'
      const fpInstance = this.$refs.dateRef.fp
      fpInstance.input.value = PRESENT // 直接修改 input 显示
      this.innerValue = PRESENT
      this.$emit('update:modelValue', PRESENT)
    }
  }
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

.form-group.invalid { border-color: #ff4d4f; }

.form-input {
  width: 100%;
  font-size: 14px;
  background-color: white;
  border: none;
  transition: all 0.3s ease;
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

.form-input:focus { outline: none; }

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
  top: 10px;
  left: 12px;
  font-size: 10px;
}

.form-group.invalid .form-label { color: #ff4d4f; }

/* “至今”小按钮 */
.present-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 2px 6px;
  font-size: 11px;
  border: none;
  background: var(--color-gray-light);
  border-radius: 6px;
  cursor: pointer;
}
.present-btn:disabled { cursor: not-allowed; opacity: 0.5; }
</style>