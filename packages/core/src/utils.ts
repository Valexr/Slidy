import type { Parent, Child, Slidy, UniqEvent } from './types';

function maxMin(max: number, min: number, val: number) {
    return Math.min(max, Math.max(min, val)) || 0;
}

// function maxSize(node: Slidy, vertical: boolean) {
//     return node[scroll(vertical)] - parent(node)[size(vertical)];
// }

function indexing(node: Slidy, index: number, loop: boolean) {
    if (loop) {
        if (index < 0) {
            return nodes(node).length - 1;
        } else if (index > nodes(node).length - 1) {
            return 0;
        } else return index;
    } else return maxMin(nodes(node).length - 1, 0, index);
}

function coordinate(e: UniqEvent, vertical: boolean) {
    if (e.type === 'wheel') {
        if (!vertical && Math.abs(e.deltaX) && Math.abs(e.deltaY) < 15) e.preventDefault();
        return vertical ? e.deltaY : e.shiftKey ? e.deltaY : e.deltaX;
    } else return vertical ? uniQ(e).clientY : uniQ(e).clientX;
}

const uniQ = (e: UniqEvent): UniqEvent | { [key: string]: number } => (e.changedTouches ? e.changedTouches[0] : e);

const cix = (node: Slidy) => Math.floor(node.childNodes.length / 2);
const parent = (node: Slidy): Parent => node.parentNode as Parent;
const nodes = (node: Slidy): Child[] => Array.from(node.childNodes as NodeListOf<Child>);
const child = (node: Slidy, index: number) => node.childNodes[index] as Child;
// const scroll = (vertical: boolean) => (vertical ? 'scrollHeight' : 'scrollWidth');
const coord = (vertical: boolean) => (vertical ? 'offsetTop' : 'offsetLeft');
const size = (vertical: boolean) => (vertical ? 'offsetHeight' : 'offsetWidth');
const part = (align: string) => (align === 'center' ? 0.5 : 1);
const diff = (align: string, pos: number) => (align !== 'start' ? pos : 0);
const offset = (node: Slidy, child: Child, vertical: boolean) => {
    return parent(node)[size(vertical)] - child[size(vertical)] || 0;
};
const position = (node: Slidy, child: Child, vertical: boolean, align: string) =>
    child[coord(vertical)] - diff(align, offset(node, child, vertical) * part(align));
const distance = (node: Slidy, index: number, vertical: boolean) => Math.abs(nodes(node)[index][coord(vertical)]);

function closest(node: Slidy, target: number, vertical: boolean, align: string): Child {
    return nodes(node).reduce((prev: Child, curr: Child) => {
        const dist = (child: Child) => Math.abs(position(node, child, vertical, align) - target);
        return dist(curr) < dist(prev) ? curr : prev;
    });
}

const find = (node: Slidy, vertical: boolean) => ({
    index: (target: number, index: number | null, align: string): number => {
        const child: Child | undefined = nodes(node).find((child: Child) => child.index === index);
        return child ? nodes(node).indexOf(child) : closest(node, target, vertical, align).index || 0;
    },
    position: (index: number, align: string) => position(node, child(node, index), vertical, align),
    target: (target: number, align: string) => position(node, closest(node, target, vertical, align), vertical, align),
    size: (index: number) => nodes(node)[index][size(vertical)],
    gap: () => {
        const last = nodes(node).length - 1;
        const prev = distance(node, last - 1, vertical) + nodes(node)[last - 1][size(vertical)];
        return distance(node, last, vertical) - prev;
    },
});

const go = (node: Slidy) => ({
    prev: () => node.prepend(node.childNodes[node.childNodes.length - 1]),
    next: () => node.append(node.childNodes[0]),
});

const rotate = (array: Array<Node | string>, key: number) => array.slice(key).concat(array.slice(0, key));

function replace(node: Slidy, index: number, loop: boolean) {
    const elements = loop ? rotate(nodes(node), index - cix(node)) : nodes(node).sort((a, b) => a.index - b.index);
    node.replaceChildren(...elements);
}

export { find, go, maxMin, replace, indexing, coordinate };
