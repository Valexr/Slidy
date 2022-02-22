import type { ImageSchema, GetPhotos, Size, Slide } from '../types';

export const getPhotos: GetPhotos = async ({ limit = 5, page = 1, width = 1280, height = 800 }): Promise<Slide[]> => {
    const url = `https://picsum.photos/v2/list?limit=${limit}&page=${page}`;
    const response = await fetch(url, { mode: 'cors' });
    const data: ImageSchema[] = await response.json();

    return data.map(item => {
        let size = applyRatio(
            { width: item.width, height: item.height },
            { width, height }
        );

        return {
            id: item.id,
            ...size,
            alt: `Image by ${item.author}`,
            src: `https://picsum.photos/id/${item.id}/${size.width}/${size.height}.jpg`,
        };
    });
};

const applyRatio = (src: Size, size: Size): Size => {
    const ratio = Math.min(size.width / src.width, size.height, src.height);
    return {
        width: Math.round(src.width * ratio),
        height: Math.round(src.height * ratio)
    };
};

export const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(min, value), max);
};
