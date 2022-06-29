<template>
  <div class="location-box">
    <el-icon :size="20" ><LocationFilled /></el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in locationArr" :key="item">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup> 
import { computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { LocationFilled } from '@element-plus/icons-vue'
import { useMenuStore } from '@/store/menu';
import { usePageStore } from '@/store/page';
import { RouterMap } from '@/router/map';
// store存储的页面和菜单信息
const menuStore = useMenuStore()
const pageStore = usePageStore()
let visibleMenu = computed(() => menuStore.visibleMenu )
let currentPath = computed(() => pageStore.currentPath )
const findPath = (arr:Array<RouterMap>, path:string): Array<string> => {
  let location:Array<string> = []
  for(let i= 0;i<arr.length;i++){
    if(arr[i].children){
      let locat = findPath(arr[i].children as Array<RouterMap>, path)
      if(locat.length > 0){
        location.push(arr[i].title)
        location.push(...locat)
      }
    }else if(arr[i].path === path){
      location.push(arr[i].title)
    }
  }
  return location
}
let locationArr = computed(()=>{
  let arr = findPath(visibleMenu.value,currentPath.value)
  return arr
})


</script>
<style lang="scss">
.location-box{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;
}
</style>