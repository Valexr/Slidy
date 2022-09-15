type TimerInstace = {
    play: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
}

function timer(callback: () => void, interval: number): TimerInstace {
    let tid: NodeJS.Timer,
        start = 0,
        remaining = 0,
        state = 0; //  0 = idle, 1 = running, 2 = paused, 3 = resumed

    function pause() {
        if (state !== 1) return;
        remaining = interval - (performance.now() - start);
        clearInterval(tid);
        state = 2;
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
        tid = setInterval(callback, interval);
        start = performance.now();
        state = 1;
    }

    function timeoutCallback() {
        if (state !== 3) return;
        callback();
        play()
    }

    return { play, pause, resume, stop }
}

export { timer }