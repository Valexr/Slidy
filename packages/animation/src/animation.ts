import type { AnimationArgs } from './types';

function fade({ child, translate }: AnimationArgs) {
    return {
        opacity: child.exp,
        transform: translate,
    };
}

function scale({ child, translate, vertical }: AnimationArgs) {
    const scale = !vertical ? `${child.exp}, 1` : `1, ${child.exp}`
    return {
        transform: `${translate} scale(${child.exp})`,
    };
}

function rotate({ child, translate }: AnimationArgs) {
    return {
        transform: `${translate} rotate(${child.turn}turn)`,
        // zIndex: child.zindex
    };
}

function perspective({ child, translate }: AnimationArgs) {
    return {
        transform: `${translate} perspective(${child.track}rem)`,
        // zIndex: child.zindex
    };
}

function shuffle({ child, translate, vertical }: AnimationArgs) {
    const axis = !vertical ? `${-child.track}px, 0` : `0, ${-child.track}px`
    return {
        transform: `${child.active ? `${translate} translate(${axis})` : `${translate}`}`,
        zIndex: child.zindex
    }
}

function translate({ translate }: AnimationArgs) {
    return { transform: translate }
}

function matrix({ child, vertical }: AnimationArgs) {
    // matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() )
    const axis = !vertical ? `${-child.pos}, 0` : `0 ${-child.pos}`
    const scaleX = child.exp
    const skewY = -child.turn
    const skewX = -child.turn
    const scaleY = child.exp
    const translateX = -child.pos
    const translateY = -child.turn

    return {
        transform: `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`
    }
}

export { fade, matrix, perspective, rotate, scale, shuffle, translate };