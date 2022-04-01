<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Header, Main, Footer } from './components'
import { Slidy } from '../../src';
import { getImgs } from './api'

// defineProps<{
//     items: any[]
// }>()

// const items = await getImgs()
onMounted(async () => {
    items = await getImgs()
    console.log(items)
})
</script>

<script lang="ts">
let items = ref([])
getImgs().then(data => items.value = data)
// onMounted(async () => {
//     items = await getImgs()
console.log(items.value)
// })
</script>

<template>
    <Header />
    <Main>
        <Slidy />
    </Main>
    <Footer />
</template>

<style>
@import "./assets/dev.css";
</style>
