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

export interface Slide {
    id?: number;
    width: number;
    height: number;
    alt: string;
    src: string;
}

export type GetPhotos<T> = (params: SlideParams) => Promise<T[]>;
