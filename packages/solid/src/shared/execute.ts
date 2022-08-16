const execute = (...quenue: (undefined | ((arg: any) => void))[]) => {
    return (arg: any) => quenue.forEach((fn) => fn?.(arg));
};

export { execute };
