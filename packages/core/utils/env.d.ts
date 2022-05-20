/// <reference types="node" />
import type { Child, CssRules, DispathDetail, Slidy, UniqEvent } from '../types';
declare function mount(node: Slidy): Promise<HTMLCollectionOf<Child>>;
declare function getFPS(): Promise<number>;
declare function dispatch(node: Slidy, name: string, detail?: DispathDetail): void;
declare function listen(node: Window | Slidy, events: [string, EventListener, AddEventListenerOptions?][], on?: boolean): void;
declare function init(node: Slidy, childs?: HTMLCollectionOf<Child>): HTMLCollectionOf<Child>;
declare function style(node: HTMLElement, styles: CssRules): void;
declare function indexing(node: Slidy, index: number, loop?: boolean): number;
declare function coordinate(e: UniqEvent, vertical?: boolean): number;
declare function clamp(min: number, val: number, max: number): number;
declare function throttle(fn: (args: any) => void, ms: number, wait?: boolean, tm?: NodeJS.Timeout): (args: any) => void;
declare function delay(fn: (args: any) => void, ms: number, tm?: NodeJS.Timeout): (args: any) => void;
export { clamp, coordinate, style, indexing, delay, dispatch, init, listen, throttle, mount, getFPS, };
