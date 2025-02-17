import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/components/Login.vue'
import Main from '@/components/main.vue'
import Signup from '@/components/Signup.vue'
import UserProfile from '@/components/UserProfile.vue'
import PetSitterList from '@/components/PetSitterList.vue'
import Reservations from '@/components/Reservations.vue'
import AnimalCodeManager from '@/components/AnimalCodeManager.vue'
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
  },
  {
    path: '/pet-sitter-list',
    name: 'PetSitterList',
    component: PetSitterList
  },
  {
    path: '/animal-code-manager',
    name: 'AnimalCodeManager',
    component: AnimalCodeManager
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: Reservations
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
