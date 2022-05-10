<template>
  <el-submenu :index="menu.path || getUniqueId" v-if="!menu.isHide">
    <template slot="title">
      <i v-if="menu.icon" class="icon" :class="menu.icon"></i>
      <span>{{ this.menu.title }}</span>
    </template>
    <template v-for="child in menu.children ? menu.children : []">
      <menu-sub v-if="child.children" :menu="child" :key="child.title"></menu-sub>
      <template v-else>
        <menu-item :menu="child" :key="child.title"></menu-item>
      </template>
    </template>
  </el-submenu>
</template>

<script>
import MenuItem from '../menu-item/index.vue'
import uniqueId from 'lodash/uniqueId'
export default {
  name: 'menu-sub',
  components: {
    MenuItem,
  },
  props: {
    menu: {
      type: Object,
    },
  },
  computed: {
    getUniqueId() {
      return uniqueId()
    },
  },
}
</script>
