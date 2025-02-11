<template>
    <div class="app">
        <div class="auth-page">
            <div class="auth-title">欢迎回来</div>
            <AppleStyleInput id="email" labelText="电子邮件地址" inputType="email" :required="true" v-model="email" />

            <button class="continue-button">继续</button>

            <div class="question-area">
                <div class="question-text">还没有账户?</div>
                <div class="question-link">注册</div>
            </div>

            <div class="spilter-line">
                <div class="spilter-line-left"/>
                <div class="spilter-line-text">或</div>
                <div class="spilter-line-right"/>
            </div>

            <div class="login-with-area">
                <div class="login-with-button">
                    <img class="login-with-button-icon" src="https://cdn-teams-slug.flaticon.com/google.jpg" alt="google" />
                    <div class="login-with-button-text">继续使用 Google 登录</div>
                </div>
                <div class="login-with-button">
                    <img class="login-with-button-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDMKR0m0zmgdmCsLPxh0TKXwhAY_inxpNQHA&s" alt="apple" />
                    <div class="login-with-button-text">继续使用 Apple 登录</div>
                </div>
            </div>

            <div class="footer">
                <div class="footer-text-left">使用条款</div>
                <div class="footer-text-divider">|</div>
                <div class="footer-text-right">隐私政策</div>
            </div>
        </div>
    </div>
</template>

<script>

import AppleStyleInput from '@/components/basic_ui/AppleStyleInput.vue';

export default {
    components: {
        AppleStyleInput
    },
    data() {
        return {
            email: ''
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

.spilter-line-left, .spilter-line-right {
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