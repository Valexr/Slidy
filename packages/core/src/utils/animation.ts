import type { AnimationArgs } from '../types';

function translate({ child, options, position }: AnimationArgs): void {
    const axis = options.vertical ? `0, ${-position}px` : `${-position}px, 0`;
    child.style.transform = `translate(${axis})`;
}

export { translate };
