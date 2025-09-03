import { createRouter, createWebHistory } from 'vue-router'

import UserAuth from '../views/user/UserAuth.vue'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: UserAuth,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
