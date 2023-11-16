<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Message from 'primevue/message';
import Loader from '@/components/Loader.vue'

const authStore = useAuthStore();
const router = useRouter();

const email = ref();
const password = ref();
const username = ref();

const signup = async () => {

    await authStore.register({ username: username.value, email: email.value, password: password.value, username: 'pro100pav'  })
    router.push('/user')

}
</script>

<template>
    <div class="grid">
        <div class="col-6 col-offset-3">
            <h2>Регистрация</h2>
            <form class="flex flex-column gap-3">
                <span v-if="authStore.error">
                    <Message severity="warn" v-for="item in authStore.error" :key="item.index">{{ item[0] }}</Message>
                </span>
                <div class="p-inputgroup flex-1">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <InputText type="text" v-model="username" placeholder="Логин" />
                </div>
                <div class="p-inputgroup flex-1">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <InputText type="email" v-model="email" placeholder="Ваш Email" />
                </div>
                <div class="p-inputgroup flex-1">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-at"></i>
                    </span>
                    <InputText type="password" v-model="password" placeholder="Пароль" />
                </div>
                <Loader v-if="authStore.loader" />
                <div v-else class="flex flex-column gap-3">
                    <Button label="Зарегистрироваться" @click="signup" />
                    <span>Уже зарегистрированы? <router-link to="/login">Войти</router-link></span>
                </div>
            </form>
        </div>
    </div>
</template>