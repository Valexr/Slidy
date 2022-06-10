import { dom } from './dom';

import type { AnimationArgs } from '../types';

function fade({ node, child, i, options, position, pos }: AnimationArgs) {
    const axis = options.vertical ? `0, ${-position}px` : `${-position}px, 0`;
    const nodeSize = options.vertical ? 'offsetHeight' : 'offsetWidth';
    const { indx, gap, size, dist } = child;
    const diff = position - child.dist;
    const opacity = (size - Math.abs(diff)) / size;
    const scale = (size - Math.abs(diff / 5)) / size;
    const turn = diff / size;
    // i === options.index && console.log(opacity, pos);
    child.style.opacity = `${opacity}`;
    child.style.transform = `translate(${axis}) scale(${scale})`;
}

function translate({ node, child, i, options, position }: AnimationArgs) {
    const axis = options.vertical ? `0, ${-position}px` : `${-position}px, 0`;
    child.style.transform = `translate(${axis})`;
}

function matrix({ node, child, i, options, position }: AnimationArgs) {
    // matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() )
    const axis = options.vertical ? `1,0,0,1,0, ${-position}` : `1,0,0,1, ${-position}, 0`;
    child.style.transform = `matrix(${axis})`;
}

export { fade, matrix, translate };
