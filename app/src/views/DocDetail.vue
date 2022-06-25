<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import $fetch from '../api/http'

const route = useRoute()

const detailHtml = ref('')
const fetchData = async () => {
    const { slug } = route.params
    detailHtml.value = await $fetch.get(`/doc/detail/${slug}`)
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="bg-white p-2" v-html="detailHtml.body_html"></div>
</template>
