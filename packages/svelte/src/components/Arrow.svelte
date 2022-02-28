<button
    aria-label={ariaLabel}
    class="slidy-arrow"
    class:prev={type < 0}
    class:vertical
    data-step={type}
    {disabled}
>
    <svg
        class="slidy-arrow-icon"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d={svgPath} />
    </svg>
</button>

<script lang="ts" context="module">
    const svgPath =
        'M19.56,24a.89.89,0,0,1-.63-.26L11.8,16.65a.92.92,0,0,1,0-1.27h0l7.13-7.16A.9.9,0,0,1,20.2,9.48L13.69,16l6.51,6.5a.91.91,0,0,1,0,1.26h0A.9.9,0,0,1,19.56,24Z';
</script>

<script lang="ts">
    import './arrow.module.css';
    // describes slide management the direction: previous / next
    export let type: -1 | 1 | number = 1;
    export let loop: boolean;
    export let index: number;
    export let items: number;
    export let vertical: boolean = false;

    $: disabled =
        type < 1 ? index === 0 && !loop : index === items - 1 && !loop;

    $: ariaLabel =
        type < 1
            ? `Go to the previous slide: #${index}`
            : `Go to the next slide: #${index}`;
</script>
