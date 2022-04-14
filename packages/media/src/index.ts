import type { MediaQuery, BrowserStorage } from './types'

export function mediaStorage(storage?: Partial<BrowserStorage>, queries?: Partial<MediaQuery>): MediaQuery {
    const base = {
        queries: {
            xs: '(max-width: 480px)',
            sm: '(max-width: 600px)',
            md: '(max-width: 840px)',
            lg: '(max-width: 960px)',
            xl: '(max-width: 1280px)',
            xxl: '(min-width: 1281px)',
            landscape: '(orientation: landscape)',
            portrait: '(orientation: portrait)',
            dark: '(prefers-color-scheme: dark)',
            light: '(prefers-color-scheme: light)',
            mouse: '(hover: hover)',
            touch: '(hover: none)'
        },
        storage: { type: 'session', key: 'media-storage' }
    }

    queries = { ...base.queries, ...queries }
    storage = { ...base.storage, ...storage }

    if (persist(storage)) {
        const match: MediaQuery = JSON.parse(store(storage).getItem(storage.key as string) as string) || {};

        for (const query in queries) {
            const media = window.matchMedia(queries[query] as string)
            setMatches(media, query)
            media.onchange = (e) => setMatches(e, query)
        }

        function setMatches(media: MediaQueryList | MediaQueryListEvent, query: string) {
            if ('target' in media) match[query] = media.matches;
            else match[query] ??= media.matches;
            if (storage)
                store(storage).setItem(storage.key as string, JSON.stringify(match));
        }

        return match
    } else return queries

    function store(storage: Partial<BrowserStorage>): Storage {
        return storage.type === 'session' ? sessionStorage : localStorage
    }

    function persist(storage: Partial<BrowserStorage>): boolean {
        try {
            store(storage).setItem('test' as string, 'test' as string);
            store(storage).removeItem('test' as string);
            return true;
        } catch (e) {
            console.error(e)
            return false
        }
    }
}

