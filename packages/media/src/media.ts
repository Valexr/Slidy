import type { MediaQuery, Options } from './types'

export function mediaStorage({ queries, getter, storage, cookie }: Options) {

    const subscribers: Set<(matches: MediaQuery) => void> = new Set();
    const matches: MediaQuery = (storage && typeof window === 'object')
        && JSON.parse(storage.getItem('mediaStorage') as string)
        || {}

    if (typeof window === 'object') {
        for (const query in queries) {
            const media = window.matchMedia(queries[query] as string)
            set(media, query)
            media.onchange = (e) => set(e, query)
        }
    }

    function set(media: MediaQueryList | MediaQueryListEvent, query: string) {
        matches[query] = media.matches;
        storage && storage.setItem('mediaStorage', JSON.stringify(matches));
        cookie && (document.cookie = `mediaStorage=${JSON.stringify(matches)}`)
        getter && getter(matches)
        update(matches)
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
}
