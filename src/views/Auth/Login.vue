<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'


const authStore = useAuthStore();
const router = useRouter();

const email = ref();
const password = ref();

const signup = async () => {

    await authStore.login({ email: email.value, password: password.value })
    router.push('/user')

}
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">

            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Вход в ваш аккаунт</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <span v-if="authStore.error">
                    <p severity="warn" v-for="item in authStore.error" :key="item.index">{{ item[0] }}</p>
                </span>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email или Логин</label>
                    <div class="mt-2">
                        <input v-model="email" autocomplete="email" required=""
                            class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Забыли пароль?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input v-model="password" type="password" autocomplete="current-password" required=""
                            class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="button" @click="signup"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Войти</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
            <p>Не зарегистрированы? <router-link to="/register"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Зарегистрироваться</router-link>
            </p>
            </p>
        </div>
    </div>
</template>