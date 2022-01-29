// https://github.com/ariya/kinetic

// more easing https://gist.github.com/gre/1650294
// export var easing = {
//     // no easing, no acceleration
//     linear: function (t) {
//         return t;
//     },
//     // accelerating from zero velocity
//     easeInQuad: function (t) {
//         return t * t;
//     },
//     // decelerating to zero velocity
//     easeOutQuad: function (t) {
//         return t * (2 - t);
//     },
//     // acceleration until halfway, then deceleration
//     easeInOutQuad: function (t) {
//         return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
//     },
//     // accelerating from zero velocity
//     easeInCubic: function (t) {
//         return t * t * t;
//     },
//     // decelerating to zero velocity
//     easeOutCubic: function (t) {
//         return --t * t * t + 1;
//     },
//     // acceleration until halfway, then deceleration
//     easeInOutCubic: function (t) {
//         return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
//     },
//     // accelerating from zero velocity
//     easeInQuart: function (t) {
//         return t * t * t * t;
//     },
//     // decelerating to zero velocity
//     easeOutQuart: function (t) {
//         return 1 - --t * t * t * t;
//     },
//     // acceleration until halfway, then deceleration
//     easeInOutQuart: function (t) {
//         return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
//     },
//     // accelerating from zero velocity
//     easeInQuint: function (t) {
//         return t * t * t * t * t;
//     },
//     // decelerating to zero velocity
//     easeOutQuint: function (t) {
//         return 1 + --t * t * t * t * t;
//     },
//     // acceleration until halfway, then deceleration
//     easeInOutQuint: function (t) {
//         return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
//     },
// };

const RAF = window.requestAnimationFrame;

// animate helper
export function animate({
    timing = (t: number) => t,
    draw = (p: number) => {
        p;
    },
    duration = 0,
    stop = false,
}) {
    let elapsed: number,
        start = performance.now(),
        raf = null;
    // progress = 1;

    // global var for kill animation
    // TODO Сделать ручку для активации киллера
    window.allow_animation = true;

    RAF(function animate(time: number) {
        // timeFraction изменяется от 0 до 1
        // let timeFraction = (time - performance.now()) / 1000;
        // if (timeFraction > 1) timeFraction = 1;

        const elapsed = (time - start) / duration;
        // if (elapsed > 1) elapsed = 1;
        // delta = -amplitude * Math.exp(-elapsed / duration);
        // console.log('delta:', delta);

        // вычисление текущего состояния анимации
        const progress = timing(-elapsed);
        draw(progress);
        // console.log(`${easing.easeInQuad(timeFraction)}`);

        if (window.allow_animation && progress > 0.0005) RAF(animate);
        // else cancelAnimationFrame(raf);
    });
}
