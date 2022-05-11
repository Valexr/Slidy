interface CallbackData {
    /** Current timestamp */
    now: number;
    /** Start time */
    start: number;
    /** Elapsed time from start */
    elapsed: number;
    /** Stop loop cycle */
    stop: StopRaf;
}

/** Stop loop cycle */
export type StopRaf = () => void;

type RafCallback = (data: CallbackData) => void;

/** Run fn each animation frame */
export function animate(fn: RafCallback) {
    let id: number;
    let start: number;
    let stopped = false;

    const frame = () => {
        id = requestAnimationFrame(callback);
    };

    const stop: StopRaf = () => {
        stopped = true;
        cancelAnimationFrame(id);
    };

    function callback(now: number) {
        if (!start) start = now;

        fn({
            now,
            start,
            elapsed: start - now,
            stop,
        });

        !stopped && frame();
    }

    frame();
    return stop;
}
