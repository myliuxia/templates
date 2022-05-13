import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { setupElement } from '@/plugins/element';

// 创建vue实例
const app = createApp(App)

// 按需引入element-plus插件
setupElement(app)

app.use(store)
app.use(router)

// 挂载示例
app.mount('#app')
