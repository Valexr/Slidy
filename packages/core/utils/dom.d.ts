import type { Options, Slidy } from '../types';
declare const find: (node: Slidy, options: Options) => {
    index: (target: number, snap: string | undefined) => number;
    position: (index: number | undefined, snap?: string | undefined) => number;
    distance: (index: number) => number;
    size: (index: number) => number;
    gap: () => number;
};
declare function shuffle(node: Slidy, direction: number): void | null;
declare function history(node: Slidy, direction: number, options: Options): number;
declare function replace(node: Slidy, options: Options): number;
export { find, history, replace, shuffle };
