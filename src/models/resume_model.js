import { reactive } from 'vue';

// 初始化时从localStorage读取并转换类型
const initialCurrentResumeId = (() => {
  const storedId = localStorage.getItem('currentResumeId');
  return storedId ? storedId : null;
})();

export const resumeModel = reactive({
  resumes: [],
  currentResumeId: initialCurrentResumeId, // 使用本地存储初始化
  isFetching: false,
  error: null,

  // async loadResumes() {
  //   this.isFetching = true;
  //   this.error = null;
  //   try {
  //     const response = await apiClient.get('/user/resumes');
  //     this.resumes = response.data.data;
  //     this.isFetching = false;
  //   } catch (error) {
  //     this.error = error;
  //     this.isFetching = false;
  //   }
  // },

  // async createResume(name) {
  //   this.isFetching = true;
  //   this.error = null;
  //   try {
  //     const response = await apiClient.post('/user/resumes', { name });
  //     const newResume = response.data.data;
  //     this.resumes.push(newResume);
  //     this.setCurrentResumeId(newResume.resumeId);
  //     this.isFetching = false;
  //     return newResume;
  //   } catch (error) {
  //     this.error = error;
  //     this.isFetching = false;
  //     throw error;
  //   }
  // },

  setCurrentResumeId(resumeId) {
    this.currentResumeId = resumeId;
    // 持久化到localStorage
    if (resumeId !== null) {
      localStorage.setItem('currentResumeId', resumeId.toString());
    } else {
      localStorage.removeItem('currentResumeId');
    }
  },
});

export default resumeModel;