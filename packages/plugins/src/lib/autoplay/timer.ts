import { TaskQueue } from './task-queue'

const enum State {
  Idle,
  Running,
  Paused,
}

interface TimerAdditionalProps {
  readonly animation: Animation;
  readonly delay: number;
}

function timer(callback: () => void, interval: number, props: TimerAdditionalProps) {
  let state = State.Idle

  // todo: if Delayed, and then paused, it breaks
  function pause() {
    if (state !== State.Running) return;

    state = State.Paused;
    props.animation.pause();
    taskQueue.pause()
  }

  function resume() {
    if (state !== State.Paused) return play();

    state = State.Running;
    props.animation.play();
    taskQueue.start();
  }

  function stop() {
    state = State.Idle;
    props.animation.cancel();
    taskQueue.stop();
  }

  function play() {
    state = State.Running;
    taskQueue.start();
  }

  const taskQueue = new TaskQueue([
    () => {
      props.animation.play();
    },
    {
      await: interval
    },
    () => {
      callback();
      props.animation.cancel();
    },
    {
      await: props.delay
    },
  ]);

  return {
    play,
    pause,
    resume,
    stop,
  };
}

export { timer, };