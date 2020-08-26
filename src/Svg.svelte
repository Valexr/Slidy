<script>
    export let name = ''
    export let transform = ''
</script>

<svg class="feather" style="--transform: {transform}">
    {#if name === 'slidy-chevron-left'}
        <polyline points="15 18 9 12 15 6"></polyline>
    {:else if name === 'slidy-chevron-right'}
        <polyline points="9 18 15 12 9 6"></polyline>
    {:else if name === 'slidy-arrow-left'}
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    {:else if name === 'slidy-arrow-right'}
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    {:else if name === 'slidy-sliders'}
        <line x1="4" y1="21" x2="4" y2="14"></line>
        <line x1="4" y1="10" x2="4" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12" y2="3"></line>
        <line x1="20" y1="21" x2="20" y2="16"></line>
        <line x1="20" y1="12" x2="20" y2="3"></line>
        <line x1="1" y1="14" x2="7" y2="14"></line>
        <line x1="9" y1="8" x2="15" y2="8"></line>
        <line x1="17" y1="16" x2="23" y2="16"></line>
    {:else if name === 'slidy-check'}
        <polyline points="20 6 9 17 4 12"></polyline>
    {:else if name === 'slidy-x'}
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    {:else if name === 'slidy-forward'}
        <polygon points="5 4 15 12 5 20 5 4"></polygon>
        <line x1="19" y1="5" x2="19" y2="19"></line>
    {:else if name === 'slidy-pause'}
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
    {:else if name === 'slidy-play'}
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    {:else if name === 'slidy-back'}
        <polygon points="19 20 9 12 19 4 19 20"></polygon>
        <line x1="5" y1="19" x2="5" y2="5"></line>
    {:else}
        <slot />
    {/if}
</svg>

<style>
    .feather {
        width: 24px;
        height: 24px;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
        transform: var(--transform);
    }
</style>
