import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'
import { randomString, stringToHexCharCode } from '@/libs/util'
function checkInThePond(page) {
  return page.meta.pool
}

const actions = {
  /**
   * 打开新页面
   * @param param0 vuex
   */
  open({ state, dispatch, commit }, page) {
    // 非tabs框架内不处理
    if (!checkInThePond(page)) {
      return
    }

    // 判断此页面是否已经打开 并且记录位置
    let pageOpendIndex = 0

    const pageOpend = find(state.pool, (p, index) => {
      const same = p.name === page.name
      pageOpendIndex = same ? index : pageOpendIndex
      return same
    })

    if (pageOpend) {
      commit('updatePage', {
        index: pageOpendIndex,
        params: page.params,
        query: page.query,
        meta: page.meta,
        path: page.path,
      })
    } else {
      dispatch('putPage', page)
    }
    dispatch('setCurrentName', page.name)
  },
  /**
   * 加入栈
   * @param param0 vuex
   */
  putPage({ commit }, page) {
    // tslint:disable-next-line:no-unused-expression
    checkInThePond(page) && commit('putPool', page)
  },
  /**
   * 设置当前选中的name
   * @param param0 vuex
   */
  setCurrentName({ commit }, current) {
    commit('setCurrent', current)
  },

  /**
   * 关闭一个tab
   */
  close({ state, commit }, { tagName, vm }) {
    const index = findIndex(state.pool, t => t.name === tagName)
    if (index !== -1) {
      commit('delPool', { index })
      // 打开剩下的 删除的时候有问题 好像是跳过了第0个？
      const currentPageIndex = findIndex(state.pool, t => t.name === state.current)
      let page = state.pool[currentPageIndex]
      if (!page) {
        page = state.pool[index - 1]
      }
      // 标签页关闭完了就返回首页
      vm.$router.push(page || '/')
    }
  },
  /**
   * 刷新一个页面
   * @param param0 vuex
   * @param vm vue
   */
  refresh({ state }, { tagName, vm }) {
    if (!tagName) {
      tagName = state.current
    }
    let page = find(state.pool, t => t.name === tagName)
    if (page) {
      // 清除缓存
      const rv = vm.$root.__routerView
      if (rv) {
        // console.log(rv.$vnode.parent.componentInstance)
        const arr = []
        for (let key in rv.$vnode.parent.componentInstance.cache) {
          if (key.includes(page.path)) {
            // rv.$vnode.parent.componentInstance.cache[key].componentInstance.$destroy()
            arr.push(rv.$vnode.parent.componentInstance.cache[key])
            delete rv.$vnode.parent.componentInstance.cache[key]
            const index = rv.$vnode.parent.componentInstance.keys.findIndex(item => item === key)
            rv.$vnode.parent.componentInstance.keys.splice(index, 1)
          }
        }
        arr.forEach(item => {
          item.componentInstance.$destroy()
        })
      }

      page = cloneDeep(page)
      // 加上随机参数刷新
      page.query._ = stringToHexCharCode(randomString(6))
      vm.$router.replace(page)
    }
  },
  /**
   * 关闭左边
   * @param param0 vuex
   * @param vm vue
   */ closeLeft({ state, commit }, { tagName, vm }) {
    const len = state.pool.length
    if (len === 1) {
      return
    }
    if (!tagName) {
      tagName = state.current
    }
    const index = findIndex(state.pool, t => t.name === tagName)
    if (index === -1) {
      return
    }
    vm.$router.push(state.pool[index])
    let pool = cloneDeep(state.pool)
    pool = pool.splice(index, len - index)

    // 不关闭首页
    if (state.pool[index].name !== 'home') {
      pool.unshift(state.pool[0])
    }

    commit('setPool', pool)
  },
  /**
   * 关闭右边
   * @param param0 vuex
   * @param vm vue
   */
  closeRight({ state, commit }, { tagName, vm }) {
    const len = state.pool.length
    if (len === 1) {
      return
    }
    if (!tagName) {
      tagName = state.current
    }
    const index = findIndex(state.pool, t => t.name === tagName)
    if (index === -1) {
      return
    }
    vm.$router.push(state.pool[index])
    // 如果是第一项 直接留下第一项
    if (index === 0) {
      commit('setPool', [state.pool[0]])
      return
    }
    // 最后一项没有右边
    if (index === len - 1) {
      return
    }
    // 除掉后面的tabs
    commit('delPool', {
      index: index + 1,
      count: len - index - 1,
    })
  },
  /**
   * 关闭其他
   * @param param0 vuex
   * @param vm vue
   */
  closeOther({ state, commit }, { tagName, vm }) {
    const len = state.pool.length
    if (len === 1) {
      return
    }
    if (!tagName) {
      tagName = state.current
    }
    const index = findIndex(state.pool, t => t.name === tagName)
    if (index === -1) {
      return
    }
    const page = state.pool[index]
    vm.$router.push(page)
    // 除掉其他的tabs
    const pool = [page]

    // 不关闭首页
    if (page.name !== 'home') {
      pool.unshift(state.pool[0])
    }

    commit('setPool', pool)
  },
}

export default actions
