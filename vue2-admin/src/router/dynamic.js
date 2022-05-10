import MAPS from './map.js'
import { recursion } from '@/libs/util.js'

const load = (item, name) => {
  return import(`@/pages${item.path}`).then(component => {
    // 组件命名
    component.default.name = name

    return component
  })
}
// 处理组件name
const parserCompName = name => name.replace(new RegExp('/', 'g'), '_').replace(new RegExp('^_'), '')

// 通过MAp生成router配置
export const routerArr = MAPS.filter(item => !!item.path).map(item => {
  let name = parserCompName(item.path)
  return {
    id: item.id,
    name,
    // pid: item.pid,
    path: item.path,
    meta: {
      pool: true,
      cache: !(item.cache === false),
      requiresAuth: true,
      title: item.title,
    },
    // 预处理 自动给组件添加和对应路由相同的name
    component: () => load(item, name),
  }
})

// 通过MAPS生成菜单配置
export const menuArr = recursion(MAPS, 'id', 'pid', null)
