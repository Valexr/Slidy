<svelte:options immutable={true} />

<svelte:window bind:innerWidth={ww} bind:innerHeight={wh} />

<h1>
    Let`s <strong>
        Slidy <sup>{version.replace(/\.[^.]*$/, '')}</sup>
    </strong>
    GO!
</h1>

<NavTop bind:limit bind:page bind:index />

<!-- <Slidy slides={local} /> -->

<Slidy
    {timeout}
    let:item
    {...$settings}
    slides={items}
    bind:init
    bind:index
    bind:intersect
>
    <span slot="loader">
        <SpinnerD />
        {loaded.length !== 0 ? Math.floor(100 - 100 / loaded.length) : 0}
    </span>

    {#if $settings.slide.backimg}
        <span class="default">
            <strong>{item.ix}</strong>
        </span>
    {:else}
        {#if loaded.includes(item.ix)}
            <span class="default">
                <strong>{item.ix}</strong>
            </span>
        {:else}<span class="loading">Loading...</span>{/if}
        <img
            class:loaded={loaded.includes(item.ix)}
            alt={item.id}
            on:load|once={() => onLoad(item.ix)}
            src={imgSrc(item)}
        />
    {/if}

    <span class="internal-controls" slot="arrow-left">
        <Svg name={'slidy-chevron-left'} />
    </span>
    <span class="internal-controls" slot="arrow-right">
        <Svg name={'slidy-chevron-right'} />
    </span>
    <span class="internal-controls" slot="dots-arrow-left">
        <Svg name={'slidy-arrow-left'} />
    </span>
    <span class="internal-controls" slot="dots-arrow-right">
        <Svg name={'slidy-arrow-right'} />
    </span>
</Slidy>

<NavBottom />

{#if init}
    <NavThumbs bind:index slides={items} />
{/if}

{#if conOpen}
    <Controls bind:index bind:open={conOpen} slides={items} />
{/if}

<Button
    id="controls"
    style={'left: 20px;'}
    open={conOpen}
    on:click={controlsClick}
>
    {#if conOpen}
        <Svg name={'slidy-x'} />
    {:else}
        <Svg name={'slidy-play'} transform="translate(3px, 0)" />
    {/if}
</Button>

{#if setOpen}
    <Settings bind:input={setInput} bind:check={setCheck} bind:open={setOpen} />
{/if}

<Button
    id="settings"
    style={'right: 20px;'}
    open={setOpen}
    check={setInput}
    on:click={settingsClick}
>
    {#if setInput}
        <Svg name={'slidy-check'} />
    {:else if setOpen}
        <Svg name={'slidy-x'} />
    {:else}
        <Svg name={'slidy-sliders'} />
    {/if}
</Button>

<a
    id="github"
    alt="https://github.com/Valexr/svelte-slidy"
    target="_blank"
    href="https://github.com/Valexr/svelte-slidy">&nbsp;</a
>

<script>
    import { onMount, afterUpdate, beforeUpdate, tick } from 'svelte';
    import { fly, fade, scale, crossfade, slide } from 'svelte/transition';
    import { version } from '../../package.json';
    import { settings } from '@settings';
    // import { slides, local } from "@items";
    import { getPhotos } from '@api';
    import { randomQ } from '@utils';
    import {
        Settings,
        Controls,
        NavTop,
        NavBottom,
        NavThumbs,
        Button,
        Svg,
        Spinner,
        SpinnerD,
    } from '@cmp';
    // import { Slidy } from '@cmp';
    import { Slidy } from 'svelte-slidy';

    let items = [],
        index = 4,
        limit = 9,
        page = randomQ(0, 96),
        init = false,
        timeout = 0,
        ww = 0,
        wh = 0,
        conOpen = false,
        setOpen = false,
        setInput = false,
        setCheck = false,
        slides = [];

    // onMount(() => (index = 1));

    // $: items.length > 1 && (index = 1);
    async function loadSlides(limit, page) {
        init = false;
        loaded = intersected = intersect.entries = [];
        items = await getPhotos(limit, page);
        // index = 4;
    }
    // $: init && (index = 5);
    // $: init, (intersected = loaded = [])
    // $: items.length, ($slides = items);
    $: loadSlides(limit, page);
    $: console.log(index);

    let intersected = [],
        loaded = [],
        intersect = {
            init: false,
            options: {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            },
            entries: [],
            observer: null,
            index: null,
        };

    $: if (intersect.entries)
        for (const entry of intersect.entries) {
            if (entry.isIntersecting) {
                intersected = [...new Set([...intersected, intersect.index])];
                intersect.observer.unobserve(entry.target);
                // eir = entry.intersectionRatio;
            } else {
                // intersected = intersected.filter((x) => x !== intersect.index);
            }
        }
    // $: console.log(loaded, intersected)
    function onLoad(id) {
        const equal = loaded.length === items.length - 1;
        loaded = [...loaded, id];
        equal && (init = true);
        // console.log(loaded.length, items.length, equal);
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
    function imgSrc(item) {
        if ($settings.options.intersecting && intersected.length > 0)
            return intersected.includes(item.ix)
                ? item[$settings.slide.imgsrckey]
                : null;
        else return item[$settings.slide.imgsrckey];
    }
    // $: console.log(intersected);
    function settingsClick() {
        setInput
            ? ((setCheck = true), (setInput = false))
            : ((setOpen = !setOpen), (conOpen = false));
    }
    function controlsClick() {
        conOpen = !conOpen;
        setOpen = false;
    }
</script>

<style lang="scss">
    :root {
        --box-shadow-small: 0 2px 8px rgba(0, 0, 0, 0.08);
        --box-shadow-medium: 0 5px 15px rgba(0, 0, 0, 0.08);
        --box-shadow-large: 0 14px 25px rgba(0, 0, 0, 0.16);
        --box-shadow-xlarge: 0 28px 50px rgba(0, 0, 0, 0.16);
        --box-shadow-xlarge-red: 0 0 50px rgba(255, 0, 0, 0.45);
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
        z-index: 0;
        border-radius: 1rem;
        box-shadow: var(--box-shadow-large);
        span {
            top: 0;
            border-top-left-radius: 1rem;
            border-bottom-right-radius: 1rem;
            position: absolute;
            z-index: 1;
            padding: 1em;
            background: var(--back-color);
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
        opacity: 0;
        transition: opacity 1000ms ease-in;
        will-change: auto;
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
        background-image: url('../img/git.svg');
    }
</style>
