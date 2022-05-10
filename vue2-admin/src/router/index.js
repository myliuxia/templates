import Vue from 'vue'
import VueRouter from 'vue-router'
import { routerArr } from './dynamic'
import layout from '@/layout/index.vue'

const load = (name, ext = 'vue') => () => import(`@/pages/${name}.${ext}`)

/**
 * 更改document.title
 * @param title 名称
 */
const changeDocumentTitle = title => {
  window.document.title = `${title}`
}

routerArr.push({
  name: 'home',
  path: '/home/index',
  component: load('home/index'),
  meta: {
    title: '首页',
    pool: true,
    cache: true,
    requiresAuth: true,
  },
})

Vue.use(VueRouter)
export default () => {
  const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        redirect: {
          name: 'home',
        },
        component: layout,
        children: routerArr,
      },
      {
        name: 'forbidden',
        path: '/error-forbidden',
        component: load('error/error-403/index'),
        meta: {
          title: '无权访问',
          requiresAuth: false,
        },
      },
      {
        name: 'not-found',
        path: '*',
        component: load('error/error-404/index'),
        meta: {
          title: '页面不存在',
          requiresAuth: false,
        },
      },
    ],
  })

  router.afterEach(to => {
    // 需要的信息
    const app = router.app
    const { name, params, query, meta, path } = to
    // 多页控制 打开新的页面
    app.$store.dispatch('lxAdmin/page/open', {
      name,
      params,
      query,
      meta,
      path,
    })
    // 更改标题
    changeDocumentTitle(meta.title || '未命名')
  })
  return router
}
