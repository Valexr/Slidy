import { onMount } from './env';
import type { Child, Delta, Options, Scroll } from './types';
import {
    css,
    find,
    prev,
    next,
    maxMin,
    listen,
    replace,
    dispatch,
    indexing,
    coordinate,
} from './utils';

export function slidy(
    node: HTMLElement,
    options: Options = {
        index: 0,
        length: 0,
        gravity: 1.2,
        duration: 375,
        loop: false,
        snap: false,
        clamp: false,
        vertical: false,
    }
): {
    update: (options: Options) => void;
    destroy: () => void;
    to: (index: number, target?: number) => void;
} {
    let raf: number,
        rak: number,
        velocity = 0,
        reference = 0,
        position = 0,
        frame = 0,
        dragtime: NodeJS.Timer,
        wheeltime: NodeJS.Timeout,
        hip = position,
        hix = options.index,
        gap = 0,
        gravity = options.gravity,
        align = 'center',
        direction = 0,
        pressed = false,
        timestamp = 0,
        consttime = 100;

    const PARENT = node.parentElement;
    const windowEvents: [keyof HTMLElementEventMap, EventListener][] = [
        ['touchmove', onMove],
        ['mousemove', onMove],
        ['touchend', onUp],
        ['mouseup', onUp],
        ['scroll', onScroll],
    ];
    const parentEvents: [keyof HTMLElementEventMap | string, () => void][] = [
        ['contextmenu', clear],
        ['touchstart', onDown],
        ['mousedown', onDown],
        ['keydown', onKeys],
        ['wheel', onWheel],
        ['resize', onResize],
    ];

    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
        dispatch(node, 'resize', { detail: node });
    });

    const indx = () => {
        return {
            min: 0,
            max: node.children.length - 1,
        };
    };
    const amp = () => {
        return {
            max: find.position(node, indx().max, options.vertical, 'end'),
            min: find.position(node, indx().min, options.vertical, 'start'),
        };
    };
    const active = () => {
        return {
            pos: find.position(node, options.index, options.vertical, align),
            size: find.size(node, options.index, options.vertical),
        };
    };

    onMount(node, options.length)
        .then((childs: HTMLCollection | Child[]) => {
            const styles = {
                userSelect: 'none',
                willChange: 'auto',
                touchAction: 'pan-y',
                webkitUserSelect: 'none',
                pointerEvents: 'none',
            };
            css(node, styles);

            gap = find.gap(node, options.vertical);
            replace(node, options.index, options.loop);
            to(options.index);

            if (PARENT) {
                css(PARENT, { outline: 'none' });
                listen(PARENT, parentEvents);
                RO.observe(PARENT);
            }
            dispatch(node, 'mount', { detail: childs });
        })
        .catch((error) => console.error(error));

    function move({ pos, transition = 0 }: { pos: number; transition?: number }): void {
        position += options.loop ? looping(pos) : pos;
        options.index = find.index(node, position, undefined, options.vertical, align);

        direction = Math.sign(pos); // prev << -1 | 1 >> next

        if (!options.loop) {
            const max = {
                pos: position >= amp().max - active().size && direction >= 0,
                idx: options.index === indx().max && direction > 0,
            };
            const min = {
                pos: position <= amp().min + active().size && direction <= 0,
                idx: options.index === indx().min && direction < 0,
            };
            align = max.pos ? 'end' : min.pos ? 'start' : 'center';
            options.gravity =
                max.idx || min.idx ? maxMin(1.8, 0, options.gravity + 0.015) : gravity;
        }

        function translate(vertical: boolean): string {
            return vertical ? `0, ${-position}px, 0` : `${-position}px, 0, 0`;
        }

        const styles = {
            transform: `translate3d(${translate(options.vertical)})`,
            transition: `transform ${transition}ms`,
        };

        css(node, styles);

        dispatch(node, 'move', { detail: { index: options.index, position } });
    }

    function looping(pos: number): number {
        const delta = hip - pos;
        const first = find.size(node, indx().min, options.vertical);
        const last = find.size(node, indx().max, options.vertical);
        const history = (size: number) => (size + gap) * Math.sign(-pos);

        if (hix !== options.index) {
            pos > 0 ? next(node) : prev(node);
            pos += history(pos > 0 ? first : last);
            frame = position + pos + delta;
        }
        hix = options.index;
        return pos;
    }

    let toing = false;
    function to(index: number, target: number | null = null): void {
        toing = true;
        clear();

        options.index = indexing(node, index, options.loop);

        if (!options.loop) {
            align =
                options.index === indx().min
                    ? 'start'
                    : options.index === indx().max
                    ? 'end'
                    : 'center';
        }
        const child = find.child(node, options.index);
        const ix = options.loop
            ? find.index(node, position, child, options.vertical, align)
            : options.index;

        let pos = target
            ? options.snap
                ? find.target(node, target, options.vertical, align)
                : target
            : target === 0
            ? 0
            : find.position(node, ix, options.vertical, align);
        move({ pos: pos - position, transition: options.duration });
    }

    function track(): void {
        let now,
            elapsed,
            delta,
            v,
            g = 2 - options.gravity;

        now = performance.now();
        elapsed = now - timestamp;
        delta = position - frame;

        v = (1000 * delta) / (1 + elapsed);
        velocity = g * v + 0.2 * velocity;

        if (elapsed < consttime) return;
        timestamp = now;
        frame = position;
    }

    function scroll({ target, amplitude, duration, timestamp }: Scroll): void {
        timestamp = performance.now();
        if (amplitude) {
            RAF(function scroll(time: number) {
                let elapsed, delta, dist, pos;
                elapsed = (time - timestamp) / duration;
                delta = amplitude * Math.exp(-elapsed);
                dist = position - (target - delta);
                pos = options.loop ? delta / 27 : -dist;
                move({ pos });
                raf = Math.abs(delta) > 0.5 ? RAF(scroll) : 0;
                if (options.loop && Math.abs(delta) < 100) to(options.index);
                else if (
                    !options.loop &&
                    Math.abs(delta) < 100 &&
                    (options.index === indx().min || options.index === indx().max)
                ) {
                    to(options.index);
                }
            });
        }
    }

    function onDown(e: MouseEvent | TouchEvent): void {
        pressed = true;
        clear();

        reference = coordinate(e, options.vertical);
        velocity = 0;
        timestamp = performance.now();
        frame = position;

        listen(window, windowEvents);
    }

    function onMove(e: MouseEvent | TouchEvent): void {
        let delta,
            pos,
            g = 2 - options.gravity;

        if (pressed) {
            pos = coordinate(e, options.vertical);
            delta = reference - pos;
            track();
            // if (delta > 2 || delta < -2) {
            reference = pos;
            move({ pos: delta * g });
            // }
        }
    }

    function onUp(e: MouseEvent | TouchEvent): void {
        pressed = false;
        track();
        clear();

        const { target, amplitude } = delting(position);

        if (Math.abs(amplitude) > 10) {
            Math.abs(velocity) < 100
                ? //  ||
                  //     (!options.loop &&
                  //         options.snap &&
                  //         ((options.index === indx().min && direction < 0) ||
                  //             (options.index === indx().max && direction > 0)))
                  to(options.index)
                : options.clamp
                ? to(options.index, target)
                : scroll({
                      target,
                      amplitude,
                      duration: options.duration,
                      timestamp: performance.now(),
                  });
        } else to(options.index);
    }

    function delting(position: number): Delta {
        velocity = maxMin(amp().max, -amp().max, velocity);
        let amplitude,
            target,
            g = 2 - options.gravity;

        amplitude = g * velocity;
        target = options.snap
            ? find.target(node, position + amplitude, options.vertical, align)
            : position + amplitude;

        amplitude = target - position;
        return { target, amplitude };
    }

    let wheeling = false;
    function onWheel(e: WheelEvent): void {
        clear();
        wheeling = true;

        if (e.shiftKey) {
            e.preventDefault();
            to(options.index - Math.sign(e.deltaY));
        } else {
            move({
                pos: coordinate(e, options.vertical) * (2 - options.gravity),
            });
        }

        if ((options.snap || options.clamp) && !e.shiftKey) {
            wheeltime = setTimeout(() => {
                to(options.index);
                wheeling = false;
                options.gravity = gravity;
            }, 100);
        }
    }

    function onKeys(e: KeyboardEvent): void {
        const keys = ['ArrowRight', 'Enter', ' '];
        if (e.key === 'ArrowLeft') {
            to(options.index - 1);
        } else if (keys.includes(e.key)) {
            to(options.index + 1);
        }
    }

    function onScroll(e: Scroll) {
        console.info(e);
    }

    function onResize(e: CustomEvent): void {
        to(options.index);
    }

    function clear(): void {
        hix = wheeling || toing ? hix : options.index;
        clearInterval(dragtime);
        clearTimeout(wheeltime);
        cancelAnimationFrame(raf);
        cancelAnimationFrame(rak);
        listen(window, windowEvents, false);
    }

    function update(opts: Options): void {
        for (const key in opts) {
            if (options[key as keyof Options] !== opts[key as keyof Options]) {
                switch (key) {
                    case 'index':
                        options[key] = indexing(node, opts[key], options.loop);
                        to(options[key]);
                        break;
                    case 'loop':
                        align = 'center';
                        options[key] = opts[key];
                        replace(node, options.index, options[key]);
                        to(options.index);
                        break;
                    case 'gravity':
                        options[key] = maxMin(2, 0, opts[key]);
                        gravity = options[key];
                        break;
                    case 'length':
                        options[key] = opts[key];
                        Array.from(node.children).forEach((c, i) => {
                            c.dataset.index = i;
                        });
                        to(options.index);
                        break;

                    default:
                        options[key as keyof Options] = opts[key as keyof Options];
                        break;
                }
            }
        }
        dispatch(node, 'update', { detail: options });
    }

    function destroy(): void {
        clear();
        RO.disconnect();
        listen(PARENT, parentEvents, false);
    }
    return {
        update,
        destroy,
        to,
    };
}
