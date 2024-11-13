<script setup lang="ts">
import { slidy } from '@slidy/core';
import type { Options } from '@slidy/core';
import type { Slide } from 'assets/types';

const { items = [], options = { index: 2, snap: 'center' } } = defineProps<{
    items: Slide[];
    options: Options;
}>();

const vSlidy = {
    mounted(el: HTMLElement) {
        console.log(el, items, options);
        slidy(el, options);
    },
};
</script>

<template>
    <section v-slidy>
        <img v-for="{ src, alt, width, height } in items" :src :alt :width :height />
    </section>
</template>

<style>
section {
    display: flex;
    gap: 1rem;
}

section img {
    flex: auto;
    object-fit: cover;
}
</style>
