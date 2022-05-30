<template>
  <el-tabs
    type="card"
    class="el-tabs-card"
    :value="current"
    @tab-click="handleClick"
    @edit="handleEdit"
  >
    <el-tab-pane
      v-for="item of tabs"
      :key="item.name"
      :closable="item.name !== 'home' && tabs.length !== 1"
      :name="item.name"
    >
      <template #label>
        <span>{{ item.meta.title }}</span>
        <span
          v-show="current === item.name"
          class="el-icon-refresh __el_tab_refresh"
          @click="handleRefreshClick"
        ></span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
let current = ref('home')
let tabs = ref([{ name: 'home', meta: { title: '首页' } },{ name: 'router1', meta: { title: '菜单1' } },{ name: 'menu1', meta: { title: '菜单2' } },])
const handleClick = () => {}
const handleEdit = () => {}
const handleRefreshClick = () => {}
</script>