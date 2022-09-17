import { timer as IntervalTimer } from '../utils/env'
import type { PluginArgs } from '../types'

export function marquee(params = { duration: 700, delay: 1 }) {
    const { duration, delay } = params

    return ({ node, options, instance }: PluginArgs) => {

        const timer = IntervalTimer(() => {
            instance.to((options.index as number), duration / 16.667)
        }, Math.abs(duration / 16.667), delay);

        node.addEventListener('mount', mount)
        node.addEventListener('destroy', timer.stop);

        return timer

        function mount() {
            options.loop = true
            options.snap = undefined
            options.duration = Math.abs(duration)

            timer.play()

            document.onvisibilitychange = () => {
                if (document.visibilityState === 'hidden') timer.pause()
                else timer.resume()
            }
            node.onpointerenter = () => timer.pause()
            node.onpointerleave = () => timer.resume()

            // node.onfocus = () => timer.stop()
            // node.onblur = () => timer.play()
        }
    }
}