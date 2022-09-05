import { clamp, loop } from './utils';
import type { Child, Options, UniqEvent } from '../types';

export function dom(node: HTMLElement, options: Options) {
    const nodes: Child[] = [...(node.children as HTMLCollectionOf<Child>)];
    const length = nodes.length;
    const indexes = [...Array(length).keys()];
    const last = length - 1;
    const cix = Math.floor(length / 2);
    const coord = options.vertical ? 'offsetTop' : 'offsetLeft';
    const size = options.vertical ? 'offsetHeight' : 'offsetWidth';
    const vertical = nodes[1].offsetTop - nodes[0].offsetTop >= nodes[0].offsetHeight;
    const reverse = Math.sign(nodes[last][coord]);
    const gap =
        length > 1
            ? nodes[last][coord] * reverse -
            nodes[last - 1][coord] * reverse -
            nodes[last - Math.max(reverse, 0)][size]
            : 0;
    const start = distance(reverse < 0 ? last : 0, 'start');
    const end = distance(reverse < 0 ? 0 : last, 'end');
    const full = nodes.reduce((acc, cur) => acc += (cur[size] + gap), 0)
    const scrollable = full > node.offsetWidth;
    const edges = options.loop
        ? false
        : ((options.direction as number) <= 0 &&
            Math.round(options.position as number) <= start) ||
        ((options.direction as number) >= 0 &&
            Math.round(options.position as number) >= end);

    Object.assign(options, { reverse, scrollable, vertical })

    function distance(index: number, snap = options.snap) {
        const child = (index: number) =>
            nodes.find((child: Child) => child.index === index) || nodes[0];
        const offset = (index: number) => node[size] - child(index)[size];

        const start = pos((reverse as number) < 0 ? last : 0, 'start')
        const end = pos((reverse as number) < 0 ? 0 : last, 'end');
        const current = pos(index, snap)

        return options.loop ? current : clamp(start, current, end);

        function pos(index: number, snap: Options['snap']): number {
            const indented = child(index)[size] + gap * 2 < node[size];
            const indent = indented ? (options.indent as number) : offset(index) / 2 / gap || 0;
            const part = snap === 'start' ? 0 : snap === 'end' ? 1 : 0.5;
            const edge = snap === 'start' ? -indent : snap === 'end' ? indent : 0;
            return child(index)[coord] - offset(index) * part + gap * edge;
        }
    }

    return {
        end,
        start,
        edges,
        distance,
        index(target: number): number {
            const dist = (index: number) => Math.abs(distance(index) - target);
            return indexes.reduce((prev, curr) => (dist(curr) < dist(prev) ? curr : prev), 0);
        },
        position(replace = options.loop) {
            if (replace) {
                const index = options.index as number;
                const childs = nodes.slice(index - cix).concat(nodes.slice(0, index - cix));
                node.replaceChildren(...childs);
            }
            return distance(options.index as number);
        },
        swap(dir: number) {
            const direction = length % dir ? Math.sign(-dir) : dir;
            const edge = direction > 0 ? 0 : last;

            if (edge) node.prepend(nodes[edge]);
            else node.append(nodes[edge]);

            return (nodes[edge][size] + gap) * (direction * (options.reverse as number));
        },
        sense(e: UniqEvent, pos: number, SENSITY = options.sensity as number): boolean {
            return e.shiftKey || options.clamp || options.axis === 'y'
                ? e.type === 'touchmove'
                    ? !edges
                    : true
                : Math.abs(pos) >= SENSITY;
        },
        animate(): void {
            loop(nodes, (child: Child, i: number) => {
                child.i = i;
                child.active = options.loop ? cix : (options.index as number);
                child.size = child[size] + gap;
                child.dist = distance(child.index);
                child.track = (options.position as number) - child.dist;
                child.turn = clamp(-1, child.track / child.size, 1);
                child.exp = clamp(0, (child.size - Math.abs(child.track)) / child.size, 1);

                const pos = options.snap === 'deck' ? child.dist : (options.position as number);
                const translate = options.vertical ? `translateY(${-pos}px)` : `translateX(${-pos}px)`;
                const args = { node, child, options, translate }
                const style = options.animation ? options.animation(args) : { transform: translate };

                Object.assign(child.style, scrollable ? style : { transform: '' });
            });
        },
    };
}
