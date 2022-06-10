import type { Child, Options } from '../types';
import { loop, clamp } from './env';

export function dom(node: HTMLElement, options: Options) {
    const nodes: Child[] = Array.from(node.children as HTMLCollectionOf<Child>);
    const length = nodes.length;
    const indexes = Array.from(Array(length).keys());
    const last = length - 1;
    const cix = Math.floor(length / 2);
    const coord = options.vertical ? 'offsetTop' : 'offsetLeft';
    const size = options.vertical ? 'offsetHeight' : 'offsetWidth';
    const gap = length > 1 ? nodes[1][coord] - nodes[0][coord] - nodes[0][size] : 0;

    function distance(index: number) {
        const indented = child(index)[size] + gap * 2 < node[size];
        const indent = indented ? options.indent : offset(index) / 2 / gap;
        const snap = options.loop ? options.snap : snapping()

        return position(index, snap);

        function position(index: number, snap: Options['snap']): number {
            const start = snap === 'start' || index === 0
            const end = snap === 'end' || index === last
            const part = start ? 0 : end ? 1 : 0.5
            const edge = start ? -indent : end ? indent : 0;
            return child(index)[coord] - offset(index) * part + gap * edge
        }

        function snapping(): Options['snap'] {
            const start = position(index, options.snap) <= position(0, 'start')
            const end = position(index, options.snap) >= position(last, 'end')
            return options.snap ? start ? 'start' : end ? 'end' : options.snap : options.snap
        }

        function offset(index: number) { return node[size] - child(index)[size]; }

        function child(index: number) {
            return nodes.find((child: Child) => child.indx === index) || nodes[0];
        }
    }

    return {
        distance,
        start: distance(0),
        end: distance(last),
        scrollable: Math.abs(distance(last) - distance(0)) > gap * 2,
        init() {
            return loop(node.children, (item: Child, i) => {
                item.indx = i
                item.gap = gap
                item.size = nodes[i][size] + gap * 2
                item.dist = distance(i)
                item.style.position = options.layout === 'stack' ? 'absolute' : 'relative'
            });
        },
        index(target: number): number {
            const dist = (index: number) => Math.abs(distance(index) - target);
            return indexes.reduce((prev, curr) => (dist(curr) < dist(prev) ? curr : prev));
        },
        history(dir: number): number {
            const direction = length % dir ? Math.sign(-dir) : dir;
            const edge = direction > 0 ? 0 : last;
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
