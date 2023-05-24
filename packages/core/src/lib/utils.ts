import type { Options, PluginFunc } from '../types';

const { assign, entries } = Object;
const { abs, exp, floor, min, max, round, sign } = Math;

function clamp(mn: number, val: number, mx: number): number {
    return min(mx, max(mn, val));
}

function throttle(fn: (args: any) => void, ms = 50, th: boolean | number = true): (args: any) => void {
    let tm = 0;
    return th
        ? (args) => {
            const now = performance.now();
            if (now - tm >= ms) {
                fn(args);
                tm = now;
            }
        } : (args) => fn(args);
}

function loop(
    array: string | any[] | HTMLCollection | Array<Partial<Options>> | PluginFunc[],
    cb: (item: typeof array[number], i: number, array: any) => void
) {
    for (let i = 0; i < array.length; i++) cb(array[i], i, array);
    return array;
}

export { assign, abs, exp, floor, max, round, sign, clamp, entries, loop, throttle };
