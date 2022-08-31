/**
 * Slidy options object
 * @see https://github.com/Valexr/slidy/tree/master/packages/core#options
 */
export interface Options {
    /**
     * Start index
     */
    index?: number;
    /**
     * Clamping sliding by index: `clamp - index + clamp`
     */
    clamp?: number;
    /**
     * Part of gap padding both start/end edges of slide `gap * indent`
     */
    indent?: number;
    /**
     * How many pixels to drag in the RAF `~16ms` to start move, `0` when sliding
     */
    sensity?: number;
    /**
     * Sliding gravity: `0(space) ~ 1(eath) ~ 2(underground)`
     */
    gravity?: number;
    /**
     * Sliding duration in ms
     */
    duration?: number;
    /**
     * Custom slide animation.
     * @see https://github.com/Valexr/Slidy/tree/master/packages/animation
     */
    animation?: AnimationFunc;
    /**
     * Inertion scroll easing behaviour.
     * @see https://github.com/Valexr/Slidy/tree/master/packages/easing
     */
    easing?: EasingFunc;
    /**
     * Control coordinate axis: `'x'`, `'y'`.
     */
    axis?: Axis;
    /**
     * Snapping side: `'start', 'center', 'end', 'deck', undefined`. Default clamp sliding by edges.
     */
    snap?: Snap;
    /**
     * Makes the slideshow continious.
     */
    loop?: boolean;
    /**
     * Current position
     * @readonly
     */
    _position?: number;
    /**
     * Children move direction
     * @readonly
     */
    _direction?: number;
    /**
     * Children axis flow: `0` or any `Number` as `true`
     * @readonly
     */
    _vertical?: number;
    /**
     * Children reverse flow: `-1` or `1`
     * @readonly
     */
    _reverse?: number;
}

type Axis = 'x' | 'y' | 'both';
/**
 * Clamp sliding by edges.
 */
type Snap = 'start' | 'center' | 'end' | 'deck';

export interface UniqEvent extends PointerEvent {
    touches: TouchList;
    deltaX: number;
    deltaY: number;
}

export type EventMap = [string, EventListener, AddEventListenerOptions?][];

export type Detail = Record<string, any> | HTMLCollectionOf<Child> | HTMLElement | Options | string;

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

/**
 * Animation function
 * @see https://github.com/Valexr/Slidy/tree/master/packages/animation
 */
export type AnimationFunc = (args: AnimationArgs) => Partial<CSSStyleDeclaration>;

export interface SlidyInstance {
    /**
     * Init slidy() instance
     */
    init: (node: HTMLElement) => void;
    /**
     * Update any property in options
     */
    update: (options: Partial<Options>) => void;
    /**
     * Scroll to `index`
     */
    to: (index: number) => void;
    /**
     * Remove event listners, observers & defaulted props on `slidy()` instance
     */
    destroy: () => void;
}
