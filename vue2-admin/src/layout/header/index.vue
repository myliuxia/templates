<template>
  <div>
    <div flex="cross:center" class="padding-20 pd-l-10">
      <i class="iconfont icon-dingwei text-primary mg-r-5"></i>
      <span class="mg-r-5 fs-12">当前位置：</span>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="item.path">{{ item.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
import { PATH_NAMES } from '@/router/map'
export default {
  computed: {
    breadList() {
      if (this.$route.path == '/home/index') {
        return []
      }
      const arr = this.$route.path.split('/')
      arr.shift()
      const list = []
      const basePath = arr.shift()
      list.push({ title: PATH_NAMES[basePath] })
      let path = '/' + basePath
      arr.forEach((item, index) => {
        if (index < arr.length - 1) {
          path += '/' + item
          list.push({
            path: this.$router.resolve(path).route.path,
            title: this.$router.resolve(path).route.meta.title,
          })
        } else {
          list.push({
            path: this.$route.path,
            title: this.$route.meta.title,
          })
        }
      })
      return list
    },
  },
}
</script>
