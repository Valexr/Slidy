import { CssRule, Options } from './types';

function maxMin(max: number, min: number, val: number) {
    return Math.min(max, Math.max(min, val)) || 0;
}

function maxSize(node: HTMLElement, vertical: boolean) {
    // console.log(node.scrollWidth - parent(node).offsetWidth)
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
        return vertical ? e.deltaY : e.shiftKey ? e.deltaY : e.deltaX;
    } else return vertical ? uniQ(e).clientY : uniQ(e).clientX;
}

const uniQ = (e: MouseEvent | TouchEvent) => (e.changedTouches ? e.changedTouches[0] : e);

// function getTranslateXY(element: Element, axis: string) {
//     const style = window.getComputedStyle(element);
//     const matrix = new DOMMatrixReadOnly(style.transform);
//     return matrix[axis === 'y' ? 'm42' : 'm41'];
// }

const cix = (node: HTMLElement) => Math.floor(node.children.length / 2);
const parent = (node: HTMLElement) => node.parentElement;
const nodes = (node: HTMLElement) => Array.from(node.children);
const child = (node: HTMLElement, index: number) => node.children[index];
// const computed = (child: Element, axis: string) =>
//     getComputedStyle(child).transform.split(',')[axis === 'y' ? 5 : 4];
const coord = (vertical: boolean) => (vertical ? 'offsetTop' : 'offsetLeft');
const size = (vertical: boolean) => (vertical ? 'offsetHeight' : 'offsetWidth');
const part = (align: string) => (align === 'middle' ? 0.5 : 1);
const diff = (align: string, pos: number) => (align !== 'start' ? pos : 0);
const offset = (node: HTMLElement, child: Element, vertical: boolean) =>
    node.parentElement[size(vertical)] - child[size(vertical)];
const position = (node: HTMLElement, child: Element, vertical: boolean, align: string) =>
    child[coord(vertical)] - diff(align, offset(node, child, vertical) * part(align));
const distance = (node: HTMLElement, index: number, vertical: boolean) =>
    Math.abs(nodes(node)[index][coord(vertical)]);

function closest({ node, target, vertical, align }: { node: HTMLElement; target: number; vertical: boolean; align: string; }) {
    return nodes(node).reduce((prev: Element, curr: Element, i) => {
        const pos = (child: Element) => position(node, child, vertical, align);
        // console.log(i, 'curr:', pos(curr), 'prev:', pos(prev));
        return Math.abs(pos(curr) - target) < Math.abs(pos(prev) - target) ? curr : prev;
    });
}

const find = {
    index: (
        node: HTMLElement,
        target: number,
        child: Element | undefined,
        vertical: boolean,
        align: string
    ) =>
        child
            ? nodes(node).indexOf(child)
            : +closest({ node, target, vertical, align }).dataset.index,
    position: (node: HTMLElement, index: number, vertical: boolean, align: string) =>
        position(node, child(node, index), vertical, align),
    target: (node: HTMLElement, target: number, vertical: boolean, align: string) =>
        position(node, closest({ node, target, vertical, align }), vertical, align),
    size: (node: HTMLElement, index: number, vertical: boolean) =>
        nodes(node)[index][size(vertical)],
    child: (node: HTMLElement, index: number) =>
        nodes(node).find((child) => +child.dataset.index === index),
    gap: (node: HTMLElement, vertical: boolean) => {
        return (
            distance(node, 0, vertical) -
            distance(node, 1, vertical) -
            nodes(node)[0][size(vertical)]
        );
    },
};

// const styling = (node: HTMLElement, undo: boolean = false) => {
//     nodes(node).forEach((c: HTMLElement) => {
//         c.style.position = 'absolute';
//         // if (c.hasChildNodes()) {
//         //     if (c.querySelector('img')) {
//         //         c.querySelector('img').style.willChange = 'transform';
//         //         // c.querySelector('img').style.pointerEvents = 'none';
//         //     }
//         // }
//     });
// };

// const initialise = (node: HTMLElement, axis: string = 'x', gap: number = 0) => {
//     nodes(node).forEach((c: HTMLElement, i: number) => {
//         c.style.cssText = `--init: ${c[coord(axis)] + (i > 0 ? gap : 0)
//             }; transform: translate3d(${c[coord(axis)] + (i > 0 ? gap : 0)}px, 0, 0)`;
//     });
//     // nodes(node).forEach((c, i) => {
//     //     c.style.position = `translate3d(${c[coord(axis)] + (i > 0 ? gap : 0)}px, 0, 0)`;
//     //     // if (c.hasChildNodes()) {
//     //     //     if (c.querySelector('img')) {
//     //     //         c.querySelector('img').style.willChange = 'transform';
//     //     //         // c.querySelector('img').style.pointerEvents = 'none';
//     //     //     }
//     //     // }
//     // })
// };

function css(node: HTMLElement, styles: CssRule) {
    for (const property in styles) {
        node.style[property] = styles[property];
    }
}

function dispatch(
    node: HTMLElement,
    name: string,
    detail: { [key: string]: string | number | HTMLCollection | HTMLElement | Options }
) {
    node.dispatchEvent(new CustomEvent(name, { ...detail }));
}

// function rotateArray1(nums, k) {
//     for (let i = 0; i < k; i++) {
//         nums.unshift(nums.pop());
//     }
//     return nums;
// }

// function ordering(node: HTMLElement, nums: number[], index: number, cix: number) {
//     node.style.justifyContent = 'center';
//     rotate(nums, index - cix).forEach((n: number, i: number) => {
//         node.children[n].style.order = i;
//     });
// }

function prev(node: HTMLElement) {
    const last = node.children[node.children.length - 1];
    node.prepend(last);
}
function next(node: HTMLElement) {
    const first = node.children[0];
    node.append(first);
}

const rotate = (array: Array<Element>, key: number) =>
    array.slice(key).concat(array.slice(0, key));

function replace(node: HTMLElement, index: number, loop: boolean) {
    const replace = (nodes: Element[]) => node.replaceChildren(...nodes);
    const elements = loop
        ? rotate(nodes(node), index - cix(node))
        : nodes(node).sort((a, b) => a.dataset.index - b.dataset.index);
    replace(elements);
}

export {
    find,
    // styling,
    // initialise,
    // computed,
    closest,
    rotate,
    replace,
    prev,
    next,
    css,
    dispatch,
    maxMin,
    maxSize,
    indexing,
    coordinate,
    // setCss,
    uniQ,
};
