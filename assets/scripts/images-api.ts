import type { ImageSchema, GetPhotos, Size, Slide } from '../types';

export const getPhotos: GetPhotos<Slide> = async ({
    limit = 5,
    page = 1,
    width = 1280,
    height = 800,
}) => {
    let data: ImageSchema[] = [];

    try {
        const url = `https://picsum.photos/v2/list?limit=${limit}&page=${page}`;
        const response = await fetch(url, { mode: 'cors' });
        data = await response.json();
    } catch (error) {
        console.error(`Could not fetch photos: ${error}`);
    }

    return data.map((item) => {
        const size = applyRatio({ width: item.width, height: item.height }, { width, height });

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
        height: Math.round(src.height * ratio),
    };
};
