import { timer as IntervalTimer, dispatch } from '../utils/env';
import type { PluginArgs } from '../types';

type Params = Partial<{ duration: number; delay: number }>

export function play(
    params?: Params,
    cb?: () => void,
    state = 0
) {
    if (!params || !Object.keys(params).length) {
        params = { duration: 1500, delay: 0 };
    }

    const { duration, delay } = params;

    return ({ node, options, instance }: PluginArgs) => {
        cb ||= () => {
            if (!options.loop && options.index && options.edged) {
                dispatch(node, 'stop');
                timer.stop();
                state = 0
            } else {
                state = 1
                instance.to((options.index as number) + 1);
            }
        };

        const timer = IntervalTimer(cb, duration as number, delay);

        node.addEventListener('mount', mount);
        node.addEventListener('destroy', timer.stop);

        return timer;

        function mount() {
            document.onvisibilitychange = () => {
                if (document.visibilityState === 'hidden') {
                    if (state !== 1) return
                    dispatch(node, 'pause');
                    timer.pause();
                    state = 2

                } else {
                    if (state !== 2) return
                    dispatch(node, 'resume');
                    timer.resume();
                }
            };
            node.onpointerenter = () => {
                if (state !== 1) return
                dispatch(node, 'pause');
                timer.pause();
                state = 2

            };
            node.onpointerleave = () => {
                if (state !== 2) return
                dispatch(node, 'resume');
                timer.resume();

            };
        }
    };
}
