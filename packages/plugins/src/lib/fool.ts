import type { PluginArgs } from '../types';

/**
 * Changes axis depending on the parity of the slide index
 * Plug it on at April Fool's Day and you won't get fired!
 */
export function fool() {
    return ({ node, instance }: PluginArgs) => {
        node.addEventListener('destroy', function destroy() {
            node.removeEventListener('destroy', destroy);
            node.removeEventListener('index', index as EventListener);
        });

        node.addEventListener('index', index as EventListener);

        function index({ detail: { index } }: CustomEvent<{ index: number }>) {
            const fooling = () => instance.update({ axis: (index % 2) ? 'x' : 'y' })
            setTimeout(fooling)
        }
    };
}
