import { TaskQueue } from './task-queue'

const enum State {
  Idle,
  Running,
  Paused,
  Delayed,
}

interface TimerAdditionalProps {
  readonly animation: Animation;
  readonly delay: number;
}

function timer(callback: () => void, interval: number, props: TimerAdditionalProps) {
  let state = State.Idle

  function pause() {
    if (state !== State.Delayed) state = State.Paused;

    props.animation.pause();
    taskQueue.pause();
  }

  function resume() {
    if (state !== State.Delayed) {
      props.animation.play();
    }

    state = State.Running;
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
      state = State.Delayed;
    },
    {
      await: props.delay
    },
    () => {
      state = State.Running;
      props.animation.cancel();
    }
  ]);

  return {
    play,
    pause,
    resume,
    stop,
  };
}

export { timer, };