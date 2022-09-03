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

import type { classNames } from './slidy.styles';

type SlidyNodes = keyof typeof classNames;

export type SlidyStyles = Record<SlidyNodes, string>;

export type GetSrc<T> = (item: T) => string;

export interface SlidyOptions extends SlidyCoreOptions {
    arrows?: boolean;
    autoplay?: boolean;
    background?: boolean;
    classNames: SlidyStyles;
    getImgSrc: (item: unknown | Slide) => string;
    getThumbSrc: (item: unknown | Slide) => string;
    i18n: I18NDict;
    interval?: number;
    navigation?: boolean;
    progress?: boolean;
    slides: Slide[];
    thumbnail?: boolean;
}

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
