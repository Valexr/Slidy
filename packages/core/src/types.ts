/** Slidy options object [docs](https://github.com/Valexr/slidy/tree/master/packages/core#options)*/
export interface Options {
    index?: number;
    clamp?: number;
    indent: number;
    sensity?: number;
    gravity?: number;
    duration?: number;
    easing: Easing;
    animation: Animation;
    snap?: 'start' | 'center' | 'end';
    layout?: 'reel' | 'stack';
    vertical?: boolean;
    loop?: boolean;
    position?: number;
}

// export interface Slidy extends HTMLElement {
//     scrollable: boolean;
//     start: number;
//     end: number;
//     gap: number;
// }

export interface Child extends HTMLElement {
    indx: number;
    size: number;
    dist: number;
    gap: number;
}

export interface UniqEvent extends PointerEvent {
    touches: TouchList;
    deltaX: number;
    deltaY: number;
}

export type EventMap = [string, EventListener, AddEventListenerOptions?][];

export type Detail =
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

export type AnimationArgs = {
    node: HTMLElement;
    options: Options;
    child: Child;
    i: number;
    position: number;
    pos: number;
    index?: number;
};

export type Animation = (args: AnimationArgs) => void;

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
