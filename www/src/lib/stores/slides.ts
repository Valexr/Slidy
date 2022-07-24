import { get, writable } from 'svelte/store';
import { fetchPhotos } from '$lib/api';
import { randInt, clamp } from '@utils/helpers';
import type { Slide } from '@types';

/**
 * Global slides store (singleton).
 */
function createSlidesStore() {
	const store = writable<Slide[]>([]);
	const { subscribe, set } = store;

	async function fetchSlides(limit: number) {
		return await fetchPhotos({
			limit: clamp(limit, 3, 25),
			page: randInt(0, 90)
		});
	}

	async function init(limit: number) {
		const slides = await fetchSlides(limit);
		console.log({ slides });
		set(slides);
	}

	function getRandomSlides(length: number) {
		return get(store)
			.sort(() => 0.5 - Math.random())
			.slice(0, length);
	}

	return {
		subscribe,
		init,
		getRandomSlides
	};
}

export const slides = createSlidesStore();
