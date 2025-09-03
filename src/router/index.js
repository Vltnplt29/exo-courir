import { createRouter, createWebHistory } from 'vue-router'

import UserAuthView from '@/views/user/UserAuth.vue'
import UserDashboardView from '@/views/user/UserDashboard.vue'
import UserHomeView from '@/views/user/UserHome.vue'
import UserProgramView from '@/views/user/UserProgram.vue'
import NotFoundView from '@/views/errors/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'UserAuthView',
    component: UserAuthView,
  },
  {
    path: '/user/dashboard',
    name: 'UserDashboardView',
    component: UserDashboardView,
  },
  {
    path: '/user/home',
    name: 'UserHomeView',
    component: UserHomeView,
  },
  {
    path: '/user/program',
    name: 'UserProgramView',
    component: UserProgramView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundView',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
