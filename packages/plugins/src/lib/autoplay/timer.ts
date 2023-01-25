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
  readonly interval: number;
}

function timer(callback: () => void, props: TimerAdditionalProps, state = State.Idle) {
  const taskQueue = new TaskQueue([
    () => {
      props.animation.play();
    },
    {
      await: props.interval
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
    play() {
      if (state !== State.Delayed) props.animation.play();

      state = State.Running;
      taskQueue.start();
    },
    pause() {
      if (state !== State.Delayed) state = State.Paused;

      props.animation.pause();
      taskQueue.pause();
    },
    stop() {
      state = State.Idle;
      props.animation.cancel();
      taskQueue.stop();
    }
  };
}

export { timer, };