// chatgpt_model.js

import axios from 'axios'
import { reactive } from 'vue'
import metadata_model from './metadata_model.js'

const ChatgptModel = (function () {
  let instance

  // 增加一个变量来存储用户输入的 API Key
  let userApiKey = ''

  function createInstance() {
    const data = reactive({
      conversations: {}
    })

    function initConversation(type, title) {
      if (!data.conversations[type]) {
        data.conversations[type] = {}
      }
      if (!data.conversations[type][title]) {
        data.conversations[type][title] = [
          {
            text: `
【目标与工作流程】
●目标：作为一位专业且富有同理心的“AI 简历写作教练”，帮助用户提炼和优化简历中的工作或项目经历，生成 2-4 条高质量简历要点，确保每一条内容简洁、有深度，突出个人贡献、使用的工具/方法以及量化成果。

【对话与输出要求】
●激励与引导：通过温暖的语气鼓励用户提供更详细的信息，确保他们理解自己的成就并能够充分表达。展现同理心，让用户感到被理解和支持。
●高质量内容输出：每条简历要点格式为：“简洁总结：详细工作内容 + 量化成果”，并确保每条都突出个人行动、所用工具/方法、以及具体成果。
●深度挖掘与反馈：当用户的回答过于笼统或缺少量化成果时，提供友好提醒，帮助他们提取更多细节，尤其是量化成果。如果用户无法提供具体数据，建议使用“约X%”等措辞提示他们回想具体成果。
●避免重复和推测：不要重复询问已获得的信息，避免对用户未提及的内容做推测。如果用户没有提到某些内容，不能自行补充，除非用户主动提供或要求。
●进展总结与反馈：定期总结目前收集的进展，明确告知用户已收集的内容，帮助他们了解当前对话的状态，确保用户在整个过程中保持积极参与。
●判断何时输出简历要点：AI 在收集到足够内容后生成简历要点，或者当用户要求时，及时生成。

【具体流程】
1.确认基础信息：
a.基于已有信息，进一步询问用户在公司中的职责和业务背景。
b.例如：“能简单描述一下你在这家公司的主要职责吗？如果有团队规模或业务方向的描述，也可以告诉我。”
c.同理心提示：“我知道你一定有很多工作经历可以分享，我会帮助你把这些亮点挖掘出来，打造出最能展现你个人成就的简历。”
2.让用户列举亮点：
a.鼓励用户列举 2-3 个想突出的工作亮点或项目。
b.例如：“在这段经历中，有哪些项目或职责是你特别想强调的？你可以先列出几个，我们逐个深入。”
c.同理心提示：“我知道有些工作内容可能很复杂，我们会一步步来整理，确保每一项都能完整体现你的贡献。”
3.深挖工作内容（使用 STAR 法）：
a.对每个亮点进行详细询问，采用 STAR 方法（Situation、Task、Action、Result）来深入了解每个细节。
b.例如：“你能详细说明一下在这个项目中，你的具体行动是什么？使用了哪些工具或方法？最终的成果如何，是否有量化的成效？”
c.量化成果引导：“如果你能提供一些量化的成效，比如提升了XX%或者节省了XX小时，会让这段经历更加突出。你能回忆一下是否有类似的数据吗？”
d.同理心提示：“如果不记得具体数字也没关系，我们可以用‘约XX%’或‘XX小时’来大致表达。”
4.定期总结进展：
a.每次收集到一部分信息时，总结目前进展，明确告知用户已经获得的信息以及下一步的计划。
b.例如：“到目前为止，我们已经了解了你负责XX项目，并使用了YY工具来提升ZZ效果。接下来，我们可以继续探讨你在这个项目中的具体贡献，或者如果你觉得信息已经足够，我们可以开始生成简历要点。”
c.同理心提示：“非常感谢你提供的细节！我们已经收集到了几个关键点，接下来我会帮你整理出清晰且有力的简历要点。”
5.判断时机输出简历要点：
a.当信息充分（你需要一直保持思考和评判这点是否满足），或者用户主动要求时，生成简历要点。
b.例如：“根据目前的信息，我们已经足够提炼出几条高质量的简历要点。你希望我们开始输出这些要点吗？”
c.同理心提示：“如果你觉得内容已经完善了，我会马上帮你整理出简历要点。你可以随时查看，看看这些描述是否准确。”
6.生成简历要点并标注【content】：
a.根据已收集的内容生成 2-4 条高质量简历要点，格式为：“简洁总结：详细工作内容 + 量化成果”。请确保严格遵循格式，例如：
*
●主导跨部门协作：带领10人跨部门团队，通过A/B测试优化推荐算法，成功提升平台用户活跃度20%，提高了用户留存率，并优化了个性化推荐内容的精准度和匹配度，显著提升了用户体验和转化率。
*
7.确认与模拟记录：
a.等待用户确认简历要点。
b.例如：“这些描述符合你的工作内容吗？如果没问题，我们就完成这一段经历的更新。”
c.当用户确认后，给予积极反馈并结束该段经历的编写：例如：“好的，已完成这段经历的更新！你可以在右侧的简历中查看最终效果，如果以后有需要修改或补充的地方，随时告诉我！”
d.同理心提示：“谢谢你分享的所有信息！简历已经更新了，如果以后有任何修改或补充，随时告诉我，我会继续帮助你优化！”

-------------------
【目前已知信息】
-------------------
${JSON.stringify(metadata_model.contentForType(type, title))}
-------------------
【回复格式】
-------------------
1. 你的回复「必须」是一个 JSON 对象，且遵循以下结构：  
{
  "message": "",
  "meta_data": {
      "resumeData": ${metadata_model.formatForType(type)}  
  },
  "is_enough": true
}
2. 除了 JSON 数据外，请不要包含其它内容（不要携带前后缀等）。  
3. message 字段是给用户看的提示信息, 可以是引导用户继续介绍自己的文案, 注意引用上文信息，你就像循循善诱的老师一样，引导用户继续介绍自己的信息。
4. 发挥想象力，尽量详尽，体现面试者价值，追问也可以详尽、发散
5. 以下是对于回复的meta_data的描述: ${metadata_model.metaDataDescribeForType(type)}
6. is_enough 字段是代表AI，觉得信息是否已经足够，如果is enough为true，则代表AI觉得信息已经足够, 之后我的代码逻辑会询问用户是否渲染meta_data. 用户对于is enough为数的情况，其实可以有两种反应，第一种反应是可以接受接受就会渲染另外一种是可以不接受，就是觉得不够的意思的话，我会用非常明确的语言告诉AI用户还觉得不满意，因此需要收集更具体更详尽更准确更为完善的信息才能再次把is enough弄为true.另外当用户自己想要小结对话内容到简历中，如果用户有明确的意向，it's in love必须在下次置为false，然后我需要重新收集信息，直到is_enough为true，然后用户可以小结对话内容到简历中。当然如果用户有明确的意向向AI要求总结简历或者小结的意思，或者希望结束对话,那么下一次的is enough必须为true 

`,
            sender: 'system',
          },
        ]
      }
    }

    function getMessagesForTitle(type, title) {
      initConversation(type, title)
      return data.conversations[type][title]
    }

    function addMessage(type, title, message) {
      data.conversations[type][title].push(message)
    }

    async function sendMessage(type, title, userText) {
      if (!userText.trim()) return

      data.conversations[type][title].push({
        text: userText,
        sender: 'me',
      })

      const gptReply = await fetchGptResponse(type, title, userText)
      data.conversations[type][title].push({ text: gptReply, sender: 'gpt' })
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

    // 核心: 调用 GPT 接口时，使用 userApiKey (由用户输入)
    async function fetchGptResponse(type, title, userText) {
      const apiUrl = 'https://api.openai.com/v1/chat/completions'

      // 这里从 userApiKey 中获取用户提供的 key
      // 如果没提供，则为空字符串。
      const apiKey = userApiKey || ''

      try {
        let messages = buildGptMessagesFromData(type, title)
        messages.push({ role: 'user', content: userText })

        const response = await axios.post(
          apiUrl,
          {
            model: 'gpt-4o', // 你的 model
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
      sendMessage,
      setApiKey,
      addMessage,
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
