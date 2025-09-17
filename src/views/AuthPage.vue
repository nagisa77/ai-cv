<template>
    <div class="app">
        <div class="auth-page">
            <div class="auth-title">欢迎回来</div>
            <div class="auth-tabs">
                <div
                    class="tab"
                    :class="{ active: activeTab === 'wechat' }"
                    @click="activeTab = 'wechat'"
                >
                    微信登录
                </div>
                <div
                    class="tab"
                    :class="{ active: activeTab === 'email' }"
                    @click="activeTab = 'email'"
                >
                    邮箱登录
                </div>
            </div>
            <div class="auth-tab-content">
                <div class="auth-input-area" v-show="activeTab === 'email'">
                    <AppleStyleInput id="email" labelText="电子邮件地址" inputType="email" :required="true" v-model="email" />
                    <button class="continue-button" @click="continueToSecondStep" :disabled="isLoading">
                        <span v-if="!isLoading">继续</span>
                        <span v-else>发送中...</span>
                    </button>
                </div>
                <div id="wx-qrcode" class="wechat-qrcode-container" v-show="activeTab === 'wechat'"></div>
            </div>
            <div class="question-area">
                <div class="question-text">还没有账户?</div>
                <div class="question-link">注册</div>
            </div>

            <div class="spilter-line">
                <div class="spilter-line-left" />
                <div class="spilter-line-text">或</div>
                <div class="spilter-line-right" />
            </div>

            <div class="login-with-area">
                <div class="login-with-button" @click="signInWithGoogle">
                    <img class="login-with-button-icon" src="https://cdn-teams-slug.flaticon.com/google.jpg"
                        alt="google" />
                    <div class="login-with-button-text">继续使用 Google 登录</div>
                </div>
                <!-- <div class="login-with-button" @click="signInWithWeChat">
                    <img class="login-with-button-icon" src="https://img.icons8.com/color/48/000000/weixing.png" alt="wechat" />
                    <div class="login-with-button-text">继续使用 微信 登录</div>
                </div>-->
                <!-- <div class="login-with-button">
                    <img class="login-with-button-icon"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDMKR0m0zmgdmCsLPxh0TKXwhAY_inxpNQHA&s"
                        alt="apple" />
                    <div class="login-with-button-text">继续使用 Apple 登录</div>
                </div> -->
            </div>

            <div class="footer">
                <router-link class="footer-text-left" to="/service-agreement">使用条款</router-link>
                <div class="footer-text-divider">|</div>
                <router-link class="footer-text-right" to="/privacy-policy">隐私政策</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import AppleStyleInput from '@/components/basic_ui/AppleStyleInput.vue';
import apiClient from '@/api/axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase'
import authService from '@/utils/auth'

export default {
    components: {
        AppleStyleInput
    },
    setup() {
        const toast = useToast()

        return { toast }
    },
    mounted() {
        this.renderQr()
    },
    data() {
        return {
            email: '',
            isLoading: false,
            activeTab: 'wechat',
        }
    },
    methods: {
        async continueToSecondStep() {
            // 基本格式验证
            if (!this.validateEmail(this.email)) {
                this.toast.error('请输入有效的电子邮件地址');
                return;
            }

            this.isLoading = true;

            try {
                const response = await apiClient.post('/auth/captcha/send', {
                    email: this.email
                });

                if (response.data.code === 200) {
                    this.$router.push({
                        name: 'AuthSecondStep',
                        params: { email: this.email },
                        query: this.$route.query
                    });
                } else {
                    this.toast.error(`发送失败: ${response.data.message}`);
                }
            } catch (error) {
                if (error.response) {
                    this.toast.error(`请求错误: ${error.response.data.message}`);
                } else {
                    this.toast.error('网络错误，请检查连接');
                }
            } finally {
                this.isLoading = false;
            }
        },
        async signInWithGoogle() {
            try {
                const provider = new GoogleAuthProvider();
                provider.setCustomParameters({ prompt: 'select_account' });
                const result = await signInWithPopup(auth, provider);
                const idToken = await result.user.getIdToken();
                const { success, user, error } = await authService.loginWithGoogle(idToken);

                if (success) {
                    this.toast.success(`欢迎回来，${user.contact || '用户'}`);
                    this.$router.push('/');
                } else {
                    this.toast.error(error);
                }
            } catch (e) {
                this.toast.error(e.code || e.message);
            }
        },
        signInWithWeChat() {
            const appId = process.env.VUE_APP_WECHAT_APP_ID;
            console.log(`${window.location.origin}/#/wechat-callback`)
            const redirectUri = encodeURIComponent(`${window.location.origin}/#/wechat-callback`);
            const state = Math.random().toString(36).substring(2);
            window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=${state}#wechat_redirect`;
        },
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        genState(len = 24) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let s = ''
            for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)]
            return s
        },
        renderQr() {
            const box = document.getElementById('wx-qrcode')
            if (!box) return
            box.innerHTML = ''
            const state = this.genState()
            sessionStorage.setItem('wx_oauth_state', state)

            if (window.WxLogin) {
                new window.WxLogin({
                    id: "wx-qrcode",
                    appid: process.env.VUE_APP_WECHAT_APP_ID,
                    scope: "snsapi_login",
                    redirect_uri: encodeURIComponent(`${window.location.origin}/#/wechat-callback`),
                    state: Math.random().toString(36).substring(2),
                    style: "black",
                    href: ""
                });
            }
        },
        

    }
}

</script>

<style scoped>
.app {
    margin-left: 0;
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

.auth-tabs {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
}

.tab {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;
}

.tab.active {
    color: var(--color-primary);
    font-weight: 600;
    border-bottom: 2px solid var(--color-primary);
}

.tab:hover {
    background-color: rgba(0, 0, 0, 0.03);
}

.auth-tab-content {
    width: 100%;
    overflow: hidden;
    height: 140px;
}

.wechat-qrcode-container ::v-deep(iframe) {
    transform: scale(0.6);       /* 缩放到 40% */
    transform-origin: top left;  /* 缩放基点 */
    width: 300px;                /* 保持原始大小 */
    height: 340px;
}

.wechat-qrcode-container {
    position: relative;
    top: -35px; /* 向上移动 20px */
    margin: 0 auto;
    width: 180px;   /* 容器限制 */
    height: 204px;
}

.auth-input-area {
    width: 100%;
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
}

.continue-button:hover {
    background-color: var(--color-primary-hover);
    transition: background-color 0.3s ease;
}

.continue-button:disabled {
    background-color: var(--color-primary-disabled);
    cursor: not-allowed;
}

.question-area {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.7);
}

.question-link {
    margin-left: 12px;
    color: var(--color-primary);
    cursor: pointer;
}

.spilter-line {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.spilter-line-left,
.spilter-line-right {
    width: 100px;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.3);
}

.spilter-line-left {
    margin-right: 10px;
}

.spilter-line-right {
    margin-left: 10px;
}

.spilter-line-text {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
}

.login-with-area {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
}

.login-with-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 10px;
    font-size: 12px;
    border-radius: 5px;
    cursor: pointer;
}

.login-with-button:hover {
    background-color: rgba(0, 0, 0, 0.03);
    transition: background-color 0.3s ease;
}

.login-with-button-icon {
    width: 20px;
    height: 20px;
}

.login-with-button-text {
    margin-left: 10px;
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
</style>
