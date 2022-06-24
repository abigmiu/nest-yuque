<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDialog, useMessage } from 'naive-ui'
import $fetch from '../api/http'

interface IData {
    name: string
}

const listData = ref<Array<IData>>([])
const dialog = useDialog()
const message = useMessage()

const fetchData = async () => {
    const res = await $fetch.get<Array<IData>>('/repo/list')
    listData.value = res
}
const onSelected = async (bookName: string, bookId: number) => {
    const d = dialog.info({
        title: '提示',
        content: `确定选择 ${bookName} 吗？确定后不可更改`,
        positiveText: '确定',
        negativeText: '放弃',
        onPositiveClick: async () => {
            d.loading = true
            try {
                await $fetch.post(`/repo/${bookId}`)
                message.success('绑定成功')
            } catch {
                d.loading = false
            }
        },
    })
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="second-setup-wrapper">
        <n-space vertical>
            <n-card
                v-for="item in listData"
                :key="item.bookId"
                :title="item.name"
                @click="onSelected(item.name, item.bookId)"
            >
                {{ item.description || '暂无描述' }}
            </n-card>
        </n-space>
    </div>
</template>

<style lang="scss" scoped>
.second-setup-wrapper {
    padding: 10px 20px;
}
</style>
