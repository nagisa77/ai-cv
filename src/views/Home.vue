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

          <router-link to="/auth">
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

    <div class="session2" id="session2">
      <div class="session2-left">
        <transition name="fade" mode="out-in">
          <div :key="currentText" class="carousel-text">{{ currentText }}</div>
        </transition>

        <transition name="fade" mode="out-in">
          <div :key="currentSubText" class="carousel-sub-text">{{ currentSubText }}</div>
        </transition>
      </div>

      <div class="session2-right">
        <transition name="fade" mode="out-in">
          <img class="session2-image" :key="currentImage" :src="currentImage">
        </transition>
      </div>
      
      <div class="carousel-dots">
        <div 
          v-for="(_, index) in texts" 
          :key="index" 
          :class="['carousel-dot', { active: index === currentIndex }]"
          @click="changeSlide(index)"
        ></div>
      </div>
    </div>

    <div class="session3" id="session3">
      <div class="session3-title">套餐价格 (限时特惠)</div>
      <div class="pay-card-content">
        <div class="pay-card" v-for="(card, index) in payCards" :key="index">
          <div class="pay-card-title">{{ card.title }}</div>
          <div class="pay-card-subtitle">{{ card.subtitle }}</div>
          <div class="pay-acitvity">
            <div class="pay-acitvity-item" v-for="(feature, fIndex) in card.features" :key="fIndex">
              <svg class="pay-acitvity-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M512 992C246.896 992 32 777.104 32 512 32 246.896 246.896 32 512 32 777.104 32 992 246.896 992 512 992 777.104 777.104 992 512 992ZM792.832 359.168C780.704 347.04 761.024 347.04 748.896 359.168L447.536 660.528 276.032 489.024C264.16 477.136 244.896 477.136 233.024 489.024 221.136 500.896 221.136 520.16 233.024 532.032L419.664 718.672C421.12 721.584 422.688 724.464 425.12 726.896 437.232 739.024 456.912 739.024 469.04 726.896L792.832 403.104C804.96 390.976 804.96 371.296 792.832 359.168Z" />
              </svg>
              <div class="pay-acitvity-item-title">{{ feature }}</div>
            </div>
          </div>
          <div class="pay-price-title">
            {{ card.price }}
          </div>
          <div class="pay-price-subtitle">
            {{ card.priceDesc }}
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="footer-content">
        <p>关于我们  |  帮助中心  |  联系我们 <span class="footer-text-highlight">粤ICP备20240536号-1</span></p>
        <p>© 2025 AI简历君 All rights reserved.</p>
      </div>
    </footer>
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
      payCards: [
        {
          title: '免费版',
          subtitle: '适用于体验用户',
          features: ['简历模版免费使用', '每日20次AI对话', '每日1次简历下载'],
          price: '0 元',
          priceDesc: '对所有人免费'
        },
        {
          title: 'Pro版',
          subtitle: '适用于专业用户',
          features: ['简历模版免费使用', '每日50次AI对话', '每日5次简历下载', '可保存5份简历'],
          price: '9.9 元 ☕️',
          priceDesc: '每月价格，包年享8折优惠'
        },
        {
          title: 'Plus版',
          subtitle: '适用于职场达人',
          features: ['简历模版免费使用', '无限次AI对话', '无限次简历下载', '可保存10份简历', '支持一键模版、字体切换'],
          price: '19.9 元 🌭',
          priceDesc: '每月价格，包年享8折优惠'
        }
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
      return this.images[this.currentIndex];
    }
  },
  beforeUnmount() {
    this.stopCarousel();
  },
  methods: {
    startCarousel() {
      this.interval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      }, 3000);
    },
    stopCarousel() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    changeSlide(index) {
      this.stopCarousel();
      this.currentIndex = index;
      this.startCarousel();
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
  position: relative;
  left: -10px;
  /* 根据内容自适应宽度 */
}

.session1-left {
  padding-left: 250px;
  width: calc(50vw - 100px);
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
}

.session1-right {
  width: 50vw;
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

.footer-text-highlight {
  margin-left: 10px;
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
  bottom: 5%;
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

.footer {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 20px 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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
  position: relative;
}

.session2-image {
  width: 40vw;
  height: 80vh;
  object-fit: contain;
}

.session2-right {
  position: relative;
  bottom: 5%;
  left: 0px;
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
}


.session3-title {
  margin-top: 50px;
  font-size: 40px;
  font-weight: bold;
  color: var(--color-black);
}

.pay-card-content {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 80px;
}

.pay-card {
  background-color: var(--color-white);
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.pay-card-title {
  font-size: 30px;
  font-weight: bold;
  color: var(--color-text-primary);
}

.pay-card-subtitle {
  margin-top: 14px;
  font-size: 20px;
  color: var(--color-text-primary);
  opacity: 0.5;
}

.pay-acitvity {
  margin-top: 20px;
  height: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pay-acitvity-item {
  font-size: 20px;
  margin-top: 10px;
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
  font-size: 30px;
  font-weight: bold;
  color: var(--color-text-primary);
}

.pay-price-subtitle {
  font-size: 20px;
  margin-top: 10px;
  color: var(--color-text-primary);
  opacity: 0.5;
}

.carousel-dots {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
}

.carousel-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-primary-disabled);
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.carousel-dot.active {
  background-color: var(--color-primary);
  transform: scale(1.2);
}

.carousel-dot:hover {
  background-color: var(--color-primary-hover);
}

/* 移动端响应式适配 */
@media (max-width: 768px) {
  /* 第一部分响应式调整 */
  .session1 {
    flex-direction: column;
    height: auto;
    padding: 40px 0 60px;
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
    position: static;
    max-height: 220px;
    object-fit: contain;
    margin: 0 auto;
    display: block;
  }

  .home-title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 20px;
  }

  .home-title-highlight {
    font-size: 42px;
  }

  .home-button-content {
    padding: 24px 30px;
    margin: 0 auto;
    width: 85%;
    text-align: center;
    border-radius: 20px;
  }

  .home-description {
    font-size: 18px;
  }

  .create-resume-button {
    padding: 12px 30px;
    width: 100%;
    border-radius: 12px;
    font-size: 18px;
    margin-top: 15px;
  }

  /* 第二部分响应式调整 */
  .session2 {
    flex-direction: column;
    height: auto;
    padding: 50px 0 70px;
  }

  .session2-left {
    position: static;
    margin-top: 20px;
    width: 100%;
    height: auto;
    order: 1;
    padding-bottom: 40px;
  }

  .session2-right {
    position: static;
    width: 100%;
    height: auto;
    order: 0;
    margin-bottom: 20px;
  }

  .carousel-text {
    margin: 0 25px;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
  }

  .carousel-sub-text {
    margin: 15px 25px 0;
    font-size: 20px;
    text-align: center;
  }

  .session2-image {
    width: 85%;
    height: auto;
    max-height: 320px;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  /* 第三部分响应式调整 */
  .session3 {
    height: auto;
    padding: 60px 0 80px;
  }

  .pay-card-content {
    flex-direction: column;
    margin-top: 40px;
    width: 90%;
    gap: 30px;
  }

  .pay-card {
    width: 85%;
    padding: 30px;
    margin-bottom: 5px;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .pay-card:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .session3-title {
    font-size: 28px;
    padding: 0 20px;
    text-align: center;
    margin-bottom: 10px;
  }

  .pay-card-title {
    font-size: 24px;
    text-align: center;
  }
  
  .pay-card-subtitle {
    text-align: center;
    font-size: 16px;
    margin-top: 8px;
  }

  .pay-acitvity {
    margin-top: 25px;
    height: auto;
    min-height: 180px;
    margin-bottom: 20px;
  }
  
  .pay-acitvity-item {
    font-size: 16px;
    margin-top: 12px;
  }

  .pay-price-title {
    font-size: 24px;
    text-align: center;
  }
  
  .pay-price-subtitle {
    font-size: 16px;
    text-align: center;
  }

  .carousel-dots {
    bottom: 25px;
  }
  
  .carousel-dot {
    width: 10px;
    height: 10px;
  }
}

/* 更小屏幕的额外调整 */
@media (max-width: 480px) {
  .session1 {
    padding: 30px 0 50px;
  }
  
  .home-title {
    font-size: 26px;
    line-height: 1.4;
    margin-bottom: 15px;
  }

  .home-title-highlight {
    font-size: 34px;
  }

  .home-button-content {
    width: 90%;
    padding: 20px 15px;
    border-radius: 18px;
  }
  
  .home-description {
    font-size: 16px;
    line-height: 1.5;
  }
  
  .create-resume-button {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 10px;
  }
  
  .session2 {
    padding: 40px 0 60px;
  }

  .carousel-text {
    font-size: 24px;
    line-height: 1.3;
    margin: 0 20px;
  }

  .carousel-sub-text {
    font-size: 16px;
    margin: 10px 20px 0;
  }
  
  .session2-image {
    width: 90%;
    max-height: 260px;
  }
  
  .session3 {
    padding: 50px 0 70px;
  }
  
  .session3-title {
    font-size: 24px;
  }
  
  .pay-card {
    width: 90%;
    padding: 25px 20px;
  }
  
  .pay-card-title {
    font-size: 20px;
  }
  
  .pay-card-subtitle {
    font-size: 14px;
  }

  .pay-acitvity-item {
    font-size: 14px;
    margin-top: 10px;
  }
  
  .pay-acitvity-item-icon {
    width: 16px;
    height: 16px;
    min-width: 16px;
  }

  .pay-price-title {
    font-size: 20px;
    margin-top: 5px;
  }

  .pay-price-subtitle {
    font-size: 14px;
    margin-top: 5px;
  }
  
  .carousel-dots {
    bottom: 15px;
    gap: 10px;
  }
  
  .carousel-dot {
    width: 8px;
    height: 8px;
  }
  
  /* 添加进入视图动画效果在移动端的优化 */
  .animate-on-scroll[data-animation="fade-in-up"],
  .animate-on-scroll[data-animation="fade-in-up-delay"],
  .animate-on-scroll[data-animation="fade-in-up-delay2"] {
    transform: translateY(15px);
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* 超小屏幕的额外调整 */
@media (max-width: 360px) {
  .home-title {
    font-size: 22px;
  }
  
  .home-title-highlight {
    font-size: 30px;
  }
  
  .home-button-content {
    padding: 18px 12px;
  }
  
  .home-description {
    font-size: 14px;
  }
  
  .create-resume-button {
    padding: 8px 15px;
    font-size: 15px;
  }
  
  .pay-card {
    padding: 20px 15px;
  }
  
  .pay-acitvity-item {
    font-size: 13px;
  }
}
</style>