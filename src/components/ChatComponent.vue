<template>
  <div class="chat-component">
    <!-- （已删除模块选择区域） -->

    <!-- 消息区 -->
    <div class="messages-container" ref="messagesContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message"
        :class="message.sender"
      >
        <!-- 如果是 GPT 消息，只显示 JSON 中的 message 字段 -->
        <span v-if="message.sender === 'gpt'">
          {{ extractMessage(message.text) }}
        </span>
        <!-- 否则正常显示原文本 -->
        <span v-else>
          {{ message.text }}
        </span>
      </div>
    </div>

    <!-- 输入区 -->
    <div class="input-area-container">
      <div class="input-area-left">
        <input
          v-model="inputValue"
          placeholder="给“ChatGPT”发送信息"
          class="chatgpt-input"
          @keyup.enter="handleSendMessage"
        />
      </div>
      <div class="chatgpt-send-button" @click="handleSendMessage">
        <img :src="sendIcon" alt="ChatGPT 图标" class="chatgpt-send-icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, nextTick, defineProps } from 'vue'
import ChatgptModel from '@/models/chatgpt_model.js'

/**
 * 父组件需传入：
 * - modules: Array<{ type, title }>
 * - currentSelectedTitle: string
 */
const props = defineProps({
  modules: {
    type: Array,
    default: () => []
  },
  currentSelectedTitle: {
    type: String,
    default: ''
  }
})

// 只向父组件发射 “update-resume” 事件
const emit = defineEmits(['update-resume'])

// ChatGPT 实例 (单例)
const chatgptInstance = ChatgptModel.getInstance()

// 输入框内容
const inputValue = ref('')

// 发送按钮图标
const sendIcon = require('@/assets/icon/chatgpt-send-icon.svg')

// 消息滚动容器
const messagesContainer = ref(null)

/**
 * 计算：根据 currentSelectedTitle，找到对应模块
 * 如果找不到，则返回 { type: '', title: '' }
 */
const activeModule = computed(() => {
  return (
    props.modules.find((m) => m.title === props.currentSelectedTitle) ||
    { type: '', title: '' }
  )
})

/**
 * 根据 activeModule 计算出对应的消息
 */
const messages = computed(() => {
  const { type, title } = activeModule.value
  if (!type || !title) return []
  return chatgptInstance.getMessagesForTitle(type, title)
})

/**
 * 发送消息
 */
function handleSendMessage() {
  const trimmedValue = inputValue.value.trim()
  if (!trimmedValue) return

  const { type, title } = activeModule.value
  chatgptInstance.sendMessage(type, title, trimmedValue)

  // 清空输入框
  inputValue.value = ''
}

/**
 * 解析 GPT 消息中的 JSON 并提取 message 字段
 */
function extractMessage(gptText) {
  try {
    const parsed = JSON.parse(gptText)
    return parsed.message || '(未找到 message 字段)'
  } catch (error) {
    // 如果无法解析为 JSON，则直接显示原文本
    return gptText
  }
}

/**
 * 监听 messages 变化，一旦 GPT 发来新消息，就向外发射 update-resume
 */
watch(
  () => messages.value,
  async (newMessages) => {
    if (!newMessages || newMessages.length === 0) return

    const lastMessage = newMessages[newMessages.length - 1]
    if (lastMessage.sender === 'gpt') {
      try {
        const parsedData = JSON.parse(lastMessage.text)
        emit('update-resume', parsedData.meta_data)
      } catch (e) {
        console.error('GPT 返回消息不是标准 JSON 或解析失败：', e)
      }
    }

    // 等待 DOM 更新后再滚动到底部
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  },
  { deep: true }
)
</script>

<style scoped>
.chat-component {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  width: 38vw;
  box-shadow: inset 0 0 20px 0 rgba(0, 0, 0, 0.2);
  justify-content: space-between;
}

/* 消息容器 */
.messages-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding-top: 20px;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  max-width: 300px;
  word-wrap: break-word;
}

/* GPT 消息样式：左侧显示 */
.message.gpt {
  background-color: #e8f0fe;
  text-align: left;
  margin-right: auto;
  margin-top: 30px;
  margin-left: 20px;
}

/* 系统消息样式 */
.message.system {
  padding-left: 20px;
  padding-right: 20px;
  opacity: 0.3;
  font-size: 10px;
  max-width: none;
}

/* 我 (me) 消息样式：右侧显示 */
.message.me {
  background-color: #f1f1f1;
  text-align: right;
  margin-left: auto;
  margin-top: 30px;
  margin-right: 20px;
}

/* 输入区 */
.input-area-container {
  display: flex;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  margin: 30px;
  width: calc(38vw - 60px);
  max-width: 500px;
  align-self: center;
  border: 1px solid #ccc;
  padding: 5px 15px;
}

.input-area-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.chatgpt-input {
  margin-left: 20px;
  height: 51px;
  border: none;
  outline: none;
  font-size: 14px;
  flex: 1;
}

.chatgpt-send-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 10px;
  border: none;
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.chatgpt-send-icon {
  background-color: transparent;
  filter: brightness(0) invert(1);
  width: 20px;
  height: 20px;
}
</style>
