import type { Dispatch, SetStateAction } from 'react';
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

export interface Options {
    animation?: SlidyOptions['animation'];
    /**
     * @default 'x'
     */
    axis?: SlidyOptions['axis'];
    /**
     * Defines the slides flow by using `aria-orientation`
     * @default false
     */
    vertical?: boolean;
    /**
     * @default false
     */
    background?: boolean;
    /**
     * @default true
     */
    counter?: boolean;
    /**
     * @default 0
     */
    clamp?: number;
    classNames?: SlidyOptions['classNames'];
    i18n?: SlidyOptions['i18n'];
    /**
     * @default 450
     */
    duration?: number;
    easing?: SlidyOptions['easing'];
    getImgSrc?: SlidyOptions['getImgSrc'];
    getThumbSrc?: SlidyOptions['getThumbSrc'];
    /**
     * @default false
     */
    navigation?: boolean;
    /**
     * @default 0
     */
    groups: number;
    /**
     * @default 1.2
     */
    gravity?: number;
    id?: string;
    /**
     * @default 2
     */
    indent?: SlidyOptions['indent'];
    /**
     * @default false
     */
    loop?: boolean;
    /**
     * @default false
     */
    progress?: boolean;
    /**
     * @default 5
     */
    sensity?: number;
    /**
     * @default []
     */
    slides?: SlidyOptions['slides'];
    /**
     * @default undefined
     */
    snap?: SlidyOptions['snap'];
    /**
     * @default 1500
     */
    interval?: number;
    autoplay?: boolean;
    setAutoplay?: Dispatch<SetStateAction<boolean>>;
    autoplayControl?: boolean;

    index?: number;

    /**
     * Control the index from outside
     */
    setIndex?: Dispatch<SetStateAction<number>>;

    overlay?: () => JSX.Element;
    thumbnail?: (() => JSX.Element) | boolean;
    arrows?: (() => JSX.Element) | boolean;
    arrow?: () => JSX.Element;
    children?: (item: Slide) => JSX.Element;

    onResize?: (event: CustomEvent<{ ROE: ResizeObserverEntry[] }>) => void;
    onMount?: (event: CustomEvent<Options>) => void;
    onMove?: (event: CustomEvent<{ index: number; position: number }>) => void;
    onIndex?: (event: CustomEvent<{ index: number }>) => void;
    onKeys?: (event: CustomEvent<string>) => void;
    onUpdate?: (event: CustomEvent<Options>) => void;
    onDestroy?: (event: CustomEvent<HTMLElement>) => void;
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
