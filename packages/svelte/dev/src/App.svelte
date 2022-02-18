<fieldset>
    <legend>
        <img alt="Slidy" width="50" height="50" src="favicon.png" />
        <h1>Slidy {version.replace(/\.[^.]*$/, '')}<sup>svelteJS</sup></h1>
        <button on:click={() => (images = !images)} class:active={images}>
            images
        </button>
        <button on:click={() => darkTheme.switch()} class:active={$darkTheme}
            >dark</button
        >
        <p>
            index: [<b>{index}</b>], position: <b>{Math.trunc(position)}</b>px
        </p>
    </legend>
</fieldset>

<main>
    {#await slidesPromise}
        loading...
    {:then}
        <Slidy
            bind:index
            bind:position
            slides={$slides}
            {clamp}
            {align}
            {duration}
            {gravity}
            {snap}
            {loop}
            {vertical}
        />
    {/await}
</main>

<fieldset class="controls-slide">
    {#each $slides as _, i}
        <button on:click={() => (index = i)} class:active={i === index}>
            {i}
        </button>
    {/each}
</fieldset>

<fieldset class="controls-slides">
    <legend>Slides</legend>
    <button on:click={() => slides.remove()}>-</button>
    <input type="number" bind:value={limit} min={1} max={15} />
    <button on:click={() => slides.add()}>+</button>
    <button on:click={() => (slidesPromise = slides.init(limit))}>reset</button>
</fieldset>

<fieldset class="controls-modes">
    <button on:click={() => index--} disabled={!loop && !index}>←</button>
    <button
        on:click={() => index++}
        disabled={!loop && index === $slides.length - 1}>→</button
    >
    <!-- <button on:click={shuffle}><i class="icon icon-refresh" /></button> -->
    <button on:click={() => (vertical = !vertical)} class:active={vertical}
        >axisY</button
    >
    <button on:click={() => (clamp = !clamp)} class:active={clamp}>clamp</button
    >
    <button on:click={() => (snap = !snap)} class:active={snap}>snap</button>
    <button on:click={() => (loop = !loop)} class:active={loop}>loop</button>
</fieldset>

<form>
    <fieldset class="controls-params">
        <label>
            width
            <input bind:value={width} size="5" width="auto" />
        </label>
        <label>
            limit
            <input
                type="number"
                bind:value={limit}
                size="5"
                step="1"
                min="1"
                max="100"
            />
        </label>
        <label>
            gap
            <input
                type="number"
                bind:value={gap}
                size="5"
                step="1"
                min="0"
                max="100"
            />
        </label>
    </fieldset>
    <fieldset>
        <label>
            duration
            <input
                type="number"
                bind:value={duration}
                size="5"
                step="1"
                min="100"
                max="1000"
            />
        </label>
        <label>
            gravity
            <input
                type="number"
                bind:value={gravity}
                size="5"
                step="0.1"
                min="0.1"
                max="2"
                width="auto"
            />
        </label>
        <label>
            align
            <select bind:value={align}>
                <option value="start">← start</option>
                <option value="middle">middle</option>
                <option value="end">end →</option>
            </select>
        </label>
    </fieldset>
</form>

<script lang="ts" context="module">
    import { name, version } from '../../package.json';
    import Slidy from '../../src/Slidy.svelte';
    import { createSlidesStore } from './scripts/slide-store';
</script>

<script lang="ts">
    import { darkTheme } from './scripts/theme-store';

    let position = 0;
    let limit = 9;
    let index = 4;
    let vertical = false;
    let clamp = true;
    let align: 'start' | 'middle' | 'end' = 'middle';
    let duration = 450;
    let gravity = 1.45;
    let width = 'auto';
    let snap = true;
    let images = true;
    let loop = false;
    let gap = 15;

    const slides = createSlidesStore();
    let slidesPromise = slides.init(limit);

    $: width = !images ? '50%' : 'auto';
</script>

<style>
    main {
        --slidy-height: 450px;
        --slidy-nav-item-color: red;
        height: var(--slidy-height);
    }

    select {
        -webkit-appearance: none;
    }

    label {
        display: flex;
        flex-flow: column;
    }

    form {
        display: flex;
        flex-wrap: wrap;
    }

    form > * {
        flex: 0 auto;
        gap: 1rem;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
</style>
