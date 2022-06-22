<template>
  <el-tabs
    v-model="current"
    type="card"
    class="el-tabs-card"
    @tab-change="handleChange"
    @tab-remove="handleRemove"
  >
    <el-tab-pane
      v-for="item of historyPages"
      :key="item.path"
      :closable="item.name !== 'home' && historyPages.length !== 1"
      :name="item.path"
    >
      <template #label>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref, computed, watch  } from 'vue'
import { usePageStore } from '@/store/page'
import { useRouter } from 'vue-router'
const router = useRouter()
const pageStore = usePageStore()
let current = ref('')
current.value = pageStore.currentPath

let historyPages = computed(() => pageStore.historyPages)
let currentPath = computed(() => pageStore.currentPath)
watch(currentPath,(newVal)=>{
  current.value = newVal || ''
})
const handleChange = (path: any) => {
  router.push({ path: path })
}
const handleRemove = (path: any) => {
  pageStore.closePage(path as string)
}
</script>