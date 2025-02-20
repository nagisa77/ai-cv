import apiClient from '@/api/axios'

class AuthService {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
  }

  async login(email, code) {
    try {
      const response = await apiClient.post('/auth/captcha/login', {
        email,
        captcha: code
      })

      if (response.data.code === 200) {
        const { token, user } = response.data.data
        this.currentUser = user
        localStorage.setItem('currentUser', JSON.stringify(user))
        localStorage.setItem('token', token)
        return { success: true, user }
      }
      return { success: false, error: response.data.message }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false,
        error: error.response?.data?.message || '登录失败，请检查网络连接'
      }
    }
  }

  logout() {
    this.currentUser = null
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn() {
    return this.currentUser !== null
  }

  getUserId() {
    return this.currentUser?.user_id || null
  }

  getUserContact() {
    return this.currentUser?.contact || null
  }
}

// 单例模式导出
export default new AuthService()