/** Slidy options object [docs](https://github.com/Valexr/slidy/tree/master/packages/core#options)*/
export interface Options {
    index: number;
    position: number;
    clamp?: number;
    indent?: number;
    sensity?: number;
    gravity?: number;
    duration?: number;
    animation?: AnimationFunc;
    easing?: EasingFunc;
    axis?: Axis;
    snap?: Snap;
    loop?: boolean;
    vertical?: number;
    reverse?: number;
}

// type Keys = keyof typeof opts;
// type Values = typeof opts[Keys];

type Axis = 'x' | 'y' | 'both';
type Snap = 'start' | 'center' | 'end' | 'deck';

export interface UniqEvent extends PointerEvent {
    touches: TouchList;
    deltaX: number;
    deltaY: number;
}

export type EventMap = [string, EventListener, AddEventListenerOptions?][];

export type Detail =
    | { [key: string]: any }
    | HTMLCollectionOf<Child>
    | HTMLElement
    | Options
    | string;

/** Easing function.
 * @param t value from 0 to 1
 * @returns value from 0 to 1
 * @default linear
 * @see https://easings.net
 */
export type EasingFunc = (t: number) => number;

export interface Child extends HTMLElement {
    i: number;
    index: number;
    active: number;
    size: number;
    dist: number;
    track: number;
    turn: number;
    exp: number;
}

export type AnimationArgs = {
    node: HTMLElement;
    child: Child;
    options: Partial<Options>;
    translate: string;
};

export type AnimationFunc = (args: AnimationArgs) => Partial<CSSStyleDeclaration>;
