import { createSignal } from 'solid-js';
import type { Setter } from 'solid-js';

interface Channel<T> {
    (): T;
    (setter: Parameters<Setter<T>>[0]): T;
}

function channel<T>(init: T): Channel<T> {
    const [get, set] = createSignal(init);

    function controller() {
        return !arguments.length ? get() : set(arguments[0]);
    }

    return controller as Channel<T>;
}

export { channel };
export type { Channel };
