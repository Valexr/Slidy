import { CssRule } from "./types";

function maxMin(max: number, min: number, val: number) {
    return Math.min(max, Math.max(min, val)) || 0;
}

function maxSize(node: HTMLElement, axis: string) {
    const parent: HTMLElement = node.parentElement;
    return axis === 'y'
        ? node.scrollHeight - parent.offsetHeight
        : node.scrollWidth - parent.offsetWidth;
}

function indexing(node: HTMLElement, index: number, loop: boolean = false) {
    if (loop) {
        if (index < 0) {
            return nodes(node).length - 1;
        } else if (index > nodes(node).length - 1) {
            return 0;
        } else return index;
    } else return maxMin(nodes(node).length - 1, 0, index);
}

function axisCoord(e: MouseEvent | TouchEvent | WheelEvent, axis: string) {
    if (e.type === 'wheel') {
        return axis === 'y' ? e.deltaY : e.shiftKey ? e.deltaY : e.deltaX;
    } else return axis === 'y' ? uniQ(e).clientY : uniQ(e).clientX;
}

const uniQ = (e: MouseEvent | TouchEvent) => (e.changedTouches ? e.changedTouches[0] : e);

function getTranslateXY(element: Element, axis: string) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return matrix[axis === 'y' ? 'm42' : 'm41'];
}

const nodes = (node: HTMLElement) => Array.from(node.children);
const child = (node: HTMLElement, index: number) => node.children[index];
const computed = (child: Element, axis: string) =>
    getComputedStyle(child).transform.split(',')[axis === 'y' ? 5 : 4];
const coord = (axis: string) => (axis === 'y' ? 'offsetTop' : 'offsetLeft');
const size = (axis: string) => (axis === 'y' ? 'offsetHeight' : 'offsetWidth');
const part = (align: string) => (align === 'middle' ? 0.5 : 1);
const diff = (align: string, pos: number) => (align !== 'start' ? pos : 0);
const offset = (node: HTMLElement, child: Element, axis: string) =>
    node.parentElement[size(axis)] - child[size(axis)];
const position = (
    node: HTMLElement,
    child: Element,
    axis: string,
    align: string,
    loop: boolean = false
) => child[coord(axis)] - diff(align, offset(node, child, axis) * part(align));
// loop ? computed(child, axis) :

function closest(
    node: HTMLElement,
    target: number,
    axis: string,
    align: string,
    loop: boolean = false
) {
    return nodes(node).reduce((prev: Element, curr: Element, i) => {
        const pos = (child: Element) => position(node, child, axis, align, loop);
        // console.log(i, 'curr:', pos(curr), 'prev:', pos(prev));
        return Math.abs(pos(curr) - target) < Math.abs(pos(prev) - target) ? curr : prev;
    });
}

const find = {
    index: (
        node: HTMLElement,
        target: number,
        child: Element | undefined,
        axis: string,
        align: string,
        loop: boolean = false
    ) => child ? nodes(node).indexOf(child) : +closest(node, target, axis, align, loop).dataset.index,
    // nodes(node).indexOf(closest(node, target, axis, align)),
    position: (
        node: HTMLElement,
        index: number,
        axis: string,
        align: string,
        loop: boolean = false
    ) => position(node, child(node, index), axis, align, loop),
    target: (
        node: HTMLElement,
        target: number,
        axis: string,
        align: string,
        loop: boolean = false
    ) => position(node, closest(node, target, axis, align, loop), axis, align, loop),
    size: (node: HTMLElement, index: number, axis: string) =>
        nodes(node)[index][size(axis)],
    child: (node: HTMLElement,
        index: number) => nodes(node).find(child => +child.dataset.index === index)
};

const styling = (node: HTMLElement, undo: boolean = false) => {
    nodes(node).forEach((c: HTMLElement) => {
        c.style.position = 'absolute';
        // if (c.hasChildNodes()) {
        //     if (c.querySelector('img')) {
        //         c.querySelector('img').style.willChange = 'transform';
        //         // c.querySelector('img').style.pointerEvents = 'none';
        //     }
        // }
    });
};

const initialise = (node: HTMLElement, axis: string = 'x', gap: number = 0) => {
    nodes(node).forEach((c: HTMLElement, i: number) => {
        c.style.cssText = `--init: ${c[coord(axis)] + (i > 0 ? gap : 0)
            }; transform: translate3d(${c[coord(axis)] + (i > 0 ? gap : 0)}px, 0, 0)`;
    });
    // nodes(node).forEach((c, i) => {
    //     c.style.position = `translate3d(${c[coord(axis)] + (i > 0 ? gap : 0)}px, 0, 0)`;
    //     // if (c.hasChildNodes()) {
    //     //     if (c.querySelector('img')) {
    //     //         c.querySelector('img').style.willChange = 'transform';
    //     //         // c.querySelector('img').style.pointerEvents = 'none';
    //     //     }
    //     // }
    // })
};

function setCss(node: HTMLElement, styles: CssRule) {
    for (const property in styles) node.style[property] = styles[property];
}

function rotateArray1(nums, k) {
    for (let i = 0; i < k; i++) {
        nums.unshift(nums.pop());
    }
    return nums;
}

const rotate = (array: Array<any>, key: number) =>
    array.slice(key).concat(array.slice(0, key));

function ordering(node: HTMLElement, nums: number[], index: number, cix: number) {
    node.style.justifyContent = 'center';
    rotate(nums, index - cix).forEach((n: number, i: number) => {
        node.children[n].style.order = i;
    });
}

function prev(node: HTMLElement, axis: string) {
    const last = node.children[node.children.length - 1];
    // const clone = last.cloneNode(true);
    // node.style.left = `${-find.size(node, node.children.length - 1, axis)}px`;
    node.prepend(last);
    // node.removeChild(last);
}
function next(node: HTMLElement, axis: string) {
    const first = node.children[0];
    // const clone = first.cloneNode(true);
    // node.style.left = `${find.size(node, 0, axis)}px`;
    node.append(first);
    // node.removeChild(first);
}

function replace(node, childs, index, cix) {
    node.replaceChildren(...rotate(childs, index - cix))
    // node.style.left = `${find.size(node, 0, axis, align)}px`;
    // hix = index;
    // return;
}

export {
    find,
    styling,
    initialise,
    computed,
    closest,
    rotate,
    prev,
    next,
    maxMin,
    maxSize,
    indexing,
    axisCoord,
    setCss,
    uniQ,
};

// let options = {
//     root: parent,
//     rootMargin: '0px',
//     threshold: [1.0],
// };
// observer.observe(node);

// let intersected = [];
// let callback = (entries, observer) => {
//     console.log('entries:', entries);
//     // intersected = entries.filter(e => e.isIntersecting);
//     for (const entry of entries) {
//         // console.log(entry.intersectionRect.x);
//         const right = entry.boundingClientRect.right;
//         const center = entry.rootBounds.width / 2;
//         const end = entry.rootBounds.width * 0.75;
//         if (entry.intersectionRatio && right > center && right < end) {
//             entry.target.style.outline = '1px dashed blue';
//             entry.target.style.color = 'blue';
//             // observer.unobserve(entry.target);
//             console.log(+entry.target.id, entry.boundingClientRect, entry.boundingClientRect.right, entry.rootBounds.width);
//         } else {
//             entry.target.style.outline = '0';
//             entry.target.style.color = 'inherit';
//         }
//     }
//     // console.log('int:', intersected);
//     // for (const entry of entries) {
//     //     if (entry.isIntersecting) {
//     //         // console.log(entry.target.id, entry);
//     //         // intersected.filter(e => e !== +entry.target.id);
//     //         intersected = [...new Set([...intersected.filter(e => e !== +entry.target.id), +entry.target.id])];
//     //         observer.unobserve(entry.target);
//     //         console.log('intersected:', intersected);
//     //     } else {
//     //         // intersected.filter(e => e !== +entry.target.id);
//     //         console.log('untersected:', intersected, +entry.target.id);
//     //     }
//     // }
//     // entries.forEach((entry, i) => {
//     //     // console.log('io:', entry.target.id, entry);
//     //     if (entry.isIntersecting) {
//     //         // console.log(entry.target.id, entry);
//     //         intersected = [...new Set([...intersected, +entry.target.id])];
//     //         observer.unobserve(entry.target);
//     //         intersected.filter(e => e !== +entry.target.id);
//     //         console.log('intersected:', intersected);
//     //     } else {
//     //         // intersected.filter(e => e !== +entry.target.id);
//     //         console.log('untersected:', intersected, +entry.target.id);
//     //     }
//     //     // Each entry describes an intersection change for one observed
//     //     // target element:
//     //     //   entry.boundingClientRect
//     //     //   entry.intersectionRatio
//     //     //   entry.intersectionRect
//     //     //   entry.isIntersecting
//     //     //   entry.rootBounds
//     //     //   entry.target
//     //     //   entry.time
//     // });
// };
