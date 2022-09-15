import type { PluginArgs } from '../types'

export function marquee(params?: any) {
    console.log('marquee', params)

    return ({ node, options, instance }: PluginArgs) => {
        console.log('marquee', { node, options, instance })
        node.addEventListener('destroy', function destroy() {
            // destroy event
            node.removeEventListener('destroy', destroy);
        });
        return null
    }
}