import { createSignal } from 'solid-js';
import type { Setter } from 'solid-js';

type Channel<T> = Setter<T> & {
    (): T;
};

// todo: get rid of this
function channel<T>(init: T): Channel<T> {
    const [get, set] = createSignal(() => init);

    function controller(...args: T[]) {
        return args.length ? set(() => args[0]) : get();
    }

    return controller as Channel<T>;
}

export { channel };
export type { Channel };
