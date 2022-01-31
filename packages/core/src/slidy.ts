import { onMounted } from './env';
import type { Delta, Options } from './types';
import {
    find,
    indexing,
    rotate,
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
    options: Options = {}
): {
    update: (options: Options) => void;
    destroy: () => void;
    to: (index: number, target?: number) => void;
} {
    let {
        gap = 0,
        index = 0,
        axis = 'x',
        loop = false,
        snap = false,
        clamp = false,
        gravity = 1.2,
        duration = 375,
        align = 'start',
        indexer = (x: number): number => x,
        scroller = (p: number): number => p,
    } = options;

    let raf: number,
        rak: number,
        velocity = 0,
        reference = 0,
        position = 0,
        frame = 0,
        // dragtime: NodeJS.Timer,
        wheeltime: number = 0,
        hip = position,
        hix = index;

    const PARENT = node.parentElement;
    // const CIX: number = Math.floor(node.children.length / 2); // node.children.length / 2 >> 1
    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
        node.dispatchEvent(new CustomEvent('resize'));
        to(index);
    });

    onMounted(node)
        .then((childs: HTMLCollection) => {
            console.log('mounted');
            node.style.userSelect = 'none';
            node.style.touchAction = 'pan-y';
            node.style.pointerEvents = 'none';
            node.style.willChange = 'auto';
            node.style.webkitUserSelect = 'none';

            // if (loop) {
            //     node.replaceChildren(...rotate(Array.from(childs), index - CIX));
            //     node.style.justifyContent = 'center';
            // }
            replace(node, index, loop);
            to(index);

            if (PARENT) {
                PARENT.addEventListener('touchstart', onDown);
                PARENT.addEventListener('mousedown', onDown);
                PARENT.addEventListener('keydown', onKeys);
                PARENT.addEventListener('wheel', onWheel);
                PARENT.oncontextmenu = () => clear();
                PARENT.style.outline = 'none';
                RO.observe(PARENT);
            }
        })
        .catch((error) => console.error(error));

    function move(pos: number, transition: number = 0) {
        position += loop ? looping(pos) : pos;
        index = find.index(node, position, undefined, axis, align, loop);

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
        const ix = loop ? find.index(node, position, child, axis, align, loop) : index;

        let pos = target
            ? snap
                ? find.target(node, target, axis, align, loop)
                : target
            : target === 0
            ? 0
            : find.position(node, ix, axis, align, loop);

        // clamp && replace(node, index, loop)
        // console.log('to:', ix, index, target, pos - position)
        move(pos - position, duration);
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

    interface Scroll {
        target: number;
        amplitude: number;
        duration: number;
        timestamp: number;
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

        window.addEventListener('touchmove', onMove);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchend', onUp);
        window.addEventListener('mouseup', onUp);
    }

    function onMove(e: MouseEvent | TouchEvent) {
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
            ? find.target(node, position + amplitude, axis, align, loop)
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
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchend', onUp);
        window.removeEventListener('mouseup', onUp);
    }

    // update(options)
    function update(options: Options) {
        duration = options.duration ?? 375;
        gravity = maxMin(2, 0, options.gravity ?? 1.2);
        axis = options.axis ?? 'x';
        align = options.align ?? 'middle';
        snap = options.snap ?? true;
        clamp = options.clamp ?? false;
        gap = options.gap ?? 0;
        // loop = options.loop ?? false;

        if (index !== options.index) {
            index = indexing(node, options.index ?? 0, loop);
            to(index);
        }

        if (loop !== options.loop) {
            loop = options.loop ?? false;
            replace(node, index, loop);
            to(index);
        }
    }

    function destroy() {
        clear();
        RO.disconnect();
        if (PARENT) {
            PARENT.onresize = null;
            PARENT.oncontextmenu = null;
            PARENT.removeEventListener('touchstart', onDown);
            PARENT.removeEventListener('mousedown', onDown);
            PARENT.removeEventListener('keydown', onKeys);
            PARENT.removeEventListener('wheel', onWheel);
        }
    }
    return { update, destroy, to };
}
