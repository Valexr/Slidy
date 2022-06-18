import type { AnimationArgs } from './types';

function fade({ child, translate }: AnimationArgs) {
    return {
        opacity: child.exp,
        transform: translate,
    };
}

function scale({ child, translate }: AnimationArgs) {
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
    // const active = child.i === child.active
    const dir = Math.sign(child.track);
    const active = Math.abs(child.track) < child.size && child.i === child.active;
    const half = Math.abs(child.track) < child.size / 2;
    const X = half ? -child.track : Math.abs(child.track) - child.size;

    const axis = !options.vertical ? `${X}px, ${dir}px` : `0, ${-child.track}px`;
    const zIndex =
        child.i === child.active
            ? child.active
            : child.i > child.active
            ? child.active - child.i
            : -(child.i - child.active + node.children.length);
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

function stairs({ options, child, translate }: AnimationArgs) {
    const active = child.i === child.active;
    const zIndex = active
        ? child.active
        : child.i > child.active
        ? child.active - child.i
        : child.i - child.active;
    const stairs =
        options.layout === 'deck'
            ? `scale(${child.exp})`
            : `translateZ(${-Math.abs(child.track)}px)`;
    return {
        transform: translate + stairs,
        zIndex,
    };
}

function flip({ options, child, translate }: AnimationArgs) {
    const turn = child.turn / (options.layout === 'deck' ? -2 : -4);
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
