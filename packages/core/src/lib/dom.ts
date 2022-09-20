import { clamp, loop, assign, floor, sign, max, round, abs } from './utils';
import type { Dom, Child, Options, UniqEvent } from '../types';

export function dom(node: HTMLElement, options: Options): Dom {
    const nodes: Child[] = [...(node.children as HTMLCollectionOf<Child>)];
    const length = nodes.length;
    const indexes = [...Array(length).keys()];
    const last = length - 1;
    const cix = floor(length / 2);
    const vertical = nodes[1].offsetTop - nodes[0].offsetTop >= nodes[0].offsetHeight;
    const coord = vertical ? 'offsetTop' : 'offsetLeft';
    const size = vertical ? 'offsetHeight' : 'offsetWidth';
    const reverse = sign(nodes[last][coord]);
    const gap =
        length > 1
            ? nodes[last][coord] * reverse -
            nodes[last - 1][coord] * reverse -
            nodes[last - max(reverse, 0)][size]
            : 0;
    const full = nodes.reduce((acc, cur) => (acc += cur[size] + gap), 0);
    const scrollable = full > node.offsetWidth;
    const deck = options.snap === 'deck'

    assign(options, { reverse, scrollable, vertical });

    function edges(index?: number) {
        const start = distance(reverse < 0 ? last : 0, 'start');
        const end = distance(reverse < 0 ? 0 : last, 'end');
        const curr = distance(index as number);
        const dir = options.direction as number;
        const pos = round(options.position as number);

        const edged = (val?: number) => (dir <= 0 && val as number <= start)
            || (dir >= 0 && val as number >= end);

        return options.loop ? false : edged(index as number >= 0 ? curr : pos)
    }

    function distance(index: number, snap = options.snap): number {
        const child = (index: number) =>
            nodes.find((child: Child) => child.index === index) || nodes[0];
        const offset = (index: number) => node[size] - child(index)[size];

        const start = pos(reverse < 0 ? last : 0, 'start');
        const end = pos(reverse < 0 ? 0 : last, 'end');
        const current = pos(index, snap);

        return (options.loop || snap === 'deck') ? current : clamp(start, current, end);

        function pos(index: number, snap?: Options['snap']): number {
            snap = deck ? 'deck' : snap
            const indented = child(index)[size] + gap * 2 < node[size];
            const indent = indented ? options.indent ?? 1 : offset(index) / 2 / gap;
            const part = snap === 'start' ? 0 : snap === 'end' ? 1 : 0.5;
            const edge = snap === 'start' ? -indent : snap === 'end' ? indent : 0;
            return child(index)[coord] - offset(index) * part + gap * edge;
        }
    }

    return {
        edges,
        distance,
        index(target: number): number {
            const dist = (index: number) => abs(distance(index) - target);
            return indexes.reduce((prev, curr) => (dist(curr) < dist(prev) ? curr : prev), 1);
        },
        position(replace?: boolean): number {
            const index = options.index as number;
            if (replace) {
                const childs = nodes.slice(index - cix).concat(nodes.slice(0, index - cix));
                node.replaceChildren(...childs);
            }
            return distance(index);
        },
        swap(dir: number): number {
            const direction = length % dir ? sign(-dir) : dir;
            const edge = direction > 0 ? 0 : last;

            if (edge) node.prepend(nodes[edge]);
            else node.append(nodes[edge]);

            return (nodes[edge][size] + gap) * (direction * reverse);
        },
        sense(e: UniqEvent, pos: number, sensity: number): boolean {
            return (
                e.shiftKey ||
                (options.axis === 'y' && e.type !== 'touchmove') ||
                abs(pos) >= sensity
            );
        },
        animate(): void {
            loop(nodes, (child: Child, i: number) => {
                child.i = i;
                child.active = options.loop ? cix : (options.index as number);
                child.size = child[size] + gap;
                child.dist = distance(child.index);
                child.track = (options.position as number) - child.dist;
                child.turn = clamp(-1, child.track / child.size, 1);
                child.exp = clamp(0, (child.size - abs(child.track)) / child.size, 1);

                const pos = deck ? child.dist : (options.position as number);
                const translate = vertical ? `translateY(${-pos}px)` : `translateX(${-pos}px)`;
                const args = { node, child, options, translate };
                const style = options.animation?.(args) || { transform: translate };

                assign(child.style, scrollable ? style : { transform: '' });
            });
        },
    };
}
