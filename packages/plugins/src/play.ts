import { timer as IntervalTimer } from './env'
import type { PluginArgs } from './types'
// marquee: {speed: 300, startAfter: 1000}

export function play({ node, options, instance }: PluginArgs) {
    options.loop = true

    const timer = IntervalTimer(() => {
        instance.to((options.index as number) + 1)
    }, 3000);

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
}