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

let menuItems: any = ref([])
// 获得菜单
function getMenus(): Array<Object> {
  return [
    { title: '菜单一', children: [{ title: '菜单一（01）',path:'/demo/demo1' }, { title: '菜单一（02）',path:'/demo/demo2' }] },
    { title: '菜单二', children: [{ title: '菜单二（01）' }, { title: '菜单二（02）' }] },
    {
      title: '菜单三',
      children: [
        { title: '菜单三（01）' },
        { title: '菜单三（02）' },
        { title: '菜单三（04）' },
        { title: '菜单三（05）' },
        { title: '菜单三（06）' },
        { title: '菜单三（07）' },
        { title: '菜单三（08）' },
        { title: '菜单三（09）' },
        { title: '菜单三（10）' },
        { title: '菜单三（11）' },
        { title: '菜单三（12）' },
        { title: '菜单三（13）' },
        { title: '菜单三（14）' },
        { title: '菜单三（15）' },
        { title: '菜单三（16）' },
        { title: '菜单三（17）' },
        { title: '菜单三（18）' },
        { title: '菜单三（19）' }
      ]
    },
    { title: '菜单四' }
  ]
}
onMounted(() => {
  menuItems.value = getMenus()
})
</script>
<style lang="scss">
.aside-menu {
  width: 100%;
}

</style>