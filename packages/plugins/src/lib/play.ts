import { timer as IntervalTimer, dispatch } from '../utils/env';
import type { PluginArgs } from '../types';

export function play(params?: { duration: number; delay: number }, cb?: () => void) {
    if (!params || !Object.keys(params).length) {
        params = { duration: 1000, delay: 0 };
    }

    const { duration, delay } = params;

    return ({ node, options, instance }: PluginArgs) => {
        cb ||= () => {
            if (!options.loop && options.index === node.childElementCount - 1) {
                dispatch(node, 'stop');
                timer.stop();
            } else {
                instance.to((options.index as number) + 1);
            }
        };

        const timer = IntervalTimer(cb, duration, delay);

        node.addEventListener('mount', mount);
        node.addEventListener('destroy', timer.stop);

        return timer;

        function mount() {
            document.onvisibilitychange = () => {
                if (document.visibilityState === 'hidden') {
                    dispatch(node, 'pause');
                    timer.pause();
                } else {
                    dispatch(node, 'resume');
                    timer.resume();
                }
            };
            node.onpointerenter = () => {
                dispatch(node, 'pause');
                timer.pause();
            };
            node.onpointerleave = () => {
                dispatch(node, 'resume');
                timer.resume();
            };
        }
    };
}
