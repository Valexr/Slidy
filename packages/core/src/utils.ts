import { Child, CssRule, Options } from './types';

function maxMin(max: number, min: number, val: number) {
    return Math.min(max, Math.max(min, val)) || 0;
}

function maxSize(node: HTMLElement, vertical: boolean) {
    return vertical
        ? node.scrollHeight - parent(node).offsetHeight
        : node.scrollWidth - parent(node).offsetWidth;
}

function indexing(node: HTMLElement, index: number, loop: boolean) {
    if (loop) {
        if (index < 0) {
            return nodes(node).length - 1;
        } else if (index > nodes(node).length - 1) {
            return 0;
        } else return index;
    } else return maxMin(nodes(node).length - 1, 0, index);
}

function coordinate(e: MouseEvent | TouchEvent | WheelEvent, vertical: boolean) {
    if (e.type === 'wheel') {
        if (!vertical && Math.abs(e.deltaY) < 2) e.preventDefault();
        return vertical ? e.deltaY : e.shiftKey ? e.deltaY : e.deltaX;
    } else return vertical ? uniQ(e).clientY : uniQ(e).clientX;
}

const uniQ = (e: MouseEvent | TouchEvent) => (e.changedTouches ? e.changedTouches[0] : e);

const cix = (node: HTMLElement) => Math.floor(node.children.length / 2);
const parent = (node: HTMLElement) => node.parentElement;
const nodes = (node: HTMLElement) => Array.from(node.children);
const child = (node: HTMLElement, index: number) => node.children[index];
const coord = (vertical: boolean) => (vertical ? 'offsetTop' : 'offsetLeft');
const size = (vertical: boolean) => (vertical ? 'offsetHeight' : 'offsetWidth');
const part = (align: string) => (align === 'center' ? 0.5 : 1);
const diff = (align: string, pos: number) => (align !== 'start' ? pos : 0);
const offset = (node: HTMLElement, child: Element, vertical: boolean) =>
    node.parentElement[size(vertical)] - child[size(vertical)];
const position = (node: HTMLElement, child: Element, vertical: boolean, align: string) =>
    child[coord(vertical)] - diff(align, offset(node, child, vertical) * part(align));
const distance = (node: HTMLElement, index: number, vertical: boolean) =>
    Math.abs(nodes(node)[index][coord(vertical)]);
// const align = (node: HTMLElement, vertical: boolean): string => {
//     return distance(node, 0, vertical) < maxSize(node, vertical)
//         ? 'start'
//         : distance(node, 0, vertical) >= maxSize(node, vertical) &&
//           distance(node, nodes(node).length - 1, vertical) > maxSize(node, vertical) &&
//           maxSize(node, vertical) !== 0
//         ? 'center'
//         : 'end';
// };
const gap = (node: HTMLElement, vertical: boolean) => {
    const last = nodes(node).length - 1;
    const prev =
        distance(node, last - 1, vertical) + nodes(node)[last - 1][size(vertical)];
    return distance(node, last, vertical) - prev;
};

function closest({
    node,
    target,
    vertical,
    align,
}: {
    node: HTMLElement;
    target: number;
    vertical: boolean;
    align: string;
}): Element {
    return nodes(node).reduce((prev: Element, curr: Element, i) => {
        const pos = (child: Element) => position(node, child, vertical, align);
        return Math.abs(pos(curr) - target) < Math.abs(pos(prev) - target) ? curr : prev;
    });
}
let current, indexes;
const find = {
    index: (
        node: HTMLElement,
        target: number,
        child: Element | undefined,
        vertical: boolean,
        align: string
    ) => {
        // current = nodes(node).indexOf(closest({ node, target, vertical, align }));
        // indexes = [...Array(nodes(node).length).keys()];
        // console.info(
        //     rotate(indexes, current - cix(node)),
        //     rotate(indexes, current - cix(node))[cix(node)],
        //     current
        // );
        return child
            ? nodes(node).indexOf(child)
            : +closest({ node, target, vertical, align }).dataset.index;
    },
    position: (node: HTMLElement, index: number, vertical: boolean, align: string) =>
        position(node, child(node, index), vertical, align),
    target: (node: HTMLElement, target: number, vertical: boolean, align: string) =>
        position(node, closest({ node, target, vertical, align }), vertical, align),
    size: (node: HTMLElement, index: number, vertical: boolean) =>
        nodes(node)[index][size(vertical)],
    child: (node: HTMLElement, index: number) =>
        nodes(node).find((child) => +child.dataset.index === index),
    gap: (node: HTMLElement, vertical: boolean) => gap(node, vertical),
    distance: (node: HTMLElement, index: number, vertical: boolean) =>
        distance(node, index, vertical),
    align: (node: HTMLElement, vertical: boolean) => align(node, vertical),
};

function prev(node: HTMLElement) {
    const last = node.children[node.children.length - 1];
    node.prepend(last);
}
function next(node: HTMLElement) {
    const first = node.children[0];
    node.append(first);
}

const rotate = (array: Array<Element | number>, key: number) =>
    array.slice(key).concat(array.slice(0, key));

function replace(node: HTMLElement, index: number, loop: boolean) {
    const replace = (nodes: Element[]) => node.replaceChildren(...nodes);
    const elements = loop
        ? rotate(nodes(node), index - cix(node))
        : nodes(node).sort((a, b) => a.dataset.index - b.dataset.index);
    replace(elements);
}

function css(node: HTMLElement, styles: CssRule) {
    for (const property in styles) {
        node.style[property] = styles[property];
    }
}

function dispatch(
    node: HTMLElement,
    name: string,
    detail?: { [key: string]: string | number | HTMLCollection | HTMLElement | Options }
) {
    node.dispatchEvent(new CustomEvent(name, { ...detail }));
}

const listen = (
    node: Window | HTMLElement | null,
    events: [keyof HTMLElementEventMap, EventListener][],
    on: boolean = true
) =>
    events.forEach(([event, handle]) =>
        on
            ? node?.addEventListener(event, handle, true)
            : node?.removeEventListener(event, handle, true)
    );

function init(node: HTMLElement): Child[] {
    return nodes(node).map((n, i): Child => {
        return {
            index: i,
            offsetTop: n.offsetTop,
            offsetLeft: n.offsetLeft,
            offsetWidth: n.offsetWidth,
            offsetHeight: n.offsetHeight,
        };
    });
}

export {
    init,
    find,
    closest,
    rotate,
    replace,
    prev,
    next,
    css,
    dispatch,
    listen,
    maxMin,
    maxSize,
    indexing,
    coordinate,
    uniQ,
};
