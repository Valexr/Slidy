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
    getter?: Getter,
    cookie?: boolean
}

export type { Options, MediaQuery, BrowserStorage, Getter };