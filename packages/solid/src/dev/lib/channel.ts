import { createSignal } from 'solid-js';
import type { Setter } from 'solid-js'

interface Channel<T> {
    (): T;
    (setter: Parameters<Setter<T>>[0]): T;
}

function channel<T>(init: T): Channel<T> {
    const [get, set] = createSignal(init);

    function controller(setter?: Parameters<Setter<T>>[0]) {
        if (arguments.length === 0) {
            return get();
        } else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return set(setter!);
        }
    }

    return controller as Channel<T>;
}

export { channel };
export type { Channel };
