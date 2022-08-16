import {
    createContext,
    mergeProps,
    useContext,
    createSignal,
    Show,
    For,
    createEffect,
    onCleanup,
    onMount,
} from 'solid-js';
import { classNames as classNamesDefault } from './slidy.styles';
import { clamp as clampValue } from '../../helpers';
import { execute } from '../../shared';
import { Arrow, Core, Image, Progress, Thumbnail, Navigation, ButtonAutoplay } from '..';
import { autoplay as autoplayAction } from '../../actions/autoplay';

import './slidy.module.css';

import type { Slide, SlidyOptions } from './Slidy.types';
import type { Component, JSX, Setter, Accessor } from 'solid-js';

declare module 'solid-js' {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface CustomEvents {
            play: CustomEvent;
            stop: CustomEvent;
            pause: CustomEvent;
        }
    }
}

const ClassNamesContext = createContext(classNamesDefault);

const useClassNames = () => useContext(ClassNamesContext);

interface Options {
    animation?: SlidyOptions['animation'];
    /**
     * @default 'x'
     */
    axis?: SlidyOptions['axis'];
    /**
     * @default false
     */
    background?: boolean;
    /**
     * @default true
     */
    counter?: boolean;
    /**
     * @default 0
     */
    clamp?: number;
    classNames?: SlidyOptions['classNames'];
    /**
     * @default 450
     */
    duration?: number;
    easing?: SlidyOptions['easing'];
    getImgSrc?: SlidyOptions['getImgSrc'];
    getThumbSrc?: SlidyOptions['getThumbSrc'];
    /**
     * @default false
     */
    navigation?: boolean;
    /**
     * @default 1.2
     */
    gravity?: number;
    id?: string;
    /**
     * @default 2
     */
    indent?: SlidyOptions['indent'];
    /**
     * @default false
     */
    loop?: boolean;
    /**
     * @default false
     */
    progress?: boolean;
    /**
     * @default 5
     */
    sensity?: number;
    /**
     * @default []
     */
    slides?: SlidyOptions['slides'];
    snap?: SlidyOptions['snap'];
    /**
     * @default false
     */
    autoplay?: boolean;
    /**
     * @default 1500
     */
    interval?: number;

    index: Accessor<number>;
    position: Accessor<number>;

    /**
     * Control the index from outside
     */
    setIndex?: Setter<number>;
    /**
     * Control the position from outside
     */
    setPosition?: Setter<number>;

    overlay?: () => JSX.Element;
    thumbnail?: (() => JSX.Element) | boolean;
    arrows?: (() => JSX.Element) | boolean;
    arrow?: () => JSX.Element;
    children?: (item: Slide) => JSX.Element;

    /**
     * Autoplay Play
     */
    onPlay?: () => void;
    /**
     * Autoplay Stop
     */
    onStop?: () => void;
    /**
     * Autoplay Pause
     */
    onPause?: () => void;

    onResize?: (event: CustomEvent<{ ROE: ResizeObserverEntry[] }>) => void;
    onMount?: (event: CustomEvent<Options>) => void;
    onMove?: (event: CustomEvent<{ index: number; position: number }>) => void;
    onIndex?: (event: CustomEvent<{ index: number }>) => void;
    onKeys?: (event: CustomEvent<string>) => void;
    onUpdate?: (event: CustomEvent<Options>) => void;
    onDestroy?: (event: CustomEvent<HTMLElement>) => void;
}

const defaultProps: Required<
    Omit<
        Options,
        | 'animation'
        | 'id'
        | 'snap'
        | 'setIndex'
        | 'setPosition'
        | 'overlay'
        | 'arrow'
        | 'children'
        | 'onPlay'
        | 'onStop'
        | 'onPause'
        | 'onResize'
        | 'onMount'
        | 'onMove'
        | 'onIndex'
        | 'onKeys'
        | 'onUpdate'
        | 'onDestroy'
    >
> = {
    arrows: true,
    autoplay: false,
    interval: 1500,
    axis: 'x',
    background: false,
    counter: true,
    clamp: 0,
    classNames: classNamesDefault,
    duration: 450,
    easing: (t) => t,
    getImgSrc: (item) => (item as unknown as { src: string }).src ?? '',
    getThumbSrc: (item) => (item as unknown as { src: string }).src ?? '',
    navigation: false,
    gravity: 1.2,
    indent: 2,
    loop: false,
    progress: false,
    sensity: 5,
    slides: [],
    thumbnail: false,
    index: () => 0,
    position: () => 0,
};

const Slidy: Component<Partial<Options>> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    const [index, setIndex] =
        props.setIndex instanceof Function
            ? [props.index, props.setIndex]
            : createSignal(props.index());

    const [position, setPosition] =
        props.setIndex instanceof Function
            ? [props.position, props.setPosition]
            : createSignal(props.position());

    const [autoplay, setAutoplay] = createSignal(props.autoplay);

    const length = () => props.slides.length;
    const vertical = () => props.axis === 'y';

    const goto = (slide: number): void => {
        if (typeof slide === 'number' && !Number.isNaN(slide)) {
            setIndex(clampValue(slide, 0, length() - 1));
        }
    };

    const handleClick = (event: Event): void => {
        const element = event.target as HTMLElement;

        if (element.nodeName !== 'BUTTON') return;

        if (element.dataset.index) {
            goto(parseInt(element.dataset.index));
            return;
        }

        if (element.dataset.step) {
            goto(parseInt(element.dataset.step) + index());
            return;
        }
    };

    const onIndex: Options['onIndex'] = (e) => {
        goto(e.detail.index);
    };

    const onMove: Options['onMove'] = (e) => {
        setPosition?.(e.detail.position);
    };

    const handleAutoplay = () => {
        if (props.loop) {
            setIndex((prev) => prev + 1);
        } else if (index() + 1 < props.slides.length) {
            setIndex((prev) => prev + 1);
        } else {
            setAutoplay(false);
        }
    };

    const onStop = () => setAutoplay(false);

    let section!: HTMLElement;

    onMount(() => {
        const options = {
            status: autoplay(),
            interval: props.interval,
        };

        const instance = autoplayAction(section, options);

        createEffect(() => instance.update({ status: autoplay() }));
        onCleanup(instance.destroy);
    });

    return (
        <ClassNamesContext.Provider value={props.classNames}>
            <section
                aria-roledescription="carousel"
                class={props.classNames?.root}
                classList={{ vertical: vertical() }}
                id={props.id}
                onClick={handleClick}
                ref={section}
                on:play={execute(handleAutoplay, props.onPlay)}
                on:stop={execute(onStop, props.onStop)}
                on:pause={execute(props.onPause)}
            >
                <Show when={props.counter || props.overlay}>
                    <div class={props.classNames?.overlay}>
                        <Show when={props.counter}>
                            <output class={props.classNames?.counter}>
                                {index() + 1} / {length()}
                            </output>
                        </Show>
                        <ButtonAutoplay
                            active={props.autoplay}
                            status={autoplay}
                            setStatus={setAutoplay}
                            disabled={index() + 1 >= length() && !props.loop}
                        />
                        {props.overlay instanceof Function && props.overlay()}
                    </div>
                </Show>
                <Core
                    animation={props.animation}
                    axis={props.axis}
                    clamp={props.clamp}
                    className={props.classNames?.slides}
                    duration={props.duration}
                    easing={props.easing}
                    gravity={props.gravity}
                    indent={props.indent}
                    index={index()}
                    loop={props.loop}
                    sensity={props.sensity}
                    snap={props.snap}
                    position={position()}
                    onResize={execute(props.onResize)}
                    onMount={execute(props.onMount)}
                    onMove={execute(onMove, props.onMove)}
                    onIndex={execute(onIndex, props.onIndex)}
                    onKeys={execute(props.onKeys)}
                    onUpdate={execute(props.onUpdate)}
                    onDestroy={execute(props.onDestroy)}
                >
                    <For each={props.slides}>
                        {(item, i) => {
                            const active = () => index() === i();

                            if (props.children) {
                                return props.children(item);
                            }

                            return (
                                <li
                                    aria-current={active() ? 'true' : undefined}
                                    aria-label={`${i() + 1} of ${props.slides.length}`}
                                    aria-roledescription="slide"
                                    class={props.classNames?.slide}
                                    classList={{
                                        active: active(),
                                        bg: props.background,
                                    }}
                                    role="group"
                                    style={{
                                        '--_slidy-slide-bg': props.background
                                            ? `url("${props.getImgSrc(item)}")`
                                            : undefined,
                                    }}
                                >
                                    <Image {...item} src={props.getImgSrc(item)} />
                                </li>
                            );
                        }}
                    </For>
                </Core>
                <Show
                    when={props.arrows === true}
                    fallback={typeof props.arrows === 'function' && props.arrows()}
                >
                    <For each={[-1, 1]}>
                        {(type) => (
                            <Arrow
                                type={type as -1 | 1}
                                index={index()}
                                items={length()}
                                loop={props.loop}
                                vertical={vertical()}
                            >
                                <Show
                                    when={!props.arrow}
                                    fallback={typeof props.arrow === 'function' && props.arrow()}
                                >
                                    <svg
                                        class="slidy-arrow-icon"
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M19.56,24a.89.89,0,0,1-.63-.26L11.8,16.65a.92.92,0,0,1,0-1.27h0l7.13-7.16A.9.9,0,0,1,20.2,9.48L13.69,16l6.51,6.5a.91.91,0,0,1,0,1.26h0A.9.9,0,0,1,19.56,24Z" />
                                    </svg>
                                </Show>
                            </Arrow>
                        )}
                    </For>
                </Show>

                <Show when={props.progress}>
                    <Progress value={index() + 1} max={length()} vertical={vertical()} />
                </Show>

                <Show
                    when={props.thumbnail === true}
                    fallback={typeof props.thumbnail === 'function' && props.thumbnail()}
                >
                    <Thumbnail
                        active={index()}
                        background={props.background}
                        duration={props.duration}
                        easing={props.easing}
                        getImgSrc={props.getThumbSrc}
                        indent={props.indent}
                        index={index()}
                        loop={props.loop}
                        sensity={props.sensity}
                        slides={props.slides}
                        onSelect={(index) => {
                            goto(index);
                        }}
                    />
                </Show>
                <Show when={props.navigation}>
                    <Navigation
                        current={index() + 1}
                        start={1}
                        end={length()}
                        vertical={vertical()}
                    />
                </Show>
            </section>
        </ClassNamesContext.Provider>
    );
};

export { useClassNames };
export default Slidy;
