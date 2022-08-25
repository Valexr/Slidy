export const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const clamp = (min: number, value: number, max: number) => {
    return Math.min(Math.max(min, value), max);
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (fn: unknown): fn is Function => {
    return typeof fn === 'function';
};

export const format = (pattern: string, ...replacements: (string | number)[]) => {
    for (const replacement of replacements) pattern = pattern.replace('%s', replacement.toString());

    return pattern;
};

export const execute = (...quenue: (undefined | ((arg: any) => void))[]) => {
    return (arg: any) => quenue.forEach((fn) => fn?.(arg));
};

export const noop = (...args: any[]) => {
    // this function serves no purpose
};

export const not = (value: unknown) => !value;

export const increment = (value: number) => value + 1;

