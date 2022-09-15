import type { PluginArgs } from '../types'

export function log(params?: any) {
    console.log('log', params)

    return ({ node, options, instance }: PluginArgs) => {
        console.log('log', { node, options, instance })
        node.addEventListener('destroy', function destroy() {
            // destroy event
            node.removeEventListener('destroy', destroy);
        });
        return null
    }
}