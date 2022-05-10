<template>
  <div flex="dir:top cross:center">
    <img :src="img" />
    <span class="text-font-primary fs-18 fw-b mg-b-10">系统加载失败</span>
    <span class="text-font-secondary fs-14 mg-b-20">你所查找的页面出现异常，请刷新重试</span>
    <el-button size="medium" type="primary" round @click="reload">重新加载</el-button>
  </div>
</template>
<script>
import { db } from '@/libs/util'
export default {
  data() {
    return {
      img: require('@/assets/image/500.png'),
    }
  },
  methods: {
    async reload() {
      await db.removeItem('token')
      window.location.reload()
    },
  },
}
</script>
