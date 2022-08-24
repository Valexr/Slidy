import { useState } from 'react';

interface Channel<T> {
    (): T;
    (setter: T | ((prev: T) => T)): void;
}

function useChannel<T>(init: T): Channel<T> {
    const [get, set] = useState(init);

    function controller(setter?: ((prev: T) => T) | T): T | void {
        if (arguments.length === 0) {
            return get;
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set((prev) => (typeof setter === 'function' ? setter(prev) : setter));
        }
    }

    return controller as unknown as Channel<T>;
}

export { useChannel };
export type { Channel };
