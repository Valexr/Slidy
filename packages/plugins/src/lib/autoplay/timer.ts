import type { AutoplayButton } from './button';
import { TaskQueue } from './task-queue';

const enum State {
    Idle,
    Running,
    Paused,
    Delayed,
}

interface TimerAdditionalProps {
    readonly animation: AutoplayButton['animation'];
    readonly delay: number;
    readonly interval: number;

    set state(value: 0 | 1 | 2);
}

function timer(callback: () => void, props: TimerAdditionalProps, state = State.Idle) {
    const taskQueue = new TaskQueue([
        () => {
            props.animation.play();
        },
        {
            await: props.interval,
        },
        () => {
            callback();
            props.animation.cancel();
            state = State.Delayed;
        },
        {
            await: props.delay,
        },
        () => {
            state = State.Running;
            props.animation.cancel();
        },
    ]);

    return {
        play() {
            if (state !== State.Delayed) props.animation.play();

            state = State.Running;
            props.state = 0;
            taskQueue.start();
        },
        pause() {
            if (state !== State.Delayed) state = State.Paused;

            props.state = 2;
            props.animation.pause();
            taskQueue.pause();
        },
        stop() {
            state = State.Idle;
            props.state = 1;
            props.animation.cancel();
            taskQueue.stop();
        },
    };
}

export { timer };
