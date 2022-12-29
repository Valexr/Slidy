import { loop } from '.';
import type { EventMap } from '../types';

function listen(node: HTMLElement, events: EventMap, on = true): void {
    loop(events, (item) => {
        const state = on ? 'addEventListener' : 'removeEventListener';
        const [event, handle, options] = item;
        node[state](event, handle, options);
    });
}

function dispatch(node: HTMLElement, event: string, detail?: EventInit) {
    const EVENT = detail ? new CustomEvent(event, detail)
        : new Event(event, { bubbles: true })
    return node.dispatchEvent(EVENT);
}

export { listen, dispatch };
