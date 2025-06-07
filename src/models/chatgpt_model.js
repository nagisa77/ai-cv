import { reactive, watch } from 'vue'
import metadata_model from './metadata_model.js'
import apiClient from '@/api/axios'
import resumeModel from './resume_model.js'
import authService from '@/utils/auth'
import buildResumePrompt from '@/prompts/resume.js'

const ChatgptModel = (function () {
  let instance

  function createInstance() {
    let data = reactive({
      conversations: {},
      isFetching: false
    })

    data.isFetching = true
    // 从云函数加载聊天记录（GET 请求）
    if (resumeModel.currentResumeId && authService.isLoggedIn()) {
      apiClient.get(`/user/resumes/${resumeModel.currentResumeId}/chat`)
        .then(response => {
          // 若返回数据为空，则保持空对象
          data.conversations = response.data.data || {}
          data.isFetching = false
        })
        .catch(error => {
          console.error('加载聊天记录出错:', error)
          data.conversations = {}
          data.isFetching = false
        })
    }

    // 监听 conversations 的变化并通过 PUT 请求保存到云函数
    // watch(
    //   () => data.conversations,
    //   (newConversations) => {
    //     if (resumeModel.currentResumeId) {
    //       apiClient.post(`/user/resumes/${resumeModel.currentResumeId}/chat`, newConversations)
    //         .catch(error => console.error('保存聊天记录出错:', error))
    //     }
    //   },
    //   { deep: true }
    // )

    async function loadChatData(resumeId) {
      if (!resumeId) return
      data.isFetching = true
      try {
        const response = await apiClient.get(`/user/resumes/${resumeId}/chat`)
        data.conversations = response.data.data || {}
      } catch (error) {
        console.error('加载聊天记录出错:', error)
      }
      data.isFetching = false
    }

    watch(
      () => resumeModel.currentResumeId,
      (newResumeId) => {
        if (newResumeId) {
          loadChatData(newResumeId)
        }
      },
      { immediate: true }
    )

    function initConversation(type, title) {
      if (!data.conversations[type]) {
        data.conversations[type] = {}
      }
      if (!data.conversations[type][title]) {
        data.conversations[type][title] = [
          {
            text: buildResumePrompt(type, title),
            sender: 'system',
          },
        ]
      }
    }

    function getPromptForType(type, title) {
      return data.conversations[type][title][0].text
    }

    function getMessagesForTitle(type, title) {
      initConversation(type, title)
      return data.conversations[type][title]
    }

    function getIsFetching() {
      return data.isFetching
    }

    function addMessage(type, title, message) {
      data.conversations[type][title].push(message)

      if (resumeModel.currentResumeId && authService.isLoggedIn()) {
        apiClient.post(`/user/resumes/${resumeModel.currentResumeId}/chat`, data.conversations)
          .catch(error => console.error('保存聊天记录出错:', error))
      }
    }

    async function sendMessage(type, title, userText, display = true, needPromptHint = false, extra_message = '') {
      if (!userText.trim()) return

      const gptText = JSON.stringify({
        user_text: userText,
        need_prompt_hint: needPromptHint,
        extra_message: extra_message,
      });

      data.conversations[type][title].push({
        text: gptText,
        sender: 'me',
        display: display,
      })

      const gptReply = await fetchGptResponse(type, title, gptText)
      data.conversations[type][title].push({
        text: gptReply,
        sender: 'gpt',
        display: true,
      })

      if (resumeModel.currentResumeId) {
        apiClient.post(`/user/resumes/${resumeModel.currentResumeId}/chat`, data.conversations)
          .catch(error => console.error('保存聊天记录出错:', error))
      }
    }


    function buildGptMessagesFromData(type, title) {
      return data.conversations[type][title].map((msg) => {
        let role = 'system'
        if (msg.sender === 'me') {
          role = 'user'
        } else if (msg.sender === 'gpt') {
          role = 'assistant'
        }
        return { role, content: msg.text }
      })
    }

    function clearConversations() {
      data.conversations = {}
    }

    // 新增内容清洗逻辑
    function extractJsonContent(gptContent) {
      const text = gptContent.trim();

      // 直接返回完整 JSON 对象的情况
      if (text.startsWith('{') && text.endsWith('}')) {
        return text;
      }

      // 匹配 ```json 代码块
      const jsonBlockMatch = text.match(/```json([\s\S]*?)```/);
      if (jsonBlockMatch && jsonBlockMatch[1]) {
        return jsonBlockMatch[1].trim();
      }

      // 匹配通用代码块
      const genericBlockMatch = text.match(/```([\s\S]*?)```/);
      if (genericBlockMatch && genericBlockMatch[1]) {
        return genericBlockMatch[1].trim();
      }

      return text;
    }

    // 核心: 调用 GPT 接口时，使用用户提供的 API Key
    async function fetchGptResponse(type, title, userText) {
      try {
        let messages = buildGptMessagesFromData(type, title);
        messages.push({ role: 'user', content: userText });

        const response = await apiClient.post('/chat/completions', {
          messages,
        });

        let gptContent = response.data.choices[0].message.content.trim();

        // 清洗内容
        gptContent = extractJsonContent(gptContent);

        return gptContent;
      } catch (error) {
        console.error('调用 GPT API 出错：', error);
        return JSON.stringify({
          message: 'GPT 接口调用失败，请检查 API Key 或稍后重试。',
          meta_data: {
            resumeData: metadata_model.formatForType(type)
          },
          is_enough: false,
          prompt_hint: []
        });
      }
    }

    return {
      getIsFetching,
      getMessagesForTitle,
      getPromptForType,
      sendMessage,
      addMessage,
      clearConversations,
    }
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    },
  }
})()

export default ChatgptModel