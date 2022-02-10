<fieldset>
    <legend>
        <h1>Slidy {version.replace(/\.[^.]*$/, '')}<sup>svelteJS</sup></h1>
        <button on:click={() => (stend = !stend)} class:active={stend}>
            stend
        </button>
        <button on:click={() => (images = !images)} class:active={images}>
            images
        </button>
        <button on:click={switchTheme} class:active={dark}>dark</button>
        <p>
            index: [<b>{index}</b>], position: <b>{Math.trunc(position)}</b>px
        </p>
    </legend>
</fieldset>

<main>
    {#await loadPhotos(limit, page)}
        loading...
    {:then slides}
        <Slidy
            bind:index
            bind:position
            {slides}
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

<nav id="dots">
    {#each { length: slides.length } as dot, i}
        <button on:click={() => (index = i)} class:active={i === index}>
            {i}
        </button>&nbsp;
    {/each}
</nav>

<nav>
    <button on:click={() => index--} disabled={!loop && !index}>←</button>
    <button
        on:click={() => index++}
        disabled={!loop && index === slides.length - 1}>→</button
    >
    <button on:click={shuffle}><i class="icon icon-refresh" /></button>
    <button on:click={() => (vertical = !vertical)} class:active={vertical}
        >axisY</button
    >
    <button on:click={() => (clamp = !clamp)} class:active={clamp}>clamp</button
    >
    <button on:click={() => (snap = !snap)} class:active={snap}>snap</button>
    <button on:click={() => (loop = !loop)} class:active={loop}>loop</button>
</nav>

<form>
    <fieldset>
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
    import { getPhotos, randInt } from './scripts/api';
    import { name, version } from '../../package.json';
    import Slidy from '../../src/Slidy.svelte';

    import type { Slide } from './types';
</script>

<script lang="ts">
    let slides: Slide[] = [];
    let position = 0;
    let page = randInt(0, 90);
    let limit = 5;
    let index = 0;
    let vertical = false;
    let clamp = true;
    let align: 'start' | 'middle' | 'end' = 'middle';
    let duration = 375;
    let stend = false;
    let gravity = 1.2;
    let width = 'auto';
    let snap = true;
    let images = true;
    let loop = false;
    let gap = 15;

    $: width = !images ? '50%' : 'auto';
    $: dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    $: if (globalThis.window) {
        document.documentElement.setAttribute('scheme', dark ? 'dark' : 'light');
    }

    const loadPhotos = async (limit: number, page: number) => await getPhotos({ limit, page });
    const switchTheme = () => dark = !dark;
    const shuffle = () => (page = randInt(0, 90));
</script>

<style>
    main {
        --slidy-height: 450px;
        --slidy-dot-color: red;
    }

    #dots {
        display: flex;
        overflow-x: scroll;
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

    .icon::after,
    .icon::before {
        content: '';
        display: block;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .icon-refresh::after {
        border: 0.2em solid currentColor;
        border-top-color: currentcolor;
        border-left-color: currentcolor;
        border-left-color: transparent;
        border-top-color: transparent;
        height: 0;
        left: 80%;
        top: -0.25em;
        width: 0;
    }

    .icon-refresh::before {
        border: 0.12rem solid currentColor;
        border-right-color: currentcolor;
        border-radius: 50%;
        border-right-color: transparent;
        height: 0.75em;
        width: 0.75em;
    }

    .icon {
        box-sizing: border-box;
        display: inline-block;
        font-size: inherit;
        font-style: normal;
        height: auto;
        position: relative;
        text-indent: -9999px;
        vertical-align: super;
        width: 1em;
    }
</style>
