<script lang="ts" context="module">
	import type { IndexGenerator } from "../../types";

	const setContents = (index: number): string | number =>
		index < 0 ? "…" : index;

	/**
	 * Generates an array of numbers in given range [ start, start + 1, ... );
	 */
	const range = (start: number, end: number) => {
		const size = end - start + 1;
		return [ ...Array(size).keys() ].map((i) => i + start);
	};

	/**
	 * end -> the last valid item index
	 */
	const generateIndexes: IndexGenerator = ({
		current,
		start = 0,
		end,
		limit,
		siblings,
	}) => {
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
	import "./pagination.module.css";

	export let current: number;
	export let start: number;
	export let end: number;
	export let ordinal = false;
	export let vertical = false;
	export let limit = 7;
	export let siblings = 1;

	// Too many items -> should be ordinal for accessibility and responsiveness
	$: ordinal = end - start + 1 > limit && true;
	$: indices = generateIndexes({ current, start, end, limit, siblings });
</script>

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
				aria-current={active ? "true" : undefined}
			>
				{ordinal ? setContents(item) : ""}
			</button>
		</slot>
	{/each}
</nav>
