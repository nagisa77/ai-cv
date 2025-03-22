<!-- Home.vue -->
<template>
  <div class="home">
    <div class="session1">
      <div class="session1-left">
        <h1 class="home-title animate-on-scroll" data-animation="fade-in-up">
          <span class="home-title-highlight">AI </span>懂你所想，<br>让简历更出众
        </h1>

        <div class="home-button-content animate-on-scroll" data-animation="fade-in-up-delay">
          <div class="home-description">AI对话式简历撰写</div>
          <p class="home-description">
            <strong>Deepseek V3 满血版支持</strong>
          </p>

          <router-link to="/template-selection">
            <button class="create-resume-button animate-on-scroll" data-animation="fade-in-up-delay2">
              与AI简历君聊聊吧
            </button>
          </router-link>
        </div>
      </div>
      <div class="session1-right">
        <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/home-paint.png" alt="home-image"
          class="home-image">
      </div>
    </div>

    <div class="session2">
      <div class="session2-left">
        <transition name="fade" mode="out-in">
          <div :key="currentText" class="carousel-text">{{ currentText }}</div>
        </transition>

        <transition name="fade" mode="out-in">
          <div :key="currentSubText" class="carousel-sub-text">{{ currentSubText }}</div>
        </transition>
      </div>

      <div class="session2-right">
        <!-- <transition name="fade" mode="out-in"> -->
        <img class="session2-image" :key="currentImage" :src="currentImage">
        <!-- </transition> -->
      </div>
    </div>

    <div class="session3">
      <div class="session3-title">套餐价格 (限时特惠)</div>
      <div class="pay-card-content">
        <div class="pay-card">
          <div class="pay-card-title">免费版</div>
          <div class="pay-card-subtitle">适用于体验用户</div>
          <div class="pay-acitvity">
            <div class="pay-acitvity-item">
              <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/complete.svg"
                alt="check-circle" class="pay-acitvity-item-icon">
              <div class="pay-acitvity-item-title">每日20次AI对话</div>
            </div>
            <div class="pay-acitvity-item">
              <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/complete.svg"
                alt="check-circle" class="pay-acitvity-item-icon">
              <div class="pay-acitvity-item-title">每日1次简历下载</div>
            </div>
          </div>
          <div class="pay-price-title">
            0 元
          </div>
          <div class="pay-price-subtitle">
            对所有人免费
          </div>
        </div>
        <div class="pay-card">
          <div class="pay-card-title">Pro版</div>
          <div class="pay-card-subtitle">适用于专业用户</div>
          <div class="pay-acitvity">
            <div class="pay-acitvity-item">
              <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/complete.svg"
                alt="check-circle" class="pay-acitvity-item-icon">
              <div class="pay-acitvity-item-title">每日50次AI对话</div>
            </div>
            <div class="pay-acitvity-item">
              <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/complete.svg"
                alt="check-circle" class="pay-acitvity-item-icon">
              <div class="pay-acitvity-item-title">每日5次简历下载</div>
            </div>

            <div class="pay-acitvity-item">
              <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/complete.svg"
                alt="check-circle" class="pay-acitvity-item-icon">
              <div class="pay-acitvity-item-title">可保存5份简历</div>
            </div>
          </div>

          <div class="pay-price-title">
            9.9 元
          </div>
          <div class="pay-price-subtitle">
            每月价格，包年享8折优惠
          </div>


        </div>


        <div class="pay-card">
          <div class="pay-card-title">Plus版</div>
          <div class="pay-card-subtitle">适用于职场达人</div>
          <div class="pay-acitvity">
            <div class="pay-acitvity-item">
              <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/complete.svg"
                alt="check-circle" class="pay-acitvity-item-icon">
              <div class="pay-acitvity-item-title">无限次AI对话</div>
            </div>
            <div class="pay-acitvity-item">
              <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/complete.svg"
                alt="check-circle" class="pay-acitvity-item-icon">
              <div class="pay-acitvity-item-title">无限次简历下载</div>
            </div>
            <div class="pay-acitvity-item">
              <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/complete.svg"
                alt="check-circle" class="pay-acitvity-item-icon">
              <div class="pay-acitvity-item-title">可保存10份简历</div>
            </div>
            <div class="pay-acitvity-item">
              <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/complete.svg"
                alt="check-circle" class="pay-acitvity-item-icon">
              <div class="pay-acitvity-item-title">支持一键模版、字体切换</div>
            </div>
          </div>

          <div class="pay-price-title">
            19.9 元
          </div>
          <div class="pay-price-subtitle">
            每月价格，包年享8折优惠
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      texts: [
        'AI对话式简历撰写',
        '数十种模版随便选',
      ],
      subTexts: [
        '聊着聊着，简历就写好了？？',
        '写出老板们万分欣赏的简历！！',
      ],
      images: [
        'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/show1.png',
        'https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/show2.png',
      ],
      currentIndex: 0,
      currentImageIndex: 0,
      interval: null
    }
  },
  computed: {
    currentText() {
      return this.texts[this.currentIndex];
    },
    currentSubText() {
      return this.subTexts[this.currentIndex];
    },
    currentImage() {
      return this.images[this.currentImageIndex];
    }
  },
  beforeUnmount() {
    this.stopCarousel();
  },
  methods: {
    startCarousel() {
      this.interval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.texts.length;
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }, 3000);
    },
    stopCarousel() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  },
  mounted() {
    this.startCarousel();

    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
      root: null, // 视口
      rootMargin: '0px',
      threshold: 0.1 // 元素进入视口10%时触发
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationClass = `animate-${element.dataset.animation}`;
          element.classList.add(animationClass);
          observer.unobserve(element); // 动画触发后停止观察
        }
      });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
      observer.observe(el);
    });
  }
}
</script>

<style scoped>
/* 定义关键帧动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.home-button-content {
  padding: 40px 80px;
  background-color: var(--color-white);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  width: fit-content;
  /* 根据内容自适应宽度 */
}

.session1-left {
  padding-left: 250px;
  width: calc(60vw - 100px);
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
}

.session1-right {
  width: 40vw;
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  align-items: right;
}

.home-image {
  position: relative;
  bottom: -30px;
  left: -30px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 动画类 */
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

.animate-fade-in-up-delay {
  animation: fadeInUp 1s ease-out 0.5s forwards;
}

.animate-fade-in-up-delay2 {
  animation: fadeInUp 1s ease-out 1s forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 1s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.5s forwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 1s ease-out forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 1s ease-out forwards;
}

/* 初始隐藏状态，根据 data-animation 设置不同的初始 transform */
.animate-on-scroll[data-animation="fade-in-up"],
.animate-on-scroll[data-animation="fade-in-up-delay"],
.animate-on-scroll[data-animation="fade-in-up-delay2"] {
  opacity: 0;
  transform: translateY(20px);
}

.animate-on-scroll[data-animation="slide-in-left"] {
  opacity: 0;
  transform: translateX(-100%);
}

.animate-on-scroll[data-animation="fade-in"] {
  opacity: 0;
}

.animate-on-scroll[data-animation="fade-in-delay"] {
  opacity: 0;
}

.animate-on-scroll[data-animation="fade-in-left"] {
  opacity: 0;
  transform: translateX(-20px);
}

.animate-on-scroll[data-animation="fade-in-right"] {
  opacity: 0;
  transform: translateX(20px);
}

/* 保持原有样式不变 */
.home {
  display: flex;
  margin-left: 0;
  flex-direction: column;
}

.home-title-highlight {
  font-size: 80px;
  font-weight: bold;
}

.text-carousel {
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
}

.session2-left {
  position: relative;
  bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  height: 100vh;
}

.carousel-text {
  margin-left: 100px;
  color: var(--color-black);
  font-size: 65px;
}

.carousel-sub-text {
  margin-top: 20px;
  margin-left: 100px;
  font-size: 35px;
  color: var(--color-black);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.home-title {
  font-size: 70px;
  font-weight: bold;
}

.create-resume-button {
  padding: 10px 60px;
  margin-top: 8px;
  font-size: 20px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  /* 添加过渡效果 */
}

.create-resume-button:hover {
  background-color: var(--color-primary-hover);
  transform: scale(1.05);
  transition: transform 0.3s;
}

.home-description {
  font-size: 25px;
  color: #666;
  max-width: 600px;
}

.session1 {
  height: calc(100vh);
  width: 100vw;
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.session2 {
  height: calc(100vh);
  width: 100vw;
  background-color: var(--color-secondary-dark);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.session2-image {
  width: 40vw;
  height: 80vh;
  object-fit: contain;
}

.session2-right {
  position: relative;
  bottom: 15px;
  left: -15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100vh;
}

.session2-icon {
  width: 100px;
  height: 100px;
}

.arrow-icon {
  width: 30px;
  height: 30px;
  margin-left: 35px;
  margin-right: 30px;
}

.session2-icon-content {
  display: flex;
  margin-left: 200px;
  align-items: center;
  width: 100vw;
  margin-top: 200px;
}

.session2-title {
  margin-left: 200px;
  font-size: 26px;
  color: var(--color-secondary);
  margin-top: 80px;
}

.session2-description {
  margin-left: 200px;
  font-size: 18px;
  color: var(--color-secondary);
  margin-top: 10px;
  max-width: 600px;
  opacity: 0.8;
}

.session3-button-content {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.session3-button {
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  max-width: 200px;
  padding: 10px;
  border-radius: 10px;
}

.session3-button:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
  cursor: pointer;
}

.session3-icon {
  width: 20px;
  height: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--color-gray);
}

.session3-button-title {
  margin-top: 15px;
  font-size: 16px;
  color: var(--color-black);
}

.session3-button-description {
  margin-top: 10px;
  font-size: 14px;
  opacity: 0.3;
  color: var(--color-black);
}

.session3 {
  height: calc(100vh);
  width: 100vw;
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.session3-title {
  font-size: 30px;
  font-weight: bold;
  color: var(--color-black);
}

.pay-card-content {
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
}

.pay-card {
  background-color: var(--color-white);
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.pay-card-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--color-text-primary);
}

.pay-card-subtitle {
  margin-top: 5px;
  font-size: 14px;
  color: var(--color-text-primary);
  opacity: 0.5;
}

.pay-acitvity {
  margin-top: 20px;
  height: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pay-acitvity-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.pay-acitvity-item-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  fill: var(--color-primary);
}

.pay-price-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--color-text-primary);
}

.pay-price-subtitle {
  font-size: 14px;
  color: var(--color-text-primary);
  opacity: 0.5;
}

.pay-button {
  position: relative;
  left: -3px;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.pay-button:disabled {
  background-color: var(--color-primary-disabled);
  cursor: not-allowed;
}

.pay-button:hover {
}

/* 移动端响应式适配 */
@media (max-width: 768px) {
  /* 第一部分响应式调整 */
  .session1 {
    flex-direction: column;
    height: auto;
    padding: 50px 0;
  }

  .session1-left {
    padding-left: 20px;
    width: 100%;
    height: auto;
    padding-right: 20px;
    order: 1;
  }

  .session1-right {
    width: 100%;
    height: auto;
    margin-bottom: 30px;
    order: 0;
  }

  .home-image {
    max-height: 200px;
    object-fit: contain;
  }

  .home-title {
    font-size: 36px;
    text-align: center;
  }

  .home-button-content {
    padding: 20px 30px;
    margin: 0 auto;
    width: 80%;
    text-align: center;
  }

  /* 第二部分响应式调整 */
  .session2 {
    flex-direction: column;
    height: auto;
    padding: 50px 0;
  }

  .session2-left {
    margin-top: 30px;
    width: 100%;
    height: auto;
    order: 1;
    padding-bottom: 30px;
  }

  .session2-right {
    width: 100%;
    height: auto;
    order: 0;
  }

  .carousel-text {
    margin-left: 20px;
    margin-right: 20px;
    font-size: 30px;
    text-align: center;
  }

  .carousel-sub-text {
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
  }

  .session2-image {
    width: 90%;
    height: auto;
    max-height: 300px;
  }

  /* 第三部分响应式调整 */
  .session3 {
    height: auto;
    padding: 50px 0;
  }

  .pay-card-content {
    flex-direction: column;
    margin-top: 40px;
    width: 90%;
  }

  .pay-card {
    width: 80%;
    margin-bottom: 0px;
  }

  .session3-title {
    font-size: 24px;
    padding: 0 20px;
    text-align: center;
  }
}

/* 更小屏幕的额外调整 */
@media (max-width: 480px) {
  .home-title {
    font-size: 28px;
  }

  .home-button-content {
    margin-top: 70px;
    width: 60%;
    padding: 30px 10px;
  }

  .carousel-text {
    font-size: 24px;
  }

  .create-resume-button {
    padding: 8px 20px;
    font-size: 16px;
  }
}
</style>