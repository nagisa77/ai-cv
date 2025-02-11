import axios from 'axios'
import { reactive, watch } from 'vue'

// 云函数接口地址（元数据）
const META_API_URL = 'http://localhost:9000/default_user/meta_data'

class MetadataModel {
  constructor() {
    if (MetadataModel.instance) {
      return MetadataModel.instance;
    }

    // 初始默认数据结构
    const defaultData = {
      education: [],
      workExperience: [],
      projectExperience: [],
      personalInfo: {},
      personalSummary: ''
    };

    // 先构造一个响应式对象，后续会通过接口更新数据
    this.data = reactive(defaultData);

    // 尝试从云函数加载数据
    axios.get(META_API_URL)
      .then(response => {
        // 如果云端有数据，则合并到 this.data 中
        Object.assign(this.data, response.data);
      })
      .catch(error => {
        console.error('加载 metadata 失败，使用默认数据:', error);
      });

    // 监听数据变化并通过 PUT 请求保存到云函数
    watch(this.data, (newData) => {
      axios.put(META_API_URL, newData)
        .catch(error => console.error('保存 metadata 失败:', error));
    }, { deep: true });

    MetadataModel.instance = this;
  }

  metaDataDescribeForType(type) {
    switch (type) {
      case 'workExperience':
        return `
        - meta_data 中的 title 是用户的工作经历的公司名称, 注意该字段不要做任何改动。
        - meta_data 中的 sub_title 是用户的工作经历的职位名称, 注意该字段不要做任何改动。
        - meta_data 中的 city 是用户的工作经历的城市名称.
        - meta_data 中的 content 是AI需要通过对话，总结出的工作经历内容（亮点），需总结为2-4点，强调职责、成就和量化成果, bullet_point 是总结小标题，content 是总结内容
        - meta_data 中的 from_time 是用户的入职时间。
        - meta_data 中的 to_time 是用户的离职时间。
        `;
      case 'projectExperience':
        return `
        - meta_data 中的 title 是用户的项目经历标题，注意该字段不要做任何改动。
        - meta_data 中的 content 是AI需要通过对话，总结出的项目经历内容（亮点），需总结为2-4点，突出项目目标、所用技术和取得的成果, bullet_point 是总结小标题，content 是总结内容
        - meta_data 中的 from_time 是项目开始时间。
        - meta_data 中的 to_time 是项目结束时间。
        `;
      default:
        return '';
    }
  }

  // 返回不同 type 的数据组织格式
  formatForType(type) {
    switch (type) {
      case 'workExperience':
      case 'projectExperience':
        return JSON.stringify({
          "title": "",
          "sub_title": "",
          "from_time": "",
          "to_time": "",
          "content": [
            {
              "bullet_point": "总结小标题1",
              "content": "总结内容1"
            },
            {
              "bullet_point": "总结小标题2",
              "content": "总结内容2"
            },
            {
              "bullet_point": "总结小标题3",
              "content": "总结内容3"
            },
          ],
        });
      default:
        return '{}';
    }
  }

  // 根据 type 获取数据
  contentForType(type, title = null) {
    switch (type) {
      case 'education':
        return title
          ? this.data.education.find(item => item.title === title)
          : this.data.education;
      case 'workExperience':
        return title
          ? this.data.workExperience.find(item => item.title === title)
          : this.data.workExperience;
      case 'projectExperience':
        return title
          ? this.data.projectExperience.find(item => item.title === title)
          : this.data.projectExperience;
      case 'personalInfo':
        return this.data.personalInfo;
      case 'personalSummary':
        return this.data.personalSummary;
      default:
        return null;
    }
  }

  // 根据 type 和 title 删除对应的数据
  deleteContentForTitle(type, title) {
    switch (type) {
      case 'education': {
        this.data.education = this.data.education.filter(item => item.title !== title);
        break;
      }
      case 'workExperience': {
        this.data.workExperience = this.data.workExperience.filter(item => item.title !== title);
        break;
      }
      case 'projectExperience': {
        this.data.projectExperience = this.data.projectExperience.filter(item => item.title !== title);
        break;
      }
      default:
        break;
    }
  }

  // 设置数据（示例逻辑）
  setContentForType(type, content, title = null) {
    switch (type) {
      case 'education': {
        if (title) {
          const existing = this.data.education.find(item => item.title === title);
          if (existing) {
            existing.content = content;
          } else {
            this.data.education.push({ title, content });
          }
        } else {
          this.data.education.push({ content });
        }
        break;
      }
      case 'workExperience': {
        if (title) {
          const existing = this.data.workExperience.find(item => item.title === title);
          if (existing) {
            existing.content = content;
          } else {
            this.data.workExperience.push({ title, content });
          }
        } else {
          this.data.workExperience.push({ content });
        }
        break;
      }
      case 'projectExperience': {
        if (title) {
          const existing = this.data.projectExperience.find(item => item.title === title);
          if (existing) {
            existing.content = content;
          } else {
            this.data.projectExperience.push({ title, content });
          }
        } else {
          this.data.projectExperience.push({ content });
        }
        break;
      }
      case 'personalInfo':
        this.data.personalInfo = content;
        break;
      case 'personalSummary':
        this.data.personalSummary = content;
        break;
      default:
        break;
    }
  }

  // 根据标题更新对应的 content
  setContentForTitle(title, content) {
    const types = ['education', 'workExperience', 'projectExperience'];
    for (const type of types) {
      const arr = this.data[type];
      if (!arr || !Array.isArray(arr)) continue;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].title === title) {
          arr[i].content = content;
          return;
        }
      }
    }
  }

  clearMetadata() {
    // 清除云端存储（本地重置后，通过 watch 自动更新）
    this.data.education = [];
    this.data.workExperience = [];
    this.data.projectExperience = [];
    this.data.personalInfo = {};
    this.data.personalSummary = '';
    console.log("Metadata cleared and state reset to default.");
  }
}

// 单例模式
const metadataInstance = new MetadataModel();
Object.freeze(metadataInstance);

export default metadataInstance;
