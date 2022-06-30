import { clamp, loop } from './utils';
import type { Child, Options } from '../types';

export function dom(node: HTMLElement, options: Options) {
    const nodes: Child[] = Array.from(node.children as HTMLCollectionOf<Child>);
    const length = nodes.length;
    const indexes = Array.from(Array(length).keys());
    const last = length - 1;
    const cix = Math.floor(length / 2);
    const vertical = nodes[1].offsetTop - nodes[0].offsetTop;
    const coord = vertical ? 'offsetTop' : 'offsetLeft';
    const size = vertical ? 'offsetHeight' : 'offsetWidth';
    const reverse = Math.sign(nodes[last][coord]);
    const gap =
        length > 1
            ? nodes[last][coord] * reverse -
              nodes[last - 1][coord] * reverse -
              nodes[last - Math.max(reverse, 0)][size]
            : 0;
    const start = distance(reverse < 0 ? last : 0, 'start');
    const end = distance(reverse < 0 ? 0 : last, 'end');
    const scrollable = Math.abs(end - start) > gap * 2;

    function distance(index: number, snap = options.snap) {
        const child = (index: number) =>
            nodes.find((child: Child) => child.index === index) || nodes[0];
        const offset = (index: number) => node[size] - child(index)[size];

        const indented = child(index)[size] + gap * 2 < node[size];
        const indent = indented ? (options.indent as number) : offset(index) / 2 / gap || 0;
        const start = pos(index, snap) <= pos(reverse < 0 ? last : 0, 'start');
        const end = pos(index, snap) >= pos(reverse < 0 ? 0 : last, 'end');
        const SNAP = start ? 'start' : end ? 'end' : options.snap;

        return pos(index, options.snap && options.snap !== 'deck' && !options.loop ? SNAP : snap);

        function pos(index: number, snap: Options['snap']) {
            const part = snap === 'start' ? 0 : snap === 'end' ? 1 : 0.5;
            const edge = snap === 'start' ? -indent : snap === 'end' ? indent : 0;
            return child(index)[coord] - offset(index) * part + gap * edge;
        }
    }

    return {
        end,
        start,
        distance,
        scrollable,
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
            return scrollable ? distance(options.index as number) : 0;
        },
        history(dir: number) {
            const direction = length % dir ? Math.sign(-dir) : dir;
            const edge = direction > 0 ? 0 : last;

            if (edge) node.prepend(nodes[edge]);
            else node.append(nodes[edge]);

            return (nodes[edge][size] + gap) * (direction * reverse);
        },
        edges(index = 0, dir = 0): boolean {
            const onstart =
                (reverse < 0 ? index >= last : index <= 0) &&
                dir <= 0 &&
                (options.position as number) <= start;
            const onend =
                (reverse < 0 ? index <= 0 : index >= last) &&
                dir >= 0 &&
                (options.position as number) >= end;

            return !options.loop && (onstart || onend);
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
                const style = options.animation
                    ? options.animation({
                          node,
                          child,
                          options: Object.assign(options, { vertical, reverse }),
                          translate,
                      })
                    : { transform: translate };

                Object.assign(child.style, style);
            });
        },
    };
}
