import { clamp, coordinate, indexing, dispatch, mount, throttle, listen } from './utils/env';
import { find, history, replace, shuffle } from './utils/dom';
import type { Options, Slidy } from './types';

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
        direction = 0,
        timestamp = 0,
        frame = position,
        wst: NodeJS.Timeout | undefined,
        SNAP = options.snap,
        CLAMP = options.clamp,
        GRAVITY = options.gravity as number,
        DURATION = Math.pow(options.duration as number, 2) / 1000;

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

    function edges(index?: number) {
        return !options.loop && (index === 0 || index === node.children.length - 1);
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
            node.style.outline = 'unset'
            node.style.overflow = 'hidden'
            node.style.position = 'relative'
            node.style.touchAction = 'none'

            node.onpointerup = onUp
            node.onpointerdown = onDown
            node.oncontextmenu = clear
            node.onkeydown = throttle(onKeys, DURATION)
            node.onwheel = options.clamp ? throttle(onWheel, DURATION) : onWheel
            // node.onscroll = (e) => {
            //     console.log(e)
            //     e.preventDefault()
            //     // e.stopPropagation()
            //     // e.stopImmediatePropagation()
            // }

            listen(window, [['wheel', winWheel as EventListener, { passive: false, capture: false }]])

            RO.observe(node);
            position = replace(node, options);
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
            const edged =
                edges(index) &&
                ((position < node.start && direction < 0) ||
                    (position > node.end && direction > 0));
            GRAVITY = edged ? 1.8 : (options.gravity as number);
        }

        function moving(childs: HTMLCollection): void {
            for (const child of childs) {
                const el = child as HTMLElement
                el.style.transform = translate(options.vertical)
            }
        }

        function translate(vertical?: boolean): string {
            const axis = vertical ? `0, ${-position}px, 0` : `${-position}px, 0, 0`;
            return `translate3d(${axis})`;
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
        const snaped = options.snap || options.loop || edges(index);
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
        index = indexing(node, index, options.loop)
        const pos = find(node, options).position(index, SNAP) - position;
        scroll(index, pos, duration);
    }

    function onDown(e: PointerEvent): void {
        clear();

        node.onpointermove = onMove
        node.style.touchAction = 'auto'
        e.pointerType === 'mouse' && node.focus()
        node.onpointercancel = () => to(options.index)

        reference = coordinate(e, options);
        timestamp = performance.now();
        frame = position;
        distance = 0;

        e.preventDefault()
    }

    function onMove(e: PointerEvent): void {
        node.setPointerCapture(e.pointerId);
        node.style.touchAction = 'none'
        e.pointerType === 'mouse' && node.blur()

        const delta = reference - coordinate(e, options);
        const pos = delta * (2 - GRAVITY);
        reference = coordinate(e, options);

        move(pos);
        track();

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

    function onUp(e: PointerEvent): void {
        clear();

        const amplitude = distance * (2 - GRAVITY);
        const index = find(node, options).index(position + amplitude, SNAP);
        node.releasePointerCapture(e.pointerId);
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
        const min = (options.index as number) - (options.clamp as number)
        const max = (options.index as number) + (options.clamp as number)
        const mix = clamp(min, index, max)

        console.log(min, index, max, options.index, mix)

        return options.clamp ? mix : index
    }

    function onWheel(e: WheelEvent): void {
        clear();
        update({ clamp: e.shiftKey ? 1 : CLAMP })

        const coord = coordinate(e, options) * (2 - GRAVITY)
        const index = (options.index as number) + (Math.sign(coord) * (options.clamp || 1));
        const clamped = options.clamp || e.shiftKey || edges(options.index);
        const pos = edges(options.index) ? coord / 4.5 : coord;
        const ix = clamped ? index : options.index
        const tm = clamped ? 0 : DURATION
        snapping(options.index as number);

        if (!(options.clamp || e.shiftKey)) move(pos, options.index);
        if (options.snap || options.clamp || e.shiftKey) {
            wst = setTimeout(() => to(ix), tm);
        }
    }

    function winWheel(e: WheelEvent) {
        if (((Math.abs(e.deltaX) > Math.abs(e.deltaY)) || e.shiftKey) && e.composedPath().includes(node)) {
            e.preventDefault()
        }
    }

    function onKeys(e: KeyboardEvent): void {
        const next = ['ArrowRight', 'ArrowDown', 'Enter', ' '];
        const prev = ['ArrowLeft', 'ArrowUp'];
        const index = prev.includes(e.key)
            ? -1 : next.includes(e.key)
                ? 1 : 0;

        to((options.index as number) + (options.clamp || 1) * index);
        dispatch(node, 'keys', e.key);

        e.preventDefault();
    }

    function clear(): void {
        clearTimeout(wst);
        cancelAnimationFrame(raf);
        node.onpointermove = null
        GRAVITY = options.gravity as number;
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
                        node.onwheel = opts[key] ? throttle(onWheel, options.duration as number / 1.5) : onWheel
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
        listen(window, [['wheel', winWheel as EventListener]], false)
        dispatch(node, 'destroy', node);
    }
    return { update, destroy, to };
}
