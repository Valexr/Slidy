/**
 * Slidy options object
 * @see https://github.com/Valexr/slidy/tree/master/packages/core#options
 */
export interface Options {
    /**
     * Sliding index
     */
    index?: number;
    /**
     * Sliding position. Setter working only in `snap: undefined` mode;
     */
    position?: number;
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
     * Slidy plugins.
     * @see https://github.com/Valexr/Slidy/tree/master/packages/plugins
     */
    plugins?: ReturnType<PluginFunc>[]
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
     * Children move direction
     * @readonly
     */
    direction?: number;
    /**
     * Children vertical flow
     * @readonly
     */
    vertical?: boolean;
    /**
     * Children reverse flow: `-1` or `1`
     * @readonly
     */
    reverse?: number;
    /**
     * Children full width size gaps > target node size
     * @readonly
     */
    scrollable?: boolean;
}

type Axis = 'x' | 'y' | 'both';
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
 * ```ts
 * AnimationArgs = {
 *  node: HTMLElement;
 *  child: Child;
 *  options: Partial<Options>;
 *  translate: string;
 * }
 * ```
 */
export type AnimationFunc = (args: AnimationArgs) => Partial<CSSStyleDeclaration>;

export type PluginArgs = {
    node: HTMLElement,
    options: Options,
    instance: SlidyInstance
}

/**
 * Plugin function
 * @see https://github.com/Valexr/Slidy/tree/master/packages/plugin
 * 
 * ```ts
 * PluginArgs = {
 *  node: HTMLElement,
 *  options: Options,
 *  instance: SlidyInstance
 * }
 * ```
 */
export type PluginFunc = (params: any) => (args: PluginArgs) => void;

export interface Dom {
    edges: (index?: number) => boolean;
    distance: (index: number, snap?: Options['snap']) => number;
    index(target: number): number;
    position(replace?: boolean): number;
    swap(dir: number): number;
    sense(e: UniqEvent, pos: number, sensity?: number): boolean;
    animate(): void;
}

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
     * Scroll to `index` or `position`
     */
    to: (index: number, position?: number) => void;
    /**
     * Remove event listners, observers & defaulted props on `slidy()` instance
     */
    destroy: () => Promise<void>;
}
