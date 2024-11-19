export declare const randInt: (min: number, max: number) => number;
export declare const clamp: (min: number, value: number, max: number) => number;
export declare const isFunction: (fn: unknown) => fn is (..._: any[]) => any;
export declare const format: (pattern: string, ...replacements: (string | number)[]) => string;
export declare const execute: (...quenue: (undefined | ((arg: any) => void))[]) => (arg: any) => void;
export declare const noop: () => void;
export declare const not: (value: unknown) => boolean;
export declare const increment: (value: number) => number;
