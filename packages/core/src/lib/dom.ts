import { clamp, loop, assign } from './utils';
import type { Dom, Child, Options, UniqEvent } from '../types';

export function dom(node: HTMLElement, options: Options): Dom {
    const nodes: Child[] = [...(node.children as HTMLCollectionOf<Child>)];
    const length = nodes.length;
    const indexes = [...Array(length).keys()];
    const last = length - 1;
    const cix = Math.floor(length / 2);
    const vertical = nodes[1].offsetTop - nodes[0].offsetTop >= nodes[0].offsetHeight;
    const coord = vertical ? 'offsetTop' : 'offsetLeft';
    const size = vertical ? 'offsetHeight' : 'offsetWidth';
    const reverse = Math.sign(nodes[last][coord]);
    const gap = length > 1
        ? nodes[last][coord] * reverse -
        nodes[last - 1][coord] * reverse -
        nodes[last - Math.max(reverse, 0)][size]
        : 0;
    const full = nodes.reduce((acc, cur) => acc += (cur[size] + gap), 0)
    const scrollable = full > node.offsetWidth;

    assign(options, { reverse, scrollable, vertical })

    function edges(index?: number) {
        const start = distance(reverse < 0 ? last : 0, 'start');
        const end = distance(reverse < 0 ? 0 : last, 'end');
        const indexed = !index || index === last
        const edged = options.loop
            ? false
            : ((options.direction as number) <= 0 &&
                Math.round(options.position as number) <= start) ||
            ((options.direction as number) >= 0 &&
                Math.round(options.position as number) >= end);
        return index as number >= 0 ? edged || indexed : edged
    }

    function distance(index: number, snap = options.snap): number {
        const child = (index: number) =>
            nodes.find((child: Child) => child.index === index) || nodes[0];
        const offset = (index: number) => node[size] - child(index)[size];

        const start = pos(reverse < 0 ? last : 0, 'start')
        const end = pos(reverse < 0 ? 0 : last, 'end');
        const current = pos(index, snap)

        return options.loop ? current : clamp(start, current, end);

        function pos(index: number, snap?: Options['snap']): number {
            const indented = child(index)[size] + gap * 2 < node[size];
            const indent = (indented ? options.indent : offset(index) / 2 / gap) || 0;
            const part = snap === 'start' ? 0 : snap === 'end' ? 1 : 0.5;
            const edge = snap === 'start' ? -indent : snap === 'end' ? indent : 0;
            return child(index)[coord] - offset(index) * part + gap * edge;
        }
    }

    return {
        edges,
        distance,
        index(target: number): number {
            const dist = (index: number) => Math.abs(distance(index) - target);
            return indexes.reduce((prev, curr) => (dist(curr) < dist(prev) ? curr : prev), 0);
        },
        position(replace: boolean): number {
            const index = options.index as number;
            if (replace) {
                const childs = nodes.slice(index - cix).concat(nodes.slice(0, index - cix));
                node.replaceChildren(...childs);
            }
            return distance(index);
        },
        swap(dir: number): number {
            const direction = length % dir ? Math.sign(-dir) : dir;
            const edge = direction > 0 ? 0 : last;

            if (edge) node.prepend(nodes[edge]);
            else node.append(nodes[edge]);

            return (nodes[edge][size] + gap) * (direction * reverse);
        },
        sense(e: UniqEvent, pos: number, sensity: number): boolean {
            return e.shiftKey || options.clamp || options.axis === 'y'
                ? e.type === 'touchmove'
                    ? !edges()
                    : true
                : Math.abs(pos) >= sensity;
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
                const translate = vertical ? `translateY(${-pos}px)` : `translateX(${-pos}px)`;
                const args = { node, child, options, translate }
                const style = options.animation?.(args) || { transform: translate };

                assign(child.style, scrollable ? style : { transform: '' });
            });
        },
    };
}
