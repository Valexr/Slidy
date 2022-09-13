export interface Options {
    readonly component: string;
}

export type Props = Options & Record<string, unknown>;
