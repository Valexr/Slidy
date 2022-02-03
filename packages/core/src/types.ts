export type Options = {
    index: number;
    duration: number;
    gravity: number;
    indexer: Function;
    scroller: Function;
    align: string;
    vertical: boolean;
    clamp: boolean;
    snap: boolean;
    loop: boolean;
    gap: number;
};

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
