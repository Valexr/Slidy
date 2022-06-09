import type { Child, Options } from '../types';

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
        const child = (index: number) => {
            return nodes.find((child: Child) => child.index === index) || nodes[0];
        };
        const snap = (index: number) => {
            return index === 0 ? 'start' : index === last ? 'end' : options.snap;
        };
        const SNAP = !options.loop ? snap(index) : options.snap;
        const offset = node[size] - child(index)[size];
        const part = SNAP === 'start' ? 0 : SNAP === 'end' ? 1 : 0.5;
        const pos = child(index)[coord] - offset * part;
        const indented = child(index)[size] + gap * 2 < node[size];
        const indent = indented ? options.indent : offset / 2 / gap;
        const edge = SNAP === 'start' ? -indent : SNAP === 'end' ? indent : 0;

        return pos + gap * edge;
    }

    return {
        distance,
        start: distance(0),
        end: distance(last),
        scrollable: Math.abs(distance(last) - distance(0)) > gap * 2,
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
