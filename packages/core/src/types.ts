export interface Options {
    index?: number;
    clamp?: number;
    indent: number;
    sensity?: number;
    gravity?: number;
    duration?: number;
    easing: Easing;
    animation?: Animation;
    snap?: 'start' | 'center' | 'end';
    vertical?: boolean;
    loop?: boolean;
    _shift?: boolean;
}

export interface Slidy extends HTMLElement {
    gap: number;
    axis: string;
    last: number;
    start: number;
    end: number;
    size: number;
    active: number;
    scrollable: boolean;
    onmount?:
        | ((this: GlobalEventHandlers, e: CustomEvent<{ detail: DispathDetail }>) => any)
        | null;
    onresize: ((this: GlobalEventHandlers, e: UIEvent) => any) | null;
    onmove?: ((this: GlobalEventHandlers, e: CustomEvent<{ detail: DispathDetail }>) => any) | null;
    onindex?:
        | ((this: GlobalEventHandlers, e: CustomEvent<{ detail: DispathDetail }>) => any)
        | null;
    onkeys?: ((this: GlobalEventHandlers, e: CustomEvent<{ detail: DispathDetail }>) => any) | null;
    onupdate?:
        | ((this: GlobalEventHandlers, e: CustomEvent<{ detail: DispathDetail }>) => any)
        | null;
    ondestroy?:
        | ((this: GlobalEventHandlers, e: CustomEvent<{ detail: DispathDetail }>) => any)
        | undefined;
}

export interface Child extends HTMLElement {
    index: number;
}

export interface UniqEvent extends PointerEvent {
    touches: TouchList;
    changedTouches: TouchList;
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    clientX: number;
    clientY: number;
    shiftKey: boolean;
    target: EventTarget;
    pointerId: number;
}

export type EventMap = [string, EventListener, AddEventListenerOptions?][];

export type DispathDetail =
    | { [key: string]: any }
    | CustomEventInit<unknown>
    | HTMLCollectionOf<Child>
    | Options
    | Slidy
    | string
    | undefined;

/** Easing function.
 * @param t value from 0 to 1
 * @returns value from 0 to 1
 * @default linear
 * @see https://easings.net
 */
export type Easing = (t: number) => number;
export type Animation = (position: number, index: number) => number;

// DRAFTS ----------------------------------------------------------
export interface CssRules {
    willChange?: string;
    userSelect?: string;
    webkitUserSelect?: string;
    pointerEvents?: string;
    outline?: string;
    overflow?: string;
    transform?: string;
    transition?: string;
    opacity?: string;
    display?: string;
    position?: string;
    touchAction?: string;
    webkitTapHighlightColor?: string;
}
