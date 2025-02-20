<!-- src/views/HomeWrapper.vue -->
<template>
  <component :is="currentHomeComponent" />
</template>

<script>
import { defineComponent } from 'vue'
import AuthService from '@/utils/auth'

import Home from '@/views/Home.vue'
import HomeLogged from '@/views/HomeLogged.vue'

export default defineComponent({
  computed: {
    currentHomeComponent() {
      return AuthService.isLoggedIn() ? HomeLogged : Home
    }
  }
})
</script>