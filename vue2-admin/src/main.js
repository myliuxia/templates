import Vue from 'vue'
import App from './App.vue'
import GetRouter from './router'
import store from './store'
import 'flex.css'
import '@/assets/style/index.scss'
import ElementUI from '@/plugins/element-ui'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 }

window.document.body.setAttribute('data-theme', 'lx')

const router = GetRouter()
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
