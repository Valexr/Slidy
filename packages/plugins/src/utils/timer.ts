import type { TimerInstace } from '../types';

function timer(callback: () => void, interval: number, delay = 0): TimerInstace {
    let tid: NodeJS.Timer,
        state = 0, //  0 = idle, 1 = running, 2 = paused, 3 = resumed
        start = 0,
        remaining = interval

    function pause() {
        if (state !== 1) return;
        state = 2;
        remaining = delay || interval - Math.abs(performance.now() - start);
        clearInterval(tid);
    }

    function resume() {
        if (state !== 2) return;
        state = 3;
        setTimeout(timeoutCallback, remaining);
    }

    function stop() {
        state = 0;
        clearInterval(tid);
    }

    function play() {
        state = 1;
        start = performance.now();
        tid = setInterval(() => {
            callback()
            start = performance.now();
        }, interval);
    }

    function timeoutCallback() {
        if (state !== 3) return;
        callback();
        play()
    }

    return { play, pause, resume, stop };
}

export { timer, type TimerInstace };