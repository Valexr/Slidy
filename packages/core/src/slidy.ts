import { coordinate, css, dispatch, init, listen, onMount } from './utils/env';
import { find, go, replace, indexing } from './utils/dom';
import { maxMin } from './utils/helpers';

import type { Child, Delta, Options, Parent, Slidy, UniqEvent } from './types';

export function slidy(
    node: Slidy,
    options: Options = {
        index: 0,
        length: 0,
        gravity: 1.2,
        duration: 375,
        snap: 'center',
        loop: false,
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
        wheeltime: NodeJS.Timeout | null,
        reference = 0,
        direction = 0,
        timestamp = 0,
        velocity = 0,
        position = 0,
        frame = 0,
        gap = 0,
        hip = position,
        hix = options.index,
        snap = options.snap,
        duration = options.duration = options.duration || 375,
        gravity = options.gravity = options.gravity || 1.2;

    const consttime = 100;
    // const hip = position;

    const PARENT = node.parentNode;

    const windowEvents: [string, EventListenerOrEventListenerObject][] = [
        ['touchmove', onMove as EventListenerOrEventListenerObject],
        ['mousemove', onMove as EventListenerOrEventListenerObject],
        ['touchend', onUp],
        ['mouseup', onUp],
    ];
    const parentEvents: [string, EventListenerOrEventListenerObject, boolean?][] = [
        ['contextmenu', clear],
        ['touchstart', onDown as EventListenerOrEventListenerObject],
        ['mousedown', onDown as EventListenerOrEventListenerObject],
        ['keydown', onKeys as EventListenerOrEventListenerObject],
        ['wheel', onWheel as EventListenerOrEventListenerObject],
    ];

    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
        to(options.index)
        dispatch(node, 'resize', node);
    });

    const get = (side = '') => {
        const start = side === 'start';
        const active = find(node, options.vertical).size(options.index);
        const indx = start ? 0 : node.childNodes.length - 1;
        const snap = start ? 'start' : 'end';

        const index = options.index === indx;
        const amplitude = find(node, options.vertical).position(indx, snap);
        const point = start ? position < amplitude + active : position > amplitude - active;
        const vector = index && (start ? direction < 0 : direction > 0);

        return { index, amplitude, point, vector };
    };

    update(options)

    onMount(node, options.length)
        .then((childs: NodeListOf<Child>) => {
            const styles = {
                userSelect: 'none',
                webkitUserSelect: 'none',
                pointerEvents: 'none',
            };
            css(node, styles);

            gap = find(node, options.vertical).gap();
            replace(node, options.index, options.loop);
            to(options.index);

            if (PARENT) {
                css(PARENT as Parent, { outline: 'none', overflow: 'hidden' });
                listen(PARENT as Parent, parentEvents);
                RO.observe(PARENT as Element);
            }
            dispatch(node, 'mount', { childs, options });
        })
        .catch((error: Error) => console.error(error));

    function move(pos: number, transition = 0): void {
        position += options.loop ? looping(pos) : pos;
        options.index = find(node, options.vertical).index(position, null, snap);

        direction = Math.sign(pos);

        if (!options.loop) {
            snap =
                get('end').point && direction >= 0
                    ? 'end'
                    : get('start').point && direction <= 0
                        ? 'start'
                        : options.snap;
            gravity = get('end').vector || get('start').vector ? maxMin(1.8, 0, gravity + 0.015) : options.gravity;
        }

        function positioning(position: number) {
            const delta = find(node, options.vertical).parent() / 2;
            return !options.loop
                ? maxMin(get('end').amplitude + delta, get('start').amplitude - delta, position)
                : position;
        }

        function translate(vertical: boolean): string {
            return vertical ? `0, ${-positioning(position)}px, 0` : `${-positioning(position)}px, 0, 0`;
        }

        function looping(pos: number): number {
            const delta = hip - pos;
            const first = find(node, options.vertical).size(0);
            const last = find(node, options.vertical).size(node.childNodes.length - 1);
            const history = (size: number) => (size + gap) * Math.sign(-pos);

            if (hix !== options.index) {
                pos > 0 ? go(node).next() : go(node).prev();
                pos += history(pos > 0 ? first : last);
                frame = position + pos + delta;
            }
            hix = options.index;
            return pos;
        }

        const styles = {
            transform: `translate3d(${translate(options.vertical)})`,
            transition: `transform ${transition}ms`,
        };

        css(node, styles);

        dispatch(node, 'move', { index: options.index, position });
    }

    function to(index: number, target: number | null = null): void {
        clear();

        options.index = indexing(node, index, options.loop);

        if (!options.loop) {
            snap =
                get('start').index
                    ? 'start'
                    : get('end').index
                        ? 'end'
                        : options.snap;
        }

        const ix = options.loop
            ? find(node, options.vertical).index(position, options.index, snap)
            : options.index;

        const pos = target
            ? options.snap
                ? find(node, options.vertical).target(target, snap)
                : target
            : target === 0
                ? 0
                : find(node, options.vertical).position(ix, snap);

        move(pos - position, duration);
    }

    function track(): void {
        const now = performance.now();
        const elapsed = now - timestamp;
        const delta = position - frame;

        const speed = (1000 * delta) / (1 + elapsed);
        velocity = (2 - gravity) * speed + 0.2 * velocity;

        if (elapsed < consttime) return;
        timestamp = now;
        frame = position;
    }

    function scroll(target: number, amplitude: number, duration: number, timestamp: number): void {
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

                if (Math.abs(delta) < 100 && (options.loop || get('start').index || get('end').index))
                    to(options.index)
            });
        }
    }

    function onDown(e: UniqEvent): void {
        clear();

        reference = coordinate(e, options.vertical);
        timestamp = performance.now();
        frame = position;
        velocity = 0;

        listen(window, windowEvents);
    }

    function onMove(e: UniqEvent): void {
        const delta = reference - coordinate(e, options.vertical);
        reference = coordinate(e, options.vertical);

        move(delta * (2 - gravity));
        track();
    }

    function onUp(): void {
        clear();

        const { target, amplitude } = delting(position);

        if (Math.abs(amplitude) > 10) {
            Math.abs(velocity) < 100 || (!options.loop && (get('start').vector || get('end').vector))
                ? to(options.index)
                : options.clamp
                    ? to(options.index, target)
                    : scroll(target, amplitude, duration, performance.now());
        } else to(options.index);
    }

    function delting(position: number): Delta {
        velocity = maxMin(get('end').amplitude - position, get('start').amplitude - position, velocity);

        let amplitude = velocity * (2 - gravity);
        const target = options.snap
            ? find(node, options.vertical).target(position + amplitude, snap)
            : position + amplitude;

        amplitude = target - position;
        return { target, amplitude };
    }

    function onWheel(e: UniqEvent): void {
        clear();

        const coord = coordinate(e, options.vertical) * (2 - gravity);

        // window.onscroll = () => (gravity = 2);

        if (e.shiftKey) {
            e.preventDefault();
            to(options.index - Math.sign(e.deltaY));
        } else {
            move(coord);
            if (options.snap || (!options.loop && (get('start').vector || get('end').vector)) || options.loop) {
                wheeltime = setTimeout(() => {
                    to(options.index);
                    gravity = options.gravity;
                }, 100);
            }
        }
    }

    function onKeys(e: KeyboardEvent): void {
        const keys = ['ArrowRight', 'Enter', ' '];
        if (e.key === 'ArrowLeft') {
            to(options.index - 1);
        } else if (keys.includes(e.key)) {
            to(options.index + 1);
        }
        dispatch(node, 'keys', e.key);
    }

    function clear(): void {
        clearTimeout(wheeltime as NodeJS.Timer);
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
                        snap = options.snap;
                        options[key] = opts[key];
                        replace(node, options.index, options[key]);
                        to(options.index);
                        break;
                    case 'gravity':
                        options[key] = maxMin(2, 0, opts[key]);
                        gravity = options[key];
                        break;
                    case 'snap':
                        options[key] = opts[key];
                        snap = options[key];
                        break;
                    case 'length':
                        options[key] = opts[key];
                        init(node);
                        to(options.index);
                        break;

                    default:
                        options[key as keyof Options] = opts[key as keyof Options] as never;
                        break;
                }
            }
        }
        dispatch(node, 'update', options);
    }

    function destroy(): void {
        clear();
        RO.disconnect();
        listen(PARENT, parentEvents, false);
        dispatch(node, 'destroy', node);
    }
    return { update, destroy, to };
}
