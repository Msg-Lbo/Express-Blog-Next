<template>
  <n-card>
    <n-data-table remote :columns="columns" :data="data" :pagination="pagination" :loading="loading" />
  </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NDataTable, NCard } from 'naive-ui'
import { getLogListApi } from '@/apis/log'

interface LogItem {
  id: number
  ip: string
  url: string
  params: string
  result: string
  create_time: string
  use_time: number
  status: number
  access_time: string
}

const loading = ref(false)
const data = ref<LogItem[]>([])
const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 40, 50],
  onChange: (page: number) => {
    pagination.value.page = page
    fetchData()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.value.pageSize = pageSize
    pagination.value.page = 1
    fetchData()
  }
})

const columns = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: 'IP',
    key: 'ip'
  },
  {
    title: 'URL',
    key: 'url'
  },
  {
    title: '参数',
    key: 'params'
  },
  {
    title: '状态码',
    key: 'status'
  },
  {
    title: '耗时(ms)',
    key: 'use_time'
  },
  {
    title: '访问时间',
    key: 'access_time'
  }
]

async function fetchData() {
  try {
    loading.value = true
    const res = await getLogListApi({
      page: pagination.value.page,
      pageSize: pagination.value.pageSize
    })
    if (res.code === 200) {
      console.log('API response:', res)
      data.value = res.data.list[0]
      
      pagination.value.page = res.data.pagination.page
      pagination.value.pageSize = res.data.pagination.pageSize
      pagination.value.itemCount = res.data.pagination.itemCount
      console.log('pagination:', pagination.value);
      
    }
  } catch (error) {
    console.error('获取日志失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.n-card {
  margin: 20px;
}
</style>
