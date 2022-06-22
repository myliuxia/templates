<template>
  <!-- 容器 -->
  <div class="layout_container">
    <!-- 左侧 -->
    <div class="layout_menu">
      <aside-menu></aside-menu>
    </div>
    <!-- 右侧 -->
    <div class="layout_content">
      <!-- 头部  -->
      <div class="layout_content_head">
        <header-content></header-content>
      </div>
      <!-- body -->
      <div class="layout_content_body">
        <!-- tabs -->
        <div class="tabs_wrapper">
          <krTabs></krTabs>
        </div>
        <!-- 路由 -->
        <div flex-box="1" class="router_view">
          <div class="router_view_body">
          <keep-alive>
            <router-view ></router-view>
          </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import AsideMenu from './aside/index.vue'
import HeaderContent from './header/index.vue'
import krTabs from './tabs/index.vue'

export default defineComponent({
  name: 'LayoutPage',
  components: { AsideMenu, HeaderContent, krTabs },
  setup() {
    const router = useRouter()
    const userMenuShow = ref<boolean>(false)

    const methods = {
      logout() {
        router.push({
          path: '/login'
        })
      }
    }

    return {
      userMenuShow,
      ...methods
    }
  }
})
</script>
