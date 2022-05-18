<template>
  <div>
    <div class="logo"></div>
    <el-menu :collapse="isCollapse" @open="handleOpen" @close="handleClose">
      <sub-menu v-for="(item, index) in menuItems" :key="index" :index="index+''" :menu="item"></sub-menu>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import SubMenu from './sub-menu.vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

let menuItems: any = ref([])
// 获得菜单
function getMenus(): Array<Object> {
  return [
    { title: '菜单一', children: [{ title: '菜单一（01）' }, { title: '菜单一（02）' }] },
    { title: '菜单二', children: [{ title: '菜单二（01）' }, { title: '菜单二（02）' }] },
    { title: '菜单三', children: [{ title: '菜单三（01）' }, { title: '菜单三（02）' }] },
    { title: '菜单四' }
  ]
}
onMounted(() => {
  menuItems = getMenus()
})
</script>


