import { slidy } from '@slidy/core';
import { useRef } from 'react';
import { useEventListener, useAction, execute } from '../../helpers';

import type { Slide } from '../Slidy/Slidy.types';
import type { SlidyCoreOptions } from './Core.types';
import type { FC, PropsWithChildren, LegacyRef } from 'react';

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
    sensity: 5,
    snap: undefined,
    tag: 'ol',
    className: '',
};

const Core: FC<PropsWithChildren<Partial<Options>>> = ($props) => {
    const props = $props as PropsWithChildren<Options>;

    const options = {
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
        index: props.index,
    };

    const el = useRef<HTMLOListElement | null>(null);

    useEventListener('destroy', execute(props.onDestroy), el);
    useEventListener('index', execute(props.onIndex), el);
    useEventListener('keys', execute(props.onKeys), el);
    useEventListener('mount', execute(props.onMount), el);
    useEventListener('move', execute(props.onMove), el);
    useEventListener('resize', execute(props.onResize), el);
    useEventListener('update', execute(props.onUpdate), el);

    const dependencies = [
        props.animation,
        props.easing,
        props.axis,
        props.clamp,
        props.duration,
        props.gravity,
        props.indent,
        props.loop,
        props.sensity,
        props.snap,
        props.index,
    ] as const;

    useAction(slidy, options, el, dependencies);

    const Tag = props.tag as 'ol';

    return (
        <Tag
            className={props.className}
            tabIndex={0}
            aria-live="polite"
            ref={el as LegacyRef<HTMLOListElement>}
        >
            {props.children}
        </Tag>
    );
};

Core.defaultProps = defaultProps;

export default Core;
