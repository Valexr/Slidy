type Queries = {
    [key: string]: boolean | string | undefined;
};

type Getter = (matches: Queries) => void

interface Options {
    queries: Queries,
    getter: Getter,
    cookie: boolean
}

export type { Options, Queries, Getter };