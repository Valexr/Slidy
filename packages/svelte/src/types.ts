export interface Slide {
    id?: string | number;
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    [key: string]: unknown;
}

export interface SlidyOptions {
    arrows?: boolean;
    background?: boolean;
    clamp?: boolean;
    className?: string;
    dots?: boolean;
    duration?: number;
    getImgSrc?: string;
    gravity?: number;
    id?: string;
    index?: number;
    loop?: boolean;
    position?: number;
    slides: Slide[];
    snap?: "start" | "center" | "end";
    vertical?: boolean;
}

export type ChangeSlide = (index: number) => void;

export type GetSrc = (item: Slide) => string;

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