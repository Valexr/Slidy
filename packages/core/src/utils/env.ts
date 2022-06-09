import type { Options, UniqEvent, Detail, EventMap } from '../types';

function mount(node: HTMLElement) {
    return new Promise((resolve, reject) => {
        let count = 0;
        if (node) {
            const mounting = setInterval(() => {
                count++;
                if (count >= 69) {
                    count = 0;
                    clearInterval(mounting);
                    reject('few slides');
                } else if (node.children.length) {
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

function init(node: HTMLElement) {
    return loop(node.children, (item, i) => (item.index = i));
}

function loop(
    array: string | any[] | HTMLCollection | Array<Partial<Options>>,
    cb: (item: any, i: number) => void
) {
    for (let i = 0; i < array.length; i++) {
        cb(array[i], i);
    }
    return array;
}

function indexing(node: HTMLElement, options: Options, index: number): number {
    const length = node.children.length;
    return options.loop ? (index + length) % length : clamp(0, index, length - 1);
}

function coordinate(e: UniqEvent, options: Options): number {
    if (e.type === 'wheel') {
        const X = Math.abs(e.deltaX) >= Math.abs(e.deltaY);
        return X ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    } else {
        const mix = (e: UniqEvent): Touch => (e.touches && e.touches[0]) || e;
        return options.vertical ? mix(e).pageY : mix(e).pageX;
    }
}

function clamp(min: number, val: number, max: number): number {
    return Math.min(max, Math.max(min, val));
}

function dispatch(node: HTMLElement, name: string, detail?: Detail): void {
    node.dispatchEvent(new CustomEvent(name, { detail: detail as CustomEventInit<unknown> }));
}

function listen(node: Window | HTMLElement, events: EventMap, on = true): void {
    loop(events, (item) => {
        const state = on ? 'addEventListener' : 'removeEventListener';
        const [event, handle, options] = item;
        node[state](event, handle, options);
    });
}

function throttle(
    fn: (args: any) => void,
    ms: number,
    th?: boolean | number,
    wait?: boolean,
    tm?: NodeJS.Timeout
): (args: any) => void {
    return th
        ? (args) => {
              if (!wait) {
                  fn(args);
                  wait = true;
                  clearTimeout(tm);
                  tm = setTimeout(() => (wait = false), ms);
              }
          }
        : (args) => fn(args);
}

export { init, mount, clamp, listen, dispatch, throttle, indexing, coordinate, loop };
