import { defineStore } from 'pinia';
import { PageRoute } from '@/router/types'
import router from '@/router'
import { getProperty, setProperty } from './persistence'

interface State {
  historyPages: Array<PageRoute>,
  keepAlive: Array<any>,
  currentPath: string
}

export const usePageStore = defineStore({
  id: 'page', // id必填，且需要唯一
  state: (): State => {
    return {
      historyPages: getProperty('page.historyPages', []),
      keepAlive: [],
      currentPath: getProperty('page.currentPath', ''),
    };
  },
  actions: {
    /** 打开页面 */
    openPage(route: PageRoute) {
      if (!this.historyPages.find(item => item.path === route.path)) {
        this.historyPages.push(route)
        setProperty('page.historyPages', this.historyPages)
        if (route.meta.keepAlive) {
          this.keepAlive.push(route.name)
        }
      }
      this.currentPath = route.path
      setProperty('page.currentPath', this.currentPath)
    },
    /** 关闭页面 */
    closePage(path: string) {
      const index = this.historyPages.findIndex(item => item.path === path)
      if (index > -1) {
        this.historyPages.splice(index, 1)
        setProperty('page.historyPages', this.historyPages)
        if (this.currentPath === path) {
          this.currentPath = this.historyPages[this.historyPages.length - 1].path
          setProperty('page.currentPath', this.currentPath)
          router.push({ path: this.currentPath })
        }
      }
    }
  },
});
