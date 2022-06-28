import { createRouter, createWebHistory, RouteRecordRaw, } from 'vue-router'
import { Routers } from './map'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'LoginPage',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false
    },
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/',
    redirect: {
      name: 'home',
    },
    component: () => import('@/layout/index.vue'),
    children: [
      ...Routers
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
