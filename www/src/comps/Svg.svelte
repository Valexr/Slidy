<script>
    export let name = ''
    export let transform = ''
    export let color = 'currentColor'
</script>

<svg class="feather" style="--transform: {transform}; --stroke: {color}" on:click>
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
        <polygon points="13 19 22 12 13 5 13 19"></polygon>
        <polygon points="2 19 11 12 2 5 2 19"></polygon>
    {:else if name === 'slidy-pause'}
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
    {:else if name === 'slidy-play'}
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    {:else if name === 'slidy-back'}
        <polygon points="11 19 2 12 11 5 11 19"></polygon>
        <polygon points="22 19 13 12 22 5 22 19"></polygon>
    {:else if name === 'slidy-rotate-ccw'}
        <polyline points="1 4 1 10 7 10"></polyline>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
    {:else if name === 'slidy-rotate-cw'}
        <polyline points="23 4 23 10 17 10"></polyline>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
    {:else if name === 'slidy-repeat'}
        <polyline points="17 1 21 5 17 9"></polyline>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
        <polyline points="7 23 3 19 7 15"></polyline>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    {:else if name === 'slidy-shuffle'}
        <polyline points="16 3 21 3 21 8"></polyline>
        <line x1="4" y1="20" x2="21" y2="3"></line>
        <polyline points="21 16 21 21 16 21"></polyline>
        <line x1="15" y1="15" x2="21" y2="21"></line>
        <line x1="4" y1="4" x2="9" y2="9"></line>
    {:else if name === 'slidy-plus'}
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    {:else if name === 'slidy-mines'}
        <line x1="5" y1="12" x2="19" y2="12"></line>
    {:else if name === 'slidy-refresh'}
        <polyline points="1 4 1 10 7 10"></polyline>
        <polyline points="23 20 23 14 17 14"></polyline>
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
    {:else if name === 'slidy-eye'}
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    {:else if name === 'slidy-eye-off'}
        <path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
        ></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    {:else}
        <slot />
    {/if}
</svg>

<style>
    .feather {
        width: 24px;
        height: 24px;
        stroke: var(--stroke);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
        transform: var(--transform);
    }
</style>
