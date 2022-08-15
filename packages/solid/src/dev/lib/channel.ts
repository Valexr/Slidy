import { createSignal } from 'solid-js';

interface Channel<T> {
    (): T;
    (setter: T | ((prev: T) => T)): T;
}

function channel<T>(init: T): Channel<T> {
    const [get, set] = createSignal(init);

    function controller(): T;
    function controller(setter: ((prev: T) => T) | T): T;
    function controller(setter?: ((prev: T) => T) | T): T {
        if (arguments.length === 0) {
            return get();
        } else {
            return set((prev) => (setter instanceof Function ? setter(prev) : setter));
        }
    }

    return controller;
}

export { channel };
export type { Channel };
