import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const url = 'http://localhost:3000/api/v1/users/'

export const useAuthStore = defineStore('auth', () => {
    const userInfo = ref({
        token: '',
        refreshToken: ''
    })
    const error = ref('');
    const loader = ref(false)
    const register = async (payload) => {
        try {
            let response = await axios.post(url + 'register', {
                ...payload
            })
            userInfo.value = {
                token: response.data.token,
            }
            localStorage.setItem('userTokens', JSON.stringify({
                token: userInfo.value.token,
                refreshToken: userInfo.value.refreshToken}))
        } catch (err) {
            error.value = err.response.data.errors
        } finally {
            loader.value = false;
        }
    }
    const login = async (payload) => {
        try {
            let response = await axios.post(url + 'login', {
                ...payload
            })
            userInfo.value = {
                token: response.data.token,
            }
            localStorage.setItem('userTokens', JSON.stringify({
                token: userInfo.value.token,
                refreshToken: userInfo.value.refreshToken}))

        } catch (err) {
            error.value = err.response.data.errors
        } finally {
            loader.value = false;
          }
    }

    const logout = () => {
        userInfo.value = {
          token: '',
          refreshToken: ''
        }
      }

    return { login, register, userInfo, error, loader, logout }
})
