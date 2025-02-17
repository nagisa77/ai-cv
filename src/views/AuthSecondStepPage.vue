<template>
    <div class="app">
        <div class="auth-page">
            <div class="auth-title">验证账户</div>
            <AppleStyleInput :enable="false" id="email" labelText="电子邮件地址" inputType="email" :required="true"
                v-model="localEmail" />
            <AppleStyleInput id="code" labelText="已经向您发送了验证码，请检查后输入" inputType="text" :required="true" v-model="code" />

            <button class="continue-button" @click="handleLogin" :disabled="isLoading">
                <span v-if="!isLoading">继续</span>
                <span v-else>验证中...</span>
            </button>

            <button @click="backToFirstStep" class="back-button">返回</button>

            <div class="footer">
                <div class="footer-text-left">使用条款</div>
                <div class="footer-text-divider">|</div>
                <div class="footer-text-right">隐私政策</div>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import AppleStyleInput from '@/components/basic_ui/AppleStyleInput.vue'
import apiClient from '@/api/axios'

export default {
    components: { AppleStyleInput },
    props: {
        email: {
            type: String,
            required: true,
        }
    },
    setup() {
        const toast = useToast()
        return { toast }
    },
    data() {
        return {
            localEmail: this.email,
            code: '',
            isLoading: false
        }
    },
    computed: {
        isFormValid() {
            return this.code.length === 6 && this.validateEmail(this.localEmail)
        }
    },
    methods: {
        async handleLogin() {
            if (!this.isFormValid) {
                this.toast.error('请输入6位验证码')
                return
            }

            this.isLoading = true

            try {
                const response = await apiClient.post('http://localhost:9000/auth/captcha/login', {
                    email: this.localEmail,
                    captcha: this.code
                })

                if (response.data.code === 200) {
                    this.toast.success('登录成功')
                    // 存储token
                    localStorage.setItem('token', response.data.data.token)
                    // 跳转到主页
                    this.$router.push('/')
                }
            } catch (error) {
                this.handleLoginError(error)
            } finally {
                this.isLoading = false
            }
        },
        handleLoginError(error) {
            const errorCode = error.response?.data?.code
            const defaultMessage = '验证失败，请重试'

            const errorMessages = {
                40101: '验证码已过期，请重新获取',
                40102: '验证码不正确',
                50002: '服务器错误，请稍后再试'
            }

            this.toast.error(errorMessages[errorCode] || defaultMessage)
        },
        backToFirstStep() {
            this.$router.go(-1)
        },
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return re.test(email)
        }
    }
}
</script>

<style scoped>
.app {
    display: flex;
    justify-content: center;
    height: 100vh;
}

.auth-page {
    position: relative;
    height: calc(100vh - 60px);
    margin-top: 60px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.auth-title {
    padding-top: 100px;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 30px;
}

.continue-button {
    width: 100%;
    margin-top: 20px;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    border: none;
    padding: 15px 0;
    border-radius: 10px;
    font-size: 15px;
    cursor: pointer;
}

.continue-button:hover {
    background-color: var(--color-primary-hover);
    transition: background-color 0.3s ease;
}

.back-button {
    width: 100%;
    background-color: transparent;
    color: var(--color-primary);
    border: none;
    padding: 15px 0;
    border-radius: 10px;
    font-size: 15px;
    cursor: pointer;
}

.footer {
    margin-top: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
}

.footer-text-left {
    margin-right: 10px;
}

.footer-text-right {
    margin-left: 10px;
}


/* 新增按钮禁用样式 */
.continue-button:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
    opacity: 0.7;
}

.back-button:hover {
    background-color: rgba(var(--color-primary-rgb), 0.1);
    transition: background-color 0.2s ease;
}
</style>