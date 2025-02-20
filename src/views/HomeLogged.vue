<!-- src/views/HomeLogged.vue -->
<template>
  <div class="logged-home">
    <h1>欢迎回来，{{ username }}</h1>
  </div>
</template>

<script>
import AuthService from '@/utils/auth'

export default {
  computed: {
    username() {
      return AuthService.getUserContact()
    }
  }
}
</script>

<style scoped>  
.logged-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

</style>