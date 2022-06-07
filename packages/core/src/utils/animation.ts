import { dom } from './dom';
import { loop } from './env';

import type { Options } from '../types';

function fade(node: HTMLElement, position: number, options: Options) {
    loop(node.children, (item) => {
        item.style.opacity = `${position / dom(node, options).end}`;
    });
}

function translate(node: HTMLElement, position: number, options: Options) {
    const axis = options.vertical ? `0, ${-position}px` : `${-position}px, 0`;
    loop(node.children, (item) => {
        item.style.transform = `translate(${axis})`;
    });
}

export { fade, translate };
