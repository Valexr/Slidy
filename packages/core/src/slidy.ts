import { coordinate, css, dispatch, init, listen, onMount } from './utils/env';
import { find, go, replace, indexing } from './utils/dom';
import { maxMin } from './utils/helpers';

import type { Child, Delta, Options, Parent, Slidy, UniqEvent } from './types';

const base: Options = {
    index: 0,
    length: 1,
    gravity: 1.2,
    duration: 375,
    snap: undefined,
    vertical: false,
    clamp: false,
    loop: false,
}

export function slidy(
    node: Slidy,
    options: Options
): {
    update: (options: Options) => void;
    destroy: () => void;
    to: (index: number, target?: number) => void;
} {
    let raf: number,
        wheeltime: NodeJS.Timeout | null,
        // whelling = false,
        reference = 0,
        direction = 0,
        timestamp = 0,
        velocity = 0,
        position = 0,
        gap = 0,
        frame = position,
        // hip = position,
        hix = options.index,
        snap = options.snap,
        gravity = options.gravity as number

    options = { ...base, ...options }

    const PARENT = node.parentElement;

    const windowEvents: [string, EventListenerOrEventListenerObject][] = [
        ['touchmove', onMove as EventListenerOrEventListenerObject],
        ['mousemove', onMove as EventListenerOrEventListenerObject],
        ['touchend', onUp as EventListenerOrEventListenerObject],
        ['mouseup', onUp as EventListenerOrEventListenerObject],
    ];
    const parentEvents: [string, EventListenerOrEventListenerObject, boolean?][] = [
        ['contextmenu', clear],
        ['touchstart', onDown as EventListenerOrEventListenerObject, true],
        ['mousedown', onDown as EventListenerOrEventListenerObject],
        ['keydown', onKeys as EventListenerOrEventListenerObject],
        ['wheel', onWheel as EventListenerOrEventListenerObject],
        // ['click', onClick as EventListenerOrEventListenerObject]
    ];

    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
        to(options.index as number);
        dispatch(node, 'resize', node);
    });

    // function onResize(): void {
    //     to(options.index as number);
    // }

    // function onClick(e: UniqEvent) {
    //     dispatch(node, 'click', e);
    // }

    const get = (side = '') => {
        const start = side === 'start';
        const active = find(node, options.vertical as boolean).size(options.index as number);
        const indx = start ? 0 : node.childNodes.length - 1;
        const snap = start ? 'start' : 'end';

        const index = options.index === indx;
        const amplitude = find(node, options.vertical as boolean).position(indx, snap);
        const point = start ? position < amplitude + active : position > amplitude - active;
        const vector = index && (start ? direction < 0 : direction > 0);

        return { index, amplitude, point, vector };
    };

    onMount(node, options.length)
        .then((childs: NodeListOf<Child>) => {
            replace(node, options.index as number, options.loop as boolean);

            hix = options.index
            snap = options.snap
            gravity = options.gravity as number
            gap = find(node, options.vertical as boolean).gap();
            position = find(node, options.vertical as boolean).position(options.index as number, snap)

            // to(options.index as number)
            css(PARENT as Parent, { outline: 'none', overflow: 'hidden' });

            listen(PARENT as Parent, parentEvents);
            RO.observe(PARENT as Element);

            dispatch(node, 'mount', { childs, options });
        })
        .catch((error: Error) => console.error(error));

    function move(pos: number, transition = 0): void {
        direction = Math.sign(pos);
        position += options.loop ? looping(pos) : pos;
        options.index = find(node, options.vertical as boolean).index(position, snap);
        // if (!options.loop) {
        //     snap =
        //         get('end').point && direction >= 0
        //             ? 'end'
        //             : get('start').point && direction <= 0
        //                 ? 'start'
        //                 : options.snap;
        //     gravity = get('end').vector || get('start').vector
        //         ? maxMin(1.8, 0, gravity + 0.015)
        //         : options.gravity as number;
        // }

        function positioning(position: number): number {
            const delta = find(node, options.vertical as boolean).parent() / 2;
            return !options.loop
                ? maxMin(get('end').amplitude + delta, get('start').amplitude - delta, position)
                : position;
        }

        function translate(vertical?: boolean): string {
            return vertical ? `0, ${-positioning(position)}px, 0` : `${-positioning(position)}px, 0, 0`;
        }

        function looping(pos: number): number {
            const first = find(node, options.vertical as boolean).size(0);
            const last = find(node, options.vertical as boolean).size(node.childNodes.length - 1);
            const history = (direction: number) => ((direction > 0 ? first : last) + gap) * direction
            const shuffle = (direction: number) => direction > 0 ? go(node).next() : direction < 0 ? go(node).prev() : null

            if (hix !== options.index) {
                shuffle(direction)
                hix = options.index;
                pos -= history(direction)
                frame = position + pos
            }
            return pos;
        }

        css(node, {
            transform: `translate3d(${translate(options.vertical)})`,
            transition: `transform ${transition}ms`,
        });

        dispatch(node, 'move', { index: options.index, position });
    }

    function track(): void {
        const now = performance.now();
        const elapsed = now - timestamp;
        const delta = position - frame;
        const speed = (1000 * delta) / (1 + elapsed);
        velocity = (2 - gravity as number) * speed + 0.2 * velocity;

        timestamp = now;
        frame = position;

        if (elapsed < 100) return;
    }


    function scroll(target: number, amplitude: number, duration: number, timestamp: number): void {
        const index = find(node, options.vertical as boolean).index(target, snap)

        RAF(function scroll(time: number) {
            const elapsed = (timestamp - time) / duration;
            const delta = amplitude * Math.exp(elapsed);

            if (timestamp < time) {
                target = options.loop ? find(node, options.vertical as boolean).position(index, snap) : target
                const distance = target - position - delta
                move(distance);
            }

            raf = Math.abs(delta) > 0.5 ? RAF(scroll) : 0;

            // if (Math.abs(delta) < 100)
            //     to(options.index as number)
        });
    }

    function to(index: number, target?: number): void {
        clear();

        index = indexing(node, index, options.loop as boolean);

        // if (!options.loop) {
        //     snap =
        //         get('start').index
        //             ? 'start'
        //             : get('end').index
        //                 ? 'end'
        //                 : options.snap;
        // }

        // index = options.loop
        //     ? find(node, options.vertical as boolean).index(position, index as number, snap)
        //     : index;
        target ??= find(node, options.vertical as boolean).position(index as number, snap);

        const duration = options.duration as number * (options.duration as number / 1000)
        scroll(target, target - position, duration, performance.now())
    }

    function onDown(e: UniqEvent): void {
        clear();
        PARENT?.focus()

        reference = coordinate(e, options.vertical);
        timestamp = performance.now();
        frame = position;
        velocity = 0;

        listen(window, windowEvents);

        if (e.type === 'mousedown') {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    function onMove(e: UniqEvent): void {
        const delta = reference - coordinate(e, options.vertical);
        reference = coordinate(e, options.vertical);

        move(delta * (2 - gravity));
        track();

        e.preventDefault()
        e.stopPropagation()
    }

    function onUp(e: UniqEvent): void {
        clear();
        // PARENT?.blur()

        const { target, amplitude } = targeting(position);
        const duration =
            options.clamp || ((options.duration && Math.abs(amplitude) <= options.duration) && options.snap)
                ? options.duration as number * (options.duration as number / 1000)
                : options.duration as number

        scroll(target, amplitude, duration, performance.now())

        // e.preventDefault()
        e.stopPropagation()
        // if (options.clamp) scroll(target, amplitude, options.duration as number / 3, performance.now());
        // else if (Math.abs(amplitude) >= 375) {
        //     scroll(target, amplitude, options.duration as number, performance.now());
        // }
        // else if (options.snap) scroll(target, amplitude, options.duration as number / 3, performance.now());
    }

    function targeting(position: number): Delta {
        // velocity = options.loop
        //     ? velocity :
        //     maxMin(get('end').amplitude - position, get('start').amplitude - position, velocity);

        let amplitude = velocity * (2 - gravity);

        const target = options.snap
            ? find(node, options.vertical as boolean).target(position + amplitude, snap)
            : position + amplitude;

        amplitude = target - position;
        return { target, amplitude };
    }

    function onWheel(e: UniqEvent): void {
        clear();
        // whelling = true
        const coord = coordinate(e, options.vertical) * (2 - gravity);

        // window.onscroll = () => (gravity = 2);

        if (e.shiftKey) {
            e.preventDefault();
            to(options.index as number - Math.sign(e.deltaY));
        } else {
            move(coord);
            // if (options.snap || (!options.loop && (get('start').vector || get('end').vector)) || options.loop) {
            wheeltime = setTimeout(() => {
                // whelling = false
                to(options.index as number);
                gravity = options.gravity as number;
            }, 100);
            // }
        }
    }

    function onKeys(e: KeyboardEvent): void {
        const keys = ['ArrowRight', 'Enter', ' '];
        if (e.key === 'ArrowLeft') {
            to(options.index as number - 1);
        } else if (keys.includes(e.key)) {
            to(options.index as number + 1);
        }
        dispatch(node, 'keys', e.key);
    }

    function clear(): void {
        // hix = whelling ? hix : options.index
        clearTimeout(wheeltime as NodeJS.Timer);
        cancelAnimationFrame(raf);
        // raf = 0
        listen(window, windowEvents, false);
    }

    function update(opts: Options): void {
        for (const key in opts) {
            if (options[key as keyof Options] !== opts[key as keyof Options]) {
                switch (key) {
                    case 'index':
                        options[key] = indexing(node, opts[key] as number, options.loop as boolean);
                        to(options[key] as number);
                        break;
                    case 'loop':
                        snap = options.snap;
                        options[key] = opts[key];
                        replace(node, options.index as number, options[key] as boolean);
                        to(options.index as number);
                        break;
                    case 'gravity':
                        options[key] = maxMin(2, 0, opts[key] as number);
                        gravity = options[key] as number;
                        break;
                    case 'snap':
                        options[key] = opts[key];
                        snap = options[key];
                        break;
                    case 'length':
                        options[key] = opts[key];
                        init(node);
                        to(options.index as number);
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
