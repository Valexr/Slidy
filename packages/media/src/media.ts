import type { Options, Queries } from './types';

export function media<T extends string>({ queries, getter, cookie }: Partial<Options<T>>) {
    const subscribers: Set<(matches: Queries<T>) => void> = new Set();
    const matches = {} as Queries<T>;

    if (window) {
        for (const query in queries) {
            const media = window.matchMedia(queries[query] as string);
            set(media, query);
            media.onchange = (e: MediaQueryListEvent) => set(e, query);
        }
    }

    function set(media: MediaQueryList | MediaQueryListEvent, query: string) {
        matches[query as keyof Queries<T>] = media.matches;
        update(matches);
        getter && getter(matches);
        cookie && (document.cookie = `media=${JSON.stringify(matches)}`);
    }

    function update(matches: Queries<T>) {
        subscribers.forEach((fn) => fn(matches));
    }

    function subscribe(fn: (matches: Queries<T>) => void) {
        fn(matches);
        subscribers.add(fn);
        return () => unsubscribe(fn);
    }
    const unsubscribe = (fn: (matches: Queries<T>) => void): boolean => subscribers.delete(fn);

    return { matches, subscribe };
}
