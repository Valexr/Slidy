/**
 * Slidy options object
 * @see https://github.com/Valexr/slidy/tree/master/packages/core#options
 */
interface Options {
    /**
     * Start index
     * * @readonly
     */
    index: number;
    /**
     * Snapping side: `'start', 'center', 'end', 'deck', undefined`. Default clamp sliding by edges.
     * * @readonly
     */
    snap: Snap;
    /**
     * Current position
     * @readonly
     */
    position: number;
    /**
     * Children axis flow: `0` or any `Number` as `true`
     * @readonly
     */
    vertical: number;
    /**
     * Children reverse flow: `-1` or `1`
     * @readonly
     */
    reverse: number;
}

type Snap = 'start' | 'center' | 'end' | 'deck';

interface Child extends HTMLElement {
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
