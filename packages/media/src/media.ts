import type { Options, Queries } from './types'

export function media({ queries, getter, cookie }: Partial<Options>) {

    const subscribers: Set<(matches: Queries) => void> = new Set();
    const matches: Queries = {}

    if (typeof window === 'object') {
        for (const query in queries) {
            const media = window.matchMedia(queries[query] as string)
            set(media, query)
            media.onchange = (e: MediaQueryListEvent) => set(e, query)
        }
    }

    function set(media: MediaQueryList | MediaQueryListEvent, query: string) {
        matches[query] = media.matches;
        update(matches)
        getter && getter(matches)
        cookie && (document.cookie = `mediaStorage=${JSON.stringify(matches)}`)
    }

    function update(matches: Queries) {
        subscribers.forEach(fn => fn(matches))
    }

    function subscribe(fn: (matches: Queries) => void) {
        fn(matches)
        subscribers.add(fn);
        return () => unsubscribe(fn)
    }
    const unsubscribe = (fn: (matches: Queries) => void): boolean => subscribers.delete(fn)

    return { matches, subscribe }
}
