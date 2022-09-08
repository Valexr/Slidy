import { randInt } from './utils'
import type { ImageSchema, GetPhotos, Size, Slide } from '../types';

export const getPhotos: GetPhotos<Slide> = async ({
    limit = 5,
    page = 1,
    width = 1280,
    height = 800,
}) => {
    let data: ImageSchema[] = [];

    try {
        data = await getImages({ width, height }, limit);
    } catch (error) {
        console.error(`Could not fetch photos: ${error}`);
    }

    return data.map((item) => {
        const size = applyRatio({ width: item.width, height: item.height }, { width, height });

        return {
            id: item.id,
            ...size,
            alt: `Image by ${item.author}`,
            src: item.src,
        };
    });
};

function getImages(size: { width: number, height: number }, limit: number): Promise<ImageSchema[]> {
    return new Promise((resolve, reject) => {
        const photos = [...Array(limit).keys()].map((id: number) => {
            const dPR = (size: number) => Math.round(size * devicePixelRatio);

            const width = randInt(dPR(size.width), dPR(size.height));
            const height = randInt(dPR(size.height), dPR(size.width));
            console.log(width, height)

            return {
                id,
                author: 'Unsplash',
                width,
                height,
                src: `https://source.unsplash.com/random/${width}x${height}`
            };
        });
        if (photos.length === limit) {
            setTimeout(() => resolve(photos), 500);
        } else reject('No photos');
    });
}

const applyRatio = (src: Size, size: Size): Size => {
    const ratio = Math.min(size.width / src.width, size.height, src.height);
    return {
        width: Math.round(src.width * ratio),
        height: Math.round(src.height * ratio),
    };
};
