import { RouteComponent, RouteRecordRaw } from 'vue-router'
type Lazy<T> = () => Promise<T>;
type RawRouteComponent = RouteComponent | Lazy<RouteComponent>;
interface RouterMap {
  title: string;
  id: string;
  pid: string;
  path?: string;
  icon?: string;
  component?: RawRouteComponent;
  children?: Array<any>;
}

const MAPS: Array<RouterMap> = [
  {
    id: '1',
    title: '基础页面',
    icon: 'el-base',
    pid: ''
  },
  {
    id: '1-1',
    title: '页面布局01',
    path: '/base/layout_1',
    icon: '',
    pid: '1',
    component: () => import('@/pages/demo/demo1.vue')
  },
  {
    id: '1-2',
    title: '页面布局02',
    path: '/base/layout_2',
    icon: '',
    pid: '1',
    component: () => import('@/pages/demo/demo2.vue')
  },
  {
    id: '1-3',
    title: '页面布局03',
    path: '/base/layout_3',
    icon: '',
    pid: '1',
    component: () => import('@/pages/demo/demo1.vue')
  },
  {
    id: '2',
    title: '路由test',
    icon: 'el-base',
    pid: '',
  },
  {
    id: '2-1',
    title: '页面布局01',
    path: '/test/test_1',
    icon: '',
    pid: '2',
    component: () => import('@/pages/demo/demo1.vue')
  },
  {
    id: '3',
    title: '独立路由test',
    icon: 'el-base',
    path: '/demo',
    component: () => import('@/pages/demo/demo1.vue'),
    pid: ''
  },
]

export default MAPS

// 处理组件name
function parserCompName(name: string): string {
  return name.replace(new RegExp('/', 'g'), '_').replace(new RegExp('^_'), '')
}


// MAPS 配置生成的路由数据
export const Routers: Array<RouteRecordRaw> = MAPS.filter(item => !!item.path).map(item => {
  return {
    path: item.path as string,
    name: parserCompName(item.path as string),
    meta: {
      title: item.title,
      keepAlive: true,
    },
    component: item.component as RawRouteComponent,
  }
})

function recursion(map: Array<RouterMap>, value: string): Array<RouterMap> {
  const result: Array<RouterMap> = []
  let children: Array<RouterMap>
  for (const item of map) {
    if (item.pid === value) {
      children = recursion(map, item.id)
      if (children.length) {
        item.children = children
      }
      result.push(item)
    }
  }
  return result
}
// MAPS 配置生成的菜单数据
export const Menus: Array<RouterMap> = recursion(MAPS, '')