const error = (statement: string) => {
    return new Error('@slidy/autoplay: ' + statement);
}

type AnyFunction = (...args: any[]) => void;

type EventsMap<T extends string, K extends AnyFunction> = {
    [key in T]: K;
};

type Listenable = {
    addEventListener(key: string, listener: AnyFunction): void
    removeEventListener(key: string, listener: AnyFunction): void
}

/**
 * Listen to events, and return function to unlisten
 */
// prettier-ignore
const eventListener = <Listeners extends EventsMap<string, AnyFunction>>(el: Listenable, listeners: Listeners) => {
    const events = Object.entries(listeners);

    const listen = () => {
        for (const [name, listener] of events) {
            el.addEventListener(name, listener);
        }
    };

    const unlisten = () => {
        for (const [name, listener] of events) {
            el.removeEventListener(name, listener);
        }
    };

    return listen(), unlisten;
};

export { error, eventListener };