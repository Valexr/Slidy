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
        timestamp = 0,
        consttime = 100;

    const PARENT = node.parentNode;
    const windowEvents: [string, (e: MouseEvent | TouchEvent) => void][] = [
        ['touchmove', onMove],
        ['mousemove', onMove],
        ['touchend', onUp],
        ['mouseup', onUp],
        // ['scroll', onScroll],
    ];
    const parentEvents: [string, Function | (() => void), boolean?][] = [
        ['contextmenu', clear],
        ['touchstart', onDown],
        ['mousedown', onDown],
        ['keydown', onKeys],
        ['wheel', onWheel],
        ['resize', onResize, true],
    ];

    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
        dispatch(node, 'resize', { detail: node });
    });

    const indx = () => ({
        min: 0,
        max: node.childNodes.length - 1,
    });
    const amp = () => ({
        max: find.position(node, indx().max, options.vertical, 'end'),
        min: find.position(node, indx().min, options.vertical, 'start'),
    });
    const active = () => ({
        pos: find.position(node, options.index, options.vertical, align),
        size: find.size(node, options.index, options.vertical),
    });

    onMount(node, options.length)
        .then((childs: NodeList) => {
            const styles = {
                userSelect: 'none',
                // willChange: 'auto',
                // touchAction: 'auto',
                webkitUserSelect: 'none',
                pointerEvents: 'none',
            };
            css(node, styles);

            gap = find.gap(node, options.vertical);
            replace(node, options.index, options.loop);
            to(options.index);

            if (PARENT) {
                css(PARENT, { outline: 'none', overflow: 'hidden' });
                listen(PARENT, parentEvents);
                RO.observe(PARENT);
            }
            dispatch(node, 'mount', { detail: childs });
        })
        .catch((error) => console.error(error));

    function move(pos: number, transition: number = 0): void {
        position += options.loop ? looping(pos) : pos;
        options.index = find.index(node, position, 0, options.vertical, align);

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
            gravity =
                max.idx || min.idx ? maxMin(1.8, 0, gravity + 0.015) : options.gravity;
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
        clear();
        toing = true;

        options.index = indexing(node, index, options.loop);

        if (!options.loop) {
            align =
                options.index === indx().min
                    ? 'start'
                    : options.index === indx().max
                        ? 'end'
                        : 'center';
        }

        const ix = options.loop
            ? find.index(node, position, options.index, options.vertical, align)
            : options.index;

        const pos = target
            ? options.snap
                ? find.target(node, target, options.vertical, align)
                : target
            : target === 0
                ? 0
                : find.position(node, ix, options.vertical, align);
        move(pos - position, options.duration);
    }

    function track(): void {
        let now, elapsed, delta, speed;

        now = performance.now();
        elapsed = now - timestamp;
        delta = position - frame;

        speed = (1000 * delta) / (1 + elapsed);
        velocity = (2 - gravity) * speed + 0.2 * velocity;

        if (elapsed < consttime) return;
        timestamp = now;
        frame = position;
    }

    function scroll({ target, amplitude, duration, timestamp }: Scroll): void {
        if (amplitude) {
            let elapsed, delta, dist, pos;
            timestamp = performance.now();

            RAF(function scroll(time: number) {
                elapsed = (time - timestamp) / duration;
                delta = amplitude * Math.exp(-elapsed);
                dist = position - (target - delta);
                pos = options.loop ? delta / 27 : -dist;

                move(pos);
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
        clear();

        reference = coordinate(e, options.vertical);
        timestamp = performance.now();
        frame = position;
        velocity = 0;

        listen(window, windowEvents);
    }

    function onMove(e: MouseEvent | TouchEvent): void {
        let delta = reference - coordinate(e, options.vertical);
        reference = coordinate(e, options.vertical);

        move(delta * (2 - gravity));
        track();
    }

    function onUp(): void {
        clear();

        const { target, amplitude } = delting(position);

        if (Math.abs(amplitude) > 10) {
            Math.abs(velocity) < 100 ||
                (!options.loop &&
                    options.snap &&
                    ((options.index === indx().min && direction < 0) ||
                        (options.index === indx().max && direction > 0)))
                ? to(options.index)
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

        let amplitude = velocity * (2 - gravity);
        let target = options.snap
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
            move(coordinate(e, options.vertical) * (2 - gravity));
        }

        if ((options.snap || options.clamp) && !e.shiftKey) {
            wheeltime = setTimeout(() => {
                to(options.index);
                wheeling = false;
                gravity = options.gravity;
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

    // function onScroll(e: Scroll): void {
    //     console.info(e);
    //     // clear()
    // }

    function onResize(): void {
        to(options.index);
    }

    function clear(): void {
        // hix = wheeling || toing ? hix : options.index;
        clearInterval(dragtime);
        clearTimeout(wheeltime);
        cancelAnimationFrame(raf);
        cancelAnimationFrame(rak);
        listen(window, windowEvents, false);
    }

    function update(opts: Options): void {
        for (const key in opts) {
            if (options[key as keyof Options] !== opts[key as keyof Options]) {
                console.log(key);
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
                        Array.from(node.childNodes).forEach((c, i) => {
                            c.index = i;
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
