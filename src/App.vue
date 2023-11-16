<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

import Navigate from '@/components/Navigate.vue'

const authStore = useAuthStore()
const router = useRouter()

const token = computed(() => authStore.userInfo.token);

const checkUser = () => {
   const tokens = JSON.parse(localStorage.getItem('userTokens'));
   if (tokens) {
      authStore.userInfo.token = tokens.token
      authStore.userInfo.refreshToken = tokens.refreshToken
   }
}

const logout = () => {
   authStore.logout()
   localStorage.removeItem('userTokens')
   router.push('/signin')
}

checkUser()
</script>

<template>
   
   <div class="container">
      <Navigate></Navigate>
      <RouterView />
   </div>
</template>

<style scoped></style>