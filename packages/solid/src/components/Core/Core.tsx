import { slidy } from '@slidy/core';
import { mergeProps, createEffect, onCleanup, onMount } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { execute } from '../../shared';

import type { SlidyCoreOptions } from './Core.types';
import type { JSX, FlowComponent, Setter } from 'solid-js';

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
    loop: false,
    position: 0,
    sensity: 5,
    snap: undefined,
    tag: 'ol',
    className: '',
};

const Core: FlowComponent<Partial<Options>> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    let el!: HTMLElement;

    onMount(() => {
        const options = () => ({
            animation: props.animation,
            axis: props.axis,
            clamp: props.clamp,
            duration: props.duration,
            easing: props.easing,
            gravity: props.gravity,
            indent: props.indent,
            index: props.index,
            loop: props.loop,
            sensity: props.sensity,
            snap: props.snap,
        });

        const instance = slidy(el, options());

        createEffect(() => instance.update(options()));
        onCleanup(instance.destroy);
    });

    return (
        <Dynamic
            component={props.tag}
            class={props.className}
            aria-live="polite"
            tabindex="0"
            ref={el}
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
