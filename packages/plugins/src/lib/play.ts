import { timer as IntervalTimer } from '../utils/env'
import type { PluginArgs } from '../types'

export function play(params = { duration: 1000, delay: 0 }) {
    const { duration, delay } = params

    return ({ node, options, instance }: PluginArgs) => {

        options.loop = true

        const timer = IntervalTimer(() => {
            instance.to((options.index as number) + 1)
        }, duration, delay);

        timer.play()

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

        node.onfocus = () => timer.stop()
        node.onblur = () => timer.play()

        node.addEventListener('destroy', function destroy() {
            // destroy event
            node.removeEventListener('destroy', destroy);
        });

        // methods
        return timer
    }
}