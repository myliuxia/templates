import localforage from 'localforage'
import merge from 'lodash/merge'
import get from 'lodash/get'
import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'

const KEY = 'vite_vue3_admin'
// 默认设置
let data = {
  page: {
    historyPages: [],
    currentPath: '/home',
  }
}
export const initState = () => {
  return new Promise(async resovle => {
    const result = await localforage.getItem(KEY)
    if (result !== null) {
      // 合并配置
      data = merge(data, result)
      // 重新保存
      await localforage.setItem(KEY, data)
    }
    resovle(true)
  })
}

export const getProperty = (keyPath: string, def: any) => {
  return get(data, keyPath, def)
}
export const setProperty = async (keyPath: string, value: any) => {
  const cloneValue = cloneDeep(value)
  set(data, keyPath, cloneValue)
  return localforage.setItem(KEY, data)
}
