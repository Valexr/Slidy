<header class="header">
    <picture aria-hidden="true">
        <img alt="Slidy" width="35" height="35" src="assets/logo.svg" />
    </picture>
    <h1>
        Slidy <small>v.{version}</small>
    </h1>
    <fieldset class="nav-controls">
        <button on:click={() => slidesPromise = slides.init(limit)} title="Shuffle slides">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M3.56,10.56H9a3.62,3.62,0,0,1,2.88,1.55,12.14,12.14,0,0,1,1.85-2.58A6.61,6.61,0,0,0,9,7.44H3.56a1.56,1.56,0,0,0,0,3.12Zm12,4.84c.86-2.58,3.51-4.84,5.68-4.84h2.86l-2,2a1.57,1.57,0,0,0,0,2.2,1.59,1.59,0,0,0,1.1.45,1.55,1.55,0,0,0,1.1-.45L30,9,24.23,3.23A1.56,1.56,0,0,0,22,5.43l2,2H21.19c-3.54,0-7.33,3.06-8.63,7l-.74,2.2c-1,3-3.22,4.83-4.38,4.83H3.56a1.56,1.56,0,0,0,0,3.12H7.44c2.86,0,6-3,7.34-7ZM22,17.23a1.57,1.57,0,0,0,0,2.2l2,2H20.41a4.44,4.44,0,0,1-4.19-3.27,14.51,14.51,0,0,1-1.69,3.39,7.4,7.4,0,0,0,5.88,3h3.64l-2,2a1.57,1.57,0,0,0,0,2.2,1.59,1.59,0,0,0,1.1.45,1.55,1.55,0,0,0,1.1-.45L30,23l-5.77-5.77A1.57,1.57,0,0,0,22,17.23Z" />
            </svg>
        </button>
        <button on:click={() => darkTheme.switch()} class:active={$darkTheme} title="Switch theme">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M30,21.4a14.74,14.74,0,0,1-19,7.5A13.89,13.89,0,0,1,3.14,10.5,14.48,14.48,0,0,1,14.8,2a.83.83,0,0,1,.86.46.76.76,0,0,1-.15.93A10.48,10.48,0,0,0,12.26,11a11,11,0,0,0,11.25,10.7,11.62,11.62,0,0,0,5.25-1.31.91.91,0,0,1,1,.11A.83.83,0,0,1,30,21.4Z" />
            </svg>
        </button>
        <a href="#side-menu" id="side-menu-button" title="Open sidebar" aria-label="Close sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M28.31,13.12H27.2a1.71,1.71,0,0,1-1.66-1.71,1.58,1.58,0,0,1,.55-1.2l.71-.7A1.79,1.79,0,0,0,26.8,7L25.18,5.35a1.86,1.86,0,0,0-2.56,0L21.93,6a1.64,1.64,0,0,1-1.24.56A1.7,1.7,0,0,1,19,5V3.83A1.83,1.83,0,0,0,17.19,2H15a1.81,1.81,0,0,0-1.78,1.83V4.94a1.71,1.71,0,0,1-1.72,1.65,1.62,1.62,0,0,1-1.21-.54l-.71-.7a1.82,1.82,0,0,0-1.27-.51A1.86,1.86,0,0,0,7,5.35L5.36,7a1.79,1.79,0,0,0,0,2.53l.68.69a1.63,1.63,0,0,1,.57,1.23A1.71,1.71,0,0,1,5,13.12H3.84A1.81,1.81,0,0,0,2,14.89V17.1a1.82,1.82,0,0,0,1.84,1.78H5a1.7,1.7,0,0,1,1.66,1.7A1.61,1.61,0,0,1,6,21.81l-.68.68a1.8,1.8,0,0,0,0,2.54L7,26.65a1.82,1.82,0,0,0,1.27.51,1.86,1.86,0,0,0,1.28-.51l.71-.7a1.58,1.58,0,0,1,1.21-.54,1.71,1.71,0,0,1,1.72,1.65v1.11A1.81,1.81,0,0,0,15,30h2.22A1.81,1.81,0,0,0,19,28.17V27.06a1.71,1.71,0,0,1,1.72-1.65,1.69,1.69,0,0,1,1.24.56l.69.68a1.82,1.82,0,0,0,1.27.51,1.86,1.86,0,0,0,1.28-.51L26.79,25a1.81,1.81,0,0,0,0-2.55l-.72-.7a1.59,1.59,0,0,1-.54-1.2,1.7,1.7,0,0,1,1.66-1.71H28.3A1.7,1.7,0,0,0,30,17.11V14.89A1.68,1.68,0,0,0,28.31,13.12ZM21.91,16h0a5.84,5.84,0,0,1-11.68,0h0a5.84,5.84,0,0,1,11.68,0Z" />
            </svg>
        </a>
    </fieldset>
</header>

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

<aside class="slide-controls">
    <Pagination
        bind:current={index}
        pages={$slides.length}
    />
    <fieldset>
        <button on:click={() => slides.remove()}>-</button>
        <input type="number" bind:value={limit} min={1} max={15} />
        <button on:click={() => slides.add()}>+</button>
    </fieldset>
</aside>

<Sidemenu id="side-menu">
    <ControlPanel
        bind:vertical
        bind:clamp
        bind:align
        bind:duration
        bind:gravity
        bind:width
        bind:loop
        bind:gap
    />
</Sidemenu>

<aside class="status-position">
    <p>
        Index: <output>{index}</output>
    </p>
    <p>
        Position: <output>{Math.trunc(position)}px</output>
    </p>
</aside>

<script lang="ts" context="module">
    import { version } from "../../package.json";
    import Slidy from "../../src/Slidy.svelte";
    import Sidemenu from "./components/Sidemenu.svelte";
    import ControlPanel from "./components/ControlPanel.svelte";
    import Pagination from "./components/Pagination.svelte";
    import { createSlidesStore } from "./scripts/slide-store";
</script>

<script lang="ts">
    import { darkTheme } from "./scripts/theme-store";

    let position = 0;
    let limit = 9;
    let index = 4;
    let vertical = false;
    let clamp = true;
    let align: "start" | "middle" | "end" = "middle";
    let duration = 450;
    let gravity = 1.45;
    let width = "auto";
    let snap = true;
    let loop = false;
    let gap = 15;

    const slides = createSlidesStore();
    let slidesPromise = slides.init(limit);
</script>

<style>
    main {
        --slidy-nav-item-color: var(--accent);
        max-width: 100%;
    }

    .header {
        display: flex;
        padding: var(--space-s);
        align-items: center;

        font-size: 0.8rem;
    }

    .header > :last-child {
        margin-left: auto;
    }

    .header small {
        font-size: 1rem;
        font-weight: 400;
    }

    .nav-controls {
        display: flex;
        gap: var(--space-s);
    }

    .nav-controls > * {
        background-color: var(--surface-2);
        padding: 4px;
        width: 30px;
        height: 30px;
    }

    .nav-controls svg {
        fill: var(--accent);
    }

    #side-menu-button svg {
        transition: transform 0.25s ease-in-out;
        transform: rotate(0);
    }

    #side-menu-button:active svg,
    #side-menu-button:hover svg {
        transform: rotate(25deg);
    }

    .slide-controls {
        justify-self: center;
        align-self: center;

        display: flex;
        flex-flow: column nowrap;
        gap: var(--space-m);
        padding: var(--space-xl);
    }

    .status-position {
        position: fixed;
        bottom: var(--space-s);
        left: var(--space-s);
        padding: var(--space-s);
        border-radius: 0.5rem;
        background-color: rgb(121 121 121 / 0.5);
        pointer-events: none;
        font-weight: 300;
    }

    .status-position output {
        font-weight: 400;
    }
</style>
