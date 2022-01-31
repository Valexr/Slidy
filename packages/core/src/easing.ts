// https://github.com/ariya/kinetic

// more easing https://gist.github.com/gre/1650294

const linear = (t: number) => t,
    easeInQuad = (t: number) => Math.pow(t, 2),
    easeOutQuad = (t: number) => 1 - easeInQuad(1 - t),
    easeInOutQuad = (t: number) =>
        t < 0.5 ? easeInQuad(t * 2) / 2 : easeOutQuad(t * 2 - 1) / 2 + 0.5,
    easeInCubic = (t: number) => Math.pow(t, 3),
    easeOutCubic = (t: number) => 1 - easeInCubic(1 - t),
    easeInOutCubic = (t: number) =>
        t < 0.5 ? easeInCubic(t * 2) / 2 : easeOutCubic(t * 2 - 1) / 2 + 0.5,
    easeInQuart = (t: number) => Math.pow(t, 4),
    easeOutQuart = (t: number) => 1 - easeInQuart(1 - t),
    easeInOutQuart = (t: number) =>
        t < 0.5 ? easeInQuart(t * 2) / 2 : easeOutQuart(t * 2 - 1) / 2 + 0.5,
    easeInQuint = (t: number) => Math.pow(t, 5),
    easeOutQuint = (t: number) => 1 - easeInQuint(1 - t),
    easeInOutQuint = (t: number) =>
        t < 0.5 ? easeInQuint(t * 2) / 2 : easeOutQuint(t * 2 - 1) / 2 + 0.5;

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
};
