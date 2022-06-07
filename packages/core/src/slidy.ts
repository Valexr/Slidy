import { clamp, coordinate, indexing, dispatch, mount, throttle, listen } from './utils/env';
import { dom } from './utils/dom';
import { translate } from './utils/animation';
import type { Options, UniqEvent, EventMap } from './types';

export function slidy(
    node: HTMLElement,
    opts: Partial<Options>
): {
    update: (options: Options) => void;
    destroy: () => void;
    to: (index: number, target?: number) => void;
} {
    const options: Options = {
        index: 0,
        clamp: 0,
        indent: 1,
        sensity: 5,
        gravity: 1.2,
        duration: 375,
        easing: (t) => t,
        animation: translate,
        snap: undefined,
        vertical: false,
        loop: false,
        ...opts,
    };

    let hix = 0,
        raf = 0,
        ets = 0,
        hip = 0,
        track = 0,
        position = 0,
        direction = 0,
        shifted = false,
        scrolled = false,
        wst: NodeJS.Timeout | undefined,
        DURATION = (options.duration as number) / 2,
        SENSITY = options.sensity as number,
        GRAVITY = options.gravity as number,
        SNAP = options.snap

    const WINDOW_EVENTS: EventMap = [
        ['touchmove', onMove as EventListener, { passive: false }],
        ['mousemove', onMove as EventListener],
        ['touchend', onUp as EventListener],
        ['mouseup', onUp as EventListener],
    ];
    const WINDOW_NATIVE_EVENTS: EventMap = [
        ['wheel', winWheel as EventListener, { passive: false }],
        ['scroll', winScroll as EventListener],
    ];
    const NODE_EVENTS: EventMap = [
        ['touchstart', onDown as EventListener, { passive: false }],
        ['mousedown', onDown as EventListener],
        ['keydown', onKeys as EventListener],
        ['contextmenu', () => to(options.index)],
        ['dragstart', (e) => e.preventDefault()],
    ];

    const RO = new ResizeObserver(() => {
        to(options.index);
        dispatch(node, 'resize', { node, options });
    });

    function sense(e: UniqEvent, pos: number): boolean {
        return options.vertical && e.type === 'touchmove'
            ? !dom(node, options).edges(options.index, position, Math.sign(pos))
            : Math.abs(pos) >= SENSITY;
    }

    mount(node)
        .then((childs) => {
            node.style.outline = 'none';
            node.style.overflow = 'hidden';
            node.style.position = 'relative';
            node.style.userSelect = 'none';
            node.style.webkitUserSelect = 'none';
            node.onwheel = throttle(onWheel, DURATION, options.clamp);

            position = dom(node, options).replace();

            RO.observe(node);
            listen(node, NODE_EVENTS);
            listen(window, WINDOW_NATIVE_EVENTS);
            dispatch(node, 'mount', { childs, options });
        })
        .catch((error: Error) => console.error(error));

    function move(pos: number, index?: number): void {
        direction = Math.sign(pos);
        position += positioning(pos);
        position = edging(position);
        options.index = dom(node, options).index(position, SNAP);

        SENSITY = 0;
        GRAVITY = dom(node, options).edges(options.index, position, direction)
            ? 1.8
            : (options.gravity as number);

        options.animation(node, position, options);
        dispatch(node, 'move', { index: options.index, position });

        function positioning(pos: number): number {
            if (hix !== options.index) {
                if (options.loop) {
                    pos -= dom(node, options).history(direction);
                    dom(node, options).shuffle(direction);
                }
                hix = options.index as number;
                dispatch(node, 'index', { index });
            }
            return dom(node, options).scrollable ? pos : 0;
        }

        function edging(position: number): number {
            return !options.snap && !options.loop
                ? clamp(dom(node, options).start, position, dom(node, options).end)
                : position;
        }
    }

    function scroll(index: number, amplitude: number, _duration = 0): void {
        SNAP = dom(node, options).snap(index);

        const time = performance.now();
        const snaped =
            options.snap || options.loop || dom(node, options).edges(index, position, direction);
        const target = snaped
            ? dom(node, options).distance(index, SNAP)
            : clamp(dom(node, options).start, position + amplitude, dom(node, options).end);
        const duration = _duration || DURATION * clamp(1, Math.abs(index - hix), 2);

        amplitude = target - position;

        requestAnimationFrame(function loop() {
            const elapsed = time - performance.now();
            const T = Math.exp(elapsed / duration);
            const delta = amplitude * options.easing(T);
            const current = options.loop ? dom(node, options).distance(index, SNAP) : target;
            const pos = current - position - delta;

            move(pos, index);

            if (Math.abs(delta) >= 0.36) {
                raf = requestAnimationFrame(loop);
            } else {
                SENSITY = options.sensity as number;
                clear();
            }
        });
    }

    function to(index = 0, duration = DURATION): void {
        clear();
        index = indexing(node, index, options);
        const pos = dom(node, options).distance(index, SNAP) - position;
        scroll(index, pos, duration);
    }

    function onDown(e: UniqEvent): void {
        clear();

        SENSITY = options.sensity as number;
        hip = coordinate(e, options);
        ets = e.timeStamp;
        track = 0;

        listen(window, WINDOW_EVENTS);
    }

    function onMove(e: UniqEvent): void {
        const pos = (hip - coordinate(e, options)) * (2 - GRAVITY);
        const elapsed = e.timeStamp - ets;
        const speed = (1000 * pos) / (GRAVITY + elapsed);

        ets = e.timeStamp;
        hip = coordinate(e, options);
        track = (2 - GRAVITY) * speed + (GRAVITY - 1) * track;

        if (scrolled) {
            to(options.index);
            GRAVITY = 2;
        } else if (sense(e, pos)) {
            move(pos, options.index);
            e.preventDefault();
        }
    }

    function onUp(): void {
        clear();

        const amplitude = track * (2 - GRAVITY);
        const index = dom(node, options).index(position + amplitude, SNAP);

        scroll(clamping(index, options), amplitude);

        function clamping(index: number, options: Options): number {
            const range = (options.clamp as number) * direction;
            index =
                options.clamp && Math.abs(index - hix) ? (options.index as number) + range : index;
            return indexing(node, index, options);
        }
    }

    function onWheel(e: UniqEvent): void {
        clear();
        SNAP = dom(node, options).snap(options.index as number);

        const coord = coordinate(e, options) * (2 - GRAVITY);
        const index = (options.index as number) + Math.sign(coord) * (options.clamp || 1);
        const clamped =
            options.clamp ||
            e.shiftKey ||
            dom(node, options).edges(options.index, position, Math.sign(coord));
        const pos = dom(node, options).edges(options.index, position, Math.sign(coord))
            ? coord / 9
            : coord;
        const ix = clamped ? index : options.index;
        const tm = clamped ? 0 : DURATION / 2;
        const moved = !options.clamp && !e.shiftKey;

        moved && sense(e, pos) && move(pos, options.index);
        wst = (options.snap || !moved) && sense(e, pos) ? setTimeout(() => to(ix), tm) : undefined;
    }

    function winWheel(e: WheelEvent): void {
        if (e.composedPath().includes(node)) {
            (Math.abs(e.deltaX) >= Math.abs(e.deltaY) || e.shiftKey) && e.preventDefault();
            if (e.shiftKey !== shifted) {
                node.onwheel = throttle(onWheel, DURATION, e.shiftKey);
                shifted = e.shiftKey;
            }
        }
    }

    function winScroll(): void {
        scrolled = true;
    }

    function onKeys(e: KeyboardEvent): void {
        const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        const index = ((keys.indexOf(e.key) % 2) - 1 || 1) * (options.clamp || 1);
        if (keys.indexOf(e.key) >= 0) {
            to((options.index as number) + index);
            e.preventDefault();
        }
        dispatch(node, 'keys', e.key);
    }

    function clear(): void {
        scrolled = false;
        clearTimeout(wst);
        cancelAnimationFrame(raf);
        GRAVITY = options.gravity as number;
        listen(window, WINDOW_EVENTS, false);
    }

    function update(opts: Partial<Options>): void {
        for (const key in opts) {
            if (opts[key as keyof Options] !== options[key as keyof Options]) {
                switch (key) {
                    case 'index':
                        options[key] = indexing(node, opts[key] as number, options);
                        to(options[key]);
                        break;
                    case 'gravity':
                        GRAVITY = options[key] = clamp(0, opts[key] as number, 2);
                        break;
                    case 'duration':
                        options[key] = opts[key];
                        DURATION = (options[key] as number) / 2;
                        break;
                    case 'sensity':
                        SENSITY = options[key] = opts[key] as number;
                        break;
                    case 'snap':
                        SNAP = options[key] = opts[key];
                        to(options.index);
                        break;
                    case 'clamp':
                        options[key] = opts[key];
                        node.onwheel = throttle(onWheel, DURATION, opts[key]);
                        break;
                    case 'loop':
                    case 'vertical':
                        options[key] = opts[key];
                        position = dom(node, options).replace();
                        to(options.index);
                        break;

                    default:
                        options[key as keyof Options] = opts[key as keyof Options] as never;
                        break;
                }
                dispatch(node, 'update', opts);
            }
        }
    }

    function destroy(): void {
        clear();
        RO.disconnect();
        listen(node, NODE_EVENTS, false);
        listen(window, WINDOW_NATIVE_EVENTS, false);
        dispatch(node, 'destroy', node);
    }
    return { update, destroy, to };
}
