export interface Size {
    width: number;
    height: number;
}

/**
 * `https://www.picsum.photos` API response schema
 */
export interface ImageSchema {
    id: number;
    alt: string;
    src: string;
    width: number;
    height: number;
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

/**
 * Common Image interface.
 */
export interface Slide {
    id?: string | number;
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    // [key: string]: unknown;
}

export type GetPhotos<T> = (params: SlideParams) => Promise<T[]>;

export interface IndexGeneratorParams {
    current: number;
    start: number;
    end: number;
    limit: number;
    siblings: number;
}

export type IndexGenerator = (params: IndexGeneratorParams) => number[];

type i18nKey =
    | 'carousel'
    | 'counter'
    | 'first'
    | 'last'
    | 'next'
    | 'play'
    | 'prev'
    | 'slide'
    | 'slideN'
    | 'stop';

export type I18NDict = Record<i18nKey, string>;

export type SlidyNodes =
    | 'arrow'
    | 'autoplay'
    | 'counter'
    | 'img'
    | 'nav'
    | 'nav-item'
    | 'overlay'
    | 'progress'
    | 'progress-handle'
    | 'root'
    | 'slide'
    | 'slides'
    | 'thumbnail'
    | 'thumbnails';

export type SlidyStyles = Record<SlidyNodes, string>;

export type GetSrc<T> = (item: T) => string;
