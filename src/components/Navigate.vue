<script setup>
import { ref } from 'vue'
</script>

<template>
      <div class="menu">
         <router-link class="menu__link" to="/">Home</router-link>
         <router-link class="menu__link" to="/login" v-if="!token">Login</router-link>
         <router-link class="menu__link" to="/user" v-if="token">user</router-link>
         <router-link class="menu__link" to="/login" v-if="token" @click.prevent="logout">Logout</router-link>
      </div>
</template>

<style scoped></style>