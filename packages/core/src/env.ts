import type { Child, CssRules, Options, Parent, Slidy } from './types';

function onMount(node: Slidy, length = 2): Promise<NodeListOf<Child>> {
    return new Promise((resolve, reject) => {
        let count = 0;

        const mounting = setInterval(() => {
            count++;
            // console.log(count, node.childNodes.length, length);
            if (count >= 69) {
                count = 0;
                clearInterval(mounting);
                reject(`Slidy haven't items`);
            } else if (length && node.childNodes.length >= length) {
                count = 0;
                clearInterval(mounting);
                resolve(init(node));
                // setTimeout(() => resolve(node.childNodes));
            }
        }, 16);
    });
}

function getFPS() {
    return new Promise((resolve) =>
        requestAnimationFrame((t1: number) => requestAnimationFrame((t2: number) => resolve(1000 / (t2 - t1))))
    );
}

function dispatch(node: Slidy, name: string, detail?: { [key: string]: Options | Slidy | NodeListOf<Child> | number }) {
    node.dispatchEvent(new CustomEvent(name, { detail }));
}

function listen(
    node: Window | Element | ParentNode | Slidy,
    events: [string, EventListenerOrEventListenerObject, boolean?][],
    on = true
) {
    for (const [event, handle, options] of events) {
        const listen = on ? 'addEventListener' : 'removeEventListener';
        node[listen](event, handle, options);
    }
}

function init(node: Slidy, childs?: NodeListOf<Child>) {
    childs = node.childNodes as NodeListOf<Child>;
    // for (let index = 0; index < childs.length; index++) {
    //     childs[index].index = index;
    // }
    for (const key of childs.keys()) {
        childs[key].index = key;
    }
    return childs;
}

function css(node: Slidy | Parent, styles: CssRules) {
    let property: keyof CssRules;
    for (property in styles) {
        node.style[property] = styles[property];
    }
}

export { css, dispatch, init, listen, onMount, getFPS };
