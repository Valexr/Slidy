import type { AnimationFunc } from '@slidy/core';
import type { Slide } from '../Slidy/Slidy.types';
import type { JSX, Setter } from 'solid-js';

export interface SlidyCoreOptions {
    animation?: AnimationFunc;
    axis: 'x' | 'y';
    clamp?: number;
    className?: string;
    duration?: number;
    easing?: (t: number) => number;
    gravity?: number;
    indent?: number;
    index?: number;
    loop?: boolean;
    position?: number;
    sensity?: number;
    snap?: 'deck' | 'start' | 'center' | 'end';
    tag: string;
}

export interface Props {
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