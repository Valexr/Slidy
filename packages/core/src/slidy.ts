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
    maxSize,
} from './utils';

export function slidy(
    node: HTMLElement,
    options: Options = {
        index: 0,
        gravity: 1.2,
        duration: 375,
        vertical: false,
        clamp: false,
        loop: false,
        snap: false,
        align: 'middle',
    }
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
        hix = options.index,
        gap = 0,
        gravity = 1.2;

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
    const parentEvents: [keyof HTMLElementEventMap | string, () => void][] = [
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
            console.log('mounted');
            RO.observe(node);
            MO.observe(node, moOptions);

            const styles = {
                userSelect: 'none',
                touchAction: 'pan-y',
                pointerEvents: 'none',
                willChange: 'auto',
                webkitUserSelect: 'none',
                // transitionProperty: 'transform'
            };
            css(node, styles);

            gap = find.gap(node, options.vertical);
            replace(node, options.index, options.loop);
            to(options.index);
            console.log('gap:', gap);
            gravity = options.gravity;

            if (PARENT) {
                css(PARENT, { outline: 'none' });
                listen(PARENT, parentEvents);
            }
            dispatch(node, 'mounted', { detail: childs });
        })
        .catch((error) => console.error(error));

    function move({ pos, transition = 0 }: { pos: number; transition?: number }): void {
        position += options.loop ? looping(pos) : pos;
        options.index = find.index(
            node,
            position,
            undefined,
            options.vertical,
            options.align
        );

        const direction = Math.sign(pos); // back << -1 | 1 >> forward
        const max = maxSize(node, options.vertical);
        const active = {
            pos: find.position(node, options.index, options.vertical, options.align),
            size: find.size(node, options.index, options.vertical),
        };
        const aligned = direction > 0 ? 'end' : 'start';
        // console.log('active:', active.pos, max * direction)

        function positioning(position: number) {
            // position = options.loop ? pos : maxMin(maxSize(node, options.vertical) + 300, -maxSize(node, options.vertical) - 300, pos)
            // position = !options.loop ? maxMin(max + 300, -max - 300, position) : position;

            if (!options.loop) {
                if (Math.abs(position) > max) {
                    pos = pos * 0.5;
                    options.gravity = maxMin(2, 0, options.gravity + 0.01);
                }

                if (position >= max) {
                    options.align = 'end';
                } else if (position <= -max) {
                    options.align = 'start';
                } else {
                    options.align = 'middle';
                }
            }
            // if (active.pos * direction + active.size >= max * direction) console.log('check')
            // if (!options.loop) {
            //     options.align = options.index === 0
            //         ? 'start'
            //         : options.index === node.children.length - 1
            //             ? 'end'
            //             : 'middle'
            // }
            return position;
        }

        function translate(vertical: boolean): string {
            return vertical
                ? `0, ${-positioning(position)}px, 0`
                : `${-positioning(position)}px, 0, 0`;
        }

        const styles = {
            transform: `translate3d(${translate(options.vertical)})`,
            transition: `${transition}ms`,
        };
        css(node, styles);

        dispatch(node, 'moved', { detail: { index: options.index, position } });
    }

    function looping(pos: number): number {
        const delta = hip - pos;
        const first = find.size(node, 0, options.vertical);
        const last = find.size(node, node.children.length - 1, options.vertical);
        const history = (size: number) => (size + gap) * Math.sign(-pos);

        if (hix !== options.index) {
            pos > 0 ? next(node) : prev(node);
            pos += history(pos > 0 ? first : last);
            frame = position + pos + delta;
        }
        hix = options.index;
        return pos;
    }

    let toing = false;
    function to(index: number, target: number | null = null): void {
        toing = true;
        clear();

        options.index = hix = indexing(node, index, options.loop);

        if (!options.loop) {
            options.align =
                options.index === 0
                    ? 'start'
                    : options.index === node.children.length - 1
                        ? 'end'
                        : 'middle';
            // if (options.index === 0) options.align = 'start'
            // else if (options.index === node.children.length - 1) options.align = 'end'
            // else
        }
        // hix = loop ? hix : index
        const child = find.child(node, options.index);
        const ix = options.loop
            ? find.index(node, position, child, options.vertical, options.align)
            : options.index;

        let pos = target
            ? options.snap
                ? find.target(node, target, options.vertical, options.align)
                : target
            : target === 0
                ? 0
                : find.position(node, ix, options.vertical, options.align);

        move({ pos: pos - position, transition: options.duration });
    }

    function track(timestamp: number): void {
        RAF(function track(time: number) {
            const v = (1000 * (position - frame)) / (1 + (time - timestamp));
            velocity = maxMin(2, 0, 2 - options.gravity) * v + 0.2 * velocity;
            timestamp = time;
            frame = position;
            rak = RAF(track);
        });
    }

    function scroll({ target, amplitude, duration, timestamp }: Scroll): void {
        if (amplitude) {
            RAF(function scroll(time: number) {
                const elapsed = (time - timestamp) / duration;
                const delta = amplitude * Math.exp(-elapsed);
                const dist = position - (target - delta);

                move({ pos: options.loop ? delta / 27 : -dist });
                raf = Math.abs(delta) > 0.5 ? RAF(scroll) : 0;
                if (options.loop && Math.abs(delta) < 5) to(options.index);
                else if (
                    !options.loop &&
                    Math.abs(delta) < 100 &&
                    (options.index === 0 || options.index === node.children.length - 1)
                ) {
                    to(options.index);
                }
            });
        }
    }

    function onDown(e: MouseEvent | TouchEvent): void {
        clear();
        // css(node, { pointerEvents: e.type !== 'mousedown' ? 'auto' : 'none' });
        options.gravity = gravity;

        frame = position;
        reference = coordinate(e, options.vertical);
        track(performance.now());

        listen(window, windowEvents);
    }

    function onMove(e: MouseEvent | TouchEvent): void {
        const delta =
            (reference - coordinate(e, options.vertical)) *
            maxMin(2, 0, 2 - options.gravity);
        reference = coordinate(e, options.vertical);
        move({ pos: delta });
    }

    function onUp(e: MouseEvent | TouchEvent): void {
        clear();

        const { target, amplitude } = delting(position);

        if (Math.abs(amplitude) > 10)
            Math.abs(velocity) < 100
                ? to(options.index)
                : options.clamp
                    ? to(options.index, target)
                    : scroll({
                        target,
                        amplitude,
                        duration: options.duration,
                        timestamp: performance.now(),
                    });
    }

    function delting(position: number): Delta {
        let amplitude = (2 - options.gravity) * velocity;
        const target = options.snap
            ? find.target(node, position + amplitude, options.vertical, options.align)
            : position + amplitude;
        amplitude = target - position;
        return { target, amplitude };
    }

    let wheeling = false;
    function onWheel(e: WheelEvent): void {
        clear();
        wheeling = true;

        ((Math.abs(coordinate(e, options.vertical)) &&
            Math.abs(coordinate(e, options.vertical)) < 15) ||
            e.shiftKey) &&
            e.preventDefault();

        if (e.shiftKey) to(options.index - Math.sign(e.deltaY));
        else
            move({
                pos: coordinate(e, options.vertical) * maxMin(2, 0, 2 - options.gravity),
            });
        console.log(Math.sign(e.deltaY));

        if ((options.snap || options.clamp) && !e.shiftKey)
            wheeltime = setTimeout(() => {
                to(options.index);
                wheeling = false;
                options.gravity = gravity;
            }, 100);
    }

    function onKeys(e: KeyboardEvent): void {
        if (e.key === 'ArrowLeft') {
            to(options.index - 1);
        } else if (e.key === 'ArrowRight') {
            to(options.index + 1);
        }
    }

    function onResize(e: CustomEvent): void {
        gap = find.gap(node, options.vertical);
        to(options.index);
        dispatch(node, 'resized', { detail: node });
    }

    function onMutate(e: CustomEvent): void {
        // gap = find.gap(node, options.vertical);
        // console.log(e)
    }

    function clear(): void {
        // hip = position
        // frame = position
        hix = wheeling ? hix : options.index;
        // clearInterval(dragtime);
        clearTimeout(wheeltime);
        cancelAnimationFrame(raf);
        cancelAnimationFrame(rak);
        listen(window, windowEvents, false);
    }

    // updater(options);

    function updater(opts: Options): void {
        for (const key in opts) {
            if (options[key as keyof Options] !== opts[key as keyof Options]) {
                console.log(key);
                switch (key) {
                    case 'index':
                        options[key] = indexing(node, opts[key], options.loop);
                        to(options[key]);
                        break;
                    case 'loop':
                        options[key] = opts[key];
                        replace(node, options.index, options[key]);
                        to(options.index);
                        break;
                    case 'gravity':
                        options[key] = maxMin(2, 0, opts[key]);
                        break;

                    default:
                        options[key as keyof Options] = opts[key as keyof Options];
                        break;
                }
            }
        }
        dispatch(node, 'updated', { detail: options });
    }

    function destroy(): void {
        clear();
        RO.disconnect();
        MO.disconnect();
        listen(PARENT, parentEvents, false);
    }
    return {
        update: (option) => updater({ ...options, ...option }),
        destroy,
        to,
    };
}
