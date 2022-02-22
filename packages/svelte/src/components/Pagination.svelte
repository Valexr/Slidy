<nav class="slidy-pagination">
	{#each { length: pages } as _, i}
			<slot name="pagination-item" index={i} active={i === current}>
				<button
					data-index={i}
					class="slidy-pagination-item"
					class:ordinal
					on:click={() => (current = i)}
					class:active={i === current}
					title="Navigate to item #{i}">
						{ordinal ? i : ""}
				</button>
			</slot>
	{/each}
</nav>

<script lang="ts">
	export let current: number;
	export let pages: number;
	export let ordinal = false;
	//export let max: number = pages;
</script>

<style>
	.slidy-pagination {
		grid-area: dots;

		display: flex;
		flex-flow: row wrap;
		gap: calc(var(--slidy-nav-item-size, 16px) * 0.75);
		place-content: center;

		z-index: 1;
		place-self: center;
		display: flex;
		place-content: center;
		backdrop-filter: blur(5px);
		width: 100%;
		height: 100%;
		padding: var(--slidy-nav-item-size, 16px);
  }

	.slidy-pagination-item {
		aspect-ratio: 1 / 1;
		border-radius: var(--slidy-nav-item-radius, 50%);
		background-color: var(--slidy-nav-item-color, white);
		opacity: 0.5;
		width: var(--slidy-nav-item-size, 16px);
		height: var(--slidy-nav-item-size, 16px);
		transition: background-color
				var(--slidy-duration, var(--slidy-duration-default));
	}

	.slidy-pagination-item.active {
		opacity: 1;
	}

	.slidy-pagination-item:focus {
		outline: 1.5px solid var(--slidy-nav-item-color, white);
		outline-offset: 2px;
	}

	/* ordinality */

	.slidy-pagination-item.ordinal {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: calc(var(--slidy-nav-item-size, 16px) * 0.5);
		color: white;
		font-weight: 600;
		line-height: 1em;
	}

	@media (hover: hover) {
		.slidy-pagination-item:hover {
			opacity: 0.75;
		}
	}
</style>