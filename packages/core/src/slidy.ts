import { clamp, coordinate, indexing, dispatch, mount, throttle, listen, loop } from './utils/env';
import { dom } from './utils/dom';
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
        animation: undefined,
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
        wst: NodeJS.Timeout | undefined,
        INDEX = options.index || 0,
        CLAMP = options.clamp as number,
        DURATION = (options.duration as number) / 2,
        SENSITY = options.sensity as number,
        GRAVITY = options.gravity as number;

    const $ = () => dom(node, options);

    const WINDOW_EVENTS: EventMap = [
        ['touchmove', onMove as EventListener, { passive: false }],
        ['mousemove', onMove as EventListener],
        ['touchend', onUp as EventListener],
        ['mouseup', onUp as EventListener],
    ];
    const WINDOW_NATIVE_EVENTS: EventMap = [
        ['wheel', winWheel as EventListener, { passive: false, capture: true }],
    ];
    const NODE_EVENTS: EventMap = [
        ['touchstart', onDown as EventListener, { passive: false }],
        ['mousedown', onDown as EventListener],
        ['keydown', onKeys as EventListener],
        ['contextmenu', () => to(INDEX)],
        ['dragstart', (e) => e.preventDefault()],
    ];

    const RO = new ResizeObserver(() => {
        to(INDEX);
        dispatch(node, 'resize', { node, options });
        position = $().position(false);
    });

    function sense(e: UniqEvent, pos: number): boolean {
        return options.vertical && e.type === 'touchmove'
            ? !edges(INDEX, pos)
            : Math.abs(pos) >= SENSITY;
    }

    function edges(index = 0, dir = direction): boolean {
        const start = index <= 0 && dir <= 0 && position <= $().start;
        const end = index >= node.children.length - 1 && dir >= 0 && position >= $().end;
        return !options.loop && (start || end);
    }

    mount(node, options)
        .then((childs) => {
            node.style.outline = 'none';
            node.style.overflow = 'hidden';
            node.style.position = 'relative';
            node.style.userSelect = 'none';
            node.style.webkitUserSelect = 'none';
            node.onwheel = throttle(onWheel, DURATION, CLAMP);

            position = $().position();

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

        SENSITY = 0;
        INDEX = options.index = $().index(position);
        GRAVITY = edges(INDEX) ? 1.8 : (options.gravity as number);

        $().animate(options.animation, position);
        dispatch(node, 'move', { index: INDEX, position });

        function positioning(pos: number): number {
            if (INDEX - hix) {
                pos = options.loop ? pos - $().history(INDEX - hix) : pos;
                hix = INDEX;
                dispatch(node, 'index', { index });
            }
            return $().scrollable ? pos : 0;
        }

        function edging(position: number): number {
            return !options.snap && !options.loop ? clamp($().start, position, $().end) : position;
        }
    }

    function scroll(index: number, amplitude: number, _duration = 0): void {
        const time = performance.now();
        const snaped = options.snap || options.loop || edges(index);
        const target = snaped
            ? $().distance(index)
            : clamp($().start, position + amplitude, $().end);
        const duration = _duration || DURATION * clamp(1, Math.abs(index - hix), 2);

        amplitude = target - position;

        requestAnimationFrame(function animate() {
            const elapsed = time - performance.now();
            const T = Math.exp(elapsed / duration);
            const delta = amplitude * options.easing(T);
            const current = options.loop ? $().distance(index) : target;
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
        const pos = $().distance(index) - position;
        scroll(index, pos, duration);
    }

    function onDown(e: UniqEvent): void {
        clear();

        SENSITY = options.sensity as number;
        hip = coordinate(e, options);
        ets = e.timeStamp;
        track = direction = 0;

        listen(window, WINDOW_EVENTS);
        !edges(INDEX) && e.stopPropagation();
    }

    function onMove(e: UniqEvent): void {
        const pos = (hip - coordinate(e, options)) * (2 - GRAVITY);
        const elapsed = e.timeStamp - ets;
        const speed = (1000 * pos) / (GRAVITY + elapsed);

        ets = e.timeStamp;
        hip = coordinate(e, options);
        track = (2 - GRAVITY) * speed + (GRAVITY - 1) * track;

        window.onscroll = () => {
            to(INDEX);
            GRAVITY = 2;
        };

        if (sense(e, pos)) {
            move(pos, INDEX);
            e.preventDefault();
        }
    }

    function onUp(): void {
        clear();

        const amplitude = track * (2 - GRAVITY);
        const index = $().index(position + amplitude);

        scroll(clamping(index, options), amplitude);

        function clamping(index: number, options: Options): number {
            const range = CLAMP * direction;
            index = CLAMP && index - hix ? INDEX + range : index;
            return indexing(node, options, index);
        }
    }

    function onWheel(e: UniqEvent): void {
        clear();

        const coord = coordinate(e, options) * (2 - GRAVITY);
        const index = INDEX + Math.sign(coord) * (CLAMP || 1);
        const edged = edges(INDEX, Math.sign(coord));
        const clamped = CLAMP || e.shiftKey || edged;
        const pos = edged ? coord / 9 : coord;
        const ix = clamped ? index : INDEX;
        const tm = clamped ? 0 : DURATION / 2;
        const moved = !CLAMP && !e.shiftKey;

        moved && sense(e, pos) && move(pos, INDEX);
        wst = (options.snap || !moved) && sense(e, pos) ? setTimeout(() => to(ix), tm) : undefined;

        !edges(INDEX) && e.stopPropagation();
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

    function onKeys(e: KeyboardEvent): void {
        const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        const index = ((keys.indexOf(e.key) % 2) - 1 || 1) * (CLAMP || 1);
        if (keys.indexOf(e.key) >= 0) {
            to(INDEX + index);
            e.preventDefault();
        }
        dispatch(node, 'keys', e.key);
    }

    function clear(): void {
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
                        INDEX = options[key] = indexing(node, options, value);
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
                        CLAMP = options[key] = value;
                        node.onwheel = throttle(onWheel, DURATION, value);
                        break;
                    case 'loop':
                    case 'layout':
                    case 'vertical':
                        options[key] = value;
                        position = $().position();
                        to(INDEX);
                        break;

                    default:
                        options[key] = value as never;
                        to(INDEX);
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
