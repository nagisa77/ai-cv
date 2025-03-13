<template>
  <div class="home-logged">
    <div class="home-logged-left">
      <div class="home-card-left">
        <div class="home-card-left-top-buttons-container">

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
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: red;
}

</style>
