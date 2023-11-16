import axios from 'axios'
import {useAuthStore} from './stores/auth'
import router from './router'

const axiosApiInstance = axios.create()



axiosApiInstance.interceptors.request.use(

    (config) => {
        const token = JSON.parse(localStorage.getItem('userTokens')).token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);




axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const authStore = useAuthStore()
  const originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const newTokens = await axios.post(
        `http://swyapi/api/refresh`, {
          grant_type: 'refresh_token',
          refresh_token: JSON.parse(localStorage.getItem('userTokens')).refreshToken
        }
      )
      console.log('newToken', newTokens.data);
      authStore.userInfo.token = newTokens.data.access_token
      authStore.userInfo.refreshToken = newTokens.data.refresh_token
      localStorage.setItem('userTokens', JSON.stringify({
        token: newTokens.data.access_token,
        refreshToken: newTokens.data.refresh_token
      }))
    } catch (err) {
      console.log(err);
      localStorage.removeItem('userTokens')
      router.push('/login')
      authStore.userInfo.token = ''
      authStore.userInfo.refreshToken = ''
    }
  }
  console.log(error);
})

export default axiosApiInstance