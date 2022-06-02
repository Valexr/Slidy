import type { Child, CssRules, DispathDetail, Options, Slidy, UniqEvent, EventMap } from '../types';

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
                } else if (node.children.length > 2) {
                    const mounted = Array.from(node.children).every(
                        (child) => child && child.isConnected
                    );
                    if (mounted) {
                        count = 0;
                        clearInterval(mounting);
                        resolve(init(node, options));
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

function listen(node: Window | Slidy, events: EventMap, on = true): void {
    for (const [event, handle, options] of events) {
        const state = on ? 'addEventListener' : 'removeEventListener';
        if (node) node[state](event, handle, options);
    }
}

function init(
    node: Slidy,
    options: Options,
    childs?: HTMLCollectionOf<Child>
): HTMLCollectionOf<Child> {
    childs = node.children as HTMLCollectionOf<Child>;
    for (let index = 0; index < childs.length; index++) {
        childs[index].index = index;
        // childs[index].size = options.vertical ? childs[index].offsetHeight : childs[index].offsetWidth;
        // childs[index].pos = options.vertical ? childs[index].offsetTop : childs[index].offsetLeft;
        // childs[index].style.position = 'absolute';
    }
    return childs;
}

function style(node: HTMLElement, styles: Partial<CssRules>): void {
    for (const property in styles) {
        const PROP = property as keyof CssRules;
        node.style[PROP as never] = styles[PROP] as never;
    }
}

function indexing(node: Slidy, index: number, options: Options) {
    return options.loop
        ? index < 0
            ? node.children.length + index
            : index > node.children.length - 1
                ? index - node.children.length
                : index
        : clamp(0, index, node.children.length - 1);
}

let x = 0,
    y = 0,
    dx = 0,
    dy = 0;
function coordinate(e: UniqEvent, options: Options) {
    const DELTA = Math.abs(dx) > Math.abs(dy);
    if (e.type === 'wheel') {
        dx = e.deltaX
        dy = e.deltaY
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
    return DELTA ? dx : ((options.vertical && e.type !== 'wheel') || e.shiftKey) ? dy : 0;
}

function mix(e: UniqEvent): Touch {
    return (e.touches && e.touches[0]) || e;
}

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

// function throttle(fn, wait) {
//     var time = Date.now();

//     return function (event) {
//         // we dismiss every wheel event with deltaY less than 4
//         if (Math.abs(event.deltaY) < 4) return

//         if ((time + wait - Date.now()) < 0) {
//             fn(event);
//             time = Date.now();
//         }
//     }
// }

// function throttle(func, ms) {

//     let isThrottled = false,
//         savedArgs,
//         savedThis;

//     function wrapper() {

//         if (isThrottled) { // (2)
//             savedArgs = arguments;
//             savedThis = this;
//             return;
//         }

//         func.apply(this, arguments); // (1)

//         isThrottled = true;

//         setTimeout(function () {
//             isThrottled = false; // (3)
//             if (savedArgs) {
//                 wrapper.apply(savedThis, savedArgs);
//                 savedArgs = savedThis = null;
//             }
//         }, ms);
//     }

//     return wrapper;
// }

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
