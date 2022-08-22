import { slidy } from '@slidy/core';
import { mergeProps, createEffect, onCleanup } from 'solid-js';
import { execute, clamp } from '../../helpers';
import { Dynamic } from '..';

import type { Slide } from '../Slidy/Slidy.types';
import type { SlidyCoreOptions } from './Core.types';
import type { Options as SlidyOptions } from '@slidy/core';
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
        }
    }
}

interface Options {
    animation: SlidyCoreOptions['animation'];
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
    snap: SlidyCoreOptions['snap'];
    tag: keyof JSX.IntrinsicElements | (string & Record<never, never>);
    slides: Slide[];
    className: string;

    onResize?: (event: CustomEvent<{ ROE: ResizeObserverEntry[] }>) => void;
    onMount?: (event: CustomEvent<Options>) => void;
    onMove?: (event: CustomEvent<{ index: number; position: number }>) => void;
    onIndex?: (event: CustomEvent<{ index: number }>) => void;
    onKeys?: (event: CustomEvent<string>) => void;
    onUpdate?: (event: CustomEvent<Options>) => void;
    onDestroy?: (event: CustomEvent<HTMLElement>) => void;

    setIndex?: Setter<number>;
    setPosition?: Setter<number>;
}

const defaultProps: Options = {
    animation: undefined,
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
    snap: undefined,
    tag: 'ol',
    className: '',
};

const Core: FlowComponent<Partial<Options>> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    const options = (full = false) => {
        const obj: Partial<SlidyOptions> = {
            animation: props.animation,
            axis: props.axis,
            clamp: props.clamp,
            duration: props.duration,
            easing: props.easing,
            gravity: props.gravity,
            indent: props.indent,
            loop: props.loop,
            sensity: props.sensity,
            snap: props.snap,
        };

        if (full) obj.index = props.index;

        return obj as SlidyOptions;
    };

    const useSlidy = (el: HTMLElement) => {
        const instance = slidy(el, options(true));

        const index = () => props.index;

        /**
         * Update 'index' in next tick
         */
        createEffect(() => {
            const value = clamp(index(), 0, props.slides.length - 1);

            Promise.resolve(value).then(instance.to);
        });

        /**
         * 'index' does not trigger update
         */
        createEffect(() => instance.update(options()));

        onCleanup(instance.destroy);
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
        >
            {props.children}
        </Dynamic>
    );
};

export default Core;
