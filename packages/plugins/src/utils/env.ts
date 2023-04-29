import { loop } from '.';
import type { EventMap } from '../types';

function listen(node: HTMLElement, events: EventMap[], on = true): void {
    const state = on ? 'addEventListener' : 'removeEventListener';
    loop(events, (item) => node[state](...item));
}

function dispatch(node: HTMLElement, event: string, detail?: EventInit) {
    const EVENT = detail ? new CustomEvent(event, detail)
        : new Event(event, { bubbles: true })
    return node.dispatchEvent(EVENT);
}

export { listen, dispatch };
