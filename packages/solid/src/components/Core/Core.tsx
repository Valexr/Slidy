import { merge, createEffect, createSignal } from 'solid-js';
import { Dynamic } from '@solidjs/web';
import { slidy } from '@slidy/core';

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

const coreEvents = [
    ['destroy', 'onDestroy'],
    ['index', 'onIndex'],
    ['keys', 'onKeys'],
    ['mount', 'onMount'],
    ['move', 'onMove'],
    ['mutate', 'onMutate'],
    ['resize', 'onResize'],
    ['update', 'onUpdate'],
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
        result[key] = object[key];
    }

    return result as PickByKeys<T, K>;
};

const bindCoreEvents = (node: HTMLElement, props: Props) => {
    const listeners = coreEvents.map(([event, key]) => {
        const listener = (e: Event) => props[key]?.(e as never);

        node.addEventListener(event, listener);

        return () => node.removeEventListener(event, listener);
    });

    return () => {
        for (const off of listeners) {
            off();
        }
    };
};

const Core: FlowComponent<Partial<Props>> = (rawProps) => {
    const props = merge(defaultProps, rawProps);
    const options = () => pickByKeys(props, optionsKeys);

    const [node, setNode] = createSignal<HTMLElement>();
    let instance: ReturnType<typeof slidy> | undefined;

    createEffect(node, (element) => {
        instance?.destroy();
        instance = undefined;

        if (!(element instanceof HTMLElement)) {
            return;
        }

        instance = slidy(element, options());
        const unbind = bindCoreEvents(element, props);

        return () => {
            instance?.destroy();
            unbind();
            instance = undefined;
        };
    });

    createEffect(options, (opts) => {
        instance?.update(opts);
    });

    return (
        <Dynamic
            component={props.tag}
            class={props.className}
            aria-live="polite"
            tabindex="0"
            ref={setNode}
        >
            {props.children}
        </Dynamic>
    );
};

export default Core;
