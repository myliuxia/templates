<template>
  <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path || index" >
    <template #title>{{props.menu.title}}</template>
    <sub-menu v-for="item in menu.children" :key="item.title" :index="index+item.title" :menu="item" />
  </el-sub-menu>
  <el-menu-item v-else :index="menu.path">{{ menu.title }}</el-menu-item>
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