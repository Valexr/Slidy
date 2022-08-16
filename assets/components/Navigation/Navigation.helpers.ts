import type { IndexGenerator } from "./Navigation.types";

/**
 * Generates an array of numbers in given range [ start, start + 1, ... );
 */
export const range = (start: number, end: number) => {
	const size = end - start + 1;
	return [...Array(size).keys()].map((i) => i + start);
};

/**
 * Generates an array of indexes for responsive pagination: [ start, end ].
 */
export const generateIndexes: IndexGenerator = ({ current, start = 0, end, limit, siblings }) => {
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
		return [...leftRange, -1, end];
	}

	// Case: ellipsis only at the end:
	// 1st, ..., sibling, current, sibling, last
	if (leftDots && !rightDots) {
		const rightItems = 3 + 2 * siblings;
		const rightRange = range(end - rightItems + 1, end);
		return [start, -1, ...rightRange];
	}

	// Case: ellipsis at both ends:
	// 1st, ..., sibling, current, sibling, ..., last
	if (leftDots && rightDots) {
		const middleRange = range(siblingLeftIndex, siblingRightIndex);
		return [start, -1, ...middleRange, -1, end];
	}

	return [];
};
