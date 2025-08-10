<template>
  <div class="wechat-callback">正在登录...</div>
</template>

<script>
import authService from '@/utils/auth'
import { useToast } from 'vue-toastification'

export default {
  name: 'WeChatCallback',
  setup() {
    const toast = useToast()
    return { toast }
  },
  async created() {
    const code = this.$route.query.code
    if (!code) {
      this.toast.error('缺少微信登录凭证')
      this.$router.push('/auth')
      return
    }

    const { success, user, error } = await authService.loginWithWeChat(code)
    if (success) {
      this.toast.success(`欢迎回来，${user.contact || '用户'}`)
      this.$router.push('/')
    } else {
      this.toast.error(error)
      this.$router.push('/auth')
    }
  }
}
</script>

<style scoped>
.wechat-callback {
  padding: 20px;
  text-align: center;
}
</style>

