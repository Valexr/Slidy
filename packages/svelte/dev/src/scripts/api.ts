import type { Slide, GetPhotos } from '../types';

export const getPhotos: GetPhotos = async ({
    limit = 5,
    page = 1,
    width = 1280,
    height = 800,
}) => {
    const url = `https://picsum.photos/v2/list?limit=${limit}&page=${page}`;
    const response = await fetch(url, { mode: 'cors' });
    const data: Slide[] = await response.json();

    return data.map((item) => {
        let aspect = aspectQ(item.width, item.height, width, height);
        return {
            ...item,
            ...aspect,
            src: `https://picsum.photos/id/${item.id}/${aspect.width}/${aspect.height}.jpg`,
        };
    });
};

function aspectQ(
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number
): { width: number; height: number } {
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
        width: Math.round(srcWidth * ratio),
        height: Math.round(srcHeight * ratio),
    };
}

export const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(min, value), max);
};
