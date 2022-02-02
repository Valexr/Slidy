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
    // maxSize,
    axisCoord,
} from './utils';
// import { resize } from './actions'

export function slidy(
    node: HTMLElement,
    {
        gap = 0,
        index = 0,
        axis = 'x',
        loop = false,
        snap = false,
        clamp = false,
        gravity = 1.2,
        duration = 375,
        align = 'start',
        indexer = (x: number) => x,
        scroller = (p: number) => p,
    }: Options
): {
    update: (options: Options) => void;
    destroy: () => void;
    to: (index: number, target?: number) => void;
} {
    let raf: number,
        rak: number,
        velocity = 0,
        reference = 0,
        position = 0,
        frame = 0,
        // dragtime: NodeJS.Timer,
        wheeltime: NodeJS.Timeout,
        hip = position,
        hix = index;

    const PARENT = node?.parentElement;
    const listen = (
        node: Window | HTMLElement | null,
        events: [keyof HTMLElementEventMap, EventListener][],
        off: boolean = false
    ) =>
        events.forEach(([event, handle]) =>
            off
                ? node?.removeEventListener(event, handle, true)
                : node?.addEventListener(event, handle, true)
        );
    const windowEvents: [keyof HTMLElementEventMap, EventListener][] = [
        ['touchmove', onMove],
        ['mousemove', onMove],
        ['touchend', onUp],
        ['mouseup', onUp],
    ];
    const parentEvents: [keyof HTMLElementEventMap, EventListener][] = [
        ['contextmenu', clear],
        ['touchstart', onDown],
        ['mousedown', onDown],
        ['keydown', onKeys],
        ['wheel', onWheel],
        ['resize', () => to(index)],
    ];
    // const CIX: number = Math.floor(node.children.length / 2); // node.children.length / 2 >> 1
    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
        PARENT?.dispatchEvent(new CustomEvent('resize'));
    });

    onMounted(node)
        .then((childs: HTMLCollection) => {
            console.log('mounted');
            node.style.userSelect = 'none';
            node.style.touchAction = 'pan-y';
            node.style.pointerEvents = 'none';
            node.style.willChange = 'auto';
            node.style.webkitUserSelect = 'none';
            // node.onresize = () => to(index);

            replace(node, index, loop);
            to(index);

            if (PARENT) {
                RO.observe(PARENT);
                PARENT.style.outline = 'none';
                listen(PARENT, parentEvents);
            }
        })
        .catch((error) => console.error(error));

    function move(pos: number, transition: number = 0) {
        position += loop ? looping(pos) : pos;
        index = find.index(node, position, undefined, axis, align);

        const translate = (axis: string) => {
            return axis === 'y' ? `0, ${-position}px, 0` : `${-position}px, 0, 0`;
        };

        node.style.transform = `translate3d(${translate(axis)})`;
        node.style.transition = `${transition}ms`;
        node.dataset.position = `${position}`;
        node.dataset.index = `${index}`;

        indexer(index);
        scroller(position);
    }

    function looping(pos: number) {
        const delta = hip - pos;
        const first = find.size(node, 0, axis);
        const last = find.size(node, node.children.length - 1, axis);
        // const active = find.size(node, hix, axis)
        const history = (size: number) => (size + gap) * Math.sign(-pos);

        if (hix !== index) {
            pos > 0 ? next(node, axis) : prev(node, axis);
            pos += history(pos > 0 ? first : last);
            frame = position + pos + delta;
            // node.style.left = `${history(delta ? first : last)}px`;
        }
        // console.log('loop:', hix, index, frame, delta)
        hix = index;
        return pos;
    }

    function to(index: number, target: number | null = null) {
        clear();

        index = hix = indexing(node, index, loop);
        const child = find.child(node, index);
        const ix = loop ? find.index(node, position, child, axis, align) : index;

        let pos = target
            ? snap
                ? find.target(node, target, axis, align)
                : target
            : target === 0
            ? 0
            : find.position(node, ix, axis, align);

        // console.log('to:', ix, index, target, pos - position)
        move(pos - position, duration);
        // clamp && loop && replace(node, index, loop);
        // scroll({
        //     target: pos - position,
        //     amplitude: pos / duration,
        //     duration,
        //     timestamp: performance.now()
        // });
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
                // const near = find.position(node, loop ? CIX : index, axis, align, loop)
                const delta = amplitude * Math.exp(-elapsed);
                const dist = position - (target - delta);

                move(loop ? delta / 16.7 : -dist);
                raf = Math.abs(delta) > 0.5 ? RAF(scroll) : 0;
                if (loop && Math.abs(delta) < 5) to(index);
                // console.log(delta, -dist)
            });
        }
    }

    function onDown(e: MouseEvent | TouchEvent) {
        node.style.pointerEvents = e.type !== 'mousedown' ? 'auto' : 'none';
        clear();

        frame = position;
        reference = axisCoord(e, axis);
        track(performance.now());

        listen(window, windowEvents);
    }

    function onMove(e: Event) {
        const delta = (reference - axisCoord(e, axis)) * (2 - gravity);
        reference = axisCoord(e, axis);
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
            ? find.target(node, position + amplitude, axis, align)
            : position + amplitude;
        amplitude = target - position;
        return { target, amplitude };
    }

    let wheeling = false;
    function onWheel(e: WheelEvent) {
        clear();
        wheeling = true;

        ((Math.abs(axisCoord(e, 'x')) && Math.abs(axisCoord(e, 'y')) < 15) ||
            e.shiftKey) &&
            e.preventDefault();

        move(axisCoord(e, axis) * (2 - gravity));

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

    function clear() {
        // hip = position
        // frame = position
        hix = wheeling ? hix : index;
        // clearInterval(dragtime);
        clearTimeout(wheeltime);
        cancelAnimationFrame(raf);
        cancelAnimationFrame(rak);
        listen(window, windowEvents, true);
    }

    // update(options);
    function update(options: Options) {
        // const props = [
        //     duration,
        //     gravity,
        //     axis,
        //     align,
        //     snap,
        //     clamp,
        //     gap
        // ]

        // for (let key in options) {
        //     if (Object.prototype.hasOwnProperty.call(options, key)) {
        //         // const element = options[key];
        //         console.log({ [key]: options[key] }, loop, props[key])
        //     }
        //     // props.forEach(p => p = (p !== options[key]) ? options[key] : p)
        //     // if (props[key] !== options[key]) props[key] = options[key]
        // }
        duration = options.duration;
        gravity = maxMin(2, 0, options.gravity);
        axis = options.axis;
        align = options.align;
        snap = options.snap;
        clamp = options.clamp;
        gap = options.gap;
        // loop = options.loop;

        if (index !== options.index) {
            index = indexing(node, options.index, loop);
            to(index);
        }

        if (loop !== options.loop) {
            loop = options.loop;
            replace(node, index, loop);
            to(index);
        }
    }

    function destroy() {
        clear();
        // if (PARENT) {
        RO.disconnect();
        // PARENT.onresize = null;
        listen(PARENT, parentEvents, true);
        // unlisten('touchstart', onDown);
        // unlisten('mousedown', onDown);
        // unlisten('keydown', onKeys);
        // unlisten('wheel', onWheel);
        // }
    }
    return { update, destroy, to };
}
