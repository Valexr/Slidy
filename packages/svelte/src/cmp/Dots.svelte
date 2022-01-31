<ul class="slidy-dots" class:pure={controls.dotspure}>
    {#if controls.dotsarrow}
        {#if !options.loop}
            {#if index > 0}
                <li class="dots-arrow-left" on:click={() => index--}>
                    <slot name="dots-arrow-left"><button>&#8592;</button></slot>
                </li>
            {/if}
        {:else}
            <li class="dots-arrow-left" on:click={() => index--}>
                <slot name="dots-arrow-left"><button>&#8592;</button></slot>
            </li>
        {/if}
    {/if}
    {#each dots as dot, i}
        <li
            class:active={i === index}
            on:click|stopPropagation={() => (index = i)}
        >
            <slot name="dot" {dot}>
                <button
                    >{controls.dotsnum && !controls.dotspure ? i : ''}</button
                >
            </slot>
        </li>
    {/each}
    {#if controls.dotsarrow}
        {#if !options.loop}
            {#if index < dots.length - 1}
                <li class="dots-arrow-right" on:click={() => index++}>
                    <slot name="dots-arrow-right"><button>&#8594;</button></slot
                    >
                </li>
            {/if}
        {:else}
            <li class="dots-arrow-right" on:click={() => index++}>
                <slot name="dots-arrow-right"><button>&#8594;</button></slot>
            </li>
        {/if}
    {/if}
</ul>

<script>
    export let index, controls, options, dots;
</script>

<style>
    .slidy-dots {
        position: absolute;
        bottom: 0;
        height: 50px;
        padding: 0;
        width: 100%;
    }
    :global(.slidy.axisy) .slidy-dots {
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
    :global(.slidy.axisy) .dots-arrow-left,
    :global(.slidy.axisy) .dots-arrow-right {
        transform: rotate(90deg);
    }
    .slidy-dots.pure li {
        width: 32px;
        height: 32px;
        background: none;
    }
    .slidy-dots.pure li button {
        border-radius: 50%;
        color: red;
        width: 12px;
        height: 12px;
        transition: color var(--dur);
    }
    .slidy-dots.pure li.active button {
        background: red;
    }
    .dots-arrow-left {
        left: 0;
    }
    .dots-arrow-right {
        right: 0;
    }
    .slidy-dots.pure .dots-arrow-left button,
    .slidy-dots.pure .dots-arrow-right button {
        background: none;
        width: auto;
        height: auto;
    }
    .dots-arrow-left,
    .dots-arrow-right {
        width: 50px;
        height: 50px;
    }
</style>
