function loop<T>(array: ArrayLike<T>, cb: (item: (typeof array)[number], i: number) => void) {
    for (let i = 0; i < array.length; i++) cb(array[i], i);
    return array;
}

export { loop };
