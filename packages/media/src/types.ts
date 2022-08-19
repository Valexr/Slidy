type Queries<T extends string> = Record<T, string | boolean | undefined>;

type Getter<T extends string> = (matches: Queries<T>) => void;

interface Options<T extends string> {
    queries: Queries<T>;
    getter: Getter<T>;
    cookie: boolean;
}

export type { Options, Queries, Getter };
