import type { Options as SlidyCoreOptions } from '@slidy/core';
import type { ValidComponent } from 'solid-js';

/**
 * Custom event handler, turns `T` into `(event: CustomEvent<T>) => void` function definition
 */
type CEHandler<T> = (event: CustomEvent<T>) => void;

export interface Props extends SlidyCoreOptions {
    tag: ValidComponent;
    className?: string;

    onResize?:  CEHandler<{ ROE: ResizeObserverEntry[]; options: SlidyCoreOptions }>;
    onMutate?:  CEHandler<{ ML: MutationRecord[]; options: SlidyCoreOptions }>;
    onMount?:   CEHandler<{ options: SlidyCoreOptions }>
    onMove?:    CEHandler<{ index: number; position: number }>
    onIndex?:   CEHandler<{ index: number }>
    onKeys?:    CEHandler<string>
    onUpdate?:  CEHandler<SlidyCoreOptions>
    onDestroy?: CEHandler<HTMLElement>
}

export { SlidyCoreOptions };
