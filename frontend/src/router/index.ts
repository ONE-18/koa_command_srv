import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { fetchDataBeforeRoute } from '@/utils/axiosInstance'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    { path: '/Login', component: () => import('@/views/Login.vue') },
    { path: '/Scripts', component: () => import('@/views/Scripts.vue') },
    { path: '/Endpoints', component: () => import('@/views/Endpoints.vue') },
    { path: '/Logs', component: () => import('@/views/Logs.vue') },
    { path: '/Profile', component: () => import('@/views/Profile.vue') },
    { path: '/Editor/:scriptId', component: () => import('@/views/ScriptEditor.vue') },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login' || localStorage.getItem('token')) {
    next()
  }else{
    next({
      path: '/login',
      replace: true
    })
  }
})

export default router
