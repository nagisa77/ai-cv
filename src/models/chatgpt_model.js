import axios from 'axios'
import { reactive, watch } from 'vue'
import metadata_model from './metadata_model.js'

// 云函数接口地址（聊天数据）
const CHAT_API_URL = 'http://localhost:9000/default_user/chat'

const ChatgptModel = (function () {
  let instance

  // 用于存储用户输入的 API Key
  let userApiKey = ''

  function createInstance() {
    const data = reactive({
      conversations: {}
    })

    // 从云函数加载聊天记录（GET 请求）
    axios.get(CHAT_API_URL)
      .then(response => {
        // 若返回数据为空，则保持空对象
        data.conversations = response.data || {}
      })
      .catch(error => {
        console.error('加载聊天记录出错:', error)
        data.conversations = {}
      })

    // 监听 conversations 的变化并通过 PUT 请求保存到云函数
    watch(
      () => data.conversations,
      (newConversations) => {
        axios.put(CHAT_API_URL, newConversations)
          .catch(error => console.error('保存聊天记录出错:', error))
      },
      { deep: true }
    )

    function initConversation(type, title) {
      if (!data.conversations[type]) {
        data.conversations[type] = {}
      }
      if (!data.conversations[type][title]) {
        data.conversations[type][title] = [
          {
            text: `
【用户输入描述】
${describeForSenderMessage()}

【目前已知信息】  
以下是当前已知的用户信息（包括用户当前公司、职位和目标岗位的描述），你将根据这些信息为用户提供个性化的简历撰写建议和指导，其中：
标题信息: ${JSON.stringify(metadata_model.contentForType(type, title))}
个人信息: ${JSON.stringify(metadata_model.contentForType('personalInfo', ''))}
个人信息字段含义: ${JSON.stringify(metadata_model.metaDataDescribeForType('personalInfo'))}

【目标】  
作为一位富有同理心的高情商“AI简历写作教练”，帮助用户逐步提炼和优化简历中的工作和项目经历，生成高质量的简历要点。每个经历生成 2-4 条要点，确保内容突出个人贡献、所使用的工具/方法以及量化成果。注意: 你的回答内容只能是JSON字符串，不能包含其他东西. 

【对话与输出要求】  
1. 确认基础信息：  
首先通过引导性问题确认用户的工作背景。例如：“能简要描述一下你在这家公司负责的主要工作职责吗？如果能提供团队定位或业务方向等具体信息，也可以一并告诉我。”
2. 深度挖掘与反馈：  
当用户的回答较为笼统时，你应提供友好的提醒，帮助用户挖掘更多细节，尤其是量化成果。比如：“如果你有具体的百分比或者时间上的提升，能让这段经历更有说服力。”
对每个工作亮点，可以采用 STAR 方法来引导用户描述详细内容。  
 - Situation（情境）：“你能简单描述一下项目的背景或目标吗？”
- Task（任务）：“在这个项目中，你的具体任务是什么？”
- Action（行动）：“你采取了哪些具体行动？是否使用了某些工具、技术或方法？”
- Result（成果）：“项目的成果如何？有没有量化的成果，如提升了XX%或节省了XX小时？”
3. 进展总结与反馈：  
每次收集到新信息后，你需要及时总结当前内容及进展，并告知用户下一步的收集重点。例如：“目前我们已经了解了你在XX项目中的主要贡献，接下来可以继续补充XX细节。”
4. 生成简历要点时机：  
当AI判断信息已经足够时（符合所定义的高质量简历要求，详细工作内容 + 量化成果），is_enough 会被设置为 true，此时AI准备生成简历要点。若信息不完整，AI会继续引导用户提供详细信息，直到判断为 true。若用户主动要求总结简历要点，也会被直接设置为 true
注意：即使已经显示true，依然可以给予用户更多建议。
5. 避免重复和推测：
不要重复询问已获得的信息，避免对用户未提及的内容做推测。如果用户没有提到某些内容，不能自行补充，除非用户主动提供或要求。
6. 激励与引导：  
对话过程中，需要保持使用温暖、引导性的高情商语言，鼓励用户分享更多信息并帮助他们组织成简洁、易懂的简历要点。例如：“我知道你一定有很多可以分享的经验，让我们一起梳理出你在每个项目中的核心贡献和成就。”

【回复格式与结构】  
你的回复必须是一个 JSON 字符串，并包含 message（与用户的对话内容，包括激励与引导、进展总结与反馈等信息）、meta_data（简历要点的结构化数据，2-4条，根据实际情况自行判定）和is_enough（判断信息是否足够），且遵循以下结构：

    {
      "message": String,
      "meta_data": {
        "resumeData": ${metadata_model.formatForType(type)}  
      },
      "is_enough": Boolean,
      "prompt_hint": [...]
    }
字段说明：
-message：给用户的提示或引导信息，用来进行有效的对话并引导用户继续提供信息以及给予用户更多建议。这里不应该包含简历要点信息。
-is_enough：表示AI是否已经收集到足够的信息。如果为 true，表示AI认为信息已充分，可以生成简历要点，但也可以继续给用户更多建议与引导；如果为 false，则表示信息仍不足，需要继续引导用户补充。
-meta_data：如果is_enough为false，下面的resumeData则为空；如果is_enough为true，下面的resumeData则会包含简历要点的结构化数据，这部分将作为简历中的内容呈现出来。每个要点会根据用户提供的细节生成，并确保简明扼要、突出成果。简历要点只能在这里出现，不能重复出现在message里。
-prompt_hint：如果用户输入的need_prompt_hint为true，则需要给出3条提示追问，内容需要有3点，否则数组为空
以下是对于回复的meta_data的描述: ${metadata_model.metaDataDescribeForType(type)}
注意：简历要点需要严格遵循“简洁总结：详细工作内容 + 量化成果”这样的格式，内容需要足够详实，以下是一个比较符合的案例：
主导跨部门协作：带领10人跨部门团队，通过A/B测试优化推荐算法，成功提升平台用户活跃度20%，提高了用户留存率，并优化了个性化推荐内容的精准度和匹配度，显著提升了用户体验和转化率
    `,
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

    function addMessage(type, title, message) {
      data.conversations[type][title].push(message)
    }

    async function sendMessage(type, title, userText, display = true, needPromptHint = false) {
      if (!userText.trim()) return

      const gptText = JSON.stringify({
        user_text: userText,
        need_prompt_hint: needPromptHint,
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
    }

    function describeForSenderMessage() {
      return `
        user_text: 是用户输入的内容
        need_prompt_hint: 是用户是否需要提示追问，如果为true，结果的meta_data中需要包含prompt_hint字段，内容为接下来我可以探讨的方向, 不要你我他这种主语，采用一句简洁陈述句, 需要有3点
      `;
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

    function setApiKey(key) {
      userApiKey = key
    }

    function clearConversations() {
      data.conversations = {}
    }

    // 核心: 调用 GPT 接口时，使用用户提供的 API Key
    async function fetchGptResponse(type, title, userText) {
      const apiUrl = 'https://api.openai.com/v1/chat/completions'

      // 从 userApiKey 中获取用户提供的 key
      const apiKey = userApiKey || ''

      try {
        let messages = buildGptMessagesFromData(type, title)
        messages.push({ role: 'user', content: userText })

        const response = await axios.post(
          apiUrl,
          {
            model: 'gpt-4o', // 使用的模型
            messages,
            temperature: 0.7,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          }
        )

        const gptContent = response.data.choices[0].message.content.trim()
        return gptContent
      } catch (error) {
        console.error('调用 GPT API 出错：', error)
        return 'GPT 接口调用失败，请检查 API Key 或稍后重试。'
      }
    }

    return {
      getMessagesForTitle,
      getPromptForType,
      sendMessage,
      setApiKey,
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