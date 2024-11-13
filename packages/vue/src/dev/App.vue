<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import { Header, Main, Footer } from './components';
import { Slidy } from '../Slidy';
import { getRandomSlides } from '@slidy/assets/scripts';
import type { Slide } from 'assets/types';
import { Options } from '@slidy/core';

const options: Ref<Options> = ref({
    axis: 'y',
});

let items = ref<Slide[] | undefined>([]);

onMounted(async () => {
    items.value = await getRandomSlides();
    console.log(items.value);
});
</script>

<template>
    <Header />
    <Main>
        <Slidy :items :options />
    </Main>
    <Footer />
</template>

<style>
@import './assets/dev.css';
</style>
