import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { setupElement } from '@/plugins/element';
import './assets/style/index.scss'
import { RouteLocationNormalized } from 'vue-router';
import { PageRoute } from './router/types';
import { initState } from './store/persistence'
import { usePageStore } from '@/store/page'
import { useMenuStore } from '@/store/menu'
import { Menus } from '@/router/map'

const bootstrap = () => {
  // 创建vue实例
  const app = createApp(App)
  // 按需引入element-plus插件
  setupElement(app)
  app.use(store)
  app.use(router)
  // 挂载示例
  app.mount('#app')
  // 添加路由监听
  const pageStore = usePageStore()
  const menuStore = useMenuStore()
  menuStore.setVisibleMenu(Menus)
  router.afterEach((to: RouteLocationNormalized) => {
    const curPageRoute: PageRoute = {
      name: to.name,
      params: to.params,
      query: to.query,
      meta: to.meta,
      path: to.path,
    }
    pageStore.openPage(curPageRoute)
  })
  // TODO
  window.document.body.setAttribute('data-theme', 'default')
}


const pretreatment = [initState()]
Promise.all(pretreatment).then(bootstrap)
  .catch(async error => {
    // TODO
    console.log(error)
  })
