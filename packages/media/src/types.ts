type MediaQuery = {
    [key: string]: boolean | string | undefined;
};

type BrowserStorage = {
    type: string
    key: string
}

type Getter = (matches: MediaQuery) => void

interface Options {
    storage?: BrowserStorage;
    queries?: MediaQuery,
    getter?: Getter
}

export type { Options, MediaQuery, BrowserStorage }