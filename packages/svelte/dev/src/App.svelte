<svelte:options immutable={true} />

<fieldset>
    <legend>
        <h1>Slidy {version.replace(/\.[^.]*$/, '')}<sup>svelteJS</sup></h1>
        <button on:click={() => (stend = !stend)} class:active={stend}
            >stend</button
        >
        <button on:click={() => (images = !images)} class:active={images}
            >images</button
        >
        <button on:click={changeScheme} class:active={dark}>dark</button>
        <p>
            index: [<b>{index}</b>], position: <b>{Math.trunc(position)}</b>px
        </p>
    </legend>
    <!-- {#if items.length}
        <label>
            <input
                type="range"
                min="0"
                max={items.length - 1}
                step="1"
                bind:value={index}
            />
        </label>
    {/if} -->
</fieldset>

<main>
    {#await loadPhotos(limit, page)}
        loading...
    {:then items}
        <Slidy
            slides={items}
            bind:index
            wrap={{
                id: null,
                width: '100%',
                height: '100%',
                padding: '0',
                align,
                alignmargin: 0,
            }}
            slide={{
                gap,
                class: '',
                width,
                height: '100%',
                backimg: false,
                imgsrckey: 'src',
                objectfit: 'cover',
                overflow: 'hidden',
            }}
            controls={{
                dots: true,
                dotsnum: true,
                dotsarrow: true,
                dotspure: true,
                arrows: true,
                keys: true,
                drag: true,
                wheel: true,
            }}
            options={{
                vertical,
                loop,
                duration,
                clamp,
                snap,
                gravity,
            }}
            bind:position
            let:item
        >
            {#if images}
                <img
                    src={item.src}
                    alt={item.ix}
                    width={item.width}
                    height={item.height}
                />
            {/if}
        </Slidy>
    {/await}
</main>

<nav id="dots">
    {#each { length: items.length } as dot, i}
        <button on:click={() => (index = i)} class:active={i === index}
            >{i}</button
        >&nbsp;
    {/each}
</nav>

<nav>
    <button on:click={() => index--} disabled={!loop && !index}>←</button>
    <button
        on:click={() => index++}
        disabled={!loop && index === items.length - 1}>→</button
    >
    <button on:click={shuffle}><i class="icon icon-refresh" /></button>
    <button on:click={() => (vertical = !vertical)} class:active={vertical}
        >vertical</button
    >
    <button on:click={() => (clamp = !clamp)} class:active={clamp}>
        clamp
    </button>
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
    import { getPhotos, randomQ } from './scripts/api';
    import Slidy from '../../src/Slidy.svelte';
    import { name, version } from '../../package.json';

    import type { Item } from './scripts/api';
</script>

<script lang="ts">
    let items: Item[] = [],
        position = 0,
        page = randomQ(0, 90),
        limit = 9,
        index = 4,
        vertical = false,
        clamp = false,
        align = 'middle',
        duration = 375,
        stend = false,
        gravity = 1.2,
        width = 'auto',
        snap = true,
        images = true,
        loop = false,
        gap = 16;

    $: dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    async function loadPhotos(limit: number, page: number) {
        items = await getPhotos(limit, page);
        return items;
    }

    function changeScheme(scheme) {
        const html = document.documentElement;
        html.setAttribute('scheme', !dark ? 'dark' : 'light');
        dark = !dark;
    }
    const shuffle = () => (page = randomQ(0, 90));

    const mqList = window.matchMedia('(prefers-color-scheme: dark)');
    // $: console.log(mqList, dark);
    $: width = !images ? '50%' : 'auto';
    // $: disabled = !loop && (!index || index > items.length - 1);
</script>

<style lang="scss">
    nav {
        margin: 1rem 0;
        &#dots {
            display: flex;
            overflow-x: scroll;
        }
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
        & > * {
            flex: 0 auto;
            gap: 1rem;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
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
