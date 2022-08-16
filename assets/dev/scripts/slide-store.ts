import { getPhotos, randInt, clamp } from "../../helpers";
import type { Slide } from "../../components/Slidy/Slidy.types";

let slides: Slide[] = [];

export async function initSlides(limit = 50) {
	slides = await getPhotos({
		limit: clamp(limit, 3, 25),
		page: randInt(0, 90)
	});
}

export async function getRandomSlides(items = 10) {
	if (!slides.length) {
		await initSlides();
	}

	return slides
		.sort(() => 0.5 - Math.random())
		.slice(0, items);
}
