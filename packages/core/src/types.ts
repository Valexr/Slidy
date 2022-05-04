export interface Options {
    index?: number;
    length?: number;
    gravity?: number;
    duration?: number;
    snap?: 'start' | 'center' | 'end';
    vertical?: boolean;
    clamp?: boolean;
    loop?: boolean;
    indent?: number;
}

export interface Slidy extends HTMLElement {
    scrollTopMax: number;
    scrollLeftMax: number;
}

export interface Child extends HTMLElement {
    index: number;
}

export interface CssRules {
    willChange?: string;
    userSelect?: string;
    webkitUserSelect?: string;
    pointerEvents?: string;
    outline?: string;
    overflow?: string;
    transform?: string;
    transition?: string;
    opacity?: number;
    display?: string;
    position?: string;
}

export interface UniqEvent extends Event {
    changedTouches: Array<{ [key: string]: number }>;
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    clientX: number;
    clientY: number;
    shiftKey: boolean;
    target: EventTarget;
}

export type DispathDetail =
    | { [key: string]: any }
    | CustomEventInit<unknown>
    | HTMLCollectionOf<Child>
    | Options
    | Slidy
    | string
    | undefined;