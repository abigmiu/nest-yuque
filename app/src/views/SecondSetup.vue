<script setup lang="ts">
import { onMounted, ref } from 'vue'
import $fetch from '../api/http'

const listData = ref([])

const fetchData = async () => {
    const res = await $fetch.get('/repo/list')
    listData.value = res;
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="second-setup-wrapper">
        <ul class="list">
            <li></li>
        </ul>
    </div>
</template>
