type Action = (node: HTMLElement, parameters: unknown) => {
    update: (parameters: Options) => void;
    destroy: () => void;
};
interface Options {
    status: boolean;
    interval?: number;
}
/**
 * Sets the interval timer and fires `play`, `pause`, and `stop` events.
 */
export declare function autoplay(node: HTMLElement, parameters?: Options): ReturnType<Action>;
export {};
