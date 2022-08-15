import { slidy } from '@slidy/core';
import { mergeProps, createEffect, onCleanup } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type { SlidyCoreOptions } from './Core.types';
import type { JSX, FlowComponent, Accessor, Setter } from 'solid-js';

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

const action = (el: HTMLElement, options: Accessor<Omit<SlidyCoreOptions, 'duration' | 'tag'>>) => {
    const init = () => {
        const instance = slidy(el, options());

        createEffect(() => instance.update(options() as Required<SlidyCoreOptions>));

        onCleanup(instance.destroy);
    };

    Promise.resolve().then(init);
};

const Core: FlowComponent<Partial<Options>> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    const useAction = (el: HTMLElement) => {
        action(el, () => ({
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
        }));
    };

    return (
        <Dynamic
            component={props.tag}
            class={props.className}
            aria-live="polite"
            tabindex="0"
            ref={useAction}
            on:destroy={(event: any) => props.onDestroy?.(event)}
            on:index={(event: any) => props.onIndex?.(event)}
            on:keys={(event: any) => props.onKeys?.(event)}
            on:mount={(event: any) => props.onMount?.(event)}
            on:move={(event: any) => props.onMove?.(event)}
            on:resize={(event: any) => props.onResize?.(event)}
            on:update={(event: any) => props.onUpdate?.(event)}
        >
            {props.children}
        </Dynamic>
    );
};

export default Core;
