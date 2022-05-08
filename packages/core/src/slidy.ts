import {
    coordinate,
    dispatch,
    listen,
    mount,
    style
} from './utils/env';
import { find, history, indexing, replace, shuffle } from './utils/dom';
import { maxMin } from './utils/helpers';
import type { Options, Slidy, UniqEvent } from './types';

const base: Options = {
    index: 0,
    indent: 0,
    gravity: 1.2,
    duration: 375,
    snap: undefined,
    vertical: false,
    clamp: false,
    loop: false,
};

export function slidy(
    node: Slidy,
    options: Partial<Options> = base,
): {
    update: (options: Options) => void;
    destroy: () => void;
    to: (index: number, target?: number) => void;
} {
    let raf: number,
        wst: NodeJS.Timeout,
        reference = 0,
        direction = 0,
        timestamp = 0,
        velocity = 0,
        position = 0,
        gap = 0,
        last = 0,
        frame = position,
        hix: number,
        snap = options.snap,
        gravity = options.gravity as number,
        scrolled = false,
        start = 0,
        end = 0

    options = { ...base, ...options };

    const DURATION = Math.pow(options.duration as number, 2) / 1000;

    const WINDOW_EVENTS: [
        string,
        EventListener,
        AddEventListenerOptions?,
    ][] = [
            ['touchmove', onMove as EventListener, { passive: false }],
            ['mousemove', onMove as EventListener],
            ['touchend', onUp],
            ['mouseup', onUp],
            ['scroll', onScroll, { capture: true }],
        ];
    const NODE_EVENTS: [
        string,
        EventListener,
        AddEventListenerOptions?,
    ][] = [
            ['contextmenu', clear],
            ['dragstart', (e) => e.preventDefault()],
            ['touchstart', onDown as EventListener, { passive: false }],
            ['mousedown', onDown as EventListener],
            ['keydown', onKeys as EventListener],
            ['wheel', onWheel as EventListener, { passive: false, capture: true }],
        ];

    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
        to(options.index);
        dispatch(node, 'resize', { node, options });
    });
    const edges = (index: number) => !options.loop && (index === 0 || index === last)

    mount(node)
        .then((childs) => {
            replace(node, options.index as number, options.loop);

            snap = options.snap;
            last = childs.length - 1;
            gap = find(node, options).gap();
            gravity = options.gravity as number;
            position = options.loop
                ? find(node, options).position(options.index as number, snap, gap)
                : position;

            style(node, {
                outline: 'unset',
                overflow: 'hidden',
                position: 'relative',
                userSelect: 'none',
                webkitUserSelect: 'none'
            });

            listen(node, NODE_EVENTS);
            RO.observe(node);

            dispatch(node, 'mount', { childs, options });
        })
        .catch((error: Error) => console.error(error));

    function move(pos: number): void {
        direction = Math.sign(pos);
        position += positioning(pos);
        options.index = find(node, options).index(position, snap);

        graviting();
        moving(node.children);
        dispatch(node, 'move', { index: options.index, position });

        function positioning(pos: number): number {
            if (hix !== options.index) {
                if (options.loop) {
                    pos -= history(node, direction, gap, options);
                    shuffle(node, direction);
                    frame = position + pos;
                }
                hix = options.index as number;
                dispatch(node, 'index', { index: options.index, position });
            }
            return pos;
        }

        function graviting() {
            const condition = (position < start && direction < 0) || (position > end && direction > 0)
            gravity = condition && !options.loop ? 1.8 : options.gravity as number;
        }

        function moving(childs: HTMLCollection) {
            for (let index = 0; index < childs.length; index++) {
                style(childs[index] as HTMLElement, {
                    transform: translate(options.vertical),
                });
            }
        }

        function translate(vertical?: boolean): string {
            const axis = vertical
                ? `0, ${-edging(position)}px, 0` : `${-edging(position)}px, 0, 0`;
            return `translate3d(${axis})`;
        }

        function edging(position: number) {
            start = find(node, options).position(0, 'start', gap)
            end = find(node, options).position(last, 'end', gap)
            return !options.snap && !options.loop
                ? maxMin(end, start, position) : position
        }
    }

    function scroll(
        index: number,
        duration: number,
        timestamp: number,
        amplitude = 0,
        target = 0,
    ): void {
        const condition = options.snap || options.loop || edges(index)

        snapping(index);

        target = condition
            ? find(node, options).position(index, snap, gap)
            : position + amplitude;
        amplitude = target - position;

        raf = RAF(animate)

        function animate() {
            const elapsed = timestamp - performance.now();
            const delta = amplitude * Math.exp(elapsed / duration);

            target = options.loop
                ? find(node, options).position(index, snap, gap)
                : target;
            raf = Math.abs(delta) > 0.5 ? RAF(animate) : 0
            return move(target - position - delta);
        }
    }

    function snapping(index: number): void {
        if (!options.loop) {
            snap = index === 0 ? 'start' : index === last ? 'end' : options.snap
        }
    }

    function to(index = 0, duration = DURATION, target?: number): void {
        clear();

        index = indexing(node, index, options.loop);
        snapping(index)
        target = target || find(node, options).position(index, snap, gap);

        scroll(index, duration, performance.now(), target - position);
    }

    function onDown(e: UniqEvent): void {
        clear();

        reference = coordinate(e, options.vertical);
        timestamp = performance.now();
        frame = position;
        velocity = 0;

        listen(window, WINDOW_EVENTS);
    }

    function onMove(e: UniqEvent): void {
        const delta = reference - coordinate(e, options.vertical);
        reference = coordinate(e, options.vertical);

        move(delta * (2 - gravity));
        track();

        if (Math.abs(delta) > 2) {
            e.preventDefault();
            e.stopPropagation();
        } else if (scrolled) {
            gravity = 2;
            to(options.index, DURATION / gravity);
        }

        function track(): void {
            const now = performance.now();
            const elapsed = now - timestamp;
            const delta = position - frame;
            const speed = (1000 * delta) / (1 + elapsed);

            velocity = (2 - gravity) * speed + 0.2 * velocity;

            if (elapsed < 69) return;

            timestamp = now;
            frame = position;
        }
    }

    function onUp(): void {
        clear();

        const amplitude = velocity * (2 - gravity);
        const index = find(node, options).index(position + amplitude, snap);
        const condition = options.clamp ||
            ((options.duration && Math.abs(amplitude) <= options.duration) &&
                options.snap) || edges(index)

        scroll(
            index,
            condition ? DURATION : options.duration as number,
            performance.now(),
            amplitude,
        );
    }

    function onWheel(e: UniqEvent): void {
        clear();

        const coord = coordinate(e, options.vertical) * (2 - gravity);
        const direction = coord * (e.shiftKey && !options.vertical ? -1 : 1)
        const index = options.index as number + Math.sign(direction);
        const clamping = options.clamp || e.shiftKey
        const condition = clamping || edges(options.index as number)

        if (!clamping) move(edges(options.index as number) ? coord / 4.5 : coord)
        wst = setTimeout(() => to(condition ? index : options.index), condition ? 0 : 69);
    }

    function onKeys(e: KeyboardEvent): void {
        const next = ['ArrowRight', 'ArrowDown', 'Enter', ' '];
        const prev = ['ArrowLeft', 'ArrowUp'];
        const index = options.index as number +
            (prev.includes(e.key) ? -1 : next.includes(e.key) ? 1 : 0);

        to(index);
        dispatch(node, 'keys', e.key);

        e.preventDefault();
    }

    function onScroll(): void {
        scrolled = true;
    }

    function clear(): void {
        scrolled = false;
        clearTimeout(wst)
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
                        gravity = options[key] as number;
                        break;
                    case 'snap':
                        options[key] = opts[key];
                        snap = options[key];
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
