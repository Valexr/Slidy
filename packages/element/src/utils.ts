export function valued(value: unknown) {
    return !isNaN(value as number)
        || ['true', 'false'].includes(value as string)
        ? JSON.parse(value as string)
        : value
}