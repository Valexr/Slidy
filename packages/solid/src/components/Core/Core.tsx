import { merge, omit, createEffect, onCleanup, createSignal } from 'solid-js';
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

type OptionsKeys = (typeof optionsKeys)[number];
type PropsKeys = keyof Props;

type OmitKeys = Exclude<PropsKeys, OptionsKeys>;

// todo: either keep it or write `pick` util
const getOmitKeys = <T extends Props>(object: T): OmitKeys[] => {
    return Object.keys(object).filter(
        (key) => !optionsKeys.includes(key as OptionsKeys),
    ) as OmitKeys[];
};

// todo: wait for conventional way to trigger on every property of object change
const trigger = (object: Record<PropertyKey, unknown>) => {
    for (const key of Object.getOwnPropertyNames(object)) {
        object[key];
    }
};

const Core: FlowComponent<Partial<Props>> = (rawProps) => {
    const props = merge(defaultProps, rawProps);
    const options = omit(props, ...getOmitKeys(props));

    const [ref, setRef] = createSignal();

    createEffect(ref, (element) => {
        if (element instanceof HTMLElement) {
            const { update, destroy } = slidy(element, { ...options });

            createEffect(
                () => trigger(options),
                () => {
                    update(options);
                },
            );

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
