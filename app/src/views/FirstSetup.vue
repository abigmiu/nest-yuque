<script setup lang="ts">
import { ref } from 'vue'
import $fetch from '../api/http'
const inputToken = ref('')
const loading = ref(false)

const onBind = async () => {
    try {
        loading.value = true
        await $fetch.post(`/user/${inputToken.value}`)
        localStorage.setItem('token', 'true')
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="first-setup-wrapper flex justify-center items-center flex-col">
        <n-input v-model:value="inputToken"></n-input>
        <n-button
            :loading="loading"
            @click="onBind"
            class="mt-10 w-full"
            type="primary"
        >
            绑定
        </n-button>
    </div>
</template>
<style lang="scss" scoped>
.first-setup-wrapper {
    height: 100vh;
}
</style>
