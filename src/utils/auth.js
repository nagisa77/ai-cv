// src/utils/auth.js
import { reactive } from 'vue'
import apiClient from '@/api/axios'

// 创建响应式状态对象
const authState = reactive({
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null')
})

class AuthService {
  // 获取当前用户（响应式）
  getCurrentUser() {
    return authState.currentUser
  }

  // src/utils/auth.js 修改login方法
  async login(email, code) {
    try {
      const response = await apiClient.post('/auth/captcha/login', {
        email,
        captcha: code
      });

      if (response.data.code === 200) {
        const { token, user } = response.data.data;
        authState.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', token);
        return {
          success: true,
          user
        };
      }
      return {
        success: false,
        error: response.data.message
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || '登录失败，请检查网络连接'
      };
    }
  }

  async loginWithGoogle(idToken) {
    try {
      const response = await apiClient.post('/auth/google', { idToken })

      if (response.data.code === 200) {
        const { token, user } = response.data.data
        authState.currentUser = user
        localStorage.setItem('currentUser', JSON.stringify(user))
        localStorage.setItem('token', token)
        return {
          success: true,
          user
        }
      }

      return {
        success: false,
        error: response.data.message
      }
    } catch (error) {
      console.error('Google login error:', error)
      return {
        success: false,
        error: error.response?.data?.message || '登录失败，请检查网络连接'
      }
    }
  }

  async loginWithWeChat(code) {
    try {
      const response = await apiClient.post('/auth/wechat', { code })

      if (response.data.code === 200) {
        const { token, user } = response.data.data
        authState.currentUser = user
        localStorage.setItem('currentUser', JSON.stringify(user))
        localStorage.setItem('token', token)
        return {
          success: true,
          user
        }
      }

      return {
        success: false,
        error: response.data.message
      }
    } catch (error) {
      console.error('WeChat login error:', error)
      return {
        success: false,
        error: error.response?.data?.message || '登录失败，请检查网络连接'
      }
    }
  }
  logout() {
    authState.currentUser = null
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn() {
    return authState.currentUser !== null
  }

  getUserId() {
    return authState.currentUser?.user_id || null
  }

  getUserContact() {
    return authState.currentUser?.contact || null
  }
}

export default new AuthService()
