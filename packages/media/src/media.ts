import type { MediaQuery, BrowserStorage, Options } from './types'

export function mediaStorage({ storage, queries, getter }: Options) {
    if (typeof window == 'object') {
        const subscribers: Set<(matches: MediaQuery) => void> = new Set();
        const matches: MediaQuery = storage ? JSON.parse(store(storage).getItem(storage.key as string) as string) || {} : {}

        for (const query in queries) {
            const media = window.matchMedia(queries[query] as string)
            set(media as MediaQueryList, query)
            media.onchange = (e: MediaQueryListEvent) => set(e, query)
        }

        function set(media: MediaQueryList | MediaQueryListEvent, query: string) {
            matches[query] = media.matches;
            if (storage)
                store(storage).setItem(storage.key as string, JSON.stringify(matches));
            update(matches)
            getter && getter(matches)
        }

        function update(matches: MediaQuery) {
            subscribers.forEach(fn => fn(matches))
        }

        function subscribe(fn: (matches: MediaQuery) => void) {
            fn(matches)
            subscribers.add(fn);
            return () => unsubscribe(fn)
        }
        const unsubscribe = (fn: (matches: MediaQuery) => void): boolean => subscribers.delete(fn)

        return { matches, subscribe }
    } else return

    function store(storage: BrowserStorage): Storage {
        return storage.type === 'session' ? sessionStorage : localStorage
    }

    // function persist(storage: Partial<BrowserStorage>): boolean {
    //     try {
    //         store(storage).setItem('test', 'test');
    //         store(storage).removeItem('test');
    //         return true;
    //     } catch (e) {
    //         console.error(e)
    //         return false
    //     }
    // }
}
