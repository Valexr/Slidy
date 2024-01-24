import type { AnimationFunc } from './types';

// const { abs, exp, floor, min, max, round, sign, trunc } = Math;

// function clamp(mn: number, val: number, mx: number): number {
//     return min(mx, max(mn, val));
// }

// const film: AnimationFunc = ({ node, child, translate, options }) => {
//     const exp = clamp(0, (child.size - abs(child.track)) / child.size, 1)
//     const img = child.firstChild
//     const turn = child.turn < 0
//     // options.snap === 'deck' ? child.turn > 0 : child.turn < 0
//     const track = Number(options.position) - child.dist
//     const part = (node.offsetWidth - abs(track)) / node.offsetWidth
//     const scale = part || clamp(0, child.exp, 1)

//     const active = child.index === options.index;
//     const scaleX = child.exp || 1;
//     const skewY = 0;
//     const skewX = 0;
//     const scaleY = 1;
//     const translateX = -Number(options.position);
//     const translateY = 0;

//     if (img instanceof HTMLImageElement) {
//         // img.style.transform = `scaleX(${1 / scale})`
//         // img.style.transformOrigin = child.turn < 0 ? 'left center' : 'right center'
//     }
//     return {
//         transform: `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`,
//         transformOrigin: turn ? 'left csenter' : 'right center',
//         borderRadius: `calc(1rem / ${scaleX || 1}) / 1rem`,
//         backgroundSize: `${100 / scaleX}% 100%`,
//     };
// };

const fade: AnimationFunc = ({ child, translate }) => {
    return {
        opacity: child.exp as unknown as string,
        transform: translate,
    };
};

const shade: AnimationFunc = ({ child, translate }) => {
    const active = child.i === child.active;
    const full = Math.abs(child.track) <= child.size;
    const zIndex = active ? 0 : 1;
    const paralax = `${child.track / 0.5}px, 0`;

    if (child.index === 4) console.log(child.index, full);

    return {
        // opacity: full ? child.exp : 1,
        transform: active ? `${translate} translate(${paralax})` : `${translate}`,
        zIndex: `${zIndex}`,
    };
};

const blur: AnimationFunc = ({ child, translate }) => {
    const active = child.i === child.active;
    const zIndex = active
        ? child.active
        : child.i > child.active
            ? child.active - child.i
            : child.i - child.active;
    return {
        opacity: String(child.exp),
        filter: `blur(${1 - child.exp}ex`,
        transform: translate,
        zIndex: String(zIndex),
    };
};

const scale: AnimationFunc = ({ child, translate }) => {
    return {
        transform: `${translate} scale(${child.exp})`,
    };
};

const rotate: AnimationFunc = ({ child, options, translate }) => {
    const active = child.index === options.index;
    const zIndex = active ? 0 : -1;

    return {
        transform: `${translate} rotate(${child.turn}turn)`,
        zIndex: String(zIndex),
    };
};

const perspective: AnimationFunc = ({ child, translate }) => {
    // child.style.transformStyle = 'preserve-3d';
    return {
        transform: `${translate} perspective(${-child.turn}px)`,
        // zIndex: child.zindex
    };
};

const shuffle: AnimationFunc = ({ node, child, options, translate }) => {
    // const active = child.i === child.active
    // options.snap = 'deck'
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
        zIndex: String(zIndex),
    };
};

const translate: AnimationFunc = ({ translate }) => {
    return {
        transform: translate,
    };
};

const matrix: AnimationFunc = ({ node, child, options }) => {
    // node.style.perspective = `${node.offsetWidth}px`;
    // matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() )
    const active = child.index === options.index;
    const scaleX = child.exp;
    const skewY = -child.turn;
    const skewX = -child.turn;
    const scaleY = child.exp;
    const translateX = -(options.position as number);
    const translateY = -child.turn;
    // const translateZ = -Math.abs(child.track);
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
        zIndex: String(zIndex),
    };
};

const stairs: AnimationFunc = ({ node, child, options, translate }) => {
    node.style.perspective = `${node.offsetWidth}px`;
    // node.style.transformStyle = `preserve-3d`;
    const deck = options.snap === 'deck';
    const active = child.i === child.active;
    const zIndex = active
        ? child.active
        : child.i > child.active
            ? child.active - child.i
            : child.i - node.children.length + 1;
    const stairs = deck ? `scale(${child.exp})` : `translateZ(${-Math.abs(child.track)}px)`;
    return {
        transform: translate + stairs,
        zIndex: String(zIndex),
    };
};

const flip: AnimationFunc = ({ node, child, options, translate }) => {
    node.style.perspective = `${node.offsetWidth}px`;

    const deck = options.snap === 'deck';
    const turn = child.turn / (deck ? -2 : -4);
    const rotate = options.vertical ? `rotateX(${turn}turn)` : `rotateY(${-turn}turn)`;
    const active = Math.abs(turn) < 0.25;

    return {
        transform: translate + rotate,
        zIndex: String(active ? 0 : -1),
        opacity: String(active || !deck ? 1 : 0),
    };
};

const deck: AnimationFunc = ({ node, child, options, translate }) => {
    node.style.perspective = `${node.offsetWidth}px`;

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
        ? child.active
        : child.i > child.active
            ? child.active - child.i
            : 1 - node.children.length - child.i;
    return {
        transform: translate + `translate3d(${X}px, ${Y}px, ${Z}px) rotateZ(${R}deg) scale(${S})`,
        // zIndex: active ? 0 : -(node.children.length - child.index)
        zIndex: String(zIndex),
    };
};

export {
    blur,
    deck,
    fade,
    // film,
    flip,
    matrix,
    perspective,
    rotate,
    scale,
    shade,
    shuffle,
    stairs,
    translate,
};
