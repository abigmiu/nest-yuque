<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const token = localStorage.getItem('token')
const isBindRepo = localStorage.getItem('isBindRepo')

if (!token || token !== 'true') {
    router.replace({
        name: 'FirstSetup',
    })
} else if (!isBindRepo || token !== 'true') {
    router.replace({
        name: 'SecondSetup',
    })
} else {
    router.replace({
        name: 'List',
    })
}
</script>

<template>
    <n-message-provider>
        <n-dialog-provider>
            <RouterView />
        </n-dialog-provider>
    </n-message-provider>
</template>
