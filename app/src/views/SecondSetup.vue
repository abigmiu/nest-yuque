<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDialog, useMessage } from 'naive-ui'
import $fetch from '../api/http'

const router = useRouter()
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
        maskClosable: false,
        closable: false,
        onPositiveClick: async () => {
            d.loading = true
            try {
                await $fetch.post(`/repo/${bookId}`)
                localStorage.setItem('isBindRepo', JSON.stringify(true))
                message.success('绑定成功')
                router.replace({
                    name: 'List',
                })
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
        <n-alert title="选择知识库" type="info" class="mb-10"></n-alert>
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
