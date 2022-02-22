import type { Slide } from '../../src/types';
export type { Slide } from '../../src/types';

export interface Size {
    width: number;
    height: number;
}

/**
 * `https://www.picsum.photos` API response schema
 */
export interface ImageSchema {
    id: number;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

/**
 * Defines the `GetPhoto` params.
 */
export interface SlideParams {
    limit?: number;
    page?: number;
    width?: number;
    height?: number;
}

export type GetPhotos = (params: SlideParams) => Promise<Slide[]>;
