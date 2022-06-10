import type { Child, Options } from '../types';
import { loop } from './env';

export function dom(node: HTMLElement, options: Options) {
    const nodes: Child[] = Array.from(node.children as HTMLCollectionOf<Child>);
    const indexes = Array.from(Array(nodes.length).keys());
    const cix = Math.floor(nodes.length / 2);
    const coord = options.vertical ? 'offsetTop' : 'offsetLeft';
    const size = options.vertical ? 'offsetHeight' : 'offsetWidth';
    const gap = nodes.length > 1 ? nodes[1][coord] - nodes[0][coord] - nodes[0][size] : 0;

    function distance(index: number, snap = options.snap) {
        const child = (index: number) =>
            nodes.find(({ indx }: Child) => indx === index) || nodes[0];
        const offset = (index: number) => node[size] - child(index)[size];

        const indented = child(index)[size] + gap * 2 < node[size];
        const indent = indented ? options.indent : offset(index) / 2 / gap;
        const start = position(index, snap) <= position(0, 'start');
        const end = position(index, snap) >= position(nodes.length - 1, 'end');
        const SNAP = start ? 'start' : end ? 'end' : options.snap;

        return position(index, !options.loop && options.snap ? SNAP : snap);

        function position(index: number, snap: Options['snap']): number {
            const part = snap === 'start' ? 0 : snap === 'end' ? 1 : 0.5;
            const edge = snap === 'start' ? -indent : snap === 'end' ? indent : 0;
            return child(index)[coord] - offset(index) * part + gap * edge;
        }
    }

    return {
        distance,
        start: distance(0, 'start'),
        end: distance(nodes.length - 1, 'end'),
        scrollable: Math.abs(distance(nodes.length - 1) - distance(0)) > gap * 2,
        init() {
            return loop(node.children, (item: Child, i) => {
                item.indx = i;
                // item.gap = gap;
                item.size = nodes[i][size] + gap * 2;
                item.dist = distance(i);
                // item.style.position = options.layout === 'stack' ? 'absolute' : 'relative';
            });
        },
        index(target: number): number {
            const dist = (index: number) => Math.abs(distance(index) - target);
            return indexes.reduce((prev, curr) => (dist(curr) < dist(prev) ? curr : prev));
        },
        history(dir: number): number {
            const direction = nodes.length % dir ? Math.sign(-dir) : dir;
            const edge = direction > 0 ? 0 : nodes.length - 1;
            if (edge) node.prepend(nodes[edge]);
            else node.append(nodes[edge]);
            return (nodes[edge][size] + gap) * direction;
        },
        position(replace = true): number {
            if (replace) {
                const key = options.loop ? (options.index as number) - cix : 0;
                const childs = nodes.slice(key).concat(nodes.slice(0, key));
                node.replaceChildren(...childs);
            }
            return this.scrollable ? distance(options.index as number) : 0;
        },
    };
}
