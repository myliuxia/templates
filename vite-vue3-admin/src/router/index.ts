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
      {
        path: '/home',
        name: 'home',
        meta: {
          title: 'home',
          keepAlive: true,
        },
        component: () => import('@/pages/home/index.vue'),
      },
      {
        path: '/demo/demo1',
        name: 'page-demo1',
        meta: {
          title: 'demo1',
          keepAlive: true,
        },
        component: () => import('@/pages/demo/demo1.vue'),
      },
      {
        path: '/demo/demo2',
        name: 'page-demo2',
        meta: {
          title: 'demo1',
          keepAlive: true,
        },
        component: () => import('@/pages/demo/demo2.vue'),
      },
      ...Routers
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
