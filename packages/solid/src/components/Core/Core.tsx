import { merge, createEffect, onCleanup, createSignal } from 'solid-js';
import { Dynamic } from '@solidjs/web';
import { slidy } from '@slidy/core';
import { execute } from '@slidy/assets/scripts/utils';

import type { Props } from './Core.types';
import type { FlowComponent } from 'solid-js';

const defaultProps: Props = {
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
    tag: 'ol',
};

const optionsKeys = [
    'animation',
    'axis',
    'clamp',
    'duration',
    'easing',
    'gravity',
    'indent',
    'loop',
    'sensity',
    'snap',
    'index',
    'plugins',
] as const;

type PickByKeys<T extends Record<PropertyKey, unknown>, K extends readonly (keyof T)[]> = {
    [P in keyof T as Extract<P, K[number]>]: T[P];
};

const pickByKeys = <T extends Record<PropertyKey, unknown>, K extends readonly (keyof T)[]>(
    object: T,
    keys: K,
) => {
    const result: Record<PropertyKey, unknown> = {};

    for (const key of keys) {
        // access only keys that are in `keys` array
        result[key] = object[key];
    }

    return result as PickByKeys<T, K>;
};

const Core: FlowComponent<Partial<Props>> = (rawProps) => {
    const props = merge(defaultProps, rawProps);
    const options = () => pickByKeys(props, optionsKeys);

    const [ref, setRef] = createSignal();

    createEffect(ref, (element) => {
        if (element instanceof HTMLElement) {
            const { update, destroy } = slidy(element, options());

            createEffect(options, () => {
                update(options());
            });

            onCleanup(destroy);
        }
    });

    return (
        <Dynamic
            component={props.tag}
            class={props.className}
            aria-live="polite"
            tabindex="0"
            ref={setRef}
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
