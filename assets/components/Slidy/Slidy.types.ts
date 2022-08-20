import type { SlidyCoreOptions } from '../Core/Core.types';

/**
 * Common Image interface.
 */
export interface Slide {
    id?: string | number;
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    [key: string]: unknown;
}

type SlidyNodes =
    | 'arrow'
    | 'counter'
    | 'img'
    | 'nav'
    | 'nav-item'
    | 'overlay'
    | 'progress'
    | 'root'
    | 'slide'
    | 'slides'
    | 'thumbnail'
    | 'thumbnails';

export type SlidyStyles = Record<SlidyNodes, string>;

export type GetSrc<T> = (item: T) => string;

export interface SlidyOptions extends SlidyCoreOptions {
    arrows?: boolean;
    autoplay?: boolean;
    background?: boolean;
    classNames: SlidyStyles;
    getImgSrc: (item: unknown | Slide) => string;
    getThumbSrc: (item: unknown | Slide) => string;
    interval?: number;
    navigation?: boolean;
    progress?: boolean;
    slides: Slide[];
    thumbnail?: boolean;
}
