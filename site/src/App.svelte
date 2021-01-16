<script>
    import { onMount, afterUpdate, beforeUpdate, tick } from 'svelte'
    import { fly, fade, scale, crossfade, slide } from 'svelte/transition'
    import { settings, set, con, index } from './utils/settings.js'
    import { slides, local } from './api/items.js'
    import { getPhotos } from './api/api.js'
    import { randomQ } from './utils/utils.js'
    import { Settings, Controls, NavTop, NavBottom, NavThumbs, Button, Svg, Spinner } from './comps'
    import Slidy from './Slidy.svelte'
    // import Slidy from 'svelte-slidy'

    let items = [],
        limit = 9,
        page = randomQ(0, 20),
        slidyinit = false

    // onMount(() => (page = randomQ(0, 20)))

    async function loadSlides(limit, page) {
        loaded = intersected = intersect.entries = []
        slidyinit = false
        items = await getPhotos(limit, page, 1280, 800)
        // tick().then(() => (slidyinit = true))
    }
    // $: slidyinit, (intersected = loaded = [])
    $: items.length, ($slides = items)
    $: loadSlides(limit, page)

    let text
    function setSettings() {
        $settings = JSON.parse(text)
    }

    let intersected = [],
        loaded = [],
        intersect = {
            init: false,
            options: {
                root: null,
                rootMargin: '0px',
                threshold: 0,
            },
            entries: [],
            observer: null,
            index: null,
        }

    $: if (intersect.entries)
        for (const entry of intersect.entries) {
            if (entry.isIntersecting) {
                intersected = [...new Set([...intersected, intersect.index])]
                intersect.observer.unobserve(entry.target)
                // eir = entry.intersectionRatio
            } else {
                // intersected = intersected.filter((x) => x !== inti)
            }
        }
    // $: console.log(loaded, intersected)
    function onLoad(id) {
        loaded = [...loaded, id]
        // loaded.length == intersected.length ? observer.disconnect() : null
    }
    // function observerConnect() {
    //     intersect = {
    //         options: {
    //             root: null,
    //             rootMargin: '0px',
    //             threshold: 1.0,
    //         },
    //         entries: [],
    //         observer: null,
    //         index: null,
    //     }
    // }
    function settingsClick() {
        $set.input
            ? (setSettings(), ($set.input = false))
            : (($set.open = !$set.open), ($con.open = false))
    }
    function controlsClick() {
        $con.open = !$con.open
        $set.open = false
    }
</script>

<h1>Let`s <strong> Slidy <sup>2.4</sup> </strong> GO!</h1>

<NavTop bind:limit bind:page />

<!-- <div style="width: 80%; margin: auto;"> -->
<!-- <Slidy slides="{local}" /> -->
<!-- </div> -->

{#if $slides.length}
    <Slidy
        let:item
        {...$settings}
        slides="{$slides}"
        bind:slidyinit
        bind:index="{$index}"
        bind:intersect
    >
        <span slot="loader">
            <Spinner />
        </span>
        {#if $settings.slide.backimg === true}
            <span class="default">
                <strong>{item.ix}</strong>
                <sub>{item.width}x{item.height}</sub>
            </span>
        {:else}
            {#if loaded.includes(item.ix)}
                <span class="default" in:fade|local>
                    <strong>{item.ix}</strong>
                    <sub>{item.width}x{item.height}</sub>
                </span>
            {:else}<span class="loading" out:fade|local>Loading...</span>{/if}
            <img
                class:loaded="{loaded.includes(item.ix)}"
                alt="{item.id}"
                on:load|once|stopPropagation="{() => onLoad(item.ix)}"
                src="{intersected.includes(item.ix) ? item[$settings.slide.imgsrckey] : null}"
            />
            <!-- src="{item[$settings.slide.imgsrckey]}"
                 src="{intersected.includes(item.ix) ? item[$settings.slide.imgsrckey] : null}"
            -->
        {/if}
        <span class="internal-controls" slot="arrow-left">
            <Svg name="{'slidy-chevron-left'}" />
        </span>
        <span class="internal-controls" slot="arrow-right">
            <Svg name="{'slidy-chevron-right'}" />
        </span>
        <span class="internal-controls" slot="dots-arrow-left">
            <Svg name="{'slidy-arrow-left'}" />
        </span>
        <span class="internal-controls" slot="dots-arrow-right">
            <Svg name="{'slidy-arrow-right'}" />
        </span>
    </Slidy>
{/if}

<NavBottom />

{#if $slides.length}
    <NavThumbs />
{/if}

{#if $con.open}
    <Controls />
{/if}

<Button id="controls" style="{'left: 20px;'}" open="{$con.open}" on:click="{controlsClick}">
    {#if $con.open}
        <Svg name="{'slidy-x'}" />
    {:else}
        <Svg name="{'slidy-play'}" transform="translate(3px, 0)" />
    {/if}
</Button>

{#if $set.open}
    <Settings bind:text />
{/if}

<Button
    id="settings"
    style="{'right: 20px;'}"
    open="{$set.open}"
    check="{$set.input}"
    on:click="{settingsClick}"
>
    {#if $set.input}
        <Svg name="{'slidy-check'}" />
    {:else if $set.open}
        <Svg name="{'slidy-x'}" />
    {:else}
        <Svg name="{'slidy-sliders'}" />
    {/if}
</Button>

<a id="github" target="_blank" href="https://github.com/Valexr/svelte-slidy">&nbsp;</a>

<style lang="scss">
    :root {
        --box-shadow-small: 0 2px 8px rgba(0, 0, 0, 0.08);
        --box-shadow-medium: 0 5px 15px rgba(0, 0, 0, 0.08);
        --box-shadow-large: 0 14px 25px rgba(0, 0, 0, 0.16);
        --box-shadow-xlarge: 0 28px 50px rgba(0, 0, 0, 0.16);
        --color: white;
        --color-accent: blue;
        --color-active: red;
        --back-color: rgba(0, 0, 0, 0.09);
    }

    h1 {
        margin: 2rem auto;
        text-align: center;
        width: 100%;
        z-index: 1;
        position: fixed;
        strong {
            font-size: inherit;
            color: var(--color-active);
            position: relative;
            sup {
                font-size: 12px;
                top: 9px;
                position: absolute;
                right: 9px;
            }
        }
    }

    :global(.slide) {
        border-radius: 1rem;
        span {
            top: 0;
            border-top-left-radius: 1rem;
            border-bottom-right-radius: 1rem;
        }
    }

    span {
        &.default {
            position: absolute;
            z-index: 1;
            padding: 1em;
            background: var(--back-color);
        }
        &.loading {
            border-radius: 1rem;
            position: absolute;
            display: flex;
            bottom: 0;
            right: 0;
            left: 0;
            align-items: center;
            justify-content: center;
            color: var(--color);
            opacity: 0.45;
        }
        &.internal-controls {
            display: flex;
            color: var(--color-active);
        }
    }

    img {
        width: 100%;
        max-height: 100%;
        max-width: 100%;
        box-sizing: border-box;
        position: relative;
        pointer-events: none;
        display: block;
        border-radius: 1rem;
        opacity: 0;
        transition: opacity 1000ms ease-in;
        box-shadow: var(--box-shadow-large);
        &.loaded {
            opacity: 1;
        }
    }

    #github {
        position: fixed;
        right: 20px;
        top: 20px;
        width: 2em;
        height: 2em;
        z-index: 1000;
        border-radius: 50%;
        background: url(../img/github.svg);
    }
</style>
