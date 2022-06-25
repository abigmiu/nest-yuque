<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
const router = useRouter()

import $fetch from '../api/http'
import Quill from 'quill'
import 'quill/dist/quill.core.css'

const message = useMessage()

const quillInstance = ref<null | Quill>(null)
const loading = ref(false)
const submitData = async () => {
    if (!title.value) {
        return message.error('未填写标题')
    }
    const html = quillInstance.value!.root.innerHTML
    if (html.length < 20) {
        return message.error('你再写一点内容吧')
    }
    try {
        loading.value = true
        await $fetch.post('/doc', {
            title: title.value,
            content: html,
        })
        message.success('发布成功')
        router.replace({
            name: 'List',
        })
    } finally {
        loading.value = false
    }
}

const initEditor = () => {
    const quill = new Quill('#editor', {
        placeholder: '输入内容',
        formats: [],
        modules: {
            toolbar: [],
        },
    })
    quillInstance.value = quill
}
onMounted(() => {
    initEditor()
})

const title = ref('')
</script>

<template>
    <div class="doc-wrapper p-2">
        <n-input
            type="text"
            v-model:value="title"
            placeholder="输入标题"
            class="mb-5"
            :maxlength="20"
        ></n-input>
        <div id="editor"></div>
        <div class="fixed rounded-full bottom-10 left-10" draggable="true">
            <n-button type="primary" :loading="loading" @click="submitData">
                发布
            </n-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#editor {
    background-color: #fff;
    min-height: 100vh;
}
</style>
