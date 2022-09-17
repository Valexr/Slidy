import { timer as IntervalTimer } from '../utils/env'
import type { PluginArgs } from '../types'

export function play(params = { duration: 1000, delay: 0 }) {
    const { duration, delay } = params

    return ({ node, options, instance }: PluginArgs) => {

        const timer = IntervalTimer(() => {
            instance.to((options.index as number) + 1)
        }, duration, delay);

        node.addEventListener('mount', mount)
        node.addEventListener('destroy', timer.stop);

        return timer

        function mount() {
            options.loop = true

            document.onvisibilitychange = () => {
                if (document.visibilityState === 'hidden') timer.pause()
                else timer.resume()
            }
            node.onpointerenter = () => {
                timer.pause()
            }
            node.onpointerleave = () => {
                timer.resume()
            }
        }
    }
}