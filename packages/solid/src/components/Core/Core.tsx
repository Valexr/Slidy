import { mergeProps, splitProps, createEffect, onCleanup } from 'solid-js';
import { Dynamic } from '..';
import { slidy } from '@slidy/core';
import { execute } from '@slidy/assets/scripts/utils';

import type { Slide } from '../Slidy/Slidy.types';
import type { SlidyCoreOptions } from './Core.types';
import type { JSX, FlowComponent, Setter } from 'solid-js';

declare module 'solid-js' {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface CustomEvents {
            destroy: CustomEvent;
            index: CustomEvent;
            keys: CustomEvent;
            mount: CustomEvent;
            move: CustomEvent;
            resize: CustomEvent;
            update: CustomEvent;
            mutate: CustomEvent;
        }
    }
}

interface Options {
    animation?: SlidyCoreOptions['animation'];
    axis: SlidyCoreOptions['axis'];
    clamp: number;
    duration: number;
    easing: SlidyCoreOptions['easing'];
    gravity: number;
    indent: SlidyCoreOptions['indent'];
    index: number;
    loop: boolean;
    position: number;
    sensity: number;
    snap?: SlidyCoreOptions['snap'];
    tag: keyof JSX.IntrinsicElements | (string & Record<never, never>);
    slides: Slide[];
    className?: string;

    onResize?: (event: CustomEvent<{ ROE: ResizeObserverEntry[]; options: SlidyCoreOptions }>) => void;
    onMutate?: (event: CustomEvent<{ ML: MutationRecord[]; options: SlidyCoreOptions }>) => void;
    onMount?: (event: CustomEvent<SlidyCoreOptions>) => void;
    onMove?: (event: CustomEvent<{ index: number; position: number }>) => void;
    onIndex?: (event: CustomEvent<{ index: number }>) => void;
    onKeys?: (event: CustomEvent<string>) => void;
    onUpdate?: (event: CustomEvent<SlidyCoreOptions>) => void;
    onDestroy?: (event: CustomEvent<HTMLElement>) => void;

    setIndex?: Setter<number>;
    setPosition?: Setter<number>;
}

const defaultProps: Options = {
    axis: 'x',
    clamp: 0,
    duration: 450,
    easing: (t) => t,
    gravity: 1.2,
    indent: 2,
    index: 0,
    slides: [],
    loop: false,
    position: 0,
    sensity: 5,
    tag: 'ol',
};

const Core: FlowComponent<Partial<Options>> = ($props) => {
    const props = mergeProps(defaultProps, $props);
    const [options] = splitProps(props, ['animation', 'axis', 'clamp', 'duration', 'easing', 'gravity', 'indent', 'loop', 'sensity', 'snap', 'index']);

    const useSlidy = (el: HTMLElement) => {
        const { destroy, update } = slidy(el, options);

        createEffect(() => update(options));
        onCleanup(destroy);
    };

    return (
        <Dynamic
            component={props.tag}
            class={props.className}
            aria-live="polite"
            tabindex="0"
            ref={useSlidy}
            on:destroy={execute(props.onDestroy)}
            on:index={execute(props.onIndex)}
            on:keys={execute(props.onKeys)}
            on:mount={execute(props.onMount)}
            on:move={execute(props.onMove)}
            on:resize={execute(props.onResize)}
            on:update={execute(props.onUpdate)}
            on:mutate={execute(props.onMutate)}
        >
            {props.children}
        </Dynamic>
    );
};

export default Core;
