import actions from './actions'
import mutations from './mutations'

const state = {
  pool: [],
  keepAlive: [],
  current: '',
}
const module = {
  namespaced: true,
  state,
  actions,
  mutations,
}
export default module
