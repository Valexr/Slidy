import type { AnimationFunc, Child, Options } from '../types';
import { clamp, loop } from './env';

export function dom(node: HTMLElement, options: Options) {
    const nodes: Child[] = Array.from(node.children as HTMLCollectionOf<Child>);
    const length = nodes.length;
    const indexes = Array.from(Array(length).keys());
    const last = length - 1;
    const cix = Math.floor(length / 2);
    const coord = options.vertical ? 'offsetTop' : 'offsetLeft';
    const size = options.vertical ? 'offsetHeight' : 'offsetWidth';
    const gap = length > 1 ? nodes[1][coord] - nodes[0][coord] - nodes[0][size] : 0;

    function distance(index: number, snap = options.snap) {
        const child = (index: number) =>
            nodes.find((child: Child) => child.index === index) || nodes[0];
        const offset = (index: number) => node[size] - child(index)[size];

        const indented = child(index)[size] + gap * 2 < node[size];
        const indent = indented ? options.indent as number : offset(index) / 2 / gap || 0;
        const start = pos(index, snap) <= pos(0, 'start');
        const end = pos(index, snap) >= pos(last, 'end');
        const SNAP = start ? 'start' : end ? 'end' : options.snap;

        return pos(index, options.snap && !options.loop && !options.deck ? SNAP : snap);

        function pos(index: number, snap: Options['snap']): number {
            const part = snap === 'start' ? 0 : snap === 'end' ? 1 : 0.5;
            const edge = snap === 'start' ? -indent : snap === 'end' ? indent : 0;
            return child(index)[coord] - offset(index) * part + gap * edge;
        }
    }

    return {
        distance,
        start: distance(0, 'start'),
        end: distance(last, 'end'),
        scrollable: Math.abs(distance(last, 'end') - distance(0, 'start')) > gap * 2,
        init() {
            return loop(nodes, (child: Child, i) => (child.index = i));
        },
        index(target: number): number {
            const dist = (index: number) => Math.abs(distance(index) - target);
            return indexes.reduce((prev, curr) => (dist(curr) < dist(prev) ? curr : prev));
        },
        position(replace = true): number {
            if (replace) {
                const index = options.index as number
                const key = options.loop ? index - cix : cix - index
                const childs = nodes.slice(key).concat(nodes.slice(0, key));

                node.replaceChildren(...childs);
            }
            return this.scrollable ? distance(options.index as number) : 0;
        },
        history(dir: number): number {
            const direction = length % dir ? Math.sign(-dir) : dir;
            const edge = direction > 0 ? 0 : last;

            if (edge) node.prepend(nodes[edge]);
            else node.append(nodes[edge]);

            return (nodes[edge][size] + gap) * direction;
        },
        animate(animation?: AnimationFunc, position = 0) {
            loop(nodes, (child: Child, i: number) => {
                const pos = options.deck ? distance(child.index) : position;

                child.active = options.loop ? cix : (options.index as number);
                child.size = child[size] + gap;
                child.i = i;
                // child.dist = distance(child.index);
                child.track = position - distance(child.index);
                child.exp = clamp(0, (child.size - Math.abs(child.track)) / child.size, 1);
                child.turn = clamp(-1, child.track / child.size, 1);
                // child.clampTrack = clamp(-child.size / 2, child.track, child.size / 2)
                // child.clampTurn = clamp(-1, child.clampTrack / child.size, 1)

                const translate = options.vertical
                    ? `translateY(${-pos}px)`
                    : `translateX(${-pos}px)`;
                const style = animation
                    ? animation({
                        node,
                        child,
                        options,
                        position,
                        translate,
                    })
                    : { transform: translate };

                Object.assign(child.style, style);
            });
        },
    };
}
