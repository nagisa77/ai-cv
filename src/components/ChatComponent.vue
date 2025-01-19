<template>
  <div class="chat-component">
    <!-- 这里是一个示例区域，用来让用户输入API Key -->
    <div class="api-key-settings">
      <input
        v-model="apiKeyInput"
        placeholder="在此粘贴你的 OpenAI API Key"
      />
      <button @click="handleSetApiKey">保存 Key</button>
    </div>

    <!-- 消息区 -->
    <div class="messages-container" ref="messagesContainer">
      <!-- 使用 v-for 渲染所有消息 -->
      <div v-for="(message, index) in messages" :key="index">
        <!-- GPT 消息：头像 + 蓝框并列 -->
        <template v-if="message.sender === 'gpt'">
          <div class="gpt-message-container">
            <img :src="gptMessageIcon" alt="ChatGPT 头像" class="chatgpt-message-icon" />
            <div class="message gpt">
              <span>{{ extractMessage(message.text) }}</span>
            </div>
          </div>
        </template>

        <!-- 用户消息（me） -->
        <template v-else-if="message.sender === 'me'">
          <div class="message me">
            <span>{{ message.text }}</span>
          </div>
        </template>

        <!-- 系统消息（system） -->
        <template v-else-if="message.sender === 'system'">
          <div class="message system">
            <span>{{ message.text }}</span>
          </div>
        </template>
      </div>
    </div>

    <!-- 输入区（发送给ChatGPT） -->
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
import { ref, computed, watch, nextTick, defineProps, defineEmits, onMounted } from 'vue'
import ChatgptModel from '@/models/chatgpt_model.js'

// 父组件需传入
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

// 用户输入的 API Key
const apiKeyInput = ref('')

// 在组件初始化时，可以从 localStorage 中尝试读取
onMounted(() => {
  const storedKey = localStorage.getItem('openaiApiKey')
  if (storedKey) {
    apiKeyInput.value = storedKey
    // 同时给 ChatgptModel 设置
    chatgptInstance.setApiKey(storedKey)
  }
})

// 点击“保存 Key”按钮时，把 key 存到单例
function handleSetApiKey() {
  chatgptInstance.setApiKey(apiKeyInput.value)
  // 同时存到 localStorage（可选）
  localStorage.setItem('openaiApiKey', apiKeyInput.value)
  alert('已设置 API Key')
}

// 输入框内容
const inputValue = ref('')

// 发送按钮图标
const sendIcon = require('@/assets/icon/chatgpt-send-icon.svg')

// GPT 消息头像
const gptMessageIcon = require('@/assets/icon/logo1.png')

// 消息滚动容器
const messagesContainer = ref(null)

/**
 * 计算：根据 currentSelectedTitle，找到对应模块
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

/* 简单示例API Key设置区域 */
.api-key-settings {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px;
}

.messages-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding-top: 20px;
}

/* GPT消息容器：头像与消息并列 */
.gpt-message-container {
  display: flex;
  align-items: flex-start;
  margin-top: 30px;
  margin-left: 20px;
}

/* GPT 蓝框消息 */
.message.gpt {
  background-color: #e8f0fe;
  text-align: left;
  border-radius: 5px;
  max-width: 300px;
  word-wrap: break-word;
  padding: 10px;
  margin-bottom: 10px; /* 仅留底部间距，去掉原来的 margin-left */
}

/* 用户(我)的消息 */
.message.me {
  background-color: #f1f1f1;
  text-align: right;
  margin-left: auto;
  margin-top: 30px;
  margin-right: 20px;
  border-radius: 5px;
  max-width: 300px;
  word-wrap: break-word;
  padding: 10px;
  margin-bottom: 10px;
}

/* 系统消息 */
.message.system {
  opacity: 0.3;
  font-size: 10px;
  max-width: none;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
}

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

/* GPT 消息头像样式 */
.chatgpt-message-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  /* 让头像对齐消息的顶部 */
  margin-top: 2px;
}
</style>