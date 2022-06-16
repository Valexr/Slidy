import type { AnimationArgs } from './types';

function fade({ child, translate }: AnimationArgs) {
    return {
        opacity: child.exp,
        transform: translate,
    };
}

function scale({ options, child, translate }: AnimationArgs) {
    const scale = !options.vertical ? `${child.exp}, 1` : `1, ${child.exp}`;
    return {
        transform: `${translate} scale(${child.exp})`,
    };
}

function rotate({ child, options, translate }: AnimationArgs) {
    const active = child.index === options.index;
    return {
        transform: `${translate} rotate(${child.turn}turn)`,
        zIndex: active ? 0 : -1,
    };
}

function perspective({ child, translate }: AnimationArgs) {
    // child.style.transformStyle = 'preserve-3d';
    return {
        transform: `${translate} perspective(${-child.turn}px)`,
        // zIndex: child.zindex
    };
}

function shuffle({ node, options, child, translate }: AnimationArgs) {
    const active = child.index === options.index;
    const axis = !options.vertical ? `${-child.track}px, 0` : `0, ${-child.track}px`;
    const zIndex = active
        ? node.children.length - child.index
        : child.index < (options.index as number)
        ? child.index - node.children.length
        : node.children.length - child.index - 1;
    return {
        transform: active ? `${translate} translate(${axis})` : `${translate}`,
        zIndex,
    };
}

function translate({ child, translate }: AnimationArgs) {
    return {
        transform: translate,
    };
}

function matrix({ node, options, child, translate }: AnimationArgs) {
    // matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() )
    const active = child.index === options.index;
    const axis = !options.vertical ? `${-child.pos}, 0` : `0 ${-child.pos}`;
    const scaleX = child.exp;
    const skewY = -child.turn;
    const skewX = -child.turn;
    const scaleY = child.exp;
    const translateX = -child.pos;
    const translateY = -child.turn;
    const translateZ = -Math.abs(child.track);
    const zIndex = active
        ? node.children.length - child.index
        : child.index < (options.index as number)
        ? child.index - node.children.length
        : node.children.length - child.index - 1;

    // let theta = 360 / node.children.length;
    // let radius = Math.round((child.size / 2) / Math.tan(Math.PI / node.children.length));
    // let cellAngle = theta * child.index

    // let angle = theta * options.index * -1;
    // node.style.transform = 'translateZ(' + -radius + 'px) ' +
    //     'rotateY' + '(' + angle + 'deg)';

    return {
        transform: `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`,
        // transform: translate + `translateZ(${radius}px) rotateY(${cellAngle}deg)`,
        zIndex,
    };
}

function stairs({ node, options, child, translate }: AnimationArgs) {
    const active = child.index === options.index;
    const zIndex = active
        ? node.children.length - child.index
        : child.index < (options.index as number)
        ? child.index - node.children.length
        : node.children.length - child.index - 1;
    return {
        transform: `${translate} translateZ(${-Math.abs(child.track)}px)`,
        zIndex,
    };
}

function flip({ node, options, child, translate }: AnimationArgs) {
    const turn = options.layout === 'deck' ? child.turn / 2 : -child.turn / 4;
    const rotate = options.vertical ? `rotateX(${turn}turn)` : `rotateY(${-turn}turn)`;
    const active = Math.abs(turn) < 0.25;
    return {
        transform: translate + rotate,
        zIndex: active ? 0 : -1,
        opacity: active || options.layout !== 'deck' ? 1 : 0,
    };
}

function deck({ node, options, child, translate }: AnimationArgs) {
    const active = child.index === options.index;
    const D = child.size / 10;
    const diff = Math.abs(child.track * 2) >= child.size / 2;
    const coord = active ? (diff ? child.size + child.track : -child.track * 2) : -child.track / D;
    const X = options.vertical ? 0 : coord,
        Y = options.vertical ? coord : 0,
        Z = -Math.abs(child.track) / (D / 2),
        R = active ? -child.track / D : -child.track / (D * 2),
        S = active ? (child.size - Math.abs(child.track / 2)) / child.size : 1;
    const zIndex = active
        ? node.children.length - child.index
        : child.index < (options.index as number)
        ? child.index - node.children.length
        : node.children.length - child.index - 1;
    return {
        transform: translate + `translate3d(${X}px, ${Y}px, ${Z}px) rotateZ(${R}deg) scale(${S})`,
        // zIndex: active ? 0 : -(node.children.length - child.index)
        zIndex,
    };
}

export { deck, fade, flip, matrix, perspective, rotate, scale, shuffle, stairs, translate };
