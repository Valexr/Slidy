import type { Child, CssRules, DispathDetail, Options, Slidy } from '../types';

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

function getFPS(): Promise<number> {
    return new Promise((resolve) =>
        requestAnimationFrame((t1: number) =>
            requestAnimationFrame((t2: number) => resolve(1000 / (t2 - t1)))
        )
    );
}

function dispatch(node: Slidy, name: string, detail?: DispathDetail) {
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
    // console.log(styles)
    for (const property in styles) {
        node.style[property as keyof CssRules] = styles[property as keyof CssRules] as never;
    }
}

function indexing(node: Slidy, index: number, loop?: boolean) {
    return loop
        ? index < 0 ? node.children.length - 1
            : index > node.children.length - 1 ? 0 : index
        : clamp(0, index, node.children.length - 1);
}

function coordinate(e: WheelEvent | PointerEvent, options: Options): number {
    if (e.type === 'wheel') {
        const X = Math.abs((e as WheelEvent).deltaX) > Math.abs((e as WheelEvent).deltaY);
        if (X || e.shiftKey) e.preventDefault();
        return e.shiftKey
            ? (X ? Math.sign((e as WheelEvent).deltaX) : Math.sign((e as WheelEvent).deltaY))
            : X ? (e as WheelEvent).deltaX : 0;
    } else return options.vertical ? e.clientY : e.clientX;
}

// const uniQ = (e: UniqEvent): UniqEvent | { [key: string]: number } =>
//     e.changedTouches ? e.changedTouches[0] : e;

function clamp(min: number, val: number, max: number) {
    return Math.min(max, Math.max(min, val));
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

function delay(fn: (args: any) => void, ms: number, tm?: NodeJS.Timeout): (args: any) => void {
    tm && clearTimeout(tm);
    return (args: any) => {
        tm = setTimeout(() => fn(args), ms);
    };
}

function debounce(fn: (args: any) => void, ms: number) {
    let timeout: NodeJS.Timeout;
    return function (args: any) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(args), ms);
    };
}

export {
    clamp,
    coordinate,
    style,
    indexing,
    delay,
    dispatch,
    init,
    listen,
    throttle,
    debounce,
    mount,
    getFPS,
};
