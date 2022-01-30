export interface Item {
    id?: string;
    src?: string;
    width?: number;
    height?: number;
    alt?: string;
    [key: string]: string | number;
}

export async function getPhotos(
    limit: number,
    page: number,
    width = 1280,
    height = 800
): Promise<Item[]> {
    const res = await fetch(
        `https://picsum.photos/v2/list?limit=${limit}&page=${page}`,
        {
            mode: 'cors',
            headers: {
                // AccessControlAllowOrigin: 'https://picsum.photos'
            },
        }
    ).then((res) => res.json());
    return res.map((item: Item) => {
        let aspect = aspectQ(item.width, item.height, width, height);
        let data = {
            ...item,
            src: `https://picsum.photos/id/${item.id}/${aspect.width}/${aspect.height}.jpg`,
            width: aspect.width,
            height: aspect.height,
        };
        return data;
    });
}

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

export const randomQ = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const maxMin = (max: number, min: number, val: number) =>
    Math.min(max, Math.max(min, val));
