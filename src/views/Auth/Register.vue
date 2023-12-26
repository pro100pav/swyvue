<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'



const authStore = useAuthStore();
const router = useRouter();

const email = ref();
const password = ref();
const username = ref();
const confirm_password = ref();

const signup = async () => {

    let res = await authStore.register({ username: username.value, email: email.value, password: password.value, confirm_password: confirm_password.value  })
    console.log(res);
    // router.push('/user')

}
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">

            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Регистрация</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <span v-if="authStore.error">
                    <p severity="warn" v-for="item in authStore.error" :key="item.index">{{ item[0] }}</p>
                </span>
                
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Логин</label>
                    <div class="mt-2">
                        <input v-model="username" placeholder="Логин" required="" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div class="mt-2">
                        <input v-model="email" placeholder="email" autocomplete="email" required="" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
                    <div class="mt-2">
                        <input type="password" v-model="password" placeholder="Пароль" required="" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Подтвердите пароль</label>
                    <div class="mt-2">
                        <input type="password" v-model="confirm_password" placeholder="Подтвердите пароль" required="" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                
                <div>
                    <button type="button" @click="signup"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Зарегистрироваться</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
            <p>Уже зарегистрированы? <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Войти</router-link>
        </p>
        </p>
    </div>
</div>
</template>