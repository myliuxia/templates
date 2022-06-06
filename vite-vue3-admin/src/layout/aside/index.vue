<template>
  <div class="aside-menu">
    <div class="aside-logo">
      <span>Admin 模板</span>
    </div>
    <el-scrollbar height="100%">
      <el-menu class="menu-vertical" :collapse="isCollapse" @open="handleOpen" @close="handleClose" @select="handleMenuSelect">
        <sub-menu
          v-for="(item, index) in menuItems"
          :key="index"
          :index="index + ''"
          :menu="item"
        ></sub-menu>
      </el-menu>
    </el-scrollbar>
    <div class="aside-logo"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import SubMenu from './sub-menu.vue'
import { useRouter } from 'vue-router';
import {Menus} from '@/router/map'
const router = useRouter()

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleMenuSelect = (path: string) =>{
  console.log(path)
  if(path){
    router.push(path)
  }
}

let menuItems: any = ref(Menus)
onMounted(() => {
  // menuItems.value = getMenus()
})
</script>
<style lang="scss">
.aside-menu {
  width: 100%;
}

</style>