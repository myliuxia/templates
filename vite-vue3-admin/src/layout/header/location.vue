<template>
  <div class="location-box">
    <el-icon :size="20" ><LocationFilled /></el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item > 一级菜单</el-breadcrumb-item>
      <el-breadcrumb-item > 二级菜单</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup> 
import { ArrowRight } from '@element-plus/icons-vue'
import { LocationFilled } from '@element-plus/icons-vue'

</script>
<style lang="scss">
.location-box{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;
}
</style>