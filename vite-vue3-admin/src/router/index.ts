import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
    name: 'LayoutPage',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/layout/index.vue')
  },
  {
    path: '/vueUse',
    name: 'VueUse',
    meta: {
      title: 'vueUse demo',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/pages/vueUse.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
