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
