export interface Options {
    index: number;
    length: number;
    gravity: number;
    duration: number;
    vertical: boolean;
    clamp: boolean;
    snap: boolean;
    loop: boolean;
}

type OptionsSnap = 'auto' | 'start' | 'center' | 'end' | '';

export interface Step {
    i: number;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface Child {
    index: number;
    offsetTop: number;
    offsetLeft: number;
    offsetWidth: number;
    offsetHeight: number;
}

export interface CssRule {
    [key: string]: string;
}

export interface SLIDY extends HTMLElement {
    SLIDY?: {
        index?: number;
        position?: number;
    };
}

export interface Delta {
    target: number;
    amplitude: number;
}

export interface Scroll {
    target: number;
    amplitude: number;
    duration: number;
    timestamp: number;
}
