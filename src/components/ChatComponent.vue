<template>
  <div class="chat-component">
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
import { ref, computed, watch, defineEmits, nextTick } from 'vue'
import ChatgptModel from '@/models/chatgpt_model.js'

// 1. 获取 ChatGPT 模型的单例
const chatgptInstance = ChatgptModel.getInstance()

// 2. 通过 computed 引用 messages，实现实时更新
const messages = computed(() => chatgptInstance.getMessages())

// 输入框内容
const inputValue = ref('')

// 发送按钮图标
const sendIcon = require('@/assets/icon/chatgpt-send-icon.svg')

// 3. 定义要发出的事件
const emit = defineEmits(['update-resume'])

// 4. 引用 messagesContainer
const messagesContainer = ref(null)

// 5. 发送消息的函数 —— 非 async，让响应式数据变化后触发界面更新
function handleSendMessage() {
  const trimmedValue = inputValue.value.trim()
  if (!trimmedValue) return

  // 调用模型的 sendMessage，会自动往 messages 数组里 push 新消息
  chatgptInstance.sendMessage(trimmedValue)

  // 清空输入框
  inputValue.value = ''
}

// 6. 解析 GPT 消息中的 JSON 并提取 message 字段
function extractMessage(gptText) {
  try {
    const parsed = JSON.parse(gptText)
    return parsed.message || '(未找到 message 字段)'
  } catch (error) {
    // 如果 GPT 返回的文本无法解析为 JSON，或者不符合预期
    // 你可以选择降级处理，比如直接显示原文本
    return gptText
  }
}

// 7. 监听 messages 的变化，一旦发现 GPT 发来新消息，就做进一步处理
watch(
  () => messages.value,
  async (newMessages) => { // 修改为 async 以使用 await
    if (!newMessages || newMessages.length === 0) return

    const lastMessage = newMessages[newMessages.length - 1]
    // 判断是否来自 GPT
    if (lastMessage.sender === 'gpt') {
      try {
        const parsedData = JSON.parse(lastMessage.text)
        console.log('解析到的 JSON 数据：', parsedData)
        const message = parsedData.message
        console.log('从 JSON 中获取的消息：', message)
        
        // 触发自定义事件，将 resumeData 发送给父组件
        emit('update-resume', parsedData.meta_data)
      } catch (e) {
        console.error('GPT 返回的消息不是标准 JSON 或解析失败：', e)
      }
    }

    // 等待 DOM 更新后再滚动
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

.message.system {
  padding-left: 20px;
  padding-right: 20px;
  opacity: 0.3;
  font-size: 10px;
  max-width: none; /* 取消最大宽度限制 */
}

/* 我 (me) 消息样式：右侧显示 */
.message.me {
  background-color: #f1f1f1;
  text-align: right;
  margin-left: auto;
  margin-top: 30px;
  margin-right: 20px;
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
</style>