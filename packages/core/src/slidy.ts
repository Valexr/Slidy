import { coordinate, css, dispatch, init, listen, throttle, onMount } from './utils/env';
import { find, shuffle, replace, indexing } from './utils/dom';
import { maxMin } from './utils/helpers';

import type { Child, Delta, Options, Parent, Scroll, Slidy, UniqEvent } from './types';

const base: Options = {
    index: 0,
    length: 1,
    gravity: 1.2,
    duration: 375,
    snap: undefined,
    vertical: false,
    clamp: false,
    loop: false
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
        wheeltime: NodeJS.Timeout,
        reference = 0,
        direction = 0,
        timestamp = 0,
        velocity = 0,
        position = 0,
        gap = 0,
        frame = position,
        hix = options.index,
        snap = options.snap,
        gravity = options.gravity as number,
        scrolled = false

    options = { ...base, ...options }

    const PARENT = node.parentElement;

    const DURATION = Math.pow(options.duration as number, 2) / 1000

    const WINDOW_EVENTS: [string, EventListenerOrEventListenerObject, AddEventListenerOptions?][] = [
        ['touchmove', onMove as EventListenerOrEventListenerObject, { passive: false }],
        ['mousemove', onMove as EventListenerOrEventListenerObject],
        ['touchend', onUp as EventListenerOrEventListenerObject],
        ['mouseup', onUp as EventListenerOrEventListenerObject],
        ['scroll', onScroll as EventListenerOrEventListenerObject, { capture: true }]
    ];
    const PARENT_EVENTS: [string, EventListenerOrEventListenerObject, AddEventListenerOptions?][] = [
        ['contextmenu', clear],
        ['touchstart', onDown as EventListenerOrEventListenerObject],
        ['mousedown', onDown as EventListenerOrEventListenerObject],
        ['keydown', onKeys as EventListenerOrEventListenerObject],
        [
            'wheel',
            throttle(onWheel, (DURATION / gravity) * 2) as EventListenerOrEventListenerObject,
            { passive: false, capture: true }
        ]
    ];

    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
        to(options.index as number);
        dispatch(node, 'resize', node);
    });

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
        .then(({ childs, length }) => {
            replace(node, options.index as number, options.loop);

            hix = options.index
            snap = options.snap
            options.length = length
            gravity = options.gravity as number
            gap = find(node, options.vertical as boolean).gap();
            position = find(node, options.vertical as boolean).position(options.index as number, snap)

            to(options.index as number)
            css(PARENT as Parent, { outline: 'none', overflow: 'hidden' });
            listen(PARENT as Parent, PARENT_EVENTS);
            RO.observe(PARENT as Element);

            dispatch(node, 'mount', { childs, options });
        })
        .catch((error: Error) => console.error(error));

    function move(pos: number): void {
        direction = Math.sign(pos);
        position += options.loop ? looping(pos) : pos;
        options.index = find(node, options.vertical as boolean).index(position, snap);

        if (!options.loop) snapping();
        css(node, { transform: `translate3d(${translate(options.vertical)})` });
        dispatch(node, 'move', { index: options.index, position });

        function snapping() {
            // snap = get('end').point && direction >= 0
            //     ? 'end'
            //     : get('start').point && direction <= 0
            //         ? 'start'
            //         : options.snap;
            gravity = get('end').vector || get('start').vector
                ? maxMin(1.8, 0, gravity + 0.015)
                : options.gravity as number;
        }

        function translate(vertical?: boolean): string {
            // return vertical ? `0, ${-position}px, 0` : `${-position}px, 0, 0`;
            return vertical ? `0, ${-positioning(position)}px, 0` : `${-positioning(position)}px, 0, 0`;
        }

        function positioning(position: number): number {
            const delta = find(node, options.vertical as boolean).parent() / 2;
            // return !options.loop
            //     ? maxMin(get('end').amplitude + delta, get('start').amplitude - delta, Math.trunc(position))
            //     : Math.trunc(position);
            return Math.trunc(position);
        }

        function looping(pos: number): number {
            const first = find(node, options.vertical as boolean).size(0);
            const last = find(node, options.vertical as boolean).size(node.childNodes.length - 1);
            const history = (direction: number) => ((direction > 0 ? first : last) + gap) * direction

            if (hix !== options.index) {
                shuffle(node, direction)
                hix = options.index;
                pos -= history(direction)
                frame = position + pos
            }
            return pos;
        }
    }

    function track(): void {
        const now = performance.now();
        const elapsed = now - timestamp;
        const delta = position - frame;
        const speed = (1000 * delta) / (1 + elapsed);

        velocity = (2 - gravity) * speed + 0.2 * velocity;

        timestamp = now;
        frame = position;

        if (elapsed < 100) return;
    }


    function scroll(target: number, amplitude: number, duration: number, timestamp: number): void {
        const index = find(node, options.vertical as boolean).index(target, snap)
        if (!options.loop) {
            snap = index === 0 ? 'start' : index === options.length as number - 1 ? 'end' : options.snap
        }

        RAF(function scroll(time: number) {
            const elapsed = (timestamp - time) / duration;
            const delta = amplitude * Math.exp(elapsed);

            if (timestamp < time) {
                target = find(node, options.vertical as boolean).position(index, snap)
                move(target - position - delta);
            }

            raf = Math.abs(delta) > 0.5 ? RAF(scroll) : 0;
        });
    }

    function to(index: number, duration = DURATION, target?: number): void {
        clear();

        index = indexing(node, index, options.loop);
        target = !target ? find(node, options.vertical as boolean).position(index, snap) : target;

        scroll(target, target - position, duration, performance.now())
    }

    function onDown(e: UniqEvent): void {
        clear();
        PARENT?.focus()

        reference = coordinate(e, options.vertical);
        timestamp = performance.now();
        frame = position;
        velocity = 0;

        listen(window, WINDOW_EVENTS);

        if (e.type === 'mousedown') e.preventDefault()
    }

    function onMove(e: UniqEvent): void {
        const delta = reference - coordinate(e, options.vertical)
        reference = coordinate(e, options.vertical);

        move(delta * (2 - gravity));
        track();

        if (Math.abs(delta) > 5) {
            e.preventDefault()
        } else if (scrolled) {
            gravity = 2
            to(options.index as number, DURATION / gravity)
        }
    }

    function onUp(): void {
        clear();

        const { target, amplitude } = targeting(position);
        const condition =
            options.clamp ||
            ((options.duration && Math.abs(amplitude) <= options.duration) && options.snap)

        scroll(target, amplitude, condition ? DURATION : options.duration as number, performance.now())

        function targeting(position: number): Delta {
            let amplitude = velocity * (2 - gravity);

            // velocity = options.loop
            //     ? velocity :
            //     maxMin(get('end').amplitude - position, get('start').amplitude - position, velocity);

            const target = options.snap
                ? find(node, options.vertical as boolean).target(position + amplitude, snap)
                : position + amplitude;

            amplitude = target - position;
            return { target, amplitude };
        }
    }


    function onWheel(e: UniqEvent): void {
        clear();

        const coord = coordinate(e, options.vertical) * (2 - gravity);
        // const sign = Math.trunc(coord * gravity * (e.shiftKey ? -1 : 1))

        // if (e.shiftKey || options.clamp) {
        to(options.index as number + Math.sign(coord * (e.shiftKey ? -1 : 1)))
        // } else {
        //     move(coord);
        //     wheeltime = setTimeout(() => {
        //         to(options.index as number);
        //         gravity = options.gravity as number;
        //     }, 100);
        // }
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

    function onScroll(): void {
        scrolled = true
    }

    function clear(): void {
        scrolled = false
        gravity = options.gravity as number
        clearTimeout(wheeltime as NodeJS.Timer);
        cancelAnimationFrame(raf);
        listen(window, WINDOW_EVENTS, false);
    }

    function update(opts: Options): void {
        for (const key in opts) {
            if (options[key as keyof Options] !== opts[key as keyof Options]) {
                switch (key) {
                    case 'index':
                        options[key] = indexing(node, opts[key] as number, options.loop);
                        to(options[key] as number);
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
        listen(PARENT, PARENT_EVENTS, false);
        dispatch(node, 'destroy', node);
    }
    return { update, destroy, to };
}
