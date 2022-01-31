{#if slides && !options.loop}
    {#if index > 0}
        <button class="arrow-left" on:click={() => index--}>
            <slot name="arrowLeft">&#8592;</slot>
        </button>
    {/if}
    {#if index < slides.length - 1}
        <button class="arrow-right" on:click={() => index++}>
            <slot name="arrowRight">&#8594;</slot>
        </button>
    {/if}
{:else if slides}
    <button class="arrow-left" on:click={() => index--}>
        <slot name="arrowLeft">&#8592;</slot>
    </button>
    <button class="arrow-right" on:click={() => index++}>
        <slot name="arrowRight">&#8594;</slot>
    </button>
{/if}

<script>
    export let options, index, slides;
</script>

<style>
    .arrow-left {
        left: 0;
    }
    .arrow-right {
        right: 0;
    }
    .arrow-right,
    .arrow-left {
        position: absolute;
    }
</style>
