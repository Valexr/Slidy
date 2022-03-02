import { Child, CssRule, Options, Slide } from './types';

function maxMin(max: number, min: number, val: number) {
    return Math.min(max, Math.max(min, val)) || 0;
}

function maxSize(node: HTMLElement, vertical: boolean) {
    return node[scroll(vertical)] - parent(node)[size(vertical)]
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
        if (!vertical && Math.abs(e.deltaX) && Math.abs(e.deltaY) < 15) e.preventDefault();
        return vertical ? e.deltaY : e.shiftKey ? e.deltaY : e.deltaX;
    } else return vertical ? uniQ(e).clientY : uniQ(e).clientX;
}

const uniQ = (e: MouseEvent | TouchEvent) => (e.changedTouches ? e.changedTouches[0] : e);

const cix = (node: HTMLElement) => Math.floor(node.childNodes.length / 2);
const parent = (node: HTMLElement) => node.parentNode;
const nodes = (node: HTMLElement): ChildNode[] => Array.from(node.childNodes);
const child = (node: HTMLElement, index: number) => node.childNodes[index];
const scroll = (vertical: boolean) => (vertical ? 'scrollHeight' : 'scrollWidth');
const coord = (vertical: boolean) => (vertical ? 'offsetTop' : 'offsetLeft');
const size = (vertical: boolean) => (vertical ? 'offsetHeight' : 'offsetWidth');
const part = (align: string) => (align === 'center' ? 0.5 : 1);
const diff = (align: string, pos: number) => (align !== 'start' ? pos : 0);
const offset = (node: HTMLElement, child: ChildNode, vertical: boolean) =>
    parent(node)[size(vertical)] - child[size(vertical)];
const position = (
    node: HTMLElement,
    child: ChildNode,
    vertical: boolean,
    align: string
) => child[coord(vertical)] - diff(align, offset(node, child, vertical) * part(align));
const distance = (node: HTMLElement, index: number, vertical: boolean) =>
    Math.abs(nodes(node)[index][coord(vertical)]);

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
}): ChildNode {
    return nodes(node).reduce((prev: ChildNode, curr: ChildNode) => {
        const pos = (child: ChildNode) => position(node, child, vertical, align);
        return Math.abs(pos(curr) - target) < Math.abs(pos(prev) - target) ? curr : prev;
    });
}

const find = {
    index: (
        node: HTMLElement,
        target: number,
        index: number | null,
        vertical: boolean,
        align: string
    ): number => {
        const child: ChildNode | undefined = nodes(node).find((child: ChildNode) => child.index === index);
        return child
            ? nodes(node).indexOf(child)
            : closest({ node, target, vertical, align }).index || 0;
    },
    position: (node: HTMLElement, index: number, vertical: boolean, align: string) =>
        position(node, child(node, index), vertical, align),
    target: (node: HTMLElement, target: number, vertical: boolean, align: string) =>
        position(node, closest({ node, target, vertical, align }), vertical, align),
    size: (node: HTMLElement, index: number, vertical: boolean) =>
        nodes(node)[index][size(vertical)],
    gap: (node: HTMLElement, vertical: boolean) => gap(node, vertical)
};

function prev(node: HTMLElement) {
    node.prepend(node.childNodes[node.childNodes.length - 1]);
}
function next(node: HTMLElement) {
    node.append(node.childNodes[0]);
}

const rotate = (array: Array<Node | string>, key: number) =>
    array.slice(key).concat(array.slice(0, key));

function replace(node: HTMLElement, index: number, loop: boolean) {
    const elements = loop
        ? rotate(nodes(node), index - cix(node))
        : nodes(node).sort((a, b) => a.index - b.index);
    node.replaceChildren(...elements);
}

function css(node: HTMLElement | ParentNode, styles: CssRule) {
    for (const property in styles) {
        node.style[property] = styles[property];
    }
}

function dispatch(
    node: HTMLElement,
    name: string,
    detail?: { [key: string]: string | number | NodeList | HTMLElement | Options }
) {
    node.dispatchEvent(new CustomEvent(name, { ...detail }));
}

const listen = (
    node: Window | Element | ParentNode,
    events: [
        string,
        EventListenerOrEventListenerObject,
        boolean | EventListenerOptions | undefined
    ][],
    on: boolean = true
) => {
    for (const [event, handle, options] of events) {
        on
            ? node.addEventListener(event, handle, options)
            : node.removeEventListener(event, handle, options);
    }
};

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
