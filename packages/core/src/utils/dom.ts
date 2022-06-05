import type { Child, Options, Slidy } from '../types';

export function dom(node: Slidy, options: Options) {
    const nodes: Child[] = Array.from(node.children as HTMLCollectionOf<Child>);
    const indexes = nodes.map((node) => node.index);
    const length = nodes.length;
    const cix = Math.floor(length / 2);
    const coord = options.vertical ? 'offsetTop' : 'offsetLeft';
    const size = options.vertical ? 'offsetHeight' : 'offsetWidth';
    const gap = nodes[1][coord] - nodes[0][coord] - nodes[0][size];
    const start = distance(0, 'start');
    const end = distance(length - 1, 'end');
    const scrollable = Math.abs(end - start) > gap * 2;

    function child(index: number) {
        return nodes.find((child: Child) => child.index === index) as Child;
    }

    function distance(index: number, snap?: string) {
        const offset = node[size] - child(index)[size];
        const part = snap === 'center' ? 0.5 : snap === 'end' ? 1 : 0.5;
        const diff = snap !== 'start' ? offset * part : 0;
        const pos = child(index)[coord] - diff;
        const indented = child(index)[size] + gap * 2 < node[size];
        const indent = indented ? options.indent : offset / 2 / gap;
        const start = (!options.loop && index === 0) || snap === 'start';
        const end = (!options.loop && index === length - 1) || snap === 'end';
        const edge = start ? -indent : end ? indent : 0;
        return pos + gap * edge;
    }

    return {
        gap,
        end,
        start,
        distance,
        scrollable,
        index(target: number, snap?: string): number {
            return indexes.reduce((prev, curr) => {
                const dist = (index: number) => Math.abs(distance(index, snap) - target);
                return dist(curr) < dist(prev) ? curr : prev;
            });
        },
        edges(index = 0, position = 0, direction = 0): boolean {
            return (
                !options.loop &&
                ((index === 0 && direction <= 0 && position <= start) ||
                    (index === length - 1 && direction >= 0 && position >= end))
            );
        },
        snap(index: number): 'center' | 'end' | 'start' | undefined {
            if (!options.loop && options.snap) {
                const active = distance(index, options.snap);
                const onstart = index === 0 || active <= start;
                const onend = index === length - 1 || active >= end;

                return onstart ? 'start' : onend ? 'end' : options.snap;
            }
        },
        history(direction: number): number {
            const first = nodes[0][size];
            const last = nodes[length - 1][size];
            return ((direction > 0 ? first : last) + gap) * direction;
        },
        shuffle(direction: number): void {
            return direction > 0
                ? node.append(nodes[0])
                : direction < 0
                ? node.prepend(nodes[length - 1])
                : undefined;
        },
        replace(): number {
            const rotate = (array: Array<Node | string>, key: number) => {
                return array.slice(key).concat(array.slice(0, key));
            };
            const elements = options.loop
                ? rotate(nodes, (options.index as number) - cix)
                : nodes.sort((a, b) => a.index - b.index);

            node.replaceChildren(...elements);
            return scrollable ? distance(options.index as number, options.snap) : 0;
        },
    };
}
