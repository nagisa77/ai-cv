<template>
  <div class="chat-component">
    <!-- 这里是一个示例区域，用来让用户输入API Key -->
    <div class="debug-settings">
      <span style="color: red;">[debug_area]:</span>
      <input
        v-model="apiKeyInput"
        placeholder="在此粘贴你的 OpenAI API Key"
      />
      <button @click="handleSetApiKey">保存 Key</button>
      <button @click="handleCopyPrompt">Copy Prompt</button>
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
          <div class="me-message-container">
            <div class="message me">
              <span>{{ message.text }}</span>
            </div>
          </div>
        </template>

        <!-- 系统消息（system） -->
        <!-- <template v-else-if="message.sender === 'system'">
          <div class="message system">
            <span>{{ message.text }}</span>
          </div>
        </template> -->

        <!-- 选择消息（choice），用户可以点击“OK”或者“我觉得还不够” -->
        <template v-else-if="message.sender === 'choice'">
          <div class="message choice">
            <span>GPT 觉得已经够了，你是否满意？</span>
            <div class="choice-buttons">
              <button @click="handleOk(message)">OK</button>
              <button @click="handleNotEnough">我觉得还不够</button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="gradient-overlay"></div>

    <!-- 输入区（发送给ChatGPT） -->
    <div class="input-area-container">
      <div class="input-area-left">
        <input
          v-model="inputValue"
          :placeholder="'请探讨和 “' + (currentSelectedTitle ? currentSelectedTitle : '当前模块') + '” 有关的事情'"
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
 * 监听 messages 变化，一旦 GPT 发来新消息，就检查 is_enough 逻辑；
 * 如果 is_enough=true，则插入一个“choice”类型的消息，让用户选择
 */
watch(
  () => messages.value,
  async (newMessages) => {
    if (!newMessages || newMessages.length === 0) return

    const lastMessage = newMessages[newMessages.length - 1]
    if (lastMessage.sender === 'gpt') {
      try {
        const parsedData = JSON.parse(lastMessage.text)
        if (parsedData.is_enough) {
          // 新增：往消息列表里再插入一个 choice 消息（和聊天内容同级）
          const { type, title } = activeModule.value
          chatgptInstance.addMessage(type, title, {
            sender: 'choice',
            text: JSON.stringify({ meta_data: parsedData.meta_data })
          })
        }
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

/**
 * 用户点击“OK”时调用
 */
function handleOk(choiceMessage) {
  try {
    const parsed = JSON.parse(choiceMessage.text)
    // 如果解析成功，拿到 meta_data，发射事件
    emit('update-resume', parsed.meta_data)
    emit('close-chat')
  } catch (e) {
    console.error('choiceMessage.text 不是 JSON', e)
  }
}

/**
 * 用户点击“我觉得还不够”时调用
 */
 function handleNotEnough() {
  const predefinedMessage = '我认为总结还不够，请继续对话'
  
  const { type, title } = activeModule.value
  if (!type || !title) {
    console.error('当前未选择有效的模块')
    return
  }

  // 发送预定义消息到 GPT
  chatgptInstance.sendMessage(type, title, predefinedMessage)
  
  // 可选：清空输入框（如果需要）
  inputValue.value = ''

  // 可选：提示用户消息已发送
  console.log('已发送预定义消息给GPT')
}
</script>

<style scoped>

.chat-component {
  background-color: var(--color-background);
  height: calc(100vh - 60px);
  width: 38vw;
}

.debug-settings {
  position: fixed;
  display: flex;
  gap: 10px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: var(--color-header-background);
  width: 38vw;
}


.input-area-container {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  left: 30px;
  bottom: 20px;
  width: calc(38vw - 60px);
  max-width: 500px;
  align-self: center;
  border: 1px solid var(--color-primary);
}

.gradient-overlay {
  position: fixed;
  bottom: 62px;
  left: 0;
  width: 38vw;
  height: 80px;
  background: linear-gradient(to top, var(--color-background), rgba(255, 255, 255, 0));
}

.input-area-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.chatgpt-input {
  margin-left: 20px;
  height: 40px;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: transparent;
  flex: 1;
}

.chatgpt-send-button {
  width: 30px;
  height: 30px;
  margin-right: 6px;
  border-radius: 50%;
  margin-left: 6px;
  border: none;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.chatgpt-send-button:hover {
  background-color: var(--color-primary-hover);
  transition: background-color 0.3s ease;
}

.chatgpt-send-icon {
  background-color: transparent;
  filter: brightness(0) invert(1);
  width: 30px;
  height: 30px;
}

.messages-container {
  height: calc(100vh - 60px - 62px - 50px);
  overflow-y: auto;
  padding-bottom: 50px;
}

.gpt-message-container {
  display: flex;
  padding-left: 20px;
  margin-bottom: 10px;
  gap: 10px;
  align-items: flex-start; /* 使内容靠左 */
  justify-content: flex-start; /* 确保消息区域靠左 */
}

.me-message-container {
  display: flex;
  padding-right: 20px;
  gap: 10px;
  margin-bottom: 10px;
  align-items: flex-start; /* 使内容靠右 */
  justify-content: flex-end; /* 确保消息区域靠右 */
}

.message {
  max-width: 300px;
  padding: 10px;
  border-radius: 15px;
  font-size: 14px;
}

.message.gpt {
  color: var(--color-secondary);
  background-color: var(--color-primary);
}

.message.me {
  background-color: white;
}

.chatgpt-message-icon {
  width: 30px;
  height: 30px;
}

</style>
