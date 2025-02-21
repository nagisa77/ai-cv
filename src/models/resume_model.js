import { reactive } from 'vue';
import apiClient from '@/api/axios';

export const resumeModel = reactive({
  resumes: [],
  currentResumeId: null,
  isFetching: false,
  error: null,

  async loadResumes() {
    this.isFetching = true;
    this.error = null;
    try {
      const response = await apiClient.get('/user/resumes');
      this.resumes = response.data.data; // 根据服务端返回结构调整
      this.isFetching = false;
    } catch (error) {
      this.error = error;
      this.isFetching = false;
    }
  },

  async createResume(name) {
    this.isFetching = true;
    this.error = null;
    try {
      const response = await apiClient.post('/user/resumes', { name });
      const newResume = response.data.data;
      this.resumes.push(newResume);
      this.currentResumeId = newResume.resumeId;
      this.isFetching = false;
      return newResume;
    } catch (error) {
      this.error = error;
      this.isFetching = false;
      throw error;
    }
  },

  setCurrentResumeId(resumeId) {
    this.currentResumeId = resumeId;
  },
});

export default resumeModel;
