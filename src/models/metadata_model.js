import { reactive, watch } from 'vue'
import apiClient from '@/api/axios'
import { resumeModel } from './resume_model.js'
import authService from '@/utils/auth'

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
      otherExperience: [],
      personalInfo: {},
      personalSummary: '',
      isFetching: false,
    };

    // 先构造一个响应式对象，后续会通过接口更新数据
    this.data = reactive(defaultData);

    // 尝试从云函数加载数据
    this.data.isFetching = true
    if (resumeModel.currentResumeId && authService.isLoggedIn()) {
      apiClient.get(`/user/resumes/${resumeModel.currentResumeId}/meta_data`)
        .then(response => {
          // 如果云端有数据，则合并到 this.data 中
          Object.assign(this.data, response.data.data);
          this.data.isFetching = false
          console.log('加载 metadata 成功:', response.data.data);
        })
        .catch(error => {
          console.error('加载 metadata 失败，使用默认数据:', error);
          this.data.isFetching = false
        });
    }

    // 监听数据变化并通过 PUT 请求保存到云函数
    watch(this.data, (newData) => {
      if (resumeModel.currentResumeId && authService.isLoggedIn()) {  
        apiClient.post(`/user/resumes/${resumeModel.currentResumeId}/meta_data`, newData)
          .then(() => {
            console.log('保存 metadata 成功:', newData);
          })
          .catch(error => console.error('保存 metadata 失败:', error));
      } else {
        console.log('没有当前简历id，不保存metadata');
      }
    }, { deep: true });

    // 使用watch监听resumeId变化
    watch(
      () => resumeModel.currentResumeId,
      (newResumeId) => {
        if (newResumeId) {
          this.loadData(newResumeId)
        }
      },
      { immediate: true }
    )

    MetadataModel.instance = this;
  }

  // 新增加载数据方法
  async loadData(resumeId) {
    if (!resumeId) return
    this.data.isFetching = true
    try {
      const response = await apiClient.get(`/user/resumes/${resumeId}/meta_data`)
      Object.assign(this.data, response.data.data)
      console.log('加载 metadata 成功:', response.data.data);
    } catch (error) {
      console.error('加载 metadata 失败:', error)
    }
    this.data.isFetching = false
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
      case 'personalInfo':
        return `
        - meta_data 中的 name 是用户的姓名。
        - meta_data 中的 phone 是用户的手机号码。
        - meta_data 中的 email 是用户的邮箱。
        - meta_data 中的 targetCompany 是用户的目标公司。
        - meta_data 中的 jobTitle 是用户的目标岗位。
        - meta_data 中的 jobDescription 是用户的目标岗位描述。
        `;
      case 'otherExperience':
        return `
        - meta_data 中的 title 是用户的其他经历主题/名称，注意该字段不要做任何改动。
        - meta_data 中的 desc 是用户的其他经历描述。
        - meta_data 中的 content 是AI需要通过对话，总结出的其他经历内容（亮点），需总结为2-4点，突出经历的价值和收获，bullet_point 是总结小标题，content 是总结内容
        - meta_data 中的 from_time 是经历开始时间。
        - meta_data 中的 to_time 是经历结束时间。
        `;
      default:
        return '';
    }
  }

  // 返回不同 type 的数据组织格式
  formatForType(type) {
    switch (type) {
      case 'personalInfo':
        return JSON.stringify({
          "name": "",
          "phone": "",
          "email": "",
          "targetCompany": "",  
          "jobTitle": "",
          "jobDescription": "",
        });
      case 'education':
        return JSON.stringify({
          "school": "",
          "major": "",
          "degree": "",
          "gpa": "",
          "city": "",
          "honors": "",
          "courses": "",
          "from_time": "",
          "to_time": "",
        });
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
      case 'otherExperience':
        return JSON.stringify({
          "title": "",
          "from_time": "",
          "to_time": "",
          "desc": "",
          "content": [
            {
              "bullet_point": "总结小标题1",
              "content": "总结内容1"
            },
            {
              "bullet_point": "总结小标题2",
              "content": "总结内容2"
            }
          ],
        });
      case 'personalSummary':
        return '(个人总结这部分内容是一段字符串)'
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
      case 'otherExperience':
        return title
          ? this.data.otherExperience.find(item => item.title === title)
          : this.data.otherExperience;
      default:
        return null;
    }
  }

  // 根据 type 和 title 删除对应的数据
  deleteContentForTitle(type, title) {
    switch (type) {
      case 'education': {
        this.data.education = this.data.education.filter(item => item.title !== title);
        console.log(`删除教育经历: ${title}`);
        break;
      }
      case 'workExperience': {
        this.data.workExperience = this.data.workExperience.filter(item => item.title !== title);
        console.log(`删除工作经历: ${title}`);
        break;
      }
      case 'projectExperience': {
        this.data.projectExperience = this.data.projectExperience.filter(item => item.title !== title);
        console.log(`删除项目经历: ${title}`);
        break;
      }
      case 'otherExperience': {
        this.data.otherExperience = this.data.otherExperience.filter(item => item.title !== title);
        console.log(`删除其他经历: ${title}`);
        break;
      }
      default:
        break;
    }
  }

  getIsFetching() {
    return this.data.isFetching
  }

  // 设置数据（示例逻辑）
  setContentForType(type, content, title = null) {
    switch (type) {
      case 'education': {
        if (title) {
          const existing = this.data.education.find(item => item.title === title);
          if (existing) {
            existing.content = content;
            console.log(`更新教育经历: ${title}`);
          } else {
            this.data.education.push({ title, content });
            console.log(`添加教育经历: ${title}`);
          }
        } else {
          this.data.education.push({ content });
          console.log(`添加教育经历: 新内容`);
        }
        break;
      }
      case 'workExperience': {
        if (title) {
          const existing = this.data.workExperience.find(item => item.title === title);
          if (existing) {
            existing.content = content;
            console.log(`更新工作经历: ${title}`);
          } else {
            this.data.workExperience.push({ title, content });
            console.log(`添加工作经历: ${title}`);
          }
        } else {
          this.data.workExperience.push({ content });
          console.log(`添加工作经历: 新内容`);
        }
        break;
      }
      case 'projectExperience': {
        if (title) {
          const existing = this.data.projectExperience.find(item => item.title === title);
          if (existing) {
            existing.content = content;
            console.log(`更新项目经历: ${title}`);
          } else {
            this.data.projectExperience.push({ title, content });
            console.log(`添加项目经历: ${title}`);
          }
        } else {
          this.data.projectExperience.push({ content });
          console.log(`添加项目经历: 新内容`);
        }
        break;
      }
      case 'otherExperience': {
        if (title) {
          const existing = this.data.otherExperience.find(item => item.title === title);
          if (existing) {
            existing.content = content;
            console.log(`更新其他经历: ${title}`);
          } else {
            this.data.otherExperience.push({ title, content });
            console.log(`添加其他经历: ${title}`);
          }
        } else {
          this.data.otherExperience.push({ content });
          console.log(`添加其他经历: 新内容`);
        }
        break;
      }
      case 'personalInfo':
        this.data.personalInfo = content;
        console.log(`更新个人信息`);
        break;
      case 'personalSummary':
        this.data.personalSummary = content;
        console.log(`更新个人总结`);
        break;
      default:
        break;
    }
  }

  // 根据标题更新对应的 content
  setContentForTitle(title, content) {
    const types = ['education', 'workExperience', 'projectExperience', 'otherExperience'];
    for (const type of types) {
      const arr = this.data[type];
      if (!arr || !Array.isArray(arr)) continue;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].title === title) {
          arr[i].content = content;
          console.log(`更新标题为 ${title} 的内容`);
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
    this.data.otherExperience = [];
    console.log("Metadata cleared and state reset to default.");
  }
}

// 单例模式
const metadataInstance = new MetadataModel();
Object.freeze(metadataInstance);

export default metadataInstance;
