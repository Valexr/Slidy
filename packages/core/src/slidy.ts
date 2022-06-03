import { clamp, coordinate, indexing, dispatch, mount, throttle, listen, style } from './utils/env';
import { find, history, replace, shuffle } from './utils/dom';
import type { Options, Slidy, UniqEvent, EventMap } from './types';

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
        clamp: 0,
        indent: 1,
        sensity: 0,
        gravity: 1.2,
        duration: 375,
        easing: function linear(t) {
            return t;
        },
        animation: undefined,
        snap: undefined,
        vertical: false,
        loop: false,
        _wheel: 0,
        ...opts,
    };

    let hix = -1,
        raf = 0,
        position = 0,
        distance = 0,
        scrolled = false,
        direction = 0,
        ets = 0,
        wst: NodeJS.Timeout | undefined,
        SNAP = options.snap,
        GRAVITY = options.gravity as number,
        SENSITY = options.sensity as number,
        DURATION = (options.duration as number) / 2

    const WINDOW_EVENTS: EventMap = [
        ['touchmove', onMove as EventListener, { passive: false, capture: true }],
        ['mousemove', onMove as EventListener],
        ['touchend', onUp as EventListener],
        ['mouseup', onUp as EventListener],
    ];
    const WINDOW_NATIVE_EVENTS: EventMap = [
        ['wheel', winWheel as EventListener, { passive: false, capture: true }],
        ['scroll', winScroll as EventListener, { passive: false, capture: true }],
    ];
    const NODE_EVENTS: EventMap = [
        ['contextmenu', () => to(options.index)],
        ['dragstart', (e) => e.preventDefault()],
        ['touchstart', onDown as EventListener, { passive: false, capture: true }],
        ['mousedown', onDown as EventListener],
        ['keydown', throttle(onKeys, DURATION)],
    ];

    const RO = new ResizeObserver(() => {
        sizes();
        to(options.index);
        dispatch(node, 'resize', { node, options });
    });

    function sizes() {
        node.gap = find(node, options).gap();
        node.start = find(node, options).position(0, 'start');
        node.end = find(node, options).position(node.children.length - 1, 'end');
        node.scrollable = Math.abs(node.end - node.start) > node.gap * 2;
    }

    function edges(index = 0, direction = 0) {
        return (
            !options.loop &&
            ((index === 0 && direction <= 0 && position <= node.start) ||
                (index === node.children.length - 1 && direction >= 0 && position >= node.end))
        );
    }

    function snapping(index: number) {
        if (!options.loop && options.snap) {
            const active = find(node, options).position(index, options.snap);
            const start = index === 0 || active <= node.start;
            const end = index === node.children.length - 1 || active >= node.end;

            SNAP = start ? 'start' : end ? 'end' : options.snap;
        }
    }

    function sense(e: UniqEvent, pos: number) {
        return !e.shiftKey
            ? options.vertical && e.type === 'touchmove'
                ? !edges(options.index, Math.sign(pos))
                : Math.abs(pos) >= SENSITY
            : true;
    }

    mount(node)
        .then((childs) => {
            style(node, {
                outline: 'none',
                overflow: 'hidden',
                position: 'relative',
                userSelect: 'none',
                webkitUserSelect: 'none',
                webkitTapHighlightColor: 'transparent',
            });

            node.onwheel = options.clamp
                ? throttle(onWheel, DURATION)
                : (onWheel as EventListener);

            position = replace(node, options);

            RO.observe(node);
            listen(node, NODE_EVENTS);
            listen(window, WINDOW_NATIVE_EVENTS);
            dispatch(node, 'mount', { childs, options });
        })
        .catch((error: Error) => console.error(error));

    function move(pos: number, index?: number): void {
        SENSITY = 0;
        direction = Math.sign(pos);
        position += positioning(pos)
        position = edging(position);
        options.index = find(node, options).index(position, SNAP);

        dispatch(node, 'move', { index: options.index, position });
        graviting(options.index);
        moving(node.children);

        function positioning(pos: number): number {
            if (hix !== options.index) {

                if (options.loop) {
                    const index = (options.index as number) - hix
                    const diff = indexing(node, index, options)
                    const dir = diff <= 1 ? 1 : -1

                    pos -= history(node, dir, options);
                    shuffle(node, dir);
                }
                hix = options.index as number

                dispatch(node, 'index', { index, position });
            }
            return node.scrollable ? pos : 0;
        }

        function graviting(index: number): void {
            const edged = edges(index, direction);
            GRAVITY = edged ? 1.8 : (options.gravity as number);
        }

        function moving(childs: HTMLCollection): void {
            for (const child of childs) {
                const el = child as HTMLElement;
                el.style.transform = translate(options.vertical);
            }
        }

        function translate(vertical?: boolean): string {
            const axis = vertical ? `0, ${-position}px` : `${-position}px, 0`;
            return `translate(${axis})`;
        }

        function edging(position: number): number {
            return !options.snap && !options.loop
                ? clamp(node.start, position, node.end)
                : position;
        }
    }

    function scroll(index: number, amplitude = 0, _duration?: number): void {
        snapping(index);

        const time = performance.now();
        const snaped = options.snap || options.loop || edges(index, direction);
        const target = snaped ? find(node, options).position(index, SNAP) : position + amplitude;
        const duration =
            _duration ||
            (!options.clamp && Math.abs(index - hix) > 1 ? (options.duration as number) : DURATION);

        amplitude = target - position;

        requestAnimationFrame(function loop() {
            const elapsed = time - performance.now();
            const T = Math.exp(elapsed / duration);
            const delta = amplitude * options.easing(T);
            const current = options.loop ? find(node, options).position(index, SNAP) : target;
            const pos = current - position - delta;

            if (Math.abs(delta) >= 0.36) {
                raf = requestAnimationFrame(loop);
            } else {
                raf = 0;
                SENSITY = options.sensity as number;
            }
            move(pos, index);
        });
    }

    function to(index = 0, duration = DURATION): void {
        clear();
        index = indexing(node, index, options);
        const pos = find(node, options).position(index, SNAP) - position;
        scroll(index, pos, duration);
    }

    function onDown(e: UniqEvent): void {
        clear();

        ets = e.timeStamp;
        distance = 0;

        coordinate(e, options);
        listen(window, WINDOW_EVENTS);
    }

    function onMove(e: UniqEvent): void {
        const pos = coordinate(e, options) * (2 - GRAVITY);
        const elapsed = e.timeStamp - ets;
        const speed = (1000 * pos) / (GRAVITY + elapsed);

        ets = e.timeStamp;
        distance = (2 - GRAVITY) * speed + (GRAVITY - 1) * distance;

        if (scrolled) {
            to(options.index);
            GRAVITY = 2;
        } else if (sense(e, pos)) {
            move(pos);
        }
    }

    function onUp(): void {
        clear();

        const amplitude = distance * (2 - GRAVITY);
        const index = find(node, options).index(position + amplitude, SNAP);

        scroll(clamping(index, options), amplitude);
    }

    function clamping(index: number, options: Options) {
        const dir = direction < 0 ? -1 : 1;
        index = options.clamp && Math.abs(index - hix)
            ? (options.index as number) + (options.clamp as number) * dir
            : index;
        return indexing(node, index, options)
    }

    function onWheel(e: UniqEvent): void {
        clear();
        snapping(options.index as number);

        const coord = coordinate(e, options) * (2 - GRAVITY);
        const index = (options.index as number) + Math.sign(coord) * (options.clamp || 1)
        const clamped = options.clamp || e.shiftKey || edges(options.index, Math.sign(coord));
        const pos = edges(options.index, Math.sign(coord)) ? coord / 9 : coord;
        const ix = clamped ? index : options.index;
        const tm = clamped ? 0 : DURATION / 2;

        if ((!options.clamp) && sense(e, pos)) {
            update({ _wheel: e.shiftKey ? 1 : 0 });
            !e.shiftKey && move(pos, options.index);
        }
        wst = options.snap ? setTimeout(() => sense(e, pos) && to(ix), tm) : undefined;
    }

    function winWheel(e: UniqEvent) {
        if (
            (Math.abs(e.deltaX) >= Math.abs(e.deltaY) || e.shiftKey) &&
            e.composedPath().includes(node)
        ) {
            e.preventDefault();
        }
    }

    function winScroll(): void {
        scrolled = true;
    }

    function onKeys(e: KeyboardEvent): void {
        const next = ['ArrowRight', 'ArrowDown', 'Enter', ' '];
        const prev = ['ArrowLeft', 'ArrowUp'];
        const index = prev.includes(e.key) ? -1 : next.includes(e.key) ? 1 : 0;

        to((options.index as number) + (options.clamp || 1) * index);
        dispatch(node, 'keys', e.key);

        e.preventDefault();
    }

    function clear(): void {
        scrolled = false;
        clearTimeout(wst);
        cancelAnimationFrame(raf);
        GRAVITY = options.gravity as number;
        listen(window, WINDOW_EVENTS, false);
    }

    function update(opts: Partial<Options>): void {
        if (
            Object.keys(opts).some(
                (key) => options[key as keyof Options] !== opts[key as keyof Options]
            )
        ) {
            for (const key in opts) {
                switch (key) {
                    case 'index':
                        options[key] = indexing(node, opts[key] as number, options);
                        to(options[key]);
                        break;
                    case 'gravity':
                        GRAVITY = options[key] = clamp(0, opts[key] as number, 2);
                        break;
                    case 'sensity':
                        SENSITY = options[key] = opts[key] as number;
                        break;
                    case 'snap':
                        SNAP = options[key] = opts[key];
                        to(options.index);
                        break;
                    case 'clamp':
                    case '_wheel':
                        options[key] = options._wheel = opts[key];
                        node.onwheel = opts[key]
                            ? throttle(onWheel, DURATION)
                            : (onWheel as EventListener);
                        break;
                    case 'duration':
                        options[key] = opts[key];
                        DURATION = (options[key] as number) / 2;
                        break;
                    case 'loop':
                    case 'vertical':
                        options[key] = opts[key];
                        position = replace(node, options);

                    default:
                        options[key as keyof Options] = opts[key as keyof Options] as never;
                        setTimeout(() => {
                            sizes();
                            to(options.index);
                        });
                        break;
                }
            }
            dispatch(node, 'update', opts);
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
