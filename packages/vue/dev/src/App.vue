<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Slidy } from '../../src';
import { getImgs } from './api'

let items = []
onMounted(async () => {
    items = await getImgs()
    console.log(items)
})
</script>

<script lang="ts">
// let items = []
// onMounted(async () => {
//     items = await getImgs()
//     console.log(items)
// })
</script>

<template>
    <header>
        <img id="slidy-logo" alt="Slidy" width="50" height="50" src="favicon.png" />
        <h3>
            Slidy
            <span>3.1.0</span>
            <sub>vueJS</sub>
            <sub id="stats" />
        </h3>
        <button id="dark" @click="activate(this, dark)">dark</button>
    </header>

    <main>
        <Slidy items="items" />
    </main>
</template>

<style>
@import "./assets/dev.css";
</style>
