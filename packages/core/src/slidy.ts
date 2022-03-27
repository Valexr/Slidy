import { coordinate, css, dispatch, init, listen, throttle, onMount } from './utils/env';
import { find, shuffle, replace, indexing } from './utils/dom';
import { maxMin } from './utils/helpers';

import type { Options, Parent, Slidy, UniqEvent } from './types';

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

    const PARENT = node.parentElement as HTMLElement;

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

    onMount(node, options.length)
        .then(({ childs, length }) => {
            replace(node, options.index as number, options.loop);

            hix = options.index
            snap = options.snap
            options.length = length
            gravity = options.gravity as number
            gap = find(node, options.vertical as boolean).gap();
            position = find(node, options.vertical as boolean).position(options.index as number, snap, options.loop, gap)

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

        graviting(options.index)
        css(node, { transform: `translate3d(${translate(options.vertical)})` });
        dispatch(node, 'move', { index: options.index, position });

        function graviting(index: number) {
            gravity = options.loop
                ? options.gravity as number
                : (index === 0 && direction <= 0) || (index === options.length as number - 1 && direction >= 0)
                    ? maxMin(1.8, 0, gravity + 0.015)
                    : options.gravity as number;
        }

        function translate(vertical?: boolean): string {
            return vertical ? `0, ${-position}px, 0` : `${-position}px, 0, 0`;
        }

        function looping(pos: number): number {
            const first = find(node, options.vertical as boolean).size(0);
            const last = find(node, options.vertical as boolean).size(options.length as number - 1);
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

    function scroll(index: number, duration: number, timestamp: number, amplitude = 0, target?: number): void {
        snap = snapping(index)
        target = options.snap || (!options.loop && !options.snap && (index === 0 || index === options.length as number - 1))
            ? find(node, options.vertical as boolean).position(index, snap, options.loop, gap)
            : position + amplitude;
        amplitude = target - position;

        RAF(function scroll(time: number) {
            const elapsed = (timestamp - time) / duration;
            const delta = amplitude * Math.exp(elapsed);

            if (timestamp < time) {
                target = options.loop ? find(node, options.vertical as boolean).position(index, snap, options.loop, gap) : target
                move(target as number - position - delta);
            }

            raf = Math.abs(delta) > 0.5 ? RAF(scroll) : 0;
        });
    }

    function snapping(index: number) {
        return options.loop
            ? options.snap : index === 0
                ? 'start' : index === options.length as number - 1
                    ? 'end' : options.snap
    }

    function to(index: number, duration = DURATION, target?: number): void {
        clear();

        index = indexing(node, index, options.loop);
        target = target || find(node, options.vertical as boolean).position(index, snap, options.loop, gap)

        scroll(index, duration, performance.now(), target - position)
    }

    function onDown(e: UniqEvent): void {
        clear();
        PARENT.focus()

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

        const amplitude = velocity * (2 - gravity);
        const index = find(node, options.vertical as boolean).index(position + amplitude, snap)
        const condition =
            options.clamp ||
            ((options.duration && Math.abs(amplitude) <= options.duration) && options.snap)

        scroll(index, (condition ? DURATION : options.duration as number), performance.now(), amplitude)
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
