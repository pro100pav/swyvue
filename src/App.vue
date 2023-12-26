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
    <div>
        <header>
            <Navigate></Navigate>
        </header>
        <main>
            <RouterView />
        </main>
        <footer>
            <div class="flex justify-center items-center h-screen flex-col">
                
    <div class="mt-6">
      <a
        href="#"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Vue 3 dark Mode With Tailwind CSS
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          install & setup vue 3 dark mode in vue 3 using tailwind css 3
        </p>
      </a>
    </div>
  </div>
        </footer>
    </div>
</template>

<style scoped></style>