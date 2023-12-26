import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/Register.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/Login.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/Profile/User.vue'),
      meta: {
        auth: true
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.auth && !authStore.userInfo.token) {
    next('/login')
  } else if (!to.meta.auth && authStore.userInfo.token) {
    if(to.name == 'login' || to.name == 'register'){
        next('/user')
    }else{
        next()
    }
  } else {
    next();
  }
})


export default router
