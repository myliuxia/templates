import remove from 'lodash/remove'

const mutations = {
  /**
   * 更新一个页面
   * @param state state
   * @param param1 index, payload
   */
  updatePage(state, { index, params, query, meta, path }) {
    const page = state.pool[index]
    page.params = params
    page.query = query
    page.meta = meta
    page.path = path
    state.pool.splice(index, 1, page)
  },
  /**
   * 设置一个页面
   * @param state state
   * @param pool pool
   */
  setPool(state, pool) {
    state.pool = pool
    // 设置缓存
    state.keepAlive = state.pool.filter(item => item.meta.cache).map(item => item.name)
  },
  /**
   * 加入一个页面
   * @param state state
   * @param page page
   */
  putPool(state, page) {
    // 判断是否为首页，如果是则放在数组最前端
    if (page.name === 'home') {
      state.pool.unshift(page)
      const keep = [...state.keepAlive]
      if (page.meta.cache) {
        keep.unshift(page.name)
        state.keepAlive = Array.from(new Set(keep))
      }
    } else {
      state.pool.push(page)
      const keep = [...state.keepAlive]
      if (page.meta.cache) {
        keep.push(page.name)
        state.keepAlive = Array.from(new Set(keep))
      }
    }
  },
  /**
   * 删除若干页面
   * @param state vuex
   * @param param1 index, count
   */
  delPool(state, { index, count = 1 }) {
    const pool = [...state.pool]
    const poolItems = pool.splice(index, count)
    const keep = [...state.keepAlive]
    const names = poolItems.map(item => item.name)
    // 删除对应的缓存
    remove(keep, item => names.indexOf(item) !== -1)
    state.pool = pool
    state.keepAlive = keep
  },
  /**
   * 设置当前选中页面
   * @param state state
   * @param name name
   */
  setCurrent(state, name) {
    state.current = name
  },
  // 保存路由组件router-view的实例
}

export default mutations
