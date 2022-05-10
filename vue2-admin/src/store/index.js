import Vue from 'vue'
import Vuex from 'vuex'
import lxAdmin from './modules'
Vue.use(Vuex)

const store = {
  strict: process.env.NODE_ENV === 'development',
  modules: {
    lxAdmin,
  },
}
export default new Vuex.Store(store)
