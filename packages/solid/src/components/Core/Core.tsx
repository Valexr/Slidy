import { mergeProps, splitProps, createEffect, onCleanup, onMount } from 'solid-js';
import { Dynamic } from '..';
import { slidy } from '@slidy/core';
import { execute } from '@slidy/assets/scripts/utils';

import type { Props } from './Core.types'
import type { FlowComponent } from 'solid-js';

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

const defaultProps: Props = {
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

const Core: FlowComponent<Partial<Props>> = ($props) => {
    const props = mergeProps(defaultProps, $props);
    const [options] = splitProps(props, ['animation', 'axis', 'clamp', 'duration', 'easing', 'gravity', 'indent', 'loop', 'sensity', 'snap', 'index', 'plugins']);

    const useSlidy = (el: HTMLElement) => {
        const fn = () => {
            const { destroy, update } = slidy(el, options);

            createEffect(() => update(options));
            onCleanup(destroy);
        }

        onMount(fn);
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
