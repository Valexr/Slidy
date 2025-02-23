import type { SlidyCoreOptions } from '../Core/Core.types';
import type { JSX, Accessor, Setter } from 'solid-js';
import type { SlidyStyles, I18NDict, Slide, GetSrc } from '@slidy/assets/types';

type BaseCoreOptions = Omit<SlidyCoreOptions, 'index' | 'position'>;

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
    getImgSrc?: GetSrc<Slide | unknown>;
    getThumbSrc?: GetSrc<Slide | unknown>;
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
     * Slide index
     */
    index?: Accessor<number>;
    /**
     * Control the index from outside
     */
    setIndex?: Setter<number>;

    overlay?: () => JSX.Element;
    thumbnail?: (() => JSX.Element) | boolean;
    arrows?: (() => JSX.Element) | boolean;
    arrow?: () => JSX.Element;
    children?: (item: Slide) => JSX.Element;

    onResize?: (
        event: CustomEvent<{ ROE: ResizeObserverEntry[]; options: SlidyCoreOptions }>,
    ) => void;
    onMutate?: (event: CustomEvent<{ ML: MutationRecord[]; options: SlidyCoreOptions }>) => void;
    onMount?: (event: CustomEvent<{ options: SlidyCoreOptions }>) => void;
    onMove?: (event: CustomEvent<{ index: number; position: number }>) => void;
    onIndex?: (event: CustomEvent<{ index: number }>) => void;
    onKeys?: (event: CustomEvent<string>) => void;
    onUpdate?: (event: CustomEvent<SlidyCoreOptions>) => void;
    onDestroy?: (event: CustomEvent<HTMLElement>) => void;
}

export { SlidyCoreOptions, GetSrc, Slide };
