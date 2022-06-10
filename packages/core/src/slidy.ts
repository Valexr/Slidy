import { clamp, coordinate, indexing, dispatch, mount, throttle, listen, loop } from './utils/env';
import { dom } from './utils/dom';
import { fade, matrix, translate } from './utils/animation';
import type { Options, UniqEvent, EventMap, Child } from './types';

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
        animation: fade,
        layout: 'reel',
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
        GRAVITY = options.gravity as number;

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
        dom(node, options).init()
        to(options.index);
        dispatch(node, 'resize', { node, options });
        position = dom(node, options).position(false);
    });

    function sense(e: UniqEvent, pos: number): boolean {
        return options.vertical && e.type === 'touchmove'
            ? !edges(options.index, pos)
            : Math.abs(pos) >= SENSITY;
    }

    function edges(index = 0, dir = direction, pos = position): boolean {
        const start = index <= 0 && dir <= 0 && pos <= dom(node, options).start;
        const end =
            index >= node.children.length - 1 &&
            dir >= 0 &&
            pos >= dom(node, options).end;
        return !options.loop && (start || end);
    }

    mount(node, options)
        .then((childs) => {
            node.style.outline = 'none';
            node.style.overflow = 'hidden';
            node.style.position = 'relative';
            node.style.userSelect = 'none';
            node.style.webkitUserSelect = 'none';
            node.onwheel = throttle(onWheel, DURATION, options.clamp);

            position = dom(node, options).position();

            RO.observe(node);
            listen(node, NODE_EVENTS);
            listen(window, WINDOW_NATIVE_EVENTS);
            dispatch(node, 'mount', { childs, options });
        })
        .catch((error: Error) => console.error('Slidy:', error));

    function move(pos: number, index?: number): void {
        direction = Math.sign(pos);
        position += positioning(pos);
        position = edging(position);
        options.index = dom(node, options).index(position);
        // options.position = position ???

        SENSITY = 0;
        GRAVITY = edges(options.index) ? 1.8 : (options.gravity as number);

        if (dom(node, options).scrollable) {
            loop(node.children, (child: Child, i) => {
                options.animation({ node, options, child, i, position, pos });
            })
            dispatch(node, 'move', { index: options.index, position });
        }

        function positioning(pos: number): number {
            if ((options.index as number) - hix) {
                if (options.loop) {
                    pos -= dom(node, options).history((options.index as number) - hix);
                }
                hix = options.index as number;
                dispatch(node, 'index', { index });
            }
            return pos
        }

        function edging(position: number): number {
            return !options.snap && !options.loop
                ? clamp(dom(node, options).start, position, dom(node, options).end)
                : position;
        }
    }

    function scroll(index: number, amplitude: number, _duration = 0): void {
        const time = performance.now();
        const snaped = options.snap || options.loop || edges(index);
        const target = snaped
            ? dom(node, options).distance(index)
            : clamp(dom(node, options).start, position + amplitude, dom(node, options).end);
        const duration = _duration || DURATION * clamp(1, Math.abs(index - hix), 2);

        amplitude = target - position;

        requestAnimationFrame(function animate() {
            const elapsed = time - performance.now();
            const T = Math.exp(elapsed / duration);
            const delta = amplitude * options.easing(T);
            const current = options.loop ? dom(node, options).distance(index) : target;
            const pos = current - position - delta;

            move(pos, index);

            if (Math.abs(delta) >= 0.36) {
                raf = requestAnimationFrame(animate);
            } else {
                SENSITY = options.sensity as number;
                clear();
            }
        });
    }

    function to(index = 0, duration = DURATION): void {
        clear();
        index = indexing(node, options, index);
        const pos = dom(node, options).distance(index) - position;
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
        const index = dom(node, options).index(position + amplitude);

        scroll(clamping(index, options), amplitude);

        function clamping(index: number, options: Options): number {
            const range = (options.clamp as number) * direction;
            index = options.clamp && index - hix ? (options.index as number) + range : index;
            return indexing(node, options, index);
        }
    }

    function onWheel(e: UniqEvent): void {
        clear();

        const coord = coordinate(e, options) * (2 - GRAVITY);
        const index = (options.index as number) + Math.sign(coord) * (options.clamp || 1);
        const edged = edges(options.index, Math.sign(coord));
        const clamped = options.clamp || e.shiftKey || edged;
        const pos = edged ? coord / 9 : coord;
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
        loop(Object.entries(opts), ([key, value]: [key: keyof Options, value: any]) => {
            if (value !== options[key]) {
                switch (key) {
                    case 'index':
                        options[key] = indexing(node, options, value);
                        to(options[key]);
                        break;
                    case 'gravity':
                        GRAVITY = options[key] = clamp(0, value, 2);
                        break;
                    case 'duration':
                        options[key] = value;
                        DURATION = value / 2;
                        break;
                    case 'sensity':
                        SENSITY = options[key] = value;
                        break;
                    case 'clamp':
                        options[key] = value;
                        node.onwheel = throttle(onWheel, DURATION, value);
                        break;
                    case 'loop':
                    case 'vertical':
                        options[key] = value;
                        position = dom(node, options).position();
                        to(options.index);
                        break;

                    default:
                        options[key] = value as never;
                        break;
                }
                dispatch(node, 'update', opts);
            }
        });
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
