import { find } from './dom';
import type { Child, CssRules, DispathDetail, Options, Slidy, UniqEvent } from '../types';

function mount(node: Slidy, options: Options): Promise<HTMLCollectionOf<Child>> {
    return new Promise((resolve, reject) => {
        let count = 0;
        if (node) {
            const mounting = setInterval(() => {
                count++;
                if (count >= 69) {
                    count = 0;
                    clearInterval(mounting);
                    reject(`Slidy haven't items`);
                } else if (node.children.length) {
                    if (Array.from(node.children).every((child) => child.isConnected)) {
                        count = 0;
                        clearInterval(mounting);
                        const childs = init(node)
                        node.last = node.children.length - 1;
                        node.gap = find(node, options).gap();
                        node.start = find(node, options).position(0, 'start');
                        node.end = find(node, options).position(node.last, 'end');
                        node.size = find(node, options).node();
                        node.scrollable = find(node, options).scroll() > find(node, options).node()
                        resolve(childs);
                    }
                }
            }, 16);
        }
    });
}

function getFPS(): Promise<number> {
    return new Promise((resolve) =>
        requestAnimationFrame((t1: number) =>
            requestAnimationFrame((t2: number) => resolve(1000 / (t2 - t1)))
        )
    );
}

function dispatch(node: Slidy, name: string, detail?: DispathDetail): void {
    node.dispatchEvent(new CustomEvent(name, { detail: detail as CustomEventInit<unknown> }));
}

function listen(
    node: Window | Slidy,
    events: [string, EventListener, AddEventListenerOptions?][],
    on = true
): void {
    for (const [event, handle, options] of events) {
        const state = on ? 'addEventListener' : 'removeEventListener';
        if (node) node[state](event, handle, options);
    }
}

function init(node: Slidy, childs?: HTMLCollectionOf<Child>): HTMLCollectionOf<Child> {
    childs = node.children as HTMLCollectionOf<Child>;
    for (let index = 0; index < childs.length; index++) {
        childs[index].index = index;
    }
    return childs;
}

function style(node: HTMLElement, styles: CssRules): void {
    for (const property in styles) {
        node.style[property as keyof CssRules] = styles[property as keyof CssRules] as never;
    }
}

function indexing(node: Slidy, index: number, loop?: boolean) {
    if (loop) {
        if (index < 0) {
            return node.children.length - 1;
        } else if (index > node.children.length - 1) {
            return 0;
        } else return index;
    } else return clamp(0, index, node.children.length - 1,);
}

function coordinate(e: UniqEvent, vertical?: boolean): number {
    if (e.type === 'wheel') {
        const X = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        if (X || e.shiftKey) e.preventDefault();
        return e.shiftKey ? (X ? Math.sign(e.deltaX) : Math.sign(e.deltaY)) : X ? e.deltaX : 0;
    } else return vertical ? uniQ(e).clientY : uniQ(e).clientX;
}

const uniQ = (e: UniqEvent): UniqEvent | { [key: string]: number } =>
    e.changedTouches ? e.changedTouches[0] : e;

function clamp(min: number, val: number, max: number) {
    return Math.min(max, Math.max(min, val));
}

function throttle(
    fn: (args: UniqEvent) => void,
    ms: number,
    wait?: boolean,
    tm?: NodeJS.Timeout
): (args: UniqEvent) => void {
    return (args) => {
        if (!wait) {
            fn(args);
            wait = true;
            tm && clearTimeout(tm);
            tm = setTimeout(() => (wait = false), ms);
        }
    };
}

function delay(fn: (args: any) => void, ms: number, tm?: NodeJS.Timeout): (args: any) => void {
    tm && clearTimeout(tm);
    return (args: any) => {
        tm = setTimeout(() => fn(args), ms);
    };
}

export { clamp, coordinate, style, indexing, delay, dispatch, init, listen, throttle, mount, getFPS };
