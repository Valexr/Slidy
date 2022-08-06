import { coordinate, dispatch, indexing, listen, mount } from './lib/env';
import { clamp, loop, throttle } from './lib/utils';
import { dom } from './lib/dom';
import type { Options, UniqEvent, EventMap } from './types';

export function slidy(
    node: HTMLElement,
    opts: Partial<Options>
): {
    update: (options: Options) => void;
    to: (index: number) => void;
    destroy: () => void;
} {
    const options: Options = {
        index: 0,
        clamp: 0,
        indent: 1,
        sensity: 5,
        gravity: 1.2,
        duration: 375,
        animation: undefined,
        easing: undefined,
        snap: undefined,
        axis: undefined,
        loop: false,
        ...opts,
    };

    let hix = 0,
        hip = 0,
        raf = 0,
        ets = 0,
        track = 0,
        shifted = false,
        wst: NodeJS.Timeout | undefined,
        INDEX = (hix = options.index as number),
        POSITION = options.position as number,
        DURATION = (options.duration as number) / 2,
        SENSITY = options.sensity as number,
        GRAVITY = options.gravity as number,
        CLAMP = options.clamp as number;

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

    const RO = new ResizeObserver((ROE) => {
        to(INDEX);
        POSITION = $().position(false);
        dispatch(node, 'resize', { ROE });
    });

    function $() {
        return dom(node, options);
    }

    function sense(e: UniqEvent, pos: number): boolean {
        return options.axis === 'y' && e.type === 'touchmove'
            ? !$().edges
            : Math.abs(pos) >= SENSITY;
    }

    mount(node)
        .then(() => {
            node.style.outline = 'none';
            node.style.overflow = 'hidden';
            node.style.userSelect = 'none';
            node.onwheel = throttle(onWheel, DURATION, CLAMP);

            POSITION = $().position();

            RO.observe(node);
            listen(node, NODE_EVENTS);
            listen(window, WINDOW_NATIVE_EVENTS);
            dispatch(node, 'mount', { options });
        })
        .catch((error: Error) => console.error('Slidy:', error));

    function move(pos: number, index?: number): void {
        options.direction = Math.sign(pos);
        POSITION += positioning(pos);
        POSITION = options.position = edging(POSITION);
        INDEX = options.index = $().index(POSITION);

        GRAVITY = $().edges ? 1.8 : (options.gravity as number);
        SENSITY = 0;

        $().animate();
        dispatch(node, 'move', { index: INDEX, position: POSITION });

        function positioning(pos: number): number {
            if (INDEX - hix) {
                pos -= options.loop ? $().swap(INDEX - hix) : 0;
                hix = INDEX;
                dispatch(node, 'index', { index });
            }
            return $().scrollable ? pos : 0;
        }

        function edging(position: number): number {
            const clamped = clamp($().start, position, $().end);
            return !options.snap && !options.loop ? clamped : position;
        }
    }

    function scroll(index: number, amplitude: number): void {
        const time = performance.now();
        const snaped = options.snap || options.loop || $().edges;
        const target = snaped
            ? $().distance(index)
            : clamp($().start, POSITION + amplitude, $().end);
        const duration = DURATION * clamp(1, Math.abs(index - hix), 2);

        amplitude = target - POSITION;

        requestAnimationFrame(function loop() {
            const elapsed = time - performance.now();
            const T = Math.exp(elapsed / duration);
            const easing = options.easing ? options.easing(T) : T;
            const delta = amplitude * easing;
            const current = options.loop ? $().distance(index) : target;
            const pos = current - POSITION - delta;

            move(pos, index);

            if (Math.round(delta)) {
                raf = requestAnimationFrame(loop);
            } else {
                SENSITY = options.sensity as number;
                clear();
            }
        });
    }

    function to(index = 0): void {
        clear();

        index = indexing(node, options, index);
        const pos = $().distance(index) - POSITION;

        scroll(index, pos);
    }

    function onDown(e: UniqEvent): void {
        clear();

        SENSITY = options.sensity as number;
        hip = coordinate(e, options);
        ets = e.timeStamp;
        track = 0;

        listen(window, WINDOW_EVENTS);
        !$().edges && e.stopPropagation();
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
        const index = $().index(POSITION + amplitude);

        scroll(clamping(index, options), amplitude);

        function clamping(index: number, options: Options): number {
            const range = CLAMP * (options.direction as number);
            index = CLAMP && index - hix ? INDEX + range : index;

            return indexing(node, options, index);
        }
    }

    function onWheel(e: UniqEvent): void {
        clear();

        const coord = coordinate(e, options) * (2 - GRAVITY);
        const index = INDEX + Math.sign(coord) * (CLAMP || 1);
        const edged = $().edges;
        const clamped = CLAMP || e.shiftKey;
        const pos = edged ? coord / 9 : coord;
        const ix = clamped ? index : INDEX;
        const tm = clamped ? 0 : DURATION / 2;
        const moved = !CLAMP && !e.shiftKey;

        moved && sense(e, pos) && move(pos, INDEX);
        wst = (options.snap || !moved) && sense(e, pos) ? setTimeout(() => to(ix), tm) : undefined;

        !$().edges && e.stopPropagation();
    }

    function winWheel(e: WheelEvent): void {
        if (e.composedPath().includes(node)) {
            if (
                Math.abs(e.deltaX) >= Math.abs(e.deltaY) ||
                e.shiftKey ||
                (options.axis === 'y' && !$().edges)
            )
                e.preventDefault();
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
        listen(window, WINDOW_EVENTS, false);
    }

    function update(opts: Partial<Options>): void {
        loop(Object.entries(opts), ([key, value]: [key: keyof Options, value: any]) => {
            if (value !== options[key]) {
                switch (key) {
                    case 'index':
                        INDEX = options[key] = indexing(node, options, value);
                        to(INDEX);
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

                    default:
                        options[key] = value as never;
                        POSITION = options.position = $().position(false);
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
