export function prepareValue(name: string, value: string): any {
    if (['animation', 'easing'].includes(name)) {
        return functioned(value as string);
    } else {
        return valued(value);
    }
}

export function valued(value: unknown): any {
    return !isNaN(value as number) || ['true', 'false'].includes(value as string)
        ? JSON.parse(value as string)
        : value;
}

export function functioned(value: string): any {
    return Function(`const fn = ${value as string}; return fn`)();
}
