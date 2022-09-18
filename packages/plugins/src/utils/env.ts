import { loop } from './utils';
import type { EventMap, TimerInstace } from '../types';

function timer(callback: () => void, interval: number, delay = 0): TimerInstace {
    let tid: NodeJS.Timer,
        start = 0,
        remaining = 0,
        state = 0; //  0 = idle, 1 = running, 2 = paused, 3 = resumed

    function pause() {
        if (state !== 1) return;
        remaining = delay || interval - (performance.now() - start);
        clearInterval(tid);
        state = 2;
    }

    function resume() {
        if (state !== 2) return;
        state = 3;
        setTimeout(timeoutCallback, remaining);
    }

    function stop() {
        state = 0;
        clearInterval(tid);
    }

    function play() {
        tid = setInterval(callback, interval);
        start = performance.now();
        state = 1;
    }

    function timeoutCallback() {
        if (state !== 3) return;
        callback();
        play();
    }

    return { play, pause, resume, stop };
}

function listen(node: HTMLElement, events: EventMap, on = true): void {
    loop(events, (item) => {
        const state = on ? 'addEventListener' : 'removeEventListener';
        const [event, handle, options] = item;
        node[state](event, handle, options);
    });
}

function dispatch(node: HTMLElement, event: string) {
    return node.dispatchEvent(new CustomEvent(event));
}

export { timer, type TimerInstace, listen, dispatch };
