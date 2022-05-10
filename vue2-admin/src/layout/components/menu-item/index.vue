<template>
  <el-menu-item :index="menu.path || getUniqueId">
    <template slot="title">
      <i v-if="menu.icon" :class="[menu.icon]" class="icon"></i>
      <span>{{ menu.title }}</span>
    </template>
  </el-menu-item>
</template>

<script>
import uniqueId from 'lodash/uniqueId'

export default {
  name: 'menu-item',
  data() {
    return {}
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
