import { coordinate, indexing, dispatch, listen, mount, style } from './utils/env';
import { find, history, replace, shuffle } from './utils/dom';
import { maxMin } from './utils/helpers';
import type { Options, Slidy, UniqEvent } from './types';

export function slidy(
    node: Slidy,
    opts: Partial<Options>
): {
    update: (options: Options) => void;
    destroy: () => void;
    to: (index: number, target?: number) => void;
} {
    const options: Options = {
        index: 0,
        indent: 0,
        gravity: 1.2,
        duration: 375,
        easing: (t: number) => t,
        snap: undefined,
        vertical: false,
        clamp: false,
        loop: false,
        ...opts,
    };

    let raf = 0,
        end = 0,
        start = 0,
        hix = -1,
        position = 0,
        distance = 0,
        reference = 0,
        direction = 0,
        timestamp = 0,
        mounted = false,
        scrolled = false,
        frame = position,
        wst: NodeJS.Timeout,
        SNAP = options.snap,
        GRAVITY = options.gravity as number,
        DURATION = Math.pow(options.duration as number, 2) / 1000;

    const WINDOW_EVENTS: [string, EventListener, AddEventListenerOptions?][] = [
        ['touchmove', onMove as EventListener, { passive: false }],
        ['mousemove', onMove as EventListener],
        ['touchend', onUp],
        ['mouseup', onUp],
        ['scroll', onScroll, { capture: true }],
    ];
    const NODE_EVENTS: [string, EventListener, AddEventListenerOptions?][] = [
        ['contextmenu', clear],
        ['dragstart', (e) => e.preventDefault()],
        ['touchstart', onDown as EventListener, { passive: false }],
        ['mousedown', onDown as EventListener],
        ['keydown', onKeys as EventListener],
        ['wheel', onWheel as EventListener, { passive: false, capture: true }],
    ];

    const RO = new ResizeObserver(() => {
        to(options.index);
        dispatch(node, 'resize', { node, options });
    });

    const edges = (index?: number) => !options.loop && (index === 0 || index === node.last);
    const snapping = (index: number) => {
        if (!options.loop) {
            SNAP = index === 0 ? 'start' : index === node.last ? 'end' : options.snap;
        }
    };

    mount(node, options)
        .then((childs) => {
            style(node, {
                outline: 'unset',
                overflow: 'hidden',
                position: 'relative',
                userSelect: 'none',
                webkitUserSelect: 'none',
            });
            listen(node, NODE_EVENTS);
            RO.observe(node);

            setTimeout(() => {
                replace(node, options.index, options.loop);
                mounted = true;
                dispatch(node, 'mount', { childs, options });
            }, options.duration);
        })
        .catch((error: Error) => console.error(error));

    function move(pos: number): void {
        direction = Math.sign(pos);
        position += positioning(pos);
        options.index = find(node, options).index(position, SNAP);

        graviting();
        moving(node.children);
        dispatch(node, 'move', { index: options.index, position });

        function positioning(pos: number): number {
            if (hix !== options.index) {
                if (options.loop && mounted) {
                    pos -= history(node, direction, options);
                    shuffle(node, direction);
                    frame = position + pos;
                }
                hix = options.index as number;
                dispatch(node, 'index', { index: options.index, position });
            }
            return pos;
        }

        function graviting(): void {
            const condition =
                edges(options.index) &&
                ((position < start && direction < 0) || (position > end && direction > 0));
            GRAVITY = condition ? 1.8 : (options.gravity as number);
        }

        function moving(childs: HTMLCollection): void {
            for (let index = 0; index < childs.length; index++) {
                style(childs[index] as HTMLElement, {
                    transform: translate(options.vertical),
                });
            }
        }

        function translate(vertical?: boolean): string {
            const axis = vertical ? `0, ${-edging(position)}px, 0` : `${-edging(position)}px, 0, 0`;
            return `translate3d(${axis})`;
        }

        function edging(position: number): number {
            start = find(node, options).position(0, 'start');
            end = find(node, options).position(node.last, 'end');
            return !options.snap && !options.loop ? maxMin(end, start, position) : position;
        }
    }

    function scroll(
        index: number,
        duration: number,
        amplitude = 0,
        time = performance.now()
    ): void {
        snapping(index);

        const condition = options.snap || options.loop || edges(index);
        const target = condition ? find(node, options).position(index, SNAP) : position + amplitude;

        amplitude = target - position;
        requestAnimationFrame((t) => console.log(t))
        requestAnimationFrame(function animate(now: number) {
            if (!time) time = now
            const elapsed = time - now;
            const delta = amplitude * options.easing(Math.exp(elapsed / duration));
            const pos =
                (options.loop ? find(node, options).position(index, SNAP) : target) -
                position -
                delta;
            // console.log(position)
            raf = Math.abs(delta) > 0.36 ? requestAnimationFrame(animate) : 0;
            return move(pos);
        });
    }

    function to(index = 0, duration = DURATION): void {
        clear();
        index = indexing(node, index, options.loop);
        snapping(index);
        scroll(index, duration, find(node, options).position(index, SNAP) - position);
    }

    function onDown(e: UniqEvent): void {
        clear();

        reference = coordinate(e, options.vertical);
        timestamp = performance.now();
        frame = position;
        distance = 0;

        listen(window, WINDOW_EVENTS);
    }

    function onMove(e: UniqEvent): void {
        const delta = reference - coordinate(e, options.vertical);
        reference = coordinate(e, options.vertical);

        move(delta * (2 - GRAVITY));
        track();

        if (Math.abs(delta) > 2) {
            e.preventDefault();
            e.stopPropagation();
        } else if (scrolled) {
            to(options.index);
            GRAVITY = 2;
        }

        function track(): void {
            const elapsed = performance.now() - timestamp;
            const delta = position - frame;
            const speed = (1000 * delta) / (1 + elapsed)
            distance = (2 - GRAVITY) * speed + 0.2 * distance;

            if (elapsed < 69) return;
            timestamp = performance.now();
            frame = position;
        }
    }

    function onUp(): void {
        clear();

        const amplitude = distance * (2 - GRAVITY);
        const index = find(node, options).index(position + amplitude, SNAP);
        const duration =
            options.clamp ||
                (options.duration && Math.abs(amplitude) <= options.duration && options.snap)
                || edges(index)
                ? DURATION
                : (options.duration as number);

        scroll(index, duration, amplitude);
    }

    function onWheel(e: UniqEvent): void {
        clear();

        const coord = coordinate(e, options.vertical) * (2 - GRAVITY);
        const index = (options.index as number) + Math.sign(coord);
        const clamping = options.clamp || e.shiftKey;
        const condition = clamping || edges(options.index as number);

        if (!clamping) move(edges(options.index as number) ? coord / 4.5 : coord);
        wst = setTimeout(() => to(condition ? index : options.index), condition ? 0 : 69);
    }

    function onKeys(e: KeyboardEvent): void {
        const next = ['ArrowRight', 'ArrowDown', 'Enter', ' '];
        const prev = ['ArrowLeft', 'ArrowUp'];
        const index =
            (options.index as number) + (prev.includes(e.key) ? -1 : next.includes(e.key) ? 1 : 0);

        to(index);
        dispatch(node, 'keys', e.key);

        e.preventDefault();
    }

    function onScroll(): void {
        scrolled = true;
    }

    function clear(): void {
        scrolled = false;
        clearTimeout(wst);
        cancelAnimationFrame(raf);
        listen(window, WINDOW_EVENTS, false);
    }

    function update(opts: Options): void {
        for (const key in opts) {
            if (options[key as keyof Options] !== opts[key as keyof Options]) {
                switch (key) {
                    case 'index':
                        options[key] = indexing(node, opts[key] as number, options.loop);
                        to(options[key]);
                        break;
                    case 'gravity':
                        options[key] = maxMin(2, 0, opts[key] as number);
                        GRAVITY = options[key] as number;
                        break;
                    case 'snap':
                        options[key] = opts[key];
                        SNAP = options[key];
                        break;
                    case 'duration':
                        options[key] = opts[key];
                        DURATION = Math.pow(options[key] as number, 2) / 1000;
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
        listen(node, NODE_EVENTS, false);
        dispatch(node, 'destroy', node);
    }
    return { update, destroy, to };
}
