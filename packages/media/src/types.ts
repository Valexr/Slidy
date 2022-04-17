type MediaQuery = {
    [key: string]: boolean | string | undefined;
};

type Getter = (matches: MediaQuery) => void

interface Options {
    queries?: MediaQuery,
    getter?: Getter,
    storage?: Storage;
    cookie?: boolean
}

export type { Options, MediaQuery, Getter };