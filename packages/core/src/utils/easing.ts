import type { Easing } from '../types';

const linear: Easing = (t) => t;
const quad: Easing = (t) => t * t;
const cubic: Easing = (t) => t * t * t;
const quart: Easing = (t) => t * t * t * t;
const quint: Easing = (t) => t * t * t * t * t;
const bounce: Easing = (t) => {
    const out: Easing = (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    };
    return 1 - out(1 - t);
};
const sine: Easing = (t) => 1 - Math.cos((t * Math.PI) / 2);
const expo: Easing = (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10));
const elastic: Easing = (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
};
const circ: Easing = (t) => 1 - Math.sqrt(1 - Math.pow(t, 2));
const back: Easing = (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
};

export { linear, quad, cubic, quart, quint, bounce, sine, expo, elastic, circ, back };
