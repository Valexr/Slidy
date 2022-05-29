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
        gravity: 1.2,
        duration: 375,
        easing: function linear(t) {
            return t;
        },
        snap: undefined,
        vertical: false,
        loop: false,
        ...opts,
    };

    let raf = 0,
        hix = -1,
        position = 0,
        distance = 0,
        reference = 0,
        scrolled = false,
        direction = 0,
        timestamp = 0,
        frame = position,
        wst: NodeJS.Timeout | undefined,
        SNAP = options.snap,
        CLAMP = options.clamp,
        GRAVITY = options.gravity as number,
        DURATION = Math.pow(options.duration as number, 2) / 1000;

    const WINDOW_EVENTS: EventMap = [
        ['touchmove', onMove as EventListener, { passive: false, capture: true }],
        ['mousemove', onMove as EventListener],
        ['touchend', onUp],
        ['mouseup', onUp],
    ];
    const WINDOW_NATIVE_EVENTS: EventMap = [
        ['wheel', winWheel as EventListener, { passive: false, capture: true }],
        ['scroll', winScroll as EventListener],
    ];
    const NODE_EVENTS: EventMap = [
        ['contextmenu', () => to(options.index)],
        ['dragstart', (e) => e.preventDefault()],
        ['touchstart', onDown as EventListener, { passive: false, capture: true }],
        ['mousedown', onDown as EventListener],
        ['keydown', throttle(onKeys, DURATION)],
    ];

    const RAF = requestAnimationFrame;

    const RO = new ResizeObserver(() => {
        node.gap = find(node, options).gap();
        node.start = find(node, options).position(0, 'start');
        node.end = find(node, options).position(node.children.length - 1, 'end');
        node.scrollable = Math.abs(node.end - node.start) > node.gap * 2;

        to(options.index);
        position = !node.scrollable ? 0 : position;
        dispatch(node, 'resize', { node, options });
    });

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

    mount(node)
        .then((childs) => {
            style(node, {
                outline: 'unset',
                overflow: 'hidden',
                position: 'relative',
                userSelect: 'none',
                webkitUserSelect: 'none',
                touchAction: 'pan-y',
                webkitTapHighlightColor: 'transparent'
            });
            node.onwheel = options.clamp
                ? throttle(onWheel as EventListener, DURATION)
                : (onWheel as EventListener);
            position = replace(node, options);

            RO.observe(node);
            listen(node, NODE_EVENTS);
            listen(window, WINDOW_NATIVE_EVENTS);
            dispatch(node, 'mount', { childs, options });
        })
        .catch((error: Error) => console.error(error));

    function move(pos: number, index?: number): void {
        direction = Math.sign(pos);
        position += node.scrollable ? positioning(pos) : 0;
        position = edging(position);
        options.index = find(node, options).index(position, SNAP);

        dispatch(node, 'move', { index: options.index, position });
        graviting(options.index);
        moving(node.children);

        function positioning(pos: number): number {
            if (hix !== options.index) {
                dispatch(node, 'index', { index, position });
                if (options.loop) {
                    pos -= history(node, direction, options);
                    shuffle(node, direction);
                    frame = position + pos;
                }
                hix = options.index as number;
            }
            return pos;
        }

        function graviting(index: number): void {
            const edged = edges(index, direction);
            GRAVITY = edged ? 1.8 : (options.gravity as number);
        }

        function moving(childs: HTMLCollection): void {
            for (const child of childs) {
                const el = child as HTMLElement
                el.style.transform = translate(options.vertical)
            }
            // for (let index = 0; index < childs.length; index++) {
            //     style(childs[index] as HTMLElement, {
            //         transform: translate(options.vertical),
            //     });
            // }
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

        RAF(function animate() {
            const elapsed = time - performance.now();
            const T = Math.exp(elapsed / duration);
            const delta = amplitude * options.easing(T);
            const current = options.loop ? find(node, options).position(index, SNAP) : target;
            const pos = current - position - delta;

            raf = Math.abs(delta) >= 0.36 ? RAF(animate) : 0;
            move(pos, index);
        });
    }

    function to(index = 0, duration = DURATION): void {
        clear();
        index = indexing(node, index, options.loop);
        const pos = find(node, options).position(index, SNAP) - position;
        scroll(index, pos, duration);
    }

    function onDown(e: UniqEvent): void {
        clear();

        reference = coordinate(e, options);
        timestamp = performance.now();
        distance = 0;
        frame = position;

        listen(window, WINDOW_EVENTS);
    }

    function onMove(e: UniqEvent): void {
        const delta = reference - coordinate(e, options);
        const pos = delta * (2 - GRAVITY);

        reference = coordinate(e, options);
        distance = track();

        if (e.type === 'touchmove') {
            if (scrolled || (options.vertical && edges(options.index, direction))) {
                to(options.index);
                GRAVITY = 2;
            } else if (Math.abs(delta) >= 5) {
                e.preventDefault();
            }
            move(pos);
        } else move(pos);

        function track(): number {
            const now = performance.now();
            const elapsed = now - timestamp;
            const delta = position - frame;
            const speed = (1000 * delta) / (1 + elapsed);

            timestamp = now;
            frame = position;
            return (2 - GRAVITY) * speed + 0.2 * distance
        }
    }

    function onUp(): void {
        clear();

        const amplitude = distance * (2 - GRAVITY);
        const index = find(node, options).index(position + amplitude, SNAP);

        scroll(clamping(index, options), amplitude);
    }

    function clamping(index: number, options: Options) {
        // if (options.loop) {
        //     if (options.index === 0) {
        //         index = (options.index as number) + (options.clamp as number)
        //     } else if (index === node.children.length - 1) {
        //         index = (options.index as number) - (options.clamp as number)
        //     }
        // }
        const min = (options.index as number) - (options.clamp as number);
        const max = (options.index as number) + (options.clamp as number);
        const mix = clamp(min, index, max);

        console.log(min, index, max, options.index, mix);

        return options.clamp ? mix : index;
    }

    function onWheel(e: UniqEvent): void {
        clear();
        update({ clamp: e.shiftKey ? 1 : CLAMP });

        const coord = coordinate(e, options) * (2 - GRAVITY);
        const index = (options.index as number) + Math.sign(coord) * (options.clamp || 1);
        const clamped = options.clamp || e.shiftKey || edges(options.index);
        const pos = edges(options.index) ? coord / 4.5 : coord;
        const ix = clamped ? index : options.index;
        const tm = clamped ? 0 : DURATION;
        snapping(options.index as number);

        if (!(options.clamp || e.shiftKey)) move(pos, options.index);
        if (options.snap || options.clamp || e.shiftKey) {
            wst = setTimeout(() => to(ix), tm);
        }
    }

    function winWheel(e: WheelEvent) {
        if (
            (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) &&
            e.composedPath().includes(node)
        ) {
            e.preventDefault();
            window.scroll(0, 0)
            // dispatch(window, 'scroll')
        }
    }

    function winScroll(e: Event): void {
        e.preventDefault();
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
                    case 'clamp':
                        CLAMP = options[key] = opts[key];
                        node.onwheel = opts[key]
                            ? throttle(onWheel as EventListener, (options.duration as number) / 1.5)
                            : (onWheel as EventListener);
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
                        to(options.index);
                        break;
                }
            }
        }
        dispatch(node, 'update', opts);
    }

    function destroy(): void {
        clear();
        RO.disconnect();
        listen(node, NODE_EVENTS, false);
        listen(node, WINDOW_NATIVE_EVENTS, false);
        dispatch(node, 'destroy', node);
    }
    return { update, destroy, to };
}
