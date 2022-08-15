import { createSignal } from 'solid-js';
import { getPhotos, randInt, clamp } from '../../helpers';
import type { Slide } from '../../components/Slidy/Slidy.types';

/**
 * Manages the slides to display.
 */
export function createSlidesStore() {
    const [slides, setSlides] = createSignal<Slide[]>([]);

    async function fetchSlides(limit: number) {
        return await getPhotos({
            limit: clamp(limit, 1, 15),
            page: randInt(0, 90),
        });
    }

    async function init(limit: number) {
        const slides = await fetchSlides(limit);
        setSlides(slides);
    }

    async function add(amount = 1) {
        const slides = await fetchSlides(amount);
        setSlides((value) => [...value, ...slides]);
    }

    function remove(amount = 1) {
        setSlides((value) => value.slice(0, clamp(value.length - amount, 0, value.length)));
    }

    return {
        slides,
        init,
        add,
        remove,
    };
}
