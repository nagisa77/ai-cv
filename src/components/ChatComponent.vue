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
        <div
          v-for="(message, index) in messages"
          :key="index"
          :style="{ marginTop: index === 0 ? '80px' : '0px' }"
        >
          <!-- GPT 消息：头像 + 蓝框并列 -->
          <template v-if="message.sender === 'gpt' && message.display">
            <div class="gpt-message-container">
              <!-- <img
                src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/logo1.png"
                alt="ChatGPT 头像"
                class="chatgpt-message-icon"
              /> -->
              <div class="message gpt">
                <span>{{ extractMessage(message.text) }}</span>
              </div>
            </div>

            <div
              class="gpt-message-container prompt-hint"
              v-for="(hint, index) in JSON.parse(message.text).prompt_hint"
              :key="index"
              @click="handlePromptHintClick(hint)"
            >
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

          <!-- 选择消息（choice），用户可点"OK"或"不够" -->
          <template v-else-if="message.sender === 'choice' && message.display">
            <div class="choice-message-container">
              <div class="message choice">
                <span>
                  根据少侠提供的信息，菌菌已经
                  <span style="color: var(--color-primary); font-weight: bold;"
                    >帮你总结</span
                  >
                  了以下要点:
                </span>

                <div
                  class="item-content-item"
                  v-for="(point, i2) in getContentsFromMessage(message)"
                  :key="i2"
                >
                  <div class="bullet-point-content">
                    <span class="bullet-point"
                      >· {{ point.bullet_point }}:</span
                    >
                    <span class="bullet-content">{{ point.content }}</span>
                  </div>
                </div>

                <div v-if="isLastMessage(message)" class="choice-buttons">
                  <button class="choice-button-ok" @click="handleOk(message)">
                    没问题, 展示到右边吧~! 🎉
                  </button>
                  <button class="choice-button-not-enough" @click="handleNotEnough">
                    我觉得还不够, 继续对话吧:(
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- 如果还没有足够消息，显示加载或空状态 -->
      <div class="chat-loading-container" v-else>
        <l-waveform
          class="chat-loading-icon"
          size="60"
          stroke="3.5"
          speed="1"
          color="var(--color-primary)"
        />
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area-container">
      <div class="input-area-left">
        <textarea
          rows="1"
          v-model="inputValue"
          :placeholder="'请探讨和 &quot;' + (currentSelectedTitle ? currentSelectedTitle : '当前模块') + '&quot; 有关的事情'"
          class="chatgpt-input"
          ref="textareaInput"
          @input="adjustTextareaHeight"
          @keydown="handleKeyDown"
          :disabled="isWaitingForAIResponse"
        ></textarea>
      </div>
      <!-- 发送按钮/加载状态 -->
      <div
        class="chatgpt-send-button"
        @click="!isWaitingForAIResponse && handleSendMessage"
        :class="{ 'loading-state': isWaitingForAIResponse }"
      >
        <!-- 加载状态显示loading动画 -->
        <l-infinity
          v-if="isWaitingForAIResponse"
          size="20"
          stroke="3"
          stroke-length="0.15"
          bg-opacity="0.5"
          speed="1.3"
          color="var(--color-secondary)"
        ></l-infinity>
        <!-- 非加载状态显示发送图标 -->
        <img
          v-else
          src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/chatgpt-send-icon.svg"
          alt="ChatGPT 图标"
          class="chatgpt-send-icon"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, defineProps, defineEmits, onMounted } from 'vue'
import ChatgptModel from '@/models/chatgpt_model.js'
import { infinity, waveform } from 'ldrs'
import metadataInstance from '@/models/metadata_model.js'

waveform.register()
infinity.register()

// 父组件需传入的属性
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

// 本组件向父组件发射事件
const emit = defineEmits(['update-resume'])

// ChatGPT 实例 (单例)
const chatgptInstance = ChatgptModel.getInstance()

// 在组件初始化时，如果已经有选中模块，则初始化对话
onMounted(() => {
  if (props.currentSelectedTitle) {
    initChat()
  }
  nextTick(() => {
    adjustTextareaHeight()
  })
})

/** 
 * 如果是首次进入该模块（messages 只有 system 或为空），先触发一次发送 
 */
function initChat() {
  if (messages.value.length === 1) {
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

// 引用 textarea 元素
const textareaInput = ref(null)

/**
 * 根据父组件传入的 currentSelectedTitle，找出当前对应模块
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
 * 拿到当前模块的所有消息
 */
const messages = computed(() => {
  const { type, title } = activeModule.value
  if (!type || !title) return []
  return chatgptInstance.getMessagesForTitle(type, title)
})

/**
 * 判断 GPT 是否在处理中（即最后一条消息是用户发的，还没等到 GPT 回复）
 */
const isWaitingForAIResponse = computed(() => {
  // 简单判断：最后一条消息是 'me' 并且已 display
  return (
    messages.value.length > 1 &&
    messages.value[messages.value.length - 1].sender === 'me'
  )
})

/**
 * 发送消息按钮点击
 */
function handleSendMessage() {
  const trimmedValue = inputValue.value.trim()
  if (!trimmedValue) return

  const { type, title } = activeModule.value
  if (!type || !title) {
    console.warn('当前未选择模块，无法发送聊天内容')
    return
  }

  // 如果上一条是 'choice'，说明用户没点 OK 或 Not Enough；可加额外提示
  let extra_message = ''
  if (messages.value[messages.value.length - 1].sender === 'choice') {
    extra_message =
      '用户没有点OK，或者Not Enough，尝试继续对话，先不判断is_enough，过一会信息充足时再is_enough=true'
  }

  // 发送给 ChatGPT
  chatgptInstance.sendMessage(
    type,
    title,
    trimmedValue,
    true,    // isUser = true
    false,   // overrideIsEnough
    extra_message
  )

  // 清空输入框
  inputValue.value = ''
}

/** 
 * 是否是最后一条消息
 */
function isLastMessage(message) {
  return (
    messages.value.length > 0 &&
    messages.value[messages.value.length - 1] === message
  )
}

/** 
 * 解析 GPT 返回 JSON 中的 message 字段
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
 * 监听 messages 变化，一旦 GPT 发来新消息，就检查 is_enough；
 * 如果 is_enough=true，则插入一个 "choice" 消息
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
          // 往消息列表里再插入一个 choice 类型消息
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
    scrollToBottom()
  },
  { deep: true }
)

/** 
 * 监听当前选中模块的变化 
 */
watch(
  () => props.currentSelectedTitle,
  (newTitle, oldTitle) => {
    console.log(`模块从 "${oldTitle}" 切换到 "${newTitle}"`)
    initChat()
  }
)

/** 
 * 点击提示 hint（相当于快捷输入） 
 */
function handlePromptHintClick(hint) {
  try {
    const { type, title } = activeModule.value
    chatgptInstance.sendMessage(type, title, "接下来我要讨论 " + hint, true)
  } catch (e) {
    console.error('message.text 不是 JSON', e)
  }
}

/** 
 * 用户点击"OK" 
 */
function handleOk(choiceMessage) {
  try {
    const parsed = JSON.parse(choiceMessage.text)
    // 拿到 meta_data，向父组件发射事件，以更新简历
    emit('update-resume', parsed.meta_data)

    // 同时再和 ChatGPT 互动，告诉它已经选了 OK
    const { type, title } = activeModule.value
    chatgptInstance.sendMessage(
      type,
      title,
      "我现在觉得OK了，已经选择了总结到右边! 基于现在已有的内容，给出可以进一步优化的建议或再挖掘亮点，is_enough先设置为false",
      false,
      true
    )
  } catch (e) {
    console.error('choiceMessage.text 不是 JSON', e)
  }
}

/** 
 * 从 "choice" 消息中取出简历的内容
 */
function getContentsFromMessage(message) {
  try {
    const parsed = JSON.parse(message.text)
    return parsed.meta_data.resumeData.content
  } catch (e) {
    console.error('message.text 解析失败', e)
    return []
  }
}

/** 
 * 用户点击"我觉得还不够"
 */
function handleNotEnough() {
  const predefinedMessage = '我认为总结还不够，请继续对话'

  const { type, title } = activeModule.value
  if (!type || !title) {
    console.error('当前未选择有效的模块，无法发送')
    return
  }

  // 发送预定义消息给 GPT
  chatgptInstance.sendMessage(type, title, predefinedMessage, true)
  inputValue.value = ''
}

/** 
 * 回车发送，Shift+Enter 换行 
 */
function handleKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault() // 阻止默认的换行行为
    handleSendMessage()
  }
}

/** 
 * 自动滚动到底部 
 */
function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

/** 
 * 调整 textarea 高度 
 */
function adjustTextareaHeight() {
  const textarea = textareaInput.value
  if (!textarea) return

  // 先清空高度，让浏览器自动计算
  textarea.style.height = 'auto'

  // 只用 scrollHeight 来决定；设置最大高度 120px
  const newHeight = Math.min(Math.max(textarea.scrollHeight, 16), 120)
  textarea.style.height = `${newHeight}px`
}

// 当 inputValue 改变时，再次自动调整高度
watch(inputValue, () => {
  nextTick(() => {
    adjustTextareaHeight()
  })
})
</script>

<style scoped>
.chat-component {
  /* 大屏时：占据一半宽度(减去一些外边距) */
  height: 100vh;
  width: calc(47vw - 40px);
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 消息列表区域 */
.messages-container {
  height: calc(100vh - 62px - 100px - 20px); /* 62 是 state-area 占的高度，100px 预留给底部输入区 */
  overflow-y: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 20px;
}

/* state-area 位置固定在顶部 */
.state-area {
  position: fixed;
  width: calc(47vw - 40px - 60px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  margin: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: var(--color-background);
  font-size: 12px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

/* 输入区域固定在底部 */
.input-area-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  justify-content: space-between;
  border-radius: 25px;
  left: 85px;
  bottom: 20px;
  width: calc(47vw - 40px - 30px - 45px);
  align-self: center;
  border: 1px solid var(--color-primary);
  background-color: var(--color-background);
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
}

/* 在输入区域上方做个渐变遮罩，让消息滚动到快底部时有渐变过渡 */
.input-area-container:before {
  content: '';
  position: absolute;
  left: -15px;
  bottom: calc(100% + 1px);
  width: calc(100% + 30px);
  height: 40px;
  background: linear-gradient(to top, var(--color-white), rgba(255, 255, 255, 0));
  pointer-events: none;
  z-index: -1;
}

.input-area-left {
  display: flex;
  align-items: center;
  width: 100%;
  flex: 1;
  margin-right: 15px;
}

/* 聊天输入框 */
.chatgpt-input {
  width: 100%;
  min-height: auto;
  line-height: 1.2;
  padding: 4px 8px;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: transparent;
  resize: none;
  overflow-y: auto;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.chatgpt-input::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 发送按钮 */
.chatgpt-send-button {
  position: relative;
  left: 5px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: auto;
}
.chatgpt-send-button:hover {
  background-color: var(--color-primary-hover);
  transition: background-color 0.3s ease;
}
.chatgpt-send-button.loading-state {
  cursor: not-allowed;
  opacity: 0.8;
}
.chatgpt-send-icon {
  background-color: transparent;
  filter: brightness(0) invert(1);
  width: 30px;
  height: 30px;
}

/* loading 容器 */
.chat-loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

/* GPT 消息、提示等 */
.gpt-message-container,
.prompt-hint {
  padding-left: 20px;
  margin-bottom: 10px;
  gap: 10px;
}

.chatgpt-message-icon {
  width: 30px;
  height: 30px;
}

.prompt-hint {
  width: fit-content;
  font-size: 12px;
  margin-top: 10px;
  border-radius: 13px;
  padding: 8px 15px;
  background-color: var(--color-background);
  border: 1px solid var(--color-black);
  color: var(--color-black);
  margin-left: 30px;
  opacity: 0.7;
  cursor: pointer;
}

.prompt-hint:hover {
  opacity: 0.9;
  transition: opacity 0.3s ease;
  background-color: var(--color-left-header-background);
}

/* 用户消息（me） */
.me-message-container {
  display: flex;
  padding-right: 20px;
  gap: 10px;
  margin-bottom: 10px;
  align-items: flex-start;
  justify-content: flex-end;
}

/* 消息内容样式 */
.message {
  max-width: 75%;
  padding: 10px;
  border-radius: 15px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}
.message.gpt {
  color: var(--color-black);
  /* background-color: var(--color-primary); */
  max-width: calc(100% - 30px);
}

.message.me {
  margin-top: 10px;
  background-color: var(--color-background);
}

.message.choice {
  max-width: calc(100% - 60px);
  padding: 20px;
  background-color: var(--color-background);
}
/* choice 消息里的内容 */
.choice-message-container {
  display: flex;
  padding-left: 20px;
  margin-bottom: 10px;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
}

.bullet-point-content {
  font-size: 10px;
  margin-right: 10px;
  margin-top: 7px;
}

.bullet-point {
  font-size: 12px;
  font-weight: bold;
}
.bullet-content {
  font-size: 12px;
  padding-left: 10px;
}
.choice-buttons {
  display: flex;
  margin-top: 20px;
  gap: 15px;
}
.choice-button-ok,
.choice-button-not-enough {
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
}
.choice-button-ok {
  background-color: var(--color-primary);
  color: var(--color-secondary);
}
.choice-button-ok:hover {
  background-color: var(--color-primary-hover);
  transition: background-color 0.3s ease;
}
.choice-button-not-enough {
  background-color: var(--color-secondary);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
.choice-button-not-enough:hover {
  background-color: var(--color-secondary-hover);
  transition: background-color 0.3s ease;
}

/* ============== 移动端自适应 ============== */
@media screen and (max-width: 768px) {
  .chat-component {
    width: 100vw; /* 占满宽度 */
    height: 100vh; 
    padding: 0;
  }
  .state-area {
    position: fixed;
    margin: 0;
    top: 70px;
    left: 10px;
    background-color: var(--color-background);
  }
  .messages-container {
    /* 减小顶部空间，让 messages 直接紧贴 state-area */
    height: calc(100vh - 130px); 
    /* 其中 130px 大概给 state-area + input-area-container */
  }
  .input-area-container {
    /* 在小屏时也可保持固定定位，让输入框总在底部 */
    position: fixed;
    left: 10px;
    right: 10px;
    bottom: 10px;
    width: auto;
    margin: 0 auto;
    border-radius: 15px;
    padding: 8px 12px;
    /* 若空间不够，可缩小外边距和阴影 */
  }
}
</style>
