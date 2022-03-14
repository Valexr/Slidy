import type { Child, CssRules, DispathDetail, Parent, Slidy, UniqEvent } from '../types';

function onMount(node: Slidy, length = 2): Promise<NodeListOf<Child>> {
    return new Promise((resolve, reject) => {
        let count = 0;

        const mounting = setInterval(() => {
            count++;
            if (count >= 69) {
                count = 0;
                clearInterval(mounting);
                reject(`Slidy haven't items`);
            } else if (length && node.childNodes.length >= length) {
                count = 0;
                clearInterval(mounting);
                resolve(init(node));
            }
        }, 16);
    });
}

function getFPS(): Promise<unknown> {
    return new Promise((resolve) =>
        requestAnimationFrame((t1: number) => requestAnimationFrame((t2: number) => resolve(1000 / (t2 - t1))))
    );
}

function dispatch(node: Slidy, name: string, detail?: DispathDetail): void {
    node.dispatchEvent(new CustomEvent(name, { detail: detail as CustomEventInit<unknown> }));
}

function listen(
    node: Window | Element | ParentNode | Slidy | null,
    events: [string, EventListenerOrEventListenerObject, boolean?][],
    on = true
): void {
    for (const [event, handle, options] of events) {
        const listen = on ? 'addEventListener' : 'removeEventListener';
        if (node) node[listen](event, handle, options);
    }
}

function init(node: Slidy, childs?: NodeListOf<Child>): NodeListOf<Child> {
    childs = node.childNodes as NodeListOf<Child>;
    for (let index = 0; index < childs.length; index++) {
        childs[index].index = index;
    }
    return childs;
}

function css(node: Slidy | Parent, styles: CssRules): void {
    let property: keyof CssRules;
    for (property in styles) {
        node.style[property] = styles[property];
    }
}

function coordinate(e: UniqEvent, vertical?: boolean): number {
    if (e.type === 'wheel') {
        if (!vertical && Math.abs(e.deltaX) && Math.abs(e.deltaY) < 15) e.preventDefault();
        return vertical ? e.deltaY : e.shiftKey ? e.deltaY : e.deltaX;
    } else return vertical ? uniQ(e).clientY : uniQ(e).clientX;
}

const uniQ = (e: UniqEvent): UniqEvent | { [key: string]: number } => (e.changedTouches ? e.changedTouches[0] : e);

export { coordinate, css, dispatch, init, listen, onMount, getFPS };
