const isBrowser = Boolean(globalThis.window);

const store = <T>(current: T, subscribers = new Set<(value: T) => void>()) => {
    const subscribe = (cb: (value: T) => void) => {
        subscribers.add(cb), cb(current);

        return () => { subscribers.delete(cb); }
    };

    const push = (value: T) => subscribers.forEach((cb) => cb(value));
    const update = (fn: (prev: T) => T) => push((current = fn(current)));

    return [subscribe, update] as const;
};

const initial = isBrowser && matchMedia('(prefers-color-scheme: dark)').matches;
const [subscribe, update] = store(initial);

subscribe((dark) => {
    if (!isBrowser) return;

    document.documentElement.setAttribute('scheme', dark ? 'dark' : 'light');
});

export const darkTheme = {
    subscribe,
    switch: () => update((prev) => !prev),
};
