<template>
  <div class="chat-component">
    <div class="state-area">
      <div>
        当前意向岗位: {{ currentJobTitle }}
      </div>
      <div>
        当前正在攻略的模块: {{ currentSelectedTitle }}
      </div>
    </div>

    <!-- 消息区 -->
    <div class="messages-container" ref="messagesContainer">
      <!-- 使用 v-for 渲染所有消息 -->
      <div v-if="messages.length > 2">
        <div v-for="(message, index) in messages" :key="index" :style="{ marginTop: index === 0 ? '80px' : '0px' }">
          <!-- GPT 消息：头像 + 蓝框并列 -->
          <template v-if="message.sender === 'gpt' && message.display">
            <div class="gpt-message-container">
              <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/logo1.png" alt="ChatGPT 头像" class="chatgpt-message-icon" />
              <div class="message gpt">
                <span>{{ extractMessage(message.text) }}</span>
              </div>
            </div>

            <div class="gpt-message-container prompt-hint" v-for="(hint, index) in JSON.parse(message.text).prompt_hint"
              :key="index" @click="handlePromptHintClick(hint)">
              {{ hint }}
            </div>
          </template>

          <!-- 用户消息（me） -->
          <template v-else-if="message.sender === 'me' && message.display">
            <div class="me-message-container">
              <div class="message me">
                <span>{{ JSON.parse(message.text).user_text }}</span>
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
          <template v-else-if="message.sender === 'choice' && message.display">
            <div class="choice-message-container">
              <div class="message choice">
                <span>根据少侠提供的信息，菌菌已经<span style="color: var(--color-primary); font-weight: bold;">帮你总结</span>了以下要点:
                </span>

                <div class="item-content-item" v-for="(point, i2) in getContentsFromMessage(message)" :key="i2">
                  <div class="bullet-point-content">
                    <span class="bullet-point">· {{ point.bullet_point }}:</span>
                    <span class="bullet-content">{{ point.content }}</span>
                  </div>
                </div>

                <div v-if="isLastMessage(message)" class="choice-buttons">
                  <button class="choice-button-ok" @click="handleOk(message)">没问题, 展示到右边吧~! 🎉</button>
                  <button class="choice-button-not-enough" @click="handleNotEnough">我觉得还不够, 继续对话吧:(</button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="chat-loading-container" v-else>
        <l-waveform class="chat-loading-icon" size="60" stroke="3.5" speed="1"
          color="var(--color-primary)"></l-waveform>
      </div>
    </div>

    <div class="gradient-overlay"></div>

    <!-- 输入区（发送给ChatGPT） -->
    <div class="input-area-container" v-if="isWaitingForAIResponse">
      <div class="loading-container">
        <l-infinity size="20" stroke="4" stroke-length="0.15" bg-opacity="0.5" speed="1.3"
          color="var(--color-secondary)"></l-infinity>
      </div>
    </div>
    <div class="input-area-container" v-else>
      <div class="input-area-left">
        <!-- 使用 textarea 替换 input -->
        <textarea
          v-model="inputValue"
          :placeholder="'请探讨和 “' + (currentSelectedTitle ? currentSelectedTitle : '当前模块') + '” 有关的事情'"
          class="chatgpt-input"
          rows="1"
          @keydown.ctrl.enter="handleSendMessage"
        ></textarea>
      </div>
      <div class="chatgpt-send-button" @click="handleSendMessage">
        <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/chatgpt-send-icon.svg" alt="ChatGPT 图标" class="chatgpt-send-icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, defineProps, defineEmits, onMounted } from 'vue'
import ChatgptModel from '@/models/chatgpt_model.js'
import { infinity } from 'ldrs'
import { waveform } from 'ldrs'
import metadataInstance from '@/models/metadata_model.js'
waveform.register()
infinity.register()

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

// 在组件初始化时，可以从 localStorage 中尝试读取
onMounted(() => {
  if (props.currentSelectedTitle) {
    initChat()
  }
})

function initChat() {
  if (messages.value.length == 1) {
    const { type, title } = activeModule.value
    chatgptInstance.sendMessage(
      type,
      title,
      "我现在开始讨论这个话题，请你用一句话引导我, 由你来负责展开这个话题。接下来开始正式的对话",
      false
    )
  }
}

// 输入框内容
const inputValue = ref('')

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

const currentJobTitle = computed(() => {
  return metadataInstance.contentForType('personalInfo')['jobTitle'];
})

/**
 * 根据 activeModule 计算出对应的消息
 */
const messages = computed(() => {
  const { type, title } = activeModule.value
  if (!type || !title) return []
  return chatgptInstance.getMessagesForTitle(type, title)
})

const isWaitingForAIResponse = computed(() => {
  return messages.value.length > 1 && messages.value[messages.value.length - 1].sender === 'me'
})

function handleSendMessage() {
  const trimmedValue = inputValue.value.trim()
  if (!trimmedValue) return

  const { type, title } = activeModule.value
  let extra_message = ''
  if (messages.value[messages.value.length - 1].sender === 'choice') {
    extra_message = '用户没有点OK，或者Not Enough，尝试继续跟用户聊，先不再觉得is_enough, 过一会信息再次充足时，再将is_enough设置为true' 
  }
  chatgptInstance.sendMessage(type, title, trimmedValue, true, false, extra_message) 

  // 清空输入框
  inputValue.value = ''
}

function isLastMessage(message) {
  return messages.value.length > 0 && messages.value[messages.value.length - 1] === message
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
            text: JSON.stringify({ meta_data: parsedData.meta_data }),
            display: true
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
 * 监听 currentSelectedTitle 的变化
 */
watch(
  () => props.currentSelectedTitle,
  (newTitle, oldTitle) => {
    console.log(`模块从 "${oldTitle}" 切换到 "${newTitle}"`)
    initChat()
  }
)

function handlePromptHintClick(hint) {
  try {
    const { type, title } = activeModule.value
    chatgptInstance.sendMessage(
      type,
      title,
      "接下来我要讨论 " + hint,
      true
    )
  } catch (e) {
    console.error('choiceMessage.text 不是 JSON', e)
  }
}

/**
 * 用户点击“OK”时调用
 */
function handleOk(choiceMessage) {
  try {
    const parsed = JSON.parse(choiceMessage.text)
    // 如果解析成功，拿到 meta_data，发射事件
    emit('update-resume', parsed.meta_data)
    // emit('close-chat')

    const { type, title } = activeModule.value
    chatgptInstance.sendMessage(
      type,
      title,
      "我现在觉得OK了，已经选择了总结到右边! 基于现在已有的内容，给出可以进一步优化的建议或进一步挖掘其他的亮点，is_enough 请先设置为 false",
      false,
      true
    )
  } catch (e) {
    console.error('choiceMessage.text 不是 JSON', e)
  }
}

function getContentsFromMessage(message) {
  const parsed = JSON.parse(message.text)
  return parsed.meta_data.resumeData.content
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
  chatgptInstance.sendMessage(type, title, predefinedMessage, true)

  // 可选：清空输入框（如果需要）
  inputValue.value = ''

  // 可选：提示用户消息已发送
  console.log('已发送预定义消息给GPT')
}
</script>

<style scoped>
.chat-component {
  background-color: var(--color-background);
  height: 100vh;
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

  display: none;
}


.input-area-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
  border-radius: 25px;
  left: 110px;
  bottom: 20px;
  width: calc(38vw - 60px);
  max-width: 500px;
  align-self: center;
  border: 1px solid var(--color-primary);
}

.gradient-overlay {
  position: fixed;
  bottom: 116px;
  left: 0;
  width: 38vw;
  height: 20px;
  background: linear-gradient(to top, var(--color-background), rgba(255, 255, 255, 0));
  pointer-events: none; /* 不相应鼠标事件 */
}

.input-area-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.chatgpt-input {
  margin-left: 20px;
  min-height: 40px;
  max-height: calc(40px * 5);
  border: none;
  outline: none;
  font-size: 14px;
  background-color: transparent;
  flex: 1;
  overflow-y: auto;
  resize: none;
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

  position: absolute;
  right: 10px;
  bottom: 10px;
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
  height: calc(100vh - 62px - 74px);
  overflow-y: auto;
  padding-top: 20px;
}

.choice-message-container,
.gpt-message-container {
  display: flex;
  padding-left: 20px;
  margin-bottom: 10px;
  gap: 10px;
  align-items: flex-start;
  /* 使内容靠左 */
  justify-content: flex-start;
  /* 确保消息区域靠左 */
}

.me-message-container {
  display: flex;
  padding-right: 20px;
  gap: 10px;
  margin-bottom: 10px;
  align-items: flex-start;
  /* 使内容靠右 */
  justify-content: flex-end;
  /* 确保消息区域靠右 */
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

.message.choice {
  max-width: 100%;
}

.bullet-point-content {
  font-size: 10px;
  margin-right: 10px;
  margin-top: 10px;
}

.bullet-point-prefix {
  font-size: 10px;
  font-weight: bold;
}

.bullet-point {
  font-size: 10px;
  font-weight: bold;
}

.bullet-content {
  font-size: 10px;
  padding-left: 10px;
}

.choice-buttons {
  display: flex;
  margin-top: 20px;
  gap: 15px;
}

.choice-button-ok {
  background-color: var(--color-primary);
  color: var(--color-secondary);
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
}

.choice-button-ok:hover {
  background-color: var(--color-primary-hover);
  transition: background-color 0.3s ease;
}

.choice-button-not-enough {
  background-color: var(--color-secondary);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
}

.choice-button-not-enough:hover {
  background-color: var(--color-secondary-hover);
  transition: background-color 0.3s ease;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  border-radius: 20px;
}

.chat-loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.prompt-hint {
  width: fit-content;
  font-size: 10px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid var(--color-primary);
  padding: 3px 10px;
  color: var(--color-primary);
  margin-left: 10px;
  cursor: pointer;
  margin-left: 60px;
  opacity: 0.7;
}

.prompt-hint:hover {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.state-area {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  width: calc(38vw - 40px);
  font-size: 12px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>
