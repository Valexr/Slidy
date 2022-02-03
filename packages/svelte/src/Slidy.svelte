<svelte:options immutable={true} />

<section
    tabindex="0"
    aria-label="Slidy"
    id={wrap.id}
    class="slidy"
    class:loaded={init}
    class:vertical={options.vertical}
    class:autowidth={slide.width === 'auto'}
    class:antiloop={options.loop === false}
    class:alignmiddle={wrap.align === 'middle'}
    class:alignstart={wrap.align === 'start'}
    class:alignend={wrap.align === 'end'}
    style="
        --wrapw: {wrap.width};
        --wraph: {wrap.height};
        --wrapp: {wrap.padding};
        --slidew: {slide.width};
        --slideh: {slide.height};
        --slidef: {slide.objectfit};
        --slideo: {slide.overflow};
        --slideg: {options.vertical
        ? `${slide.gap}px 0 0 0`
        : `0 0 0 ${slide.gap}px`};
        --dur: {options.duration}ms;"
>
    {#await slidyInit(slides, timeout) then slides}
        {#if !init}
            <section id="loader">
                <slot name="loader">Loading...</slot>
            </section>
        {/if}
        <ul
            class="slidy-ul"
            use:slidy={{
                index,
                vertical: options.vertical,
                align: wrap.align,
                duration: options.duration,
                clamp: options.clamp,
                gravity: options.gravity,
                snap: options.snap,
                loop: options.loop,
                gap: slide.gap,
                indexer: (x) => (index = x),
                scroller: (p) => (position = p),
            }}
        >
            <!-- {#if init} -->
            {#each slides as item, i (key(item))}
                <li
                    data-id={item.ix}
                    class={slide.class}
                    class:active={item.ix === index}
                    style={slide.backimg === true
                        ? `background-image: url(${item[slide.imgsrckey]})`
                        : null}
                >
                    <slot {item}>
                        {#if !slide.backimg}
                            <img
                                alt={item[slide.imgsrckey]}
                                src={item[slide.imgsrckey]}
                                width={item.width}
                                height={item.height}
                            />
                        {/if}
                    </slot>
                </li>
            {/each}
            <!-- {/if} -->
        </ul>

        {#if controls.arrows && init}
            {#if !options.loop}
                {#if index > 0}
                    <button class="arrow-left" on:click={() => index--}>
                        <slot name="arrow-left">&#8592;</slot>
                    </button>
                {/if}
                {#if index < slides.length - 1}
                    <button class="arrow-right" on:click={() => index++}>
                        <slot name="arrow-right">&#8594;</slot>
                    </button>
                {/if}
            {:else}
                <button class="arrow-left" on:click={() => index--}>
                    <slot name="arrow-left">&#8592;</slot>
                </button>
                <button class="arrow-right" on:click={() => index++}>
                    <slot name="arrow-right">&#8594;</slot>
                </button>
            {/if}
        {/if}
        {#if controls.dots && init}
            <ul class="slidy-dots" class:pure={controls.dotspure}>
                {#if controls.dotsarrow}
                    {#if !options.loop}
                        {#if index > 0}
                            <li
                                class="dots-arrow-left"
                                on:click={() => index--}
                            >
                                <slot name="dots-arrow-left"
                                    ><button>&#8592;</button></slot
                                >
                            </li>
                        {/if}
                    {:else}
                        <li class="dots-arrow-left" on:click={() => index--}>
                            <slot name="dots-arrow-left"
                                ><button>&#8592;</button></slot
                            >
                        </li>
                    {/if}
                {/if}
                {#each { length: slides.length } as dot, i}
                    <li
                        class:active={i === index}
                        on:click|stopPropagation={() => (index = i)}
                    >
                        <slot name="dot" {dot}>
                            <button
                                >{controls.dotsnum && !controls.dotspure
                                    ? i
                                    : ''}</button
                            >
                        </slot>
                    </li>
                {/each}
                {#if controls.dotsarrow}
                    {#if !options.loop}
                        {#if index < slides.length - 1}
                            <li
                                class="dots-arrow-right"
                                on:click={() => index++}
                            >
                                <slot name="dots-arrow-right"
                                    ><button>&#8594;</button></slot
                                >
                            </li>
                        {/if}
                    {:else}
                        <li class="dots-arrow-right" on:click={() => index++}>
                            <slot name="dots-arrow-right"
                                ><button>&#8594;</button></slot
                            >
                        </li>
                    {/if}
                {/if}
            </ul>
        {/if}
    {/await}
</section>

<script lang="ts">
    import { slidy } from '@slidy/core';

    export let slides: any[] = [],
        key = (item: { [x: string]: any; id: any }) =>
            item.id || item[slide.imgsrckey],
        wrap = {
            id: null,
            width: '100%',
            height: '50%',
            padding: '0',
            align: 'middle',
            alignmargin: 0,
        },
        slide = {
            gap: 0,
            class: '',
            width: '50%',
            height: '100%',
            backimg: false,
            imgsrckey: 'src',
            objectfit: 'cover',
            overflow: 'hidden',
        },
        controls = {
            dots: true,
            dotsnum: true,
            dotsarrow: true,
            dotspure: false,
            arrows: true,
            keys: true,
            drag: true,
            wheel: true,
        },
        options = {
            vertical: false,
            loop: false,
            duration: 375,
            clamp: false,
            snap: true,
            gravity: 1.2,
        },
        index = 4,
        init = true,
        timeout = 0,
        position = 0;

    // $: slides = slidyInit(slides);

    async function slidyInit(
        slides: any[],
        timeout = 0,
        init: boolean = false
    ) {
        slides = slides.map((s, i) => ({ ix: i, ...s }));
        timeout > 0 ? setTimeout(() => (init = true), timeout) : (init = init);
        return slides;
    }
</script>

<style lang="scss">
    #loader {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        position: absolute;
    }
    .slidy {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        width: var(--wrapw);
        height: var(--wraph);
        outline: 0;
        margin: auto;
        ul {
            display: flex;
            align-items: center;
            justify-content: center;
            list-style: none;
            margin: 0;
            border: 0;
            user-select: none;
            -webkit-user-select: none;
        }
        button {
            margin: 0;
            border: 0;
            padding: 0;
            border-radius: 0;
            width: 50px;
            height: 50px;
            line-height: 50px;
            color: white;
            background-color: rgba(0, 0, 0, 0.09);
            cursor: pointer;
            outline: 0;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            &:active {
                outline: 0;
            }
        }
    }

    .slidy-ul {
        width: 100%;
        height: 100%;
        padding: var(--wrapp);
        position: relative;
        touch-action: pan-y;
        will-change: transform;
        li {
            flex: 1 0 auto;
            position: relative;
            overflow: var(--slideo);
            opacity: 0;
            z-index: 0;
            transition: opacity var(--dur);
            width: var(--slidew);
            height: var(--slideh);
            box-sizing: border-box;
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-position: center;
            background-size: var(--slidef);
            background-color: transparent;
            :global(img) {
                width: 100%;
                height: 100%;
                display: block;
                pointer-events: none;
                max-width: var(--wrapw);
                object-fit: var(--slidef);
            }
        }
    }
    .slidy-ul > * + * {
        margin: var(--slideg);
    }
    .slidy.loaded .slidy-ul li {
        opacity: 1;
    }
    .slidy.vertical .slidy-ul {
        flex-direction: column;
    }
    :global(.slidy.autowidth .slidy-ul li img) {
        width: auto;
    }
    .slidy li.active,
    .slidy li.active button {
        color: red;
    }
    .slidy-dots {
        position: absolute;
        bottom: 0;
        height: 50px;
        padding: 0;
        width: 100%;
    }
    .slidy.vertical .slidy-dots {
        bottom: auto;
        right: 0;
        width: 50px;
        height: 100%;
        flex-direction: column;
    }
    .slidy-dots li {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .slidy.vertical .dots-arrow-left,
    .slidy.vertical .dots-arrow-right {
        transform: rotate(90deg);
    }
    .slidy-dots.pure li {
        width: 32px;
        height: 32px;
        background: none;
    }
    .slidy-dots.pure li button {
        border-radius: 50%;
        background: red;
        opacity: 0.18;
        color: red;
        width: 12px;
        height: 12px;
        transition: color var(--dur);
    }
    .slidy-dots.pure li.active button {
        opacity: 1;
    }
    .arrow-left,
    .dots-arrow-left {
        left: 0;
    }
    .arrow-right,
    .dots-arrow-right {
        right: 0;
    }
    .arrow-right,
    .arrow-left {
        position: absolute;
    }
    .slidy-dots.pure .dots-arrow-left button,
    .slidy-dots.pure .dots-arrow-right button {
        background: none;
        border: none;
        width: auto;
        height: auto;
    }
    .dots-arrow-left,
    .dots-arrow-right {
        width: 50px;
        height: 50px;
    }
</style>
