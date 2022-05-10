<template>
  <div class="lx-page-aside" :class="{ 'lx-page-aside--collapse': collapse }">
    <el-menu class="menu-box" @open="handleOpen" @close="handleClose" @select="handleMenuSelect" :collapse="collapse">
      <component
        v-for="(menu, index) in allHighestMenu"
        :key="index"
        :is="menu.children && menu.children.length !== 0 ? 'MenuSub' : 'MenuItem'"
        :menu="menu"
      ></component>
    </el-menu>
    <div class="collapse-toggle" @click="handleToggleClick()" :title="(collapse ? '展开' : '收起') + '菜单'">
      <i class="fs-18" :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </div>
  </div>
</template>

<script>
import MenuItem from '../components/menu-item'
import MenuSub from '../components/menu-sub'
import { menuArr } from '@/router/dynamic.js'
export default {
  name: 'lx-aside',
  components: { MenuItem, MenuSub },
  data() {
    return {
      active: '',
      // 左侧菜单
      allHighestMenu: menuArr,
      collapse: false, // 是否收取
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    /**
     * 切换菜单
     */
    handleMenuSelect(path) {
      this.$router.push(path)
    },
    /**
     * 菜单展开收起
     */
    handleToggleClick() {
      this.collapse = !this.collapse
    },
  },
}
</script>
<style lang="scss">
.lx-page-aside {
  width: 200px;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out;
  &.lx-page-aside--collapse {
    width: 65px;
  }
  .el-menu {
    border-right: none;
    .icon {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
  .menu-box {
    flex: 1;
    &:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .collapse-toggle {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
