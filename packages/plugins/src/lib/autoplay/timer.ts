const enum State {
  Idle,
  Running,
  Paused,
}

type Timer = /** number */ NodeJS.Timer;

function timer(callback: () => void, interval: number) {
  let iid: Timer, tid: Timer,
    state = State.Idle,
    start = 0,
    remaining = interval

  function pause() {
    if (state !== State.Running) return;

    state = State.Paused;
    clearInterval(iid);
    clearTimeout(tid);

    remaining = interval - Math.abs(performance.now() - start);
  }

  function resume() {
    if (state !== State.Paused) return play();

    state = State.Running;
    tid = setTimeout(timeoutCallback, remaining);
  }

  function stop() {
    state = State.Idle;
    clearInterval(iid);
  }

  function play() {
    state = State.Running;
    start = performance.now();

    iid = setInterval(() => {
      callback()
      start = performance.now();
    }, interval);
  }

  function timeoutCallback() {
    if (state !== State.Running) return;

    callback();
    play();
  }

  return {
    play,
    pause,
    resume,
    stop,
    get remaining() {
      return remaining
    }
  };
}

export { timer, };