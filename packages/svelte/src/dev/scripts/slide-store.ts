import { writable } from "svelte/store";
import { getPhotos, randInt, clamp } from "../../helpers";
import type { Slide } from "../../types";

/**
 * Manages the slides to display.
 */
export function createSlidesStore() {
	const { subscribe, set, update } = writable<Slide[]>([]);

	async function fetchSlides(limit: number) {
		return await getPhotos({
			limit: clamp(limit, 1, 15),
			page: randInt(0, 90),
		});
	}

	async function init(limit: number) {
		const slides = await fetchSlides(limit);
		set(slides);
	}

	async function add(amount = 1) {
		const slides = await fetchSlides(amount);
		update((value) => [ ...value, ...slides ]);
	}

	function remove(amount = 1) {
		update((value) => value.slice(0, clamp(value.length - amount, 0, value.length)));
	}

	return {
		subscribe,
		init,
		add,
		remove,
	};
}
