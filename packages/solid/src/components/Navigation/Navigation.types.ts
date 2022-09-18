interface Options {
    current: number;
    start: number;
    end: number;
    ordinal: boolean;
    vertical: boolean;
    limit: number;
    siblings: number;
}

type Require<T extends object, Keys extends keyof T> = Pick<T, Keys> & Partial<Omit<T, Keys>>;

export type Props = Require<Options, 'start' | 'current' | 'end'>;
