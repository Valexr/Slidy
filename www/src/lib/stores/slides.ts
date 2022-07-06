import { derived, writable } from "svelte/store";
import { fetchPhotos } from "$lib/api";
import { randInt, clamp } from "@utils/helpers";
import type { Slide } from "@types";

/**
 * Global slides store (singleton).
 */
function createSlidesStore() {
	const { subscribe, set } = writable<Slide[]>([]);

	async function fetchSlides(limit: number) {
		return await fetchPhotos({
			limit: clamp(limit, 3, 25),
			page: randInt(0, 90),
		});
	}

	async function init(limit: number) {
		const slides = await fetchSlides(limit);
		set(slides);
	}

	return {
		subscribe,
		init
	};
}

export const slides = createSlidesStore();

export const randomSlides = (length: number) => {
	return derived(slides, $slides => {
		return $slides
		.sort(() => 0.5 - Math.random())
		.slice(0, length);
	})
};