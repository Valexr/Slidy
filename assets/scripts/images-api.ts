import type { ImageSchema, GetPhotos, Size, Slide } from '../types';

export const getPhotos: GetPhotos<Slide> = async ({
    limit = 5,
    width = window.innerWidth,
    height = window.innerHeight,
}) => {
    let data: ImageSchema[] = [];

    try {
        data = await getImages(limit, { width, height });
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

async function getImages(limit: number = 9, size = { width: window.innerWidth, height: window.innerHeight }) {
    const url = 'https://raw.githubusercontent.com/Valexr/Slidy/master/assets/static/photos.json';
    const indexes = Array.from({ length: limit }, () => Math.floor(Math.random() * 24644));
    const res = await fetch(url);
    const photos = await res.json();

    type Image = { src: string; width: number; height: number; alt: string; }

    return photos.reduce((acc: Image[], [src, aspectRatio, author]: [string, number, string], i: number) => {
        if (indexes.includes(i)) {
            const source = { width: size.height * (aspectRatio / 10), height: size.height };
            const max = { width: size.width, height: size.height };
            const query = `?w=${ratio(applyRatio(source, max).width)}`;
            acc.push({
                src: `https://images.unsplash.com/photo-${src}${query}`,
                alt: `Image by ${author} from Unsplash`,
                ...applyRatio(source, max)
            });
        }
        return acc;
    }, []);

    function ratio(size: number) {
        return size * devicePixelRatio;
    }
}

const applyRatio = (src: Size, size: Size): Size => {
    const ratio = Math.min(size.width / src.width, size.height, src.height);
    return {
        width: Math.round(src.width * ratio),
        height: Math.round(src.height * ratio),
    };
};
