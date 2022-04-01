<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { slidy } from '@slidy/core';

const $node = ref(null); // template ref

onMounted(() => {
    console.log($node.value)
    const el = $node.value
    // slidy(el)
});

function initLib({ el }) {
    console.log(el)
    slidy(el)
    //   el.innerText = 'Dynamic content';
}
function onMount(e: any) {
    console.log(e)
}
defineProps<{
    items: any[]
}>()
// export let items = []
// console.log(items)
</script>

<script lang="ts">
// export let items = []
// console.log(items)
</script>

<template>
    <section ref="$node" @mount="onMount" @VnodeMounted="initLib">
        <img src="https://picsum.photos/id/10/1280/800.jpg" alt="10" />
        <img src="https://picsum.photos/id/11/1280/800.jpg" alt="11" />
        <img src="https://picsum.photos/id/12/1280/800.jpg" alt="12" />
        <img src="https://picsum.photos/id/13/1280/800.jpg" alt="13" />
        <img src="https://picsum.photos/id/14/1280/800.jpg" alt="14" />
    </section>
</template>

<style>
section {
    display: flex;
}
</style>