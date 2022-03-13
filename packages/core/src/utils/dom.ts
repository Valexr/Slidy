import type { Parent, Child, Slidy } from '../types';
import { maxMin } from './helpers'

function indexing(node: Slidy, index: number, loop: boolean) {
    if (loop) {
        if (index < 0) {
            return node.childNodes.length - 1;
        } else if (index > node.childNodes.length - 1) {
            return 0;
        } else return index;
    } else return maxMin(node.childNodes.length - 1, 0, index);
}

const cix = (node: Slidy) => Math.floor(node.childNodes.length / 2);
const parent = (node: Slidy): Parent => node.parentNode as Parent;
const nodes = (node: Slidy): Child[] => Array.from(node.childNodes as NodeListOf<Child>);
const child = (node: Slidy, index: number) => node.childNodes[index] as Child;
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
    parent: () => parent(node)[size(vertical)]
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

// DRAFT --------------------------------------
// function cumulativeOffset(element) {
// 	let top = 0,
// 		left = 0;
// 	if (element)
// 		do {
// 			top += element.offsetTop || 0;
// 			left += element.offsetLeft || 0;
// 			element = element.offsetParent;
// 		} while (element);

// 	return {
// 		top: top,
// 		left: left,
// 	};
// }

export { find, go, replace, indexing };
