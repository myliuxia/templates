import { RouterMap } from '@/router/map';
import { defineStore } from 'pinia';

interface State {
  visibleMenu: Array<RouterMap>,
}
export const useMenuStore = defineStore({
  id: 'menu', // id必填，且需要唯一
  state: (): State => {
    return {
      visibleMenu: [],
    };
  },
  actions: {
    setVisibleMenu(menus: Array<RouterMap>) {
      this.visibleMenu = menus
    }
  },
});
