<template>
  <div class="d2-contextmenu" v-show="flag" :style="style">
    <div v-for="item in menulist" :key="item.value" class="d2-contentmenu-item" flex="cross:center main:center" @click="rowClick(item.value)">
      <i :class="`el-icon-${item.icon}`"></i>
      <div class="d2-contentmenu-item-title" flex-box="1">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contextmenu',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    menulist: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    flag: {
      get() {
        if (this.visible) {
          // 注册全局监听事件 [ 目前只考虑鼠标解除触发 ]
          window.addEventListener('mousedown', this.watchContextmenu)
        }
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
    style() {
      return {
        left: this.x + 'px',
        top: this.y + 'px',
        display: this.visible ? 'block' : 'none',
      }
    },
  },
  mounted() {
    // 将菜单放置到body下
    const body = document.querySelector('body')
    if (body) {
      body.appendChild(this.$el)
    }
  },
  methods: {
    watchContextmenu(event) {
      if (!this.$el.contains(event.target) || event.button !== 0) {
        this.flag = false
      }
      window.removeEventListener('mousedown', this.watchContextmenu)
    },
    rowClick(value) {
      this.$emit('rowClick', value)
    },
  },
}
</script>
<style lang="scss">
.d2-contextmenu {
  position: absolute;
  padding: 5px 0;
  z-index: 2018;
  background: #fff;
  border: 1px solid #cfd7e5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .d2-contentmenu-item {
    padding: 8px 20px 8px 15px;
    margin: 0;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    &:hover {
      background: #ecf5ff;
      color: #66b1ff;
    }
    .d2-contentmenu-item-title {
      margin-left: 10px;
    }
  }
}
</style>
