import { slidy } from '@slidy/core';
import { useRef } from 'react';
import { execute } from '@slidy/assets/scripts/utils'
import { useEventListener, useAction } from '../../hooks';

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
    plugins: SlidyCoreOptions['plugins']

    onResize?: (event: CustomEvent<{ ROE: ResizeObserverEntry[] }>) => void;
    onMount?: (event: CustomEvent<Options>) => void;
    onMove?: (event: CustomEvent<{ index: number; position: number }>) => void;
    onIndex?: (event: CustomEvent<{ index: number }>) => void;
    onKeys?: (event: CustomEvent<string>) => void;
    onUpdate?: (event: CustomEvent<Options>) => void;
    onDestroy?: (event: CustomEvent<HTMLElement>) => void;
}

const Core: FC<PropsWithChildren<Partial<Options>>> = ({ animation, axis = 'x', clamp = 0, duration = 450, easing = (t) => t, gravity = 1.2, indent = 2, index = 0, slides = [], loop = false, sensity = 5, snap, tag = 'ol', className, children, plugins, onDestroy, onIndex, onKeys, onMount, onMove, onResize, onUpdate }) => {
    const el = useRef<HTMLOListElement | null>(null);

    useEventListener('destroy', execute(onDestroy), el);
    useEventListener('index', execute(onIndex), el);
    useEventListener('keys', execute(onKeys), el);
    useEventListener('mount', execute(onMount), el);
    useEventListener('move', execute(onMove), el);
    useEventListener('resize', execute(onResize), el);
    useEventListener('update', execute(onUpdate), el);

    const options = {
        animation,
        axis,
        clamp,
        duration,
        easing,
        gravity,
        indent,
        loop,
        sensity,
        snap,
        index,
        plugins
    };

    const dependencies = [
        animation,
        easing,
        axis,
        clamp,
        duration,
        gravity,
        indent,
        loop,
        sensity,
        snap,
        index,
        plugins
    ] as const;

    useAction(slidy, options, el, dependencies);

    const Tag = tag as 'ol';

    return (
        <Tag
            className={className}
            tabIndex={0}
            aria-live="polite"
            ref={el as LegacyRef<HTMLOListElement>}
        >
            {children}
        </Tag>
    );
};

export default Core;
