<script setup>
import {ref, onMounted} from 'vue'
import axiosApiInstance from '@/api'

import Card from 'primevue/card'
import Loader from '@/components/Loader.vue'

const user = ref([]);
const showLoader = ref(false);

const getAllCars = async () => {
  showLoader.value = true
  try {
    const response = await axiosApiInstance.get(`http://swyapi/api/get-user`)
    user.value = response.data
  } catch (err) {
    console.log(err.response);
  } finally {
    showLoader.value = false
  }
}

onMounted(async () => {
  await getAllCars();
})
</script>

<template>
  <div>
    <h2>user</h2>
    <Loader v-if="showLoader"/>
    <div class="flex flex-column gap-3" v-else>
      <Card>
        <template #title> {{user.username}} </template>
        <template #subtitle> {{user.email}} </template>
      </Card>
    </div>
  </div>
</template>