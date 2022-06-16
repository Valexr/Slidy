import type { AnimationFunc } from "@slidy/animation";

/** Slidy options object [docs](https://github.com/Valexr/slidy/tree/master/packages/core#options)*/
export interface Options {
    index?: number;
    clamp?: number;
    indent: number;
    sensity?: number;
    gravity?: number;
    duration?: number;
    animation?: AnimationFunc;
    easing: Easing;
    layout?: Layout;
    snap?: Snap;
    vertical?: boolean;
    loop?: boolean;
}

// type Keys = keyof typeof opts;
// type Values = typeof opts[Keys];

export type Layout = 'deck' | 'grid' | 'reel' | 'stack';
export type Snap = 'start' | 'center' | 'end';

// export type OptionsValue = number | boolean | Easing | AnimationFunc | Layout

export interface Child extends HTMLElement {
    active: boolean;
    index: number;
    zindex: number;
    size: number;
    dist: number;
    pos: number;
    track: number;
    exp: number;
    turn: number;
}

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
export type Easing = (t: number) => number;

export type FunctionDom =
    | (() => {
          gap(): number;
          end(): number;
          start(): number;
          scrollable(): boolean;
          distance(index: number, snap?: 'start' | 'center' | 'end' | undefined): number;
          index(target: number, snap?: 'start' | 'center' | 'end' | undefined): number;
          edges(index?: number, position?: number, direction?: number): boolean;
          snap(index: number): 'start' | 'center' | 'end' | undefined;
          history(direction: number): number;
          replace(): number;
      })
    | (() => {
          (): any;
          new (): any;
          edges: { (arg0: number | undefined, arg1: number, arg2: number): any; new (): any };
          replace: { (): number; new (): any };
          index: { (arg0: number, arg1: string | undefined): number | undefined; new (): any };
          history: { (arg0: number): number; new (): any };
          scrollable: { (): any; new (): any };
          start: { (): number; new (): any };
          end: { (): number; new (): any };
          snap: { (arg0: number): string | undefined; new (): any };
          distance: { (arg0: number, arg1: string | undefined): number; new (): any };
      });
