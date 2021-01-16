<script>
    export let size = 75
    export let speed = 550
    export let color = 'red'
    export let thickness = 1
    export let gap = 25
    export let radius = 10

    let dash
    $: dash = (2 * Math.PI * radius * (100 - gap)) / 100
</script>

<svg
    height="{size}"
    width="{size}"
    style="animation-duration:{speed}ms;"
    class="svelte-spinner"
    viewbox="0 0 32 32"
>
    <circle
        role="presentation"
        cx="16"
        cy="16"
        r="{radius}"
        stroke="{color}"
        fill="none"
        stroke-width="{thickness}"
        stroke-dasharray="{dash},100"
        stroke-linecap="round"
    ></circle>
</svg>

<style>
    .svelte-spinner {
        transition-property: transform;
        animation-name: svelte-spinner_infinite-spin;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        position: relative;
        z-index: 1000;
    }
    @keyframes svelte-spinner_infinite-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
