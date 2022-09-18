import type { Options as SlidyCoreOptions } from '@slidy/core';
import type { Slide } from '../Slidy/Slidy.types';
import type { JSX, Setter } from 'solid-js';

export interface Props extends SlidyCoreOptions {
    tag: keyof JSX.IntrinsicElements | (string & Record<never, never>);
    slides: Slide[];
    className?: string;

    onResize?: (
        event: CustomEvent<{ ROE: ResizeObserverEntry[]; options: SlidyCoreOptions }>
    ) => void;
    onMutate?: (event: CustomEvent<{ ML: MutationRecord[]; options: SlidyCoreOptions }>) => void;
    onMount?: (event: CustomEvent<{ options: SlidyCoreOptions }>) => void;
    onMove?: (event: CustomEvent<{ index: number; position: number }>) => void;
    onIndex?: (event: CustomEvent<{ index: number }>) => void;
    onKeys?: (event: CustomEvent<string>) => void;
    onUpdate?: (event: CustomEvent<SlidyCoreOptions>) => void;
    onDestroy?: (event: CustomEvent<HTMLElement>) => void;

    setIndex?: Setter<number>;
    setPosition?: Setter<number>;
}

export { SlidyCoreOptions };
