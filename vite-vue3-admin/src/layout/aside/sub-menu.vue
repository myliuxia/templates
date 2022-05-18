<template>
  <el-sub-menu v-if="props.menu.children && props.menu.children.length > 0" :index="index">
    <sub-menu v-for="item in props.menu.children" :key="item.title" :index="index+item.item" :menu="item" />
  </el-sub-menu>
  <el-menu-item v-else>{{ props.menu.title }}</el-menu-item>
</template>
<script lang="ts" setup>
const props = defineProps({
  menu: {
    type: Object,
    default: () => {}
  },
  index:{
    type: [ String],
    default: ''
  }
})
</script>