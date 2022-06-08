import type { Child, Options } from '../types';

export function dom(node: HTMLElement, options: Options) {
    const nodes: Child[] = Array.from(node.children as HTMLCollectionOf<Child>);
    const length = nodes.length;
    const indexes = Array.from(Array(length).keys());
    const last = length - 1;
    const cix = Math.floor(length / 2);
    const coord = options.vertical ? 'offsetTop' : 'offsetLeft';
    const size = options.vertical ? 'offsetHeight' : 'offsetWidth';
    const gap = nodes[1][coord] - nodes[0][coord] - nodes[0][size];

    function distance(index: number) {
        const SNAP = !options.loop ? snap(index) : options.snap;
        const offset = node[size] - child(index)[size];
        const part = SNAP === 'start' ? 0 : SNAP === 'end' ? 1 : 0.5;
        const pos = child(index)[coord] - offset * part;
        const indented = child(index)[size] + gap * 2 < node[size];
        const indent = indented ? options.indent : offset / 2 / gap;
        const edge = SNAP === 'start' ? -indent : SNAP === 'end' ? indent : 0;

        return pos + gap * edge;

        function child(index: number) {
            return nodes.find((child: Child) => child.index === index) as Child;
        }

        function snap(index: number): Options['snap'] | undefined {
            return index === 0 ? 'start' : index === last ? 'end' : options.snap;
        }
    }

    return {
        distance,
        end: distance(last),
        start: distance(0),
        scrollable: Math.abs(distance(last) - distance(0)) > gap * 2,
        index(target: number): number {
            const dist = (index: number) => Math.abs(distance(index) - target);
            return indexes.reduce((prev, curr) => (dist(curr) < dist(prev) ? curr : prev));
        },
        edges(index = 0, position = 0, direction = 0): boolean {
            const start = index <= 0 && direction <= 0 && position <= this.start;
            const end = index >= last && direction >= 0 && position >= this.end;

            return !options.loop && (start || end);
        },
        history(direction: number): number {
            const edge = direction > 0 ? 0 : last;

            if (edge) node.prepend(nodes[edge]);
            else node.append(nodes[edge]);

            return (nodes[edge][size] + gap) * direction;
        },
        replace(): number {
            const rotate = (array: (number | Child)[], key: number) => {
                return array.slice(key).concat(array.slice(0, key));
            }
            const elements = options.loop
                ? rotate(nodes, (options.index as number) - cix)
                : nodes.sort((a, b) => a.index - b.index);

            node.replaceChildren(...(elements as Child[]));
            return this.scrollable ? distance(options.index as number) : 0;
        },
    };
}
