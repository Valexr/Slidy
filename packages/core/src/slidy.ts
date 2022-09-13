import { coordinate, dispatch, indexing, listen, mount } from './lib/env';
import { clamp, entries, loop, throttle } from './lib/utils';
import { dom } from './lib/dom';
import type { Dom, Options, UniqEvent, EventMap, SlidyInstance } from './types';

/**
 * Simple, configurable, nested & reusable sliding action script
 * @see https://github.com/Valexr/slidy/tree/master/packages/core
 */
export function slidy(node: HTMLElement, opts?: Partial<Options>): SlidyInstance {
    const options = {
        index: 0,
        position: 0,
        clamp: 0,
        indent: 1,
        sensity: 2.5,
        gravity: 1.2,
        duration: 375,
        ...opts,
    };

    let $: () => Dom,
        hix = 0,
        hip = 0,
        raf = 0,
        ets = 0,
        track = 0,
        clamped = false,
        wst: NodeJS.Timeout | undefined,
        INDEX = (hix = options.index as number),
        POSITION = options.position as number,
        DIRECTION = options.direction as number,
        DURATION = (options.duration as number) / 2,
        SENSITY = options.sensity as number,
        GRAVITY = options.gravity as number,
        CLAMP = options.clamp as number;

    const WINDOW_EVENTS: EventMap = [
        ['touchmove', onMove as EventListener, { passive: false }],
        ['mousemove', onMove as EventListener],
        ['touchend', onUp as EventListener],
        ['mouseup', onUp as EventListener],
        ['scroll', () => { to(INDEX); GRAVITY = 2; }],
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
        POSITION = options.position = $().position();
        dispatch(node, 'resize', { ROE, options });
    });

    const MO = new MutationObserver((ML) => {
        loop(ML, (record: MutationRecord) => {
            const { addedNodes, removedNodes } = record;
            const mutatedNodes = [...addedNodes, ...removedNodes];
            if (!mutatedNodes.every((node) => 'index' in node)) {
                destroy().then(init);
            }
        });
        dispatch(node, 'mutate', { ML, options });
    });

    const RAF = requestAnimationFrame;

    const CSS = 'outline:0;overflow:hidden;user-select:none;-webkit-user-select:none;';

    const instance = { init, update, destroy, to }

    init();

    function init() {
        mount(node).then(() => {

            $ = () => dom(node, options);

            node.style.cssText += CSS;
            node.onwheel = throttle(onWheel, DURATION, CLAMP);

            POSITION = options.position = $().position(options.loop);

            RO.observe(node);
            MO.observe(node, { childList: true, subtree: true });

            options.plugin?.({ node, options, instance })

            listen(node, NODE_EVENTS);
            listen(window, WINDOW_NATIVE_EVENTS);
            dispatch(node, 'mount', { options });

        }).catch((error: Error) => {
            console.error('Slidy:', error)
        })
    }

    function move(pos: number, index?: number): void {
        DIRECTION = options.direction = Math.sign(pos);
        POSITION = options.position += positioning(pos);
        INDEX = options.index = $().index(POSITION);
        GRAVITY = $().edges() ? 1.8 : options.gravity;
        SENSITY = 0;

        $().animate();
        dispatch(node, 'move', { index: INDEX, position: POSITION });

        function positioning(pos: number): number {
            if (INDEX - hix) {
                pos -= options.loop ? $().swap(INDEX - hix) : 0;
                hix = INDEX;
                dispatch(node, 'index', { index });
            }
            return pos;
        }
    }

    function scroll(index: number, amplitude: number, start?: number): void {
        const snaped = options.snap || $().edges(index);
        const target = snaped ? $().distance(index) : POSITION + amplitude;
        const duration = DURATION * clamp(1, Math.abs(index - hix), 2);
        const distance = target - POSITION;

        RAF(frame);

        let dist = 0, delta = 0

        function frame(now: number) {
            start ??= now;
            const elapsed = start - now;
            const T = Math.exp(elapsed / duration);
            const easing = options.easing?.(T) || T;
            dist = delta
            delta = distance * easing;
            const dest = (dist - delta) % distance;
            const pos = dest % delta ? dest : 0

            move(pos, index);

            if (Math.round(delta)) {
                raf = RAF(frame);
            } else {
                SENSITY = options.sensity;
                clear();
            }
        }
    }

    function to(index = 0, position = 0): void {
        clear();

        index = indexing(node, options, index);
        const pos = $().distance(index) - POSITION;
        scroll(index, position || pos);
    }

    function onDown(e: UniqEvent): void {
        clear();

        SENSITY = options.sensity;
        hip = coordinate(e, options);
        ets = e.timeStamp;
        track = 0;

        listen(window, WINDOW_EVENTS);
        !$().edges() && e.stopPropagation();
    }

    function onMove(e: UniqEvent): void {
        const pos = (hip - coordinate(e, options)) * (2 - GRAVITY);
        const elapsed = e.timeStamp - ets;
        const speed = (1000 * pos) / (GRAVITY + elapsed);

        ets = e.timeStamp;
        hip = coordinate(e, options);
        track = (2 - GRAVITY) * speed + (GRAVITY - 1) * track;

        if ($().sense(e, pos, SENSITY)) {
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
            const range = CLAMP * DIRECTION;
            index = CLAMP && index - hix ? INDEX + range : index;

            return indexing(node, options, index);
        }
    }

    function onWheel(e: UniqEvent): void {
        clear();

        const coord = coordinate(e, options) * (2 - GRAVITY);
        const index = INDEX + Math.sign(coord) * (CLAMP || 1);
        const snaped = options.snap || clamped || $().edges();
        const sensed = $().sense(e, coord, SENSITY);
        const pos = $().edges() ? coord / 5 : coord;
        const ix = clamped ? index : INDEX;
        const tm = clamped ? 0 : DURATION / 2;

        !clamped && sensed && move(pos, INDEX);
        wst = snaped && sensed ? setTimeout(() => to(ix), tm) : undefined;

        !$().edges() && e.stopPropagation();
    }

    function winWheel(e: WheelEvent): void {
        if (e.composedPath().includes(node)) {
            const X = Math.abs(e.deltaX) >= Math.abs(e.deltaY);
            const edged = options.axis === 'y' && !$().edges();

            if (X || edged || e.shiftKey) e.preventDefault();

            const throttled =
                CLAMP > 0 || (options.axis === 'y' && !options.vertical) || e.shiftKey;

            if (clamped !== throttled) {
                node.onwheel = throttle(onWheel, DURATION, throttled);
                clamped = throttled;
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
        loop(entries(opts), ([key, value]: [key: keyof Options, value: any]) => {
            if (value !== options[key]) {
                switch (key) {
                    case 'index':
                        INDEX = options[key] = indexing(node, options, value);
                        to(INDEX);
                        break;
                    case 'position':
                        to(INDEX, value);
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
                        break;

                    default:
                        options[key] = value as never;
                        POSITION = options.position = $().position();
                        to(INDEX);
                        break;
                }
                dispatch(node, 'update', opts);
            }
        });
    }

    async function destroy(): Promise<void> {
        clear();
        RO.disconnect();
        MO.disconnect();
        listen(node, NODE_EVENTS, false);
        listen(window, WINDOW_NATIVE_EVENTS, false);
        dispatch(node, 'destroy', node);
    }
    return instance;
}
