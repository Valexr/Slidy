import type { Child, DispathDetail, Options, Slidy, UniqEvent, EventMap } from '../types';

function mount(node: Slidy): Promise<HTMLCollectionOf<Child>> {
    return new Promise((resolve, reject) => {
        let count = 0;
        if (node) {
            const mounting = setInterval(() => {
                count++;
                if (count >= 69) {
                    count = 0;
                    clearInterval(mounting);
                    reject(`Slidy haven't items`);
                } else if (node.children.length > 2) {
                    const mounted = Array.from(node.children).every(
                        (child) => child && child.isConnected
                    );
                    if (mounted) {
                        count = 0;
                        clearInterval(mounting);
                        resolve(init(node));
                    }
                }
            }, 16);
        }
    });
}

function init(node: Slidy): HTMLCollectionOf<Child> {
    const childs = node.children as HTMLCollectionOf<Child>;
    for (let index = 0; index < node.children.length; index++) {
        childs[index].index = index;
    }
    return childs;
}

function indexing(node: Slidy, index: number, options: Options): number {
    const length = node.children.length;
    return options.loop ? (index + length) % length : clamp(0, index, length - 1);
}

function coordinate(e: UniqEvent, options: Options): number {
    if (e.type === 'wheel') {
        const DELTA = Math.abs(e.deltaX) >= Math.abs(e.deltaY);
        return DELTA ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    } else {
        const mix = (e: UniqEvent): Touch => (e.touches && e.touches[0]) || e;
        return options.vertical ? mix(e).pageY : mix(e).pageX;
    }
}

function clamp(min: number, val: number, max: number): number {
    return Math.min(max, Math.max(min, val));
}

function dispatch(node: Slidy, name: string, detail?: DispathDetail): void {
    node.dispatchEvent(new CustomEvent(name, { detail: detail as CustomEventInit<unknown> }));
}

function listen(node: Window | Slidy, events: EventMap, on = true): void {
    for (const [event, handle, options] of events) {
        const state = on ? 'addEventListener' : 'removeEventListener';
        if (node) node[state](event, handle, options);
    }
}

function throttle(
    fn: (args: any) => void,
    ms: number,
    wait?: boolean,
    tm?: NodeJS.Timeout
): (args: any) => void {
    return (args) => {
        if (!wait) {
            fn(args);
            wait = true;
            tm && clearTimeout(tm);
            tm = setTimeout(() => (wait = false), ms);
        }
    };
}

export { init, mount, clamp, listen, dispatch, throttle, indexing, coordinate };
