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

function indexing(node: Slidy, index: number, options: Options) {
    const length = node.children.length;
    return options.loop ? (index + length) % length : clamp(0, index, length - 1);
}

let x = 0,
    y = 0,
    dx = 0,
    dy = 0;
function coordinate(e: UniqEvent, options: Options) {
    const mix = (e: UniqEvent): Touch => (e.touches && e.touches[0]) || e;
    const DELTA = Math.abs(dx) >= Math.abs(dy);
    if (e.type === 'wheel') {
        dx = e.deltaX;
        dy = e.deltaY;
    } else if (e.type === 'mousedown' || e.type === 'touchstart') {
        x = mix(e).pageX;
        y = mix(e).pageY;
    } else if (e.type === 'mousemove' || e.type === 'touchmove') {
        dx = x - mix(e).pageX;
        dy = y - mix(e).pageY;
        if (options.vertical ? !DELTA : DELTA) e.preventDefault();
        x = mix(e).pageX;
        y = mix(e).pageY;
    }
    return DELTA ? dx : (options.vertical && e.type !== 'wheel') || e.shiftKey ? dy : 0;
}

function clamp(min: number, val: number, max: number) {
    return Math.min(max, Math.max(min, val));
}

function dispatch(node: Slidy, name: string, detail?: DispathDetail) {
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
