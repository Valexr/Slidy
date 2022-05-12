/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */

/** Easing function.
 * @param t value from 0 to 1
 * @returns value from 0 to 1
 * @default easeInOutCubic
 * @see https://easings.net
 */
export type EasingFn = (t: number) => number;

// no easing, no acceleration
const linear = (t: number) => t;
// accelerating from zero velocity
const easeInQuad = (t: number) => t * t;
// decelerating to zero velocity
const easeOutQuad = (t: number) => t * (2 - t);
// acceleration until halfway, then deceleration
const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
// accelerating from zero velocity
const easeInCubic = (t: number) => t * t * t;
// decelerating to zero velocity
const easeOutCubic = (t: number) => --t * t * t + 1;
// acceleration until halfway, then deceleration
const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
// accelerating from zero velocity
const easeInQuart = (t: number) => t * t * t * t;
// decelerating to zero velocity
const easeOutQuart = (t: number) => 1 - --t * t * t * t;
// acceleration until halfway, then deceleration
const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t);
// accelerating from zero velocity
const easeInQuint = (t: number) => t * t * t * t * t;
// decelerating to zero velocity
const easeOutQuint = (t: number) => 1 + --t * t * t * t * t;
// acceleration until halfway, then deceleration
const easeInOutQuint = (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
const easeInBounce = (t: number) => 1 - easeOutBounce(1 - t);
const easeOutBounce = (t: number) => {
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
const easeInOutBounce = (t: number) => {
    return t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2;
};

export {
    linear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInQuint,
    easeOutQuint,
    easeInOutQuint,
    easeInBounce,
    easeOutBounce,
    easeInOutBounce,
};
