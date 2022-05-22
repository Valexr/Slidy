export interface Options {
    index?: number;
    indent: number;
    clamp?: number;
    gravity?: number;
    duration?: number;
    easing: Easing;
    snap?: 'start' | 'center' | 'end';
    vertical?: boolean;
    loop?: boolean;
}

export interface Slidy extends HTMLElement {
    gap: number;
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
    touchAction?: string;
}

// export interface UniqEvent extends PointerEvent {
//     changedTouches: Array<{ [key: string]: number }>;
//     deltaMode: number;
//     deltaX: number;
//     deltaY: number;
//     clientX: number;
//     clientY: number;
//     shiftKey: boolean;
//     target: EventTarget;
//     pointerId: number;
// }

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
