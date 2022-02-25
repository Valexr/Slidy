<nav class="slidy-pagination" class:vertical aria-label="pagination">
	{#each indices as item}
			{@const ellipsis = item < 0}
			{@const title = item < 0 ? undefined : `Show to item #${item}`}
			{@const active = current === item}
			<slot name="pagination-item" index={item} active={item === current}>
				<button
					data-index={ellipsis ? undefined : item - 1}
					class="slidy-pagination-item"
					class:ordinal
					class:ellipsis
					disabled={ellipsis}
					class:active
					{title}
					aria-label={title}
					aria-current={active ? "true" : undefined}>
						{ordinal ? setContents(item) : ""}
				</button>
			</slot>
	{/each}
</nav>

<script lang="ts" context="module">
	import type { IndexGenerator } from "../types";

	const setContents = (index: number): string | number => (index < 0) ? "…" : index;

	/**
	 * Generates an array of numbers in given range [ start, start + 1, ... );
	 */
	const range = (start: number, end: number) => {
		const size = end - start + 1;
		return [ ...Array(size).keys() ].map(i => i + start);
	};

	/**
	 * end -> the last valid item index
	 */
	const generateIndexes: IndexGenerator = ({ current, start = 0, end, limit, siblings }) => {
		// Total number of items: first + ... + siblings + current + siblings + ... + last
		const items = Math.max(5 + siblings * 2, end - start + 1);

		// Case: all items are visible
		if (items <= limit) {
			return range(start, end);
		}

		// Calculate left/right sibling indexes at the edge:
		const siblingLeftIndex = Math.max(current - siblings, start);
		const siblingRightIndex = Math.min(current + siblings, end);

		/**
			Do not show dots just when there is just one page number to be inserted
			between the extremes of sibling and the limits i.e [ 0; lastIndex ].
		*/
		const leftDots = siblingLeftIndex > 2;
    const rightDots = siblingRightIndex < end - 1;

		// Case: ellipsis only at the end:
		// 1st, sibling, current, sibling, ..., last
		if (!leftDots && rightDots) {
			const leftRange = range(start, 3 + 2 * siblings);
			return [ ...leftRange, -1, end ];
		}

		// Case: ellipsis only at the end:
		// 1st, ..., sibling, current, sibling, last
		if (leftDots && !rightDots) {
			const rightItems = 3 + 2 * siblings;
			const rightRange = range(end - rightItems + 1, end);
			return [ start, -1, ...rightRange ];
		}

		// Case: ellipsis at both ends:
		// 1st, ..., sibling, current, sibling, ..., last
		if (leftDots && rightDots) {
			let middleRange = range(siblingLeftIndex, siblingRightIndex);
			return [ start, -1, ...middleRange, -1, end ];
		}

		return [];
	};
</script>

<script lang="ts">
	export let current: number;
	export let start: number;
	export let end: number;
	export let ordinal = false;
	export let vertical = false;
	export let limit = 7;
	export let siblings = 1;

	// Too many items -> should be ordinal for accessibility and responsiveness
	$: ordinal = (end - start + 1) > limit && true;
	$: indices = generateIndexes({ current,	start, end, limit, siblings });
</script>

<style>
	.slidy-pagination {
		grid-area: dots;
		place-self: center;

		display: flex;
		flex-flow: row wrap;
		gap: calc(var(--slidy-nav-item-size, 16px) * 0.75);
		place-content: center;
		width: 100%;
		height: 100%;
		padding: var(--slidy-nav-item-size, 16px);
		z-index: 1;		
  }

	.slidy-pagination-item {
		aspect-ratio: 1 / 1;
		border-radius: var(--slidy-nav-item-radius, 50%);
		background-color: var(--slidy-nav-item-color, currentColor);
		opacity: 0.5;
		width: var(--slidy-nav-item-size, 16px);
		height: var(--slidy-nav-item-size, 16px);
		transition: background-color var(--slidy-duration, 450ms);
	}

	.slidy-pagination-item.active {
		opacity: 1;
	}

	.slidy-pagination-item:focus {
		outline: 1.5px solid var(--slidy-nav-item-color, currentColor);
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

	/* vertical mode */

	.slidy-pagination.vertical {
    flex-flow: column nowrap;
  }

	/* ellipsis */
	
	.slidy-pagination-item.ellipsis {
		background-color: unset;
		color: inherit;
		cursor: auto;
	}

	@media (hover: hover) {
		.slidy-pagination-item:hover {
			opacity: 0.75;
		}
	}
</style>