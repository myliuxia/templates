<template>
  <!-- 容器 -->
  <div class="layout_container">
    <!-- 左侧 -->
    <div class="layout_left">
      <lx-aside></lx-aside>
    </div>
    <!-- 右侧 -->
    <div class="layout_content">
      <!-- 头部  -->
      <lx-header class="layout_content_head"></lx-header>
      <!-- body -->
      <div class="layout_content_body">
        <lx-tabs></lx-tabs>
        <!-- 路由 -->
        <keep-alive :include="keepAlive">
          <router-view ref="routerView" :key="$route.fullPath" class="router_view"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import LxAside from './aside/index.vue'
import LxHeader from './header/index.vue'
import LxTabs from './tabs/index.vue'
import { mapState } from 'vuex'
export default {
  name: 'layout',
  components: { LxAside, LxHeader, LxTabs },
  computed: {
    ...mapState({
      keepAlive: state => state.lxAdmin.page.keepAlive,
    }),
  },
  methods: {},
  mounted() {},
}
</script>
<style lang="scss" scoped>
.layout_container {
  height: 100%;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  background-color: #efefef;
  .layout_left {
    height: 100%;
    background-color: #ffffff;
  }
  .layout_content {
    display: flex;
    flex: 1;
    flex-direction: column;
    .layout_content_head {
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;
      height: 50px;
      background-color: #ffffff;
    }
    .layout_content_body {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 10px;
    }
    .router_view {
      flex: 1;
      background-color: #ffffff;
    }
  }
}
</style>
