<section
    aria-roledescription="carousel"
    tabindex="0"
    {id}
    class={`slidy ${className ? className : ''}`}
    class:vertical
    on:click={handleClick}
>
    <slot name="counter" {index} amount={slides.length}>
        <output class="slidy-counter">
            {index + 1} / {slides.length}
        </output>
    </slot>
    <ul
        class="slidy-slides"
        aria-live="polite"
        use:slidy={{
            length: slides.length,
            vertical,
            duration,
            gravity,
            index,
            clamp,
            snap,
            loop,
        }}
        on:mount={(e) => console.log(e)}
        on:move={(e) => {
            index = e.detail.index;
            position = e.detail.position;
        }}
    >
        {#each slides as item, i (item.id ?? getImgSrc(item) ?? i)}
            <!-- svelte-ignore a11y-missing-attribute -->
            <li
                class="slidy-slide"
                class:active={i === index}
                class:as-background={background}
                style={background
                    ? `--slidy-slide-bg: url(${getImgSrc(item)});`
                    : undefined}
                aria-roledescription="slide"
                aria-label={`${i} of ${slides.length}`}
                role="group"
                aria-current={i === index ? 'true' : undefined}
            >
                <slot {item}>
                    {#if !background}
                        <img src={getImgSrc(item)} {...item} />
                    {/if}
                </slot>
            </li>
        {/each}
    </ul>

    {#if arrows}
        <slot name="arrows">
            {#each [ -1, 1 ] as type}
                <Arrow
                    {type}
                    {index}
                    items={slides.length}
                    {loop}
                    {vertical}
                />
            {/each}
        </slot>
    {/if}

    {#if navigation}
        <Pagination
            current={index + 1}
            start={1}
            end={slides.length}
            {vertical}
        />
    {/if}
</section>

<script lang="ts" context="module">
    import type { SlidyOptions, ChangeSlide, Slide, GetSrc } from './types';
</script>

<script lang="ts">
    import { slidy } from '@slidy/core';
    import { Arrow, Pagination } from "./components";

    type $$Props = SlidyOptions;

    // export let align: $$Props['align'] = 'middle';
    export let arrows = true;
    export let background = false;
    export let clamp = false;
    export let className: $$Props['className'] = undefined;
    export let getImgSrc: GetSrc = (item: Slide) => item.src;
    export let navigation = true;
    export let duration = 450;
    export let gravity = 1.2;
    export let id: $$Props['id'] = undefined;
    export let index = 0;
    export let loop = false;
    export let position = 0;
    export let slides: $$Props['slides'] = [];
    export let snap = true;
    export let vertical = false;

    /**
     * Route to the desired slide index.
     */
    const goto: ChangeSlide = (slide) => {
        if (typeof slide === 'number' && !Number.isNaN(slide)) {
            // clamp value within valid range
            index = Math.min(Math.max(slide, 0), slides.length - 1);
        }
    };

    const handleClick = (event: Event): void => {
        const element = event.target as HTMLElement;
        if (element.nodeName !== 'BUTTON') return;

        if (element.dataset.index) {
            goto(parseInt(element.dataset.index));
            return;
        }

        if (element.dataset.step) {
            goto(parseInt(element.dataset.step) + index);
            return;
        }
    };
</script>

<style>
    /*
        CSS Custom Properties list and their default values:
        
        Public:
            --slidy-height: 100%;
            --slidy-width: 100%;
            --slidy-slide-gap: 1rem;
            --slidy-slide-height: 100%;
            --slidy-slide-width: auto;
            --slidy-slide-object-fit: cover;
            --slidy-nav-item-size: 12px;
            --slidy-nav-item-color: white;
            --slidy-arrow-size: 24px;
        Private:
            --slidy-slide-bg for `background-mode`;
    */

    /* globals */

    .slidy * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    li {
        list-style: none;
    }

    /* carousel */

    .slidy {
        position: relative;
        display: grid;
        grid-template: 1fr auto / auto 1fr auto;
        grid-template-areas:
            'prev-slide slides next-slide'
            'dots dots dots';
        height: var(--slidy-height, 100%);
        width: var(--slidy-width, 100%);
        overflow: hidden;
        overscroll-behavior: contain;
    }

    /* slides */

    .slidy-slides {
        grid-row: 1;
        grid-column: 1 / -1;

        min-height: 0;
        position: relative;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        gap: var(--slidy-slide-gap, 1rem);
        width: 100%;
        height: 100%;
        max-width: 100%;
    }

    .slidy-slide {
        display: flex;
        place-content: center;
        align-items: center;
        flex-shrink: 0;
        width: var(--slidy-slide-width, auto);
        height: var(--slidy-slide-height, 100%);
        transition: opacity var(--slidy-duration, 450);
        max-width: 100%;
    }

    .slidy-slide.as-background {
        background-image: var(--slidy-slide-bg);
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-position: center;
        background-size: var(--slidy-slide-object-fit, cover);
        background-color: transparent;
    }

    .slidy-slides :global(img) {
        display: block;
        width: var(--slidy-slide-width, auto);
        height: var(--slidy-slide-height, 100%);
        object-fit: var(--slidy-slide-object-fit, cover);
        min-width: 100%;
    }

    /* counter */

    .slidy-counter {
        position: absolute;
        top: 1em;
        right: 1em;
        z-index: 3;
        font-family: inherit;
        background-color: rgb(59 78 78 / 0.75);
        padding: 0.25em 0.5em;
        border-radius: 10px;
        user-select: none;
    }

    /* mode::vertical */

    .slidy.vertical {
        display: grid;
        grid-template: auto minmax(0, 1fr) auto / minmax(0, 1fr) auto;
        grid-template-areas:
            'prev-slide dots'
            'slides dots'
            'next-slide dots';
        height: var(--slidy-height, 100%);
        width: var(--slidy-width, 100%);
    }

    .slidy.vertical .slidy-slides {
        grid-row: 1 / -1;
        grid-column: 1;

        flex-flow: column nowrap;
        width: var(--slidy-slide-width, 100%);
        height: var(--slidy-slide-height, auto);
    }

    .slidy.vertical .slidy-nav {
        width: auto;
        height: max-content;
    }

    @media (hover: hover) {
        /* as slides container has 'pointer-events: none', we have to use it on slidy */
        .slidy:hover {
            cursor: grab;
        }

        .slidy:active {
            cursor: grabbing;
        }

        .slidy-nav {
            cursor: auto;
        }
    }
</style>
