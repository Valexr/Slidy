import { writable } from 'svelte/store';

export type MediaQuery = {
    [key: string]: boolean | string;
};

type BrowserStorage = {
    type: string
    key: string
}

const mediaQueries: MediaQuery = {
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
    touch: '(hover: none)',
};

export const media = watchMedia(mediaQueries, { key: 'gui-media' })

function watchMedia(queries: MediaQuery, storage: Partial<BrowserStorage>) {
    const { subscribe, set, update } = writable({});
    const base = { type: 'session', key: 'media-query' }

    storage = { ...base, ...storage }

    if (persist(storage)) {
        const match: MediaQuery = JSON.parse(persist(storage).getItem(storage.key as string) as string) || {};

        for (const query in queries) {
            const media = window.matchMedia(queries[query] as string)
            setMatches(media, query)
            media.onchange = (e) => setMatches(e, query)
        }

        subscribe((match: MediaQuery): void => persist(storage).setItem(storage.key as string, JSON.stringify(match)));

        function setMatches(media: MediaQueryList | MediaQueryListEvent, query: string) {
            if ('target' in media) match[query] = media.matches;
            else match[query] ??= media.matches;
            set(match);
            persist(storage).setItem(storage.key as string, JSON.stringify(match));
        }
    }

    function persist(storage: Partial<BrowserStorage>): Storage {
        try {
            const store = storage.type === 'session' ? sessionStorage : localStorage
            store.setItem(storage.key as string, storage.key as string);
            store.removeItem(storage.key as string);
            return store;
        } catch (e) {
            console.error(e)
        }
    }

    return { subscribe, set, update }
}

