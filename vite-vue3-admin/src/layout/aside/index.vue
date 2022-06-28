<template>
  <div class="aside-menu">
    <div class="aside-logo">
      <span>Admin 模板</span>
    </div>
    <el-scrollbar height="100%">
      <el-menu ref="refMenu" class="menu-vertical" :default-active="currentPath" :collapse="isCollapse"  @select="handleMenuSelect">
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
import { ref, onMounted, computed } from 'vue'
import SubMenu from './sub-menu.vue'
import { useRouter } from 'vue-router'
import {Menus} from '@/router/map'
import { usePageStore } from '@/store/page'
const router = useRouter()
const isCollapse = ref(false)
const pageStore = usePageStore()
let currentPath = computed(() => pageStore.currentPath)
// 菜单激活回调
const handleMenuSelect = (path: string) =>{
  if(path){
    router.push(path)
  }
}
let menuItems: any = ref(Menus)
onMounted(() => {
})
</script>

<style lang="scss">
.aside-menu {
  width: 100%;
}
</style>