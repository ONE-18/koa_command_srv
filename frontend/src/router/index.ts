import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    { path: '/Scripts', component: () => import('@/views/AboutView.vue') },
    { path: '/Endpoints', component: () => import('@/views/AboutView.vue') },
    { path: '/Logs', component: () => import('@/views/AboutView.vue') },
    { path: '/Profile', component: () => import('@/views/Profile.vue') },
  ],
})

export default router
