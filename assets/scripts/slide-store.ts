import { getPhotos, clamp } from '.';

let slides: Awaited<ReturnType<typeof getPhotos>> = [];

export async function initSlides(limit = 10) {
    slides = await getPhotos({
        limit: clamp(3, limit, 10),
    });
}

export async function getRandomSlides(items = 10) {
    if (!slides?.length) {
        await initSlides();
    }

    return slides?.sort(() => 0.5 - Math.random()).slice(0, items);
}
