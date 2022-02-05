import { onMounted } from './env';
import type { Delta, Options, Scroll } from './types';
import {
    find,
    indexing,
    // rotate,
    replace,
    prev,
    next,
    maxMin,
    css,
    dispatch,
    // maxSize,
    coordinate,
} from './utils';

export function slidy(
    node: HTMLElement,
    options: Options
): {
    update: (options: Options) => void;
    destroy: () => void;
    to: (index: number, target?: number) => void;
} {
    let {
        index = 0,
        gravity = 1.2,
        duration = 375,
        vertical = false,
        clamp = false,
        loop = false,
        snap = false,
        align = 'start',
    }: Options = options;

    let raf: number,
        rak: number,
        velocity = 0,
        reference = 0,
        position = 0,
        frame = 0,
        // dragtime: NodeJS.Timer,
        wheeltime: NodeJS.Timeout,
        hip = position,
        hix = index,
        gap = 0;

    const PARENT = node.parentElement;
    const listen = (
        node: Window | HTMLElement | null,
        events: [keyof HTMLElementEventMap, EventListener][],
        on: boolean = true
    ) =>
        events.forEach(([event, handle]) =>
            on
                ? node.addEventListener(event, handle, true)
                : node.removeEventListener(event, handle, true)
        );
    const windowEvents: [keyof HTMLElementEventMap, EventListener][] = [
        ['touchmove', onMove],
        ['mousemove', onMove],
        ['touchend', onUp],
        ['mouseup', onUp],
    ];
    const parentEvents: [keyof HTMLElementEventMap | string, EventListener][] = [
        ['contextmenu', clear],
        ['touchstart', onDown],
        ['mousedown', onDown],
        ['keydown', onKeys],
        ['wheel', onWheel],
        ['resize', onResize],
        ['mutate', onMutate],
    ];

    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
        node.dispatchEvent(new CustomEvent('resize'));
    });
    const MO = new MutationObserver(() => {
        node.dispatchEvent(new CustomEvent('mutate'));
    });
    const moOptions = {
        childList: true,
        attributes: true,

        // Omit (or set to false) to observe only changes to the parent node
        subtree: true,
    };

    onMounted(node)
        .then((childs: HTMLCollection) => {
            RO.observe(node);
            MO.observe(node, moOptions);

            const styles = {
                userSelect: 'none',
                touchAction: 'pan-y',
                // pointerEvents: 'none',
                willChange: 'auto',
                webkitUserSelect: 'none',
            };
            css(node, styles);

            gap = find.gap(node, vertical);
            replace(node, index, loop);
            to(index);
            console.log('gap:', gap);

            if (PARENT) {
                css(PARENT, { outline: 'none' });
                listen(PARENT, parentEvents);
            }
            dispatch(node, 'mounted', { childs });
        })
        .catch((error) => console.error(error));

    function move(pos: number, transition: number = 0) {
        position += loop ? looping(pos) : pos;
        index = find.index(node, position, undefined, vertical, align);

        const translate = (vertical: boolean) =>
            vertical ? `0, ${-position}px, 0` : `${-position}px, 0, 0`;

        const styles = {
            transform: `translate3d(${translate(vertical)})`,
            transition: `${transition}ms`,
        };
        css(node, styles);
        dispatch(node, 'move', { detail: { index, position } });
        // node.style.transform = `translate3d(${translate(vertical)})`;
        // node.style.transition = `${transition}ms`;
        // node.dataset.position = `${position}`;
        // node.dataset.index = `${index}`;
    }

    function looping(pos: number) {
        const delta = hip - pos;
        const first = find.size(node, 0, vertical);
        const last = find.size(node, node.children.length - 1, vertical);
        const history = (size: number) => (size + gap) * Math.sign(-pos);

        if (hix !== index) {
            pos > 0 ? next(node) : prev(node);
            pos += history(pos > 0 ? first : last);
            frame = position + pos + delta;
        }
        hix = index;
        return pos;
    }

    let toing = false;
    function to(index: number, target: number | null = null) {
        toing = true;
        clear();

        index = hix = indexing(node, index, loop);
        // hix = loop ? hix : index
        const child = find.child(node, index);
        const ix = loop ? find.index(node, position, child, vertical, align) : index;

        let pos = target
            ? snap
                ? find.target(node, target, vertical, align)
                : target
            : target === 0
                ? 0
                : find.position(node, ix, vertical, align);

        move(pos - position, duration);
    }

    function track(timestamp: number) {
        RAF(function track(time: number) {
            const v = (1000 * (position - frame)) / (1 + (time - timestamp));
            velocity = (2 - gravity) * v + maxMin(1, 0, 1 - gravity) * velocity;
            timestamp = time;
            frame = position;
            rak = RAF(track);
        });
    }

    function scroll({ target, amplitude, duration, timestamp }: Scroll) {
        if (amplitude) {
            RAF(function scroll(time: number) {
                const elapsed = (time - timestamp) / duration;
                const delta = amplitude * Math.exp(-elapsed);
                const dist = position - (target - delta);

                move(loop ? delta / 16.7 : -dist);
                raf = Math.abs(delta) > 0.5 ? RAF(scroll) : 0;
                if (loop && Math.abs(delta) < 5) to(index);
            });
        }
    }

    function onDown(e: MouseEvent | TouchEvent) {
        css(node, { pointerEvents: e.type !== 'mousedown' ? 'auto' : 'none' });
        clear();

        frame = position;
        reference = coordinate(e, vertical);
        track(performance.now());

        listen(window, windowEvents);
    }

    function onMove(e: MouseEvent | TouchEvent) {
        const delta = (reference - coordinate(e, vertical)) * (2 - gravity);
        reference = coordinate(e, vertical);
        move(delta);
    }

    function onUp(e: MouseEvent | TouchEvent) {
        clear();

        const { target, amplitude } = delting(position);

        if (Math.abs(amplitude) > 10)
            Math.abs(velocity) < 100
                ? to(index)
                : clamp
                    ? to(index, target)
                    : scroll({
                        target,
                        amplitude,
                        duration,
                        timestamp: performance.now(),
                    });
    }

    function delting(position: number): Delta {
        let amplitude = (2 - gravity) * velocity;
        const target = snap
            ? find.target(node, position + amplitude, vertical, align)
            : position + amplitude;
        amplitude = target - position;
        return { target, amplitude };
    }

    let wheeling = false;
    function onWheel(e: WheelEvent) {
        clear();
        wheeling = true;

        ((Math.abs(coordinate(e, vertical)) && Math.abs(coordinate(e, vertical)) < 15) ||
            e.shiftKey) &&
            e.preventDefault();

        move(coordinate(e, vertical) * (2 - gravity));

        if (e.shiftKey) to(index - Math.sign(e.deltaY));
        else if (snap || clamp)
            wheeltime = setTimeout(() => {
                to(index);
                wheeling = false;
            }, 100);
    }

    function onKeys(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') {
            to(index - 1);
        } else if (e.key === 'ArrowRight') {
            to(index + 1);
        }
    }

    function onResize(e: CustomEvent) {
        gap = find.gap(node, vertical);
        to(index);
    }

    function onMutate(e: CustomEvent) {
        // console.log(e)
        // gap = find.gap(node, vertical);
        // to(index)
    }

    function clear() {
        // hip = position
        // frame = position
        hix = wheeling ? hix : index;
        // clearInterval(dragtime);
        clearTimeout(wheeltime);
        cancelAnimationFrame(raf);
        cancelAnimationFrame(rak);
        listen(window, windowEvents, false);
    }

    updater(options);

    function updater(options: Options) {
        duration = options.duration;
        gravity = maxMin(2, 0, options.gravity);
        vertical = options.vertical;
        align = options.align;
        snap = options.snap;
        clamp = options.clamp;

        for (let key in options) {
            if (key !== options[key]) {
                key = options[key]
            }
        }

        if (index !== options.index) {
            index = indexing(node, options.index, loop);
            to(index);
        }

        if (loop !== options.loop) {
            loop = options.loop;
            gap = find.gap(node, vertical);
            replace(node, index, loop);
            to(index);
        }
    }

    function destroer() {
        clear();
        RO.disconnect();
        MO.disconnect();
        listen(PARENT, parentEvents, false);
    }
    return {
        update: (option) => updater({ ...options, ...option }),
        destroy: () => destroer(),
        to,
    };
}
