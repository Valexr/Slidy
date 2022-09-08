import type { Options } from '../types';

function clamp(min: number, val: number, max: number): number {
    return Math.min(max, Math.max(min, val));
}

function throttle(
    fn: (args: any) => void,
    ms: number,
    th?: boolean | number,
    wait?: boolean,
    tm?: NodeJS.Timeout
): (args: any) => void {
    return th
        ? (args) => {
            if (!wait) {
                fn(args);
                wait = true;
                clearTimeout(tm);
                tm = setTimeout(() => (wait = false), ms);
            }
        }
        : (args) => fn(args);
}

function loop(
    array: string | any[] | HTMLCollection | Array<Partial<Options>>,
    cb: (item: any, i: number) => void
) {
    for (let i = 0; i < array.length; i++) {
        cb(array[i], i);
    }
    return array;
}

const { assign, entries } = Object;

export { clamp, throttle, loop, assign, entries };
