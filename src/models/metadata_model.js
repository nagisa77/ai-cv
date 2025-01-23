// metadata_model.js
import { reactive, watch } from 'vue'

class MetadataModel {
  constructor() {
    if (MetadataModel.instance) {
      return MetadataModel.instance;
    }

    /**
     * 重点：使用 Vue.observable() 包装 data
     * 使得此对象具备 Vue 的响应式检测能力
     */
    // 尝试从 localStorage 加载数据
    const storedData = localStorage.getItem('metadata');
    this.data = reactive(storedData ? JSON.parse(storedData) : {
      education: [],
      workExperience: [],
      projectExperience: [],
      personalInfo: {},
      personalSummary: ''
    });

    // 监听数据变化并保存到 localStorage
    watch(this.data, (newData) => {
      localStorage.setItem('metadata', JSON.stringify(newData));
    }, { deep: true });

    MetadataModel.instance = this;
  }

  metaDataDescribeForType(type) {
    switch (type) {
      case 'education':
        return `
        - meta_data 中的 title 是用户的教育经历标题， 注意该字段不要做任何改动。
        - meta_data 中的 content 是AI需要通过对话，总结出的教育经历内容（亮点），需总结为2-4点，突出学习成果和相关课程, bullet_point 是总结小标题，content 是总结内容
        - meta_data 中的 from_time 是用户的入学时间。
        - meta_data 中的 to_time 是用户的毕业时间。
        `;
      case 'workExperience':
        return `
        - meta_data 中的 title 是用户的工作经历标题, 注意该字段不要做任何改动。
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
      case 'personalInfo':
        return `
        - meta_data 中的 name 是用户姓名，你需要根据用户的对话，总结出name的内容，是用户的姓名。
        - meta_data 中的 email 是用户邮箱，你需要根据用户的对话，总结出email的内容，是用户的邮箱。
        - meta_data 中的 phone 是用户的联系电话，你需要根据用户的对话，总结出phone的内容，是用户的联系电话。
        `;
      case 'personalSummary':
        return `
        - meta_data 中的 content 是用户填写的个人总结，你需要根据用户的对话，总结出content的内容，是用户的个人总结。
        - meta_data 中的 skills 是用户的技能列表，你需要根据用户的对话，总结出skills的内容，是用户的技能。
        `;
      default:
        return '';
    }
  }

  // 返回不同type的数据组织格式，留给用户填充
  formatForType(type) {
    switch (type) {
      case 'education':
      case 'workExperience':
      case 'projectExperience':
        return JSON.stringify({
          "title": "",
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
      case 'personalInfo':
        return JSON.stringify({
          "name": "",
          "email": "",
          "phone": "",
        });
      case 'personalSummary':
      default:
        return '{}';
    }
  }

  /**
   * 根据 type 获取数据
   * 注意：现在要访问时，用 this.data[type]
   */
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

  /**
   * setContentForType
   * （示例只演示一下内部访问方式，逻辑和你原来类似）
   */
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


  /**
   * setContentForTitle
   * 根据标题更新某项的 content
   */
  setContentForTitle(title, content) {
    const types = ['education', 'workExperience', 'projectExperience'];
    for (const type of types) {
      const arr = this.data[type];
      if (!arr || !Array.isArray(arr)) continue;
      // 查找符合 title 的项并更新
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].title === title) {
          arr[i].content = content;
          return;
        }
      }
    }
  }

  clearMetadata() {
    // Clear the localStorage
    localStorage.removeItem('metadata');

    // Reset the data to its initial state
    this.data.education = [];
    this.data.workExperience = [];
    this.data.projectExperience = [];
    this.data.personalInfo = {};
    this.data.personalSummary = '';

    // Optionally, you could log this or return a confirmation
    console.log("Metadata cleared and state reset to default.");
  }
}

// 只实例化一次
const metadataInstance = new MetadataModel();
Object.freeze(metadataInstance); // 防止修改实例

export default metadataInstance
