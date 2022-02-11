<section
    aria-roledescription="carousel"
    tabindex="0"
    {id}
    class={`slidy ${className ? className : ""}`}
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
        use:slidy={{
            align,
            clamp,
            duration,
            gravity,
            index,
            loop,
            snap,
            vertical
        }}
        on:mount={(e) => console.log(e)}
        on:move={(e) => {
            index = e.detail.index;
            position = e.detail.position;
        }}
        on:scale={(e) => console.log(e)}
        on:update={(e) => console.log(e)}
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
        <button
            disabled={index === 0 && !loop}
            class="slidy-arrow left"
            data-step="-1"
        >
            <slot name="arrow-prev">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class="slidy-arrow-icon"
                >
                    <path
                        d="M19.56,24a.89.89,0,0,1-.63-.26L11.8,16.65a.92.92,0,0,1,0-1.27h0l7.13-7.16A.9.9,0,0,1,20.2,9.48L13.69,16l6.51,6.5a.91.91,0,0,1,0,1.26h0A.9.9,0,0,1,19.56,24Z"
                    />
                </svg>
            </slot>
        </button>
        <button
            disabled={index === slides.length && !loop}
            class="slidy-arrow right"
            data-step="1"
        >
            <slot name="arrow-next">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class="slidy-arrow-icon"
                >
                    <path
                        d="M19.56,24a.89.89,0,0,1-.63-.26L11.8,16.65a.92.92,0,0,1,0-1.27h0l7.13-7.16A.9.9,0,0,1,20.2,9.48L13.69,16l6.51,6.5a.91.91,0,0,1,0,1.26h0A.9.9,0,0,1,19.56,24Z"
                    />
                </svg>
            </slot>
        </button>
    {/if}

    {#if dots}
        <fieldset class="slidy-dots">
            <div>
                {#each { length: slides.length } as _, i}
                    <slot name="dot" index={i} active={i === index}>
                        <button
                            data-index={i}
                            class="slidy-dot"
                            class:active={i === index}
                        />
                    </slot>
                {/each}
            </div>
        </fieldset>
    {/if}
</section>

<script context="module" lang="ts">
    import type { SlidyOptions, ChangeSlide, Slide, GetSrc } from './types';
</script>

<script lang="ts">
    import { slidy } from '@slidy/core';

    type $$Props = SlidyOptions;

    export let align: $$Props['align'] = 'middle';
    export let arrows = true;
    export let background = false;
    export let clamp = false;
    export let className: $$Props['className'] = undefined;
    export let getImgSrc: GetSrc = (item: Slide) => item.src;
    export let dots = true;
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
            --slidy-dot-size: 12px;
            --slidy-dot-color: white;
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

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        outline: 0;
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
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
        width: var(--slidy-slide-width, auto);
        height: var(--slidy-slide-height, 100%);
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

    /* controls: arrows */

    .slidy-arrow {
        height: 100%;
        width: auto;
        padding: calc(var(--slidy-arrow-size, 16px) * 0.5);
        z-index: 2;
        background-color: unset;
    }

    @media (hover: hover) {
        .slidy-arrow:hover {
            background-color: rgb(59 78 78 / 0.33);
        }
    }

    .slidy-arrow-icon {
        height: var(--slidy-arrow-size, 24px);
        width: var(--slidy-arrow-size, 24px);
        fill: white;
        pointer-events: none;
        transition: transform 0.15s ease-in-out;
        background-color: rgb(59 78 78 / 0.75);
        border-radius: 50%;
    }

    .slidy-arrow:focus .slidy-arrow-icon {
        outline: 1.5px solid rgb(216 201 201 / 0.75);
        outline-offset: 2px;
        border-radius: 50%;
    }

    .slidy-arrow:active .slidy-arrow-icon {
        transform: scale(0.9);
    }

    .slidy-arrow.left {
        grid-area: prev-slide;
    }

    .slidy-arrow.right {
        grid-area: next-slide;
        transform: rotate(180deg);
    }

    /* controls: dots */

    .slidy-dots {
        grid-area: dots;

        z-index: 1;
        place-self: center;
        display: flex;
        place-content: center;
        backdrop-filter: blur(5px);
        width: 100%;
        height: 100%;
        padding: 1em;
    }

    .slidy-dots > div {
        display: flex;
        flex-flow: row nowrap;
        gap: calc(var(--slidy-dots-size, 12px) * 0.75);
        place-content: center;
    }

    .slidy-dot {
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        background-color: var(--slidy-dot-color, white);
        opacity: 0.5;
        width: var(--slidy-dots-size, 12px);
        height: var(--slidy-dots-size, 12px);
        transition: background-color
            var(--slidy-duration, var(--slidy-duration-default));
    }

    .slidy-dot.active {
        opacity: 1;
    }

    .slidy-dot:focus {
        outline: 1.5px solid var(--slidy-dot-color, white);
        outline-offset: 2px;
    }

    @media (hover: hover) {
        .slidy-dot:hover {
            opacity: 0.75;
        }
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
        grid-template: 25px 1fr 25px / 1fr 50px;
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

    .slidy.vertical .slidy-dots {
        width: auto;
        height: max-content;
    }

    .slidy.vertical .slidy-dots > div {
        flex-flow: column nowrap;
    }

    .slidy.vertical .slidy-arrow.left svg {
        transform: rotate(90deg);
    }

    .slidy.vertical .slidy-arrow.right svg {
        grid-area: next-slide;
        transform: rotate(90deg);
    }

    @media (hover: hover) {
        /* as slides container has 'pointer-events: none', we have to use it on slidy */
        .slidy:hover {
            cursor: grab;
        }

        .slidy:active {
            cursor: grabbing;
        }

        .slidy-dots {
            cursor: auto;
        }
    }
</style>
