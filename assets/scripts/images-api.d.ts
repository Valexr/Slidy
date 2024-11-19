import type { Slide } from '../types';
export declare const getPhotos: ({ limit, width, height, }: {
    limit?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}) => Promise<Slide[] | undefined>;
