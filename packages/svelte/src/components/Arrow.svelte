<button
	aria-label={ariaLabel}
	class="slidy-arrow"
	class:prev={type < 0}
	class:vertical
	data-step={type}
	{disabled}
>
	<svg class="slidy-arrow-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<path d={svgPath} />
	</svg>
</button>

<script lang="ts" context="module">
	const svgPath = "M19.56,24a.89.89,0,0,1-.63-.26L11.8,16.65a.92.92,0,0,1,0-1.27h0l7.13-7.16A.9.9,0,0,1,20.2,9.48L13.69,16l6.51,6.5a.91.91,0,0,1,0,1.26h0A.9.9,0,0,1,19.56,24Z";
</script>

<script lang="ts">
	// describes slide management the direction: previous / next
	export let type: -1 | 1 | number = 1;
	export let loop: boolean;
	export let index: number;
	export let items: number;
	export let vertical: boolean = false;

	$: disabled = (type < 1)
		? (index === 0 && !loop)
		: (index === items - 1 && !loop);

	$: ariaLabel = (type < 1)
		? `Go to the previous slide: #${index}`
		: `Go to the next slide: #${index}`
</script>

<style>
	.slidy-arrow {
		height: 100%;
		width: auto;
		padding: calc(var(--slidy-arrow-size, 16px) * 0.5);
		z-index: 2;
		background-color: unset;
	}

	.slidy-arrow:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

	.slidy-arrow:focus-visible .slidy-arrow-icon {
		outline: 1.5px solid rgb(216 201 201 / 0.75);
		outline-offset: 2px;
		border-radius: 50%;
	}

	.slidy-arrow:active .slidy-arrow-icon {
		transform: scale(0.9);
	}

	.slidy-arrow.prev {
		grid-area: prev-slide;
	}

	.slidy-arrow:not(.prev) {
		grid-area: next-slide;
		transform: rotate(180deg);
	}

	.slidy-arrow.prev.vertical svg {
		transform: rotate(90deg);
	}

	.slidy-arrow.vertical:not(.prev) svg {
		transform: rotate(90deg);
	}

	@media (hover: hover) {
		.slidy-arrow:hover {
			background-color: rgb(59 78 78 / 0.33);
		}
	}
</style>
