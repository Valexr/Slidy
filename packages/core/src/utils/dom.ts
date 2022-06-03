import type { Child, Options, Slidy } from '../types';

const cix = (node: Slidy) => Math.floor(nodes(node).length / 2);
const nodes = (node: Slidy): Child[] => Array.from(node.children as HTMLCollectionOf<Child>);
const child = (node: Slidy, index: number) =>
    nodes(node).find((child: Child) => child.index === index) as Child;
const coord = (vertical: boolean) => (vertical ? 'offsetTop' : 'offsetLeft');
const size = (vertical: boolean) => (vertical ? 'offsetHeight' : 'offsetWidth');
const part = (snap: string | undefined) => (snap === 'center' ? 0.5 : snap === 'end' ? 1 : 0.5);
const diff = (snap: string | undefined, pos: number) => (snap !== 'start' ? pos : 0);
const offset = (node: Slidy, child: Child, vertical: boolean) =>
    node[size(vertical)] - child[size(vertical)];
const position = (node: Slidy, child: Child, vertical: boolean, snap: string | undefined) =>
    child[coord(vertical)] - diff(snap, offset(node, child, vertical) * part(snap));
const distance = (node: Slidy, index: number, vertical: boolean) =>
    Math.abs(nodes(node)[index][coord(vertical)]);

function closest(node: Slidy, target: number, vertical: boolean, snap: string | undefined): Child {
    return nodes(node).reduce((prev: Child, curr: Child) => {
        const dist = (child: Child) => Math.abs(position(node, child, vertical, snap) - target);
        return dist(curr) < dist(prev) ? curr : prev;
    });
}
const indent = (node: Slidy, index: number, options: Options) => {
    const wrap = node[size(options.vertical as boolean)];
    const active = child(node, index)[size(options.vertical as boolean)];
    const diff = wrap - active;
    return active + node.gap * 2 < wrap ? options.indent : diff / 2 / node.gap;
};

function indents(node: Slidy, index: number, snap: string, options: Options): number {
    const edge =
        (!options.loop && index === 0) || snap === 'start'
            ? -indent(node, index, options)
            : (!options.loop && index === nodes(node).length - 1) || snap === 'end'
            ? indent(node, index, options)
            : 0;
    return node.gap * edge;
}

const find = (node: Slidy, options: Options) => ({
    index: (target: number, snap: string | undefined): number => {
        return closest(node, target, options.vertical as boolean, snap).index;
    },
    position: (index: number | undefined, snap?: string) => {
        const pos = position(node, child(node, index as number), options.vertical as boolean, snap);
        return pos + indents(node, index as number, snap as string, options);
    },
    distance: (index: number) => Math.abs(nodes(node)[index][coord(options.vertical as boolean)]),
    gap: () => {
        const last = nodes(node).length - 1;
        const lastSize = nodes(node)[last - 1][size(options.vertical as boolean)];
        const prev = distance(node, last - 1, options.vertical as boolean) + lastSize;
        return distance(node, last, options.vertical as boolean) - prev;
    },
});

function shuffle(node: Slidy, direction: number): void {
    return direction > 0
        ? node.append(nodes(node)[0])
        : direction < 0
        ? node.prepend(nodes(node)[node.children.length - 1])
        : undefined;
}

function history(node: Slidy, direction: number, options: Options) {
    const first = nodes(node)[0][size(options.vertical as boolean)];
    const last = nodes(node)[nodes(node).length - 1][size(options.vertical as boolean)];
    return ((direction > 0 ? first : last) + node.gap) * direction;
}

function replace(node: Slidy, options: Options) {
    const elements = options.loop
        ? rotate(nodes(node), (options.index as number) - cix(node))
        : nodes(node).sort((a, b) => a.index - b.index);
    node.replaceChildren(...elements);

    function rotate(array: Array<Node | string>, key: number) {
        return array.slice(key).concat(array.slice(0, key));
    }

    return node.scrollable ? find(node, options).position(options.index, options.snap) : 0;
}

export { find, history, replace, shuffle };
