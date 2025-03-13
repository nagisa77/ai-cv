<template>
  <div class="home-logged">
    <div class="home-logged-left">
      <div class="home-card-left">
        <div class="home-card-left-top-buttons-container">
          <button class="btn">
            <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/add.svg" alt="icon" class="btn-icon">
            <span>新建简历</span>
          </button>
          <button class="btn btn-white">
            <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/import.png" alt="icon" class="btn-icon btn-icon-import">
            <span>导入简历</span>
          </button>
          <button class="btn btn-white">
            <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/model.png" alt="icon" class="btn-icon btn-icon-model">
            <span>简历模版</span>
          </button>
          <!-- 如需添加第4个按钮，可取消下面注释 -->
          <button class="btn btn-white">
            <img src="https://aicv-1307107697.cos.ap-guangzhou.myqcloud.com/asserts/icon/interview.png" alt="icon" class="btn-icon btn-icon-interview">
            <span>模拟面试</span>
          </button>
        </div>
      </div>
    </div>

    <div class="home-logged-right">
      <div class="home-logged-right-top">
        <div class="home-card-right-top">
        </div>
      </div>

      <div class="home-logged-right-bottom">
        <div class="home-card-right-bottom">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeLogged'
}
</script>

<style scoped>
.home-logged {
  margin-left: 80px;
  background-color: var(--color-background);
  height: 100vh;
  display: flex;
}

.home-logged-left {
  height: 100vh;
  width: calc(60vw - 40px);
}

.home-logged-right-top {
  height: 40vh;
  width: 40vw;
}

.home-logged-right-bottom {
  height: 60vh;
  width: 40vw;
}

.home-card-left {
  background-color: white;
  height: calc(100% - 80px);
  width: calc(100% - 80px);
  margin-top: 40px;
  margin-left: 40px;
  border-radius: 30px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.home-card-right-top {
  background-color: white;
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  margin-top: 40px;
  border-radius: 30px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}   

.home-card-right-bottom {
  background-color: white;
  height: calc(100% - 80px);
  width: calc(100% - 40px);
  border-radius: 30px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.home-card-left-top-buttons-container {
  padding: 0 20px;
  width: calc(100% - 40px);
  height: 100px;
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: var(--color-secondary);
  /* 如果需要按钮靠左排列，可去掉 justify-content: space-between */
  /* justify-content: space-between; */
}

.btn {
  /* 按钮宽度尽量撑开 */
  padding: 12px 20px;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: none;

  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: 15px;
  font-size: 20px;
}

.btn-white {
  background-color: white;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 10px 15px;
}

.btn:hover {
  background-color: var(--color-primary-hover);
  transition: background-color 0.3s ease;
}

.btn-white:hover {
  background-color: var(--color-secondary);
  transition: background-color 0.3s ease;
}


.btn-icon {
  width: 25px ;
  height: 25px;
  margin-right: 5px;
}

.btn:last-child {
  margin-right: 0;
}

/* 添加图标滤镜以改变颜色 - 这是一种尝试方案 */
.btn-white .btn-icon {
  filter: invert(58%) sepia(19%) saturate(1155%) hue-rotate(333deg) brightness(92%) contrast(84%);
}

/* 如果需要hover状态保持图标颜色 */
.btn-white:hover .btn-icon {
  filter: invert(58%) sepia(19%) saturate(1155%) hue-rotate(333deg) brightness(92%) contrast(84%);
}
</style>
