const error = (statement: string) => {
    return new Error('@slidy/autoplay: ' + statement);
}

const eventListener = (node: HTMLElement) => {
    const ael = (method: string, handler: () => any) => {
        addEventListener.call(node, method, handler);
    };

    const rel = (method: string, handler: () => any) => {
        removeEventListener.call(node, method, handler);
    };

    return [ael, rel] as const;
}

export { error, eventListener }