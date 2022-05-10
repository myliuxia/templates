<template>
  <div flex="dir:top cross:center">
    <img :src="img" />
    <span class="text-font-primary fs-18 fw-b mg-b-10">该页无法显示</span>
    <span class="text-font-secondary fs-14 mg-b-20">你所查找的页面不存在，请去别处看看</span>
    <el-button size="medium" type="primary" round @click="$router.replace('/')">返回首页</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: require('@/assets/image/404.png'),
    }
  },
}
</script>
