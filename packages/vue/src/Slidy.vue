<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { slidy } from '@slidy/core';
import type { VNode } from 'vue';

const $node = ref(null); // template ref

onMounted(() => {
    // console.log($node.value)
    const el = $node.value
    slidy(el, { index: 2 })
    // console.log(items)
});

function initLib({ el }: { el: VNode }) {
    // console.log(el)
    // slidy(el)
    //   el.innerText = 'Dynamic content';
}
function onMount(e: any) {
    // console.log(e)
    // console.log(items)
}
const items = defineProps(['items'])
// let items: never[] = []
console.log(items.items)


const vSlidy = {
    // called before bound element's attributes
    // or event listeners are applied
    created(el, binding, vnode, prevVnode) {
        // see below for details on arguments
        slidy(el, { index: 2 })
    },
    // called right before the element is inserted into the DOM.
    beforeMount(el) {
        // slidy(el, { index: 2 })
    },
    // called when the bound element's parent component
    // and all its children are mounted.
    mounted(el) {
        // slidy(el, { index: 2 })
    },
    // called before the parent component is updated
    beforeUpdate(el) {
        // slidy(el, { index: 2 })
    },
    // called after the parent component and
    // all of its children have updated
    updated(el) {
        // slidy(el, { index: 2 })
    },
    // called before the parent component is unmounted
    beforeUnmount() { },
    // called when the parent component is unmounted
    unmounted() { }
}

</script>

<template>
    <!-- <section ref="$node" @mount="onMount" @VnodeMounted="initLib"> -->
    <section v-slidy>
        <!-- <img v-for="(item, index) in items.item" src="{{item}}" /> -->
        <img width="640" height="400" src="https://source.unsplash.com/random/1280x800?jpg" />
        <img width="500" height="400" src="https://source.unsplash.com/random/1000x800?jpg" />
        <img width="400" height="400" src="https://source.unsplash.com/random/800x800?jpg" />
        <img width="400" height="500" src="https://source.unsplash.com/random/800x1000?jpg" />
        <img width="400" height="640" src="https://source.unsplash.com/random/800x1200?jpg" />
    </section>
</template>

<style>
section {
    display: flex;
    gap: 1rem;
}
</style>