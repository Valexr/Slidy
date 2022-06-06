/** Slidy options object [docs](https://github.com/Valexr/slidy/tree/master/packages/core#options)*/
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
}

// export interface Slidy extends HTMLElement {
//     scrollable: boolean;
//     start: number;
//     end: number;
//     gap: number;
// }

export interface Child extends HTMLElement {
    index: number;
}

export interface UniqEvent extends PointerEvent {
    touches: TouchList;
    deltaX: number;
    deltaY: number;
}

export type EventMap = [string, EventListener, AddEventListenerOptions?][];

export type DispathDetail =
    | { [key: string]: any }
    | CustomEventInit<unknown>
    | HTMLCollectionOf<Child>
    | Options
    | HTMLElement
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
