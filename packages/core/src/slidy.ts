import { clamp, coordinate, indexing, dispatch, listen, mount, style } from './utils/env';
import { find, history, replace, shuffle } from './utils/dom';
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
        hix = -1,
        position = 0,
        distance = 0,
        reference = 0,
        direction = 0,
        timestamp = 0,
        scrolled = false,
        frame = position,
        wst: NodeJS.Timeout,
        SNAP = options.snap,
        GRAVITY = options.gravity as number,
        DURATION = Math.pow(options.duration as number, 2) / 1000;

    const WINDOW_EVENTS: [string, EventListener, AddEventListenerOptions?][] = [
        ['touchmove', onMove as EventListener, { passive: false, capture: true }],
        ['mousemove', onMove as EventListener],
        ['touchend', onUp],
        ['mouseup', onUp],
        ['scroll', onScroll],
    ];
    const NODE_EVENTS: [string, EventListener, AddEventListenerOptions?][] = [
        ['contextmenu', clear],
        ['dragstart', (e) => e.preventDefault()],
        ['touchstart', onDown as EventListener, { passive: false, capture: true }],
        ['mousedown', onDown as EventListener],
        ['keydown', onKeys as EventListener],
        ['wheel', onWheel as EventListener, { passive: false, capture: true }],
    ];

    const RO = new ResizeObserver(() => {
        to(options.index);
        node.gap = find(node, options).gap();
        node.start = find(node, options).position(0, 'start');
        node.end = find(node, options).position(node.last, 'end');
        node.scrollable = find(node, options).scroll() > find(node, options).node()
        dispatch(node, 'resize', { node, options });
    });

    const edges = (index?: number) => !options.loop && (index === 0 || index === node.last);
    const snapping = (index: number) => {
        if (!options.loop && options.snap) {
            node.active = find(node, options).position(index, options.snap)
            const start = index === 0 || node.active <= node.start
            const end = index === node.last || node.active >= node.end

            SNAP = start ? 'start' : end ? 'end' : options.snap;
        }
    };

    mount(node, options)
        .then((childs) => {
            position = replace(node, options);
            listen(node, NODE_EVENTS);
            style(node, {
                outline: 'unset',
                overflow: 'hidden',
                position: 'relative',
                userSelect: 'none',
                webkitUserSelect: 'none',
            });
            RO.observe(node);
            dispatch(node, 'mount', { childs, options });
        })
        .catch((error: Error) => console.error(error));

    function move(pos: number): void {
        direction = Math.sign(pos);
        position += positioning(pos);
        options.index = find(node, options).index(position, SNAP);

        dispatch(node, 'move', { index: options.index, position });
        if (edges(options.index)) graviting();
        moving(node.children);

        function positioning(pos: number): number {
            if (hix !== options.index) {
                dispatch(node, 'index', { index: options.index, position });
                if (options.loop) {
                    pos -= history(node, direction, options);
                    shuffle(node, direction);
                    frame = position + pos;
                }
                hix = options.index as number;
            }
            return pos;
        }

        function graviting(): void {
            const condition = (position < node.start && direction < 0)
                || (position > node.end && direction > 0)
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

        function edging(position: number): number | void {
            if (node.scrollable)
                return !options.snap && !options.loop ? clamp(node.start, position, node.end) : position;
        }
    }

    function scroll(
        index: number,
        duration: number,
        amplitude = 0,
        _time = performance.now()
    ): void {
        snapping(index);

        const condition = options.snap || options.loop || edges(index);
        const target = condition ? find(node, options).position(index, SNAP) : position + amplitude;
        amplitude = target - position;

        requestAnimationFrame(function animate() {
            const elapsed = _time - performance.now();
            const T = Math.exp(elapsed / duration)
            // const TT = Math.exp(T - 1)
            const ET = options.easing(T)
            // console.log(amplitude)
            const delta = amplitude * ET;
            const current = options.loop ? find(node, options).position(index, SNAP) : target;
            const pos = (current - position) - delta;

            raf = Math.abs(delta) >= 0.36 ? requestAnimationFrame(animate) : 0;
            move(pos);
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
            const speed = (1000 * delta) / (1 + elapsed);
            frame = position;
            timestamp = performance.now();
            distance = (2 - GRAVITY) * speed + 0.2 * distance;
            if (elapsed < 69) return;
        }
    }

    function onUp(): void {
        clear();

        const amplitude = distance * (2 - GRAVITY);
        const index = find(node, options).index(position + amplitude, SNAP);
        const duration = Math.abs(index - hix) > 1 ? options.duration as number : DURATION

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
        const index = prev.includes(e.key) ? -1 : next.includes(e.key) ? 1 : 0;

        to(options.index as number + index);
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
        GRAVITY = options.gravity as number
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
                        GRAVITY = options[key] = clamp(0, opts[key] as number, 2);
                        break;
                    case 'snap':
                        SNAP = options[key] = opts[key];
                        to(options.index);
                        break;
                    case 'duration':
                        options[key] = opts[key];
                        DURATION = Math.pow(options[key] as number, 2) / 1000;
                        break;
                    case 'loop':
                        options[key] = opts[key];
                        position = replace(node, options);
                        to(options.index);

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
