import type { EasingFunc } from './types';

const { cos, sin, pow, sqrt, PI } = Math

const linear: EasingFunc = (t) => t;
const quad: EasingFunc = (t) => t * t;
const cubic: EasingFunc = (t) => t * t * t;
const quart: EasingFunc = (t) => t * t * t * t;
const quint: EasingFunc = (t) => t * t * t * t * t;
const sine: EasingFunc = (t) => 1 - cos((t * PI) / 2);
const expo: EasingFunc = (t) => (t === 0 ? 0 : pow(2, 10 * t - 10));
const circ: EasingFunc = (t) => 1 - sqrt(1 - pow(t, 2));

const back: EasingFunc = (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
};
const bounce: EasingFunc = (t) => {
    const out: EasingFunc = (t) => {
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
const elastic: EasingFunc = (t) => {
    const c4 = (2 * PI) / 3;
    return t % 1 ? -pow(2, 10 * t - 10) * sin((t * 10 - 10.75) * c4) : t;
};

export { linear, quad, cubic, quart, quint, bounce, sine, expo, elastic, circ, back };

