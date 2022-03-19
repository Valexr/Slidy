<script>
	export let name = "";
	export let transform = "";
	export let color = "currentColor";
</script>

<svg
	class="feather"
	style="--transform: {transform}; --stroke: {color}"
	on:click>
	{#if name === "slidy-chevron-left"}
		<polyline points="15 18 9 12 15 6" />
	{:else if name === "slidy-chevron-right"}
		<polyline points="9 18 15 12 9 6" />
	{:else if name === "slidy-arrow-left"}
		<line x1="19" y1="12" x2="5" y2="12" />
		<polyline points="12 19 5 12 12 5" />
	{:else if name === "slidy-arrow-right"}
		<line x1="5" y1="12" x2="19" y2="12" />
		<polyline points="12 5 19 12 12 19" />
	{:else if name === "slidy-sliders"}
		<line x1="4" y1="21" x2="4" y2="14" />
		<line x1="4" y1="10" x2="4" y2="3" />
		<line x1="12" y1="21" x2="12" y2="12" />
		<line x1="12" y1="8" x2="12" y2="3" />
		<line x1="20" y1="21" x2="20" y2="16" />
		<line x1="20" y1="12" x2="20" y2="3" />
		<line x1="1" y1="14" x2="7" y2="14" />
		<line x1="9" y1="8" x2="15" y2="8" />
		<line x1="17" y1="16" x2="23" y2="16" />
	{:else if name === "slidy-check"}
		<polyline points="20 6 9 17 4 12" />
	{:else if name === "slidy-x"}
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	{:else if name === "slidy-forward"}
		<polygon points="13 19 22 12 13 5 13 19" />
		<polygon points="2 19 11 12 2 5 2 19" />
	{:else if name === "slidy-pause"}
		<rect x="6" y="4" width="4" height="16" />
		<rect x="14" y="4" width="4" height="16" />
	{:else if name === "slidy-play"}
		<polygon points="5 3 19 12 5 21 5 3" />
	{:else if name === "slidy-back"}
		<polygon points="11 19 2 12 11 5 11 19" />
		<polygon points="22 19 13 12 22 5 22 19" />
	{:else if name === "slidy-rotate-ccw"}
		<polyline points="1 4 1 10 7 10" />
		<path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
	{:else if name === "slidy-rotate-cw"}
		<polyline points="23 4 23 10 17 10" />
		<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
	{:else if name === "slidy-repeat"}
		<polyline points="17 1 21 5 17 9" />
		<path d="M3 11V9a4 4 0 0 1 4-4h14" />
		<polyline points="7 23 3 19 7 15" />
		<path d="M21 13v2a4 4 0 0 1-4 4H3" />
	{:else if name === "slidy-shuffle"}
		<polyline points="16 3 21 3 21 8" />
		<line x1="4" y1="20" x2="21" y2="3" />
		<polyline points="21 16 21 21 16 21" />
		<line x1="15" y1="15" x2="21" y2="21" />
		<line x1="4" y1="4" x2="9" y2="9" />
	{:else if name === "slidy-plus"}
		<line x1="12" y1="5" x2="12" y2="19" />
		<line x1="5" y1="12" x2="19" y2="12" />
	{:else if name === "slidy-mines"}
		<line x1="5" y1="12" x2="19" y2="12" />
	{:else if name === "slidy-refresh"}
		<polyline points="1 4 1 10 7 10" />
		<polyline points="23 20 23 14 17 14" />
		<path
			d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
		/>
	{:else if name === "slidy-eye"}
		<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
		<circle cx="12" cy="12" r="3" />
	{:else if name === "slidy-eye-off"}
		<path
			d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
		/>
		<line x1="1" y1="1" x2="23" y2="23" />
	{:else if name === "github"}
		<path
			d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
		/>
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
