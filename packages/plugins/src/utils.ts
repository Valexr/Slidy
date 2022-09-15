import type { EventMap } from './types'

function loop<T>(
    array: ArrayLike<T>,
    cb: (item: typeof array[number], i: number) => void
) {
    for (let i = 0; i < array.length; i++) cb(array[i], i);
    return array;
}

function listen(node: HTMLElement, events: EventMap[], on = true): void {
    loop(events, (item) => {
        const state = on ? 'addEventListener' : 'removeEventListener';
        const [event, handle, options] = item;
        node[state](event, handle, options);
    });
}

export { listen, loop }