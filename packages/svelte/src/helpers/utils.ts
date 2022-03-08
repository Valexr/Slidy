export const randInt = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const clamp = (value: number, min: number, max: number) => {
	return Math.min(Math.max(min, value), max);
};

/**
 * Generates an array of numbers in given range [ start, start + 1, ... );
 */
export const range = (start: number, end: number) => {
	const size = end - start + 1;
	return [ ...Array(size).keys() ].map((i) => i + start);
};