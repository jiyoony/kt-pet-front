import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/components/Login.vue'
import Main from '@/components/main.vue'
import Signup from '@/components/Signup.vue'
import UserProfile from '@/components/UserProfile.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: UserProfile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
