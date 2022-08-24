export const execute = (...quenue: (undefined | ((arg: any) => void))[]) => {
    return (arg: any) => quenue.forEach((fn) => fn?.(arg));
};

export const clamp = (value: number, min: number, max: number) => {
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

export const noop = (...args: any[]) => {
    // this function serves no purpose
};

type Listener = ((arg: any) => void) | undefined;

export const listen = (element: HTMLElement, name: string, listener: Listener) => {
    element.addEventListener(name, execute(listener));
};

export const unlisten = (element: HTMLElement, name: string, listener: Listener) => {
    if (listener) element.removeEventListener(name, listener);
};

export const not = (value: unknown) => !value;

export const increment = (value: number) => value + 1;
