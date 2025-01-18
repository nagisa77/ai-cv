// metadata_model.js
import { reactive } from 'vue'

class MetadataModel {
  constructor() {
    if (MetadataModel.instance) {
      return MetadataModel.instance;
    }

    /**
     * 重点：使用 Vue.observable() 包装 data
     * 使得此对象具备 Vue 的响应式检测能力
     */
    this.data = reactive({
      education: [],
      workExperience: [],
      projectExperience: [],
      personalInfo: {},
      personalSummary: ''
    });

    MetadataModel.instance = this;
  }

  metaDataDescribeForType(type) {
    switch (type) {
      case 'education':
        return `
        - meta_data 中的 title 是用户的教育经历标题，例如学校名称和学位。
        - meta_data 中的 content 是AI需要通过对话，总结出的教育经历内容（亮点），需总结为2-4点，突出学习成果和相关课程，或其他成就。
        - meta_data 中的 from_time 是用户的入学时间。
        - meta_data 中的 to_time 是用户的毕业时间。
        `;
      case 'workExperience':
        return `
        - meta_data 中的 title 是用户的工作经历标题，例如公司名称和职位。
        - meta_data 中的 content 是AI需要通过对话，总结出的工作经历内容（亮点），需总结为2-4点，强调职责、成就和量化成果。
        - meta_data 中的 from_time 是用户的入职时间。
        - meta_data 中的 to_time 是用户的离职时间。
        `;
      case 'projectExperience':
        return `
        - meta_data 中的 title 是用户的项目经历标题，例如项目名称。
        - meta_data 中的 content 是AI需要通过对话，总结出的项目经历内容（亮点），需总结为2-4点，突出项目目标、所用技术和取得的成果。
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
            "ai 总结出的亮点内容1",
            "ai 总结出的亮点内容2",
            "ai 总结出的亮点内容3",
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

}

// 只实例化一次
const metadataInstance = new MetadataModel();
Object.freeze(metadataInstance); // 防止修改实例

export default metadataInstance
