<template>
  <div>
    <el-tabs type="card" class="el-tabs-card" :value="current" @contextmenu.native="handleContextmenu" @tab-click="handleClick" @edit="handleEdit">
      <el-tab-pane :key="item.name" v-for="item of tabs" :closable="item.name !== 'home' && tabs.length !== 1" :name="item.name">
        <template slot="label">
          <span>{{ item.meta.title }}</span>
          <span @click="handleRefreshClick" v-show="current === item.name" class="el-icon-refresh __el_tab_refresh"></span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <d2-contextmenu :visible.sync="contextmenuFlag" :x="contentmenuX" :y="contentmenuY" :menulist="contextmenuList" @rowClick="handleContextMenuClick">
    </d2-contextmenu>
  </div>
</template>
<script>
import D2Contextmenu from '@/layout/components/contextmenu/index.vue'
export default {
  name: 'tabs',
  components: { D2Contextmenu },
  data() {
    return {
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuList: [
        { value: 'refresh', title: '刷新页面', icon: 'refresh' },
        { value: 'closeLeft', title: '关闭左侧', icon: 'd-arrow-left' },
        {
          value: 'closeRight',
          title: '关闭右侧',
          icon: 'd-arrow-right',
        },
        { value: 'closeOther', title: '关闭其它', icon: 'close' },
      ],
      tagName: '',
    }
  },
  computed: {
    tabs() {
      return this.$store.state.lxAdmin.page.pool
    },
    current() {
      return this.$store.state.lxAdmin.page.current
    },
  },
  methods: {
    handleClick(tab) {
      if (this.current === tab.name) {
        return
      }
      // 首页
      if (tab.name === 'home') {
        this.$router.push('/')
        return
      }
      const page = this.tabs.find(p => p.name === tab.name)
      if (page) {
        this.$store.dispatch('lxAdmin/page/setCurrentName', page.name)
        this.$router.push(page)
      }
    },
    handleEdit(tagName, action) {
      switch (action) {
        case 'remove':
          this.$store.dispatch('lxAdmin/page/close', { tagName, vm: this })
          break
        default:
          break
      }
    },

    handleContextmenu(event) {
      let target = event.target
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) {
        flag = true
      } else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tagName = target.getAttribute('aria-controls').slice(5)
        this.contextmenuFlag = true
      }
    },
    handleContextMenuClick(val) {
      this.handlePageCommandChooseed(val, this.current)
    },
    handleRefreshClick() {
      this.handlePageCommandChooseed('refresh', this.current)
    },

    handlePageCommandChooseed(command, tagName, routerView) {
      switch (command) {
        case 'refresh':
          this.$store.dispatch('lxAdmin/page/refresh', { tagName, vm: this, rv: routerView })
          break
        case 'closeLeft':
          this.$store.dispatch('lxAdmin/page/closeLeft', { tagName, vm: this })
          break
        case 'closeRight':
          this.$store.dispatch('lxAdmin/page/closeRight', {
            tagName,
            vm: this,
          })
          break
        case 'closeOther':
          this.$store.dispatch('lxAdmin/page/closeOther', {
            tagName,
            vm: this,
          })
          break
        case 'closeAll':
          this.$store.dispatch('lxAdmin/page/closeAll', { tagName, vm: this })
          break
        default:
          break
      }
    },
  },
}
</script>
