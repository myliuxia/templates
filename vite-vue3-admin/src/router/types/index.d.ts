
import { LocationQuery, RouteRecordName, RouteParams, RouteMeta } from 'vue-router'

/**
 * 页面路由信息
 */
export declare interface PageRoute {
  name: RouteRecordName | null | undefined,
  params: RouteParams,
  query: LocationQuery,
  meta: RouteMeta,
  path: string
}
