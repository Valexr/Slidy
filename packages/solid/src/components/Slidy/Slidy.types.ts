import type { SlidyCoreOptions } from '../Core/Core.types';
import type { JSX, Accessor, Setter } from 'solid-js'

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

type BaseCoreOptions = Omit<SlidyCoreOptions, 'index' | 'position'>

export interface Props extends BaseCoreOptions {
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
    classNames?: SlidyStyles;
    i18n?: I18NDict;
    easing?: SlidyCoreOptions['easing'];
    getImgSrc?: (item: unknown | Slide) => string;
    getThumbSrc?: (item: unknown | Slide) => string;
    /**
     * @default false
     */
    navigation?: boolean;
    id?: string;
    /**
     * @default 0
     */
    groups?: number;
    /**
     * @default false
     */
    progress?: boolean;
    /**
     * @default []
     */
    slides?: Slide[];
    /**
     * @default 1500
     */
    interval?: number;
    autoplay?: Accessor<boolean>;
    setAutoplay?: Setter<boolean>;
    autoplayControl?: boolean;

    index?: Accessor<number>;
    position?: Accessor<number>;

    /**
     * Control the index from outside
     */
    setIndex?: Setter<number>;
    /**
     * Control the position from outside
     */
    setPosition?: Setter<number>;

    overlay?: () => JSX.Element;
    thumbnail?: (() => JSX.Element) | boolean;
    arrows?: (() => JSX.Element) | boolean;
    arrow?: () => JSX.Element;
    children?: (item: Slide) => JSX.Element;

    onResize?: (event: CustomEvent<{ ROE: ResizeObserverEntry[]; options: SlidyCoreOptions }>) => void;
    onMutate?: (event: CustomEvent<{ ML: MutationRecord[]; options: SlidyCoreOptions }>) => void;
    onMount?: (event: CustomEvent<SlidyCoreOptions>) => void;
    onMove?: (event: CustomEvent<{ index: number; position: number }>) => void;
    onIndex?: (event: CustomEvent<{ index: number }>) => void;
    onKeys?: (event: CustomEvent<string>) => void;
    onUpdate?: (event: CustomEvent<SlidyCoreOptions>) => void;
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

export { SlidyCoreOptions }