<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Edit } from '@icon-park/vue-next'
import $fetch from '../api/http'
interface IData {
    id: number
}

const listData = ref<Array<IData>>([])

const fetchData = async () => {
    const res = await $fetch.get<Array<IData>>('/doc/list')
    listData.value = res
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div>
        <n-space vertical>
            <n-card v-for="item in listData" :key="item.id" :title="item.title">
                {{ item.description || '暂无描述' }}
            </n-card>
        </n-space>
        <div class="fixed bottom-10 right-10 p-2 rounded-full bg-white">
            <edit theme="outline" size="24" fill="#333" />
        </div>
    </div>
</template>
