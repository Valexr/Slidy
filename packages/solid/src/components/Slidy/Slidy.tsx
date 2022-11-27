import {
    Show,
    For,
    mergeProps,
    createEffect,
    createSignal,
    onCleanup,
    batch,
    untrack,
} from 'solid-js';

import { Arrow, Core, Image, Progress, Thumbnail, Navigation, ButtonAutoplay } from '..';
import { SlidyContext, useSlidy } from '../Context/Context';

import { execute, isFunction, format, not, increment } from '@slidy/assets/scripts/utils';
import { autoplay as autoplayAction } from '@slidy/assets/actions';
import { iconChevron } from '@slidy/assets/icons';

import { i18nDefaults } from './i18n';
import { classNames as classNamesDefaults } from './slidy.styles';

import '@slidy/assets/styles/slidy.module.css';

import type { Props } from './Slidy.types';
import type { Component } from 'solid-js';

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

const defaultProps: Props = {
    arrows: true,
    interval: 1500,
    axis: 'x',
    vertical: false,
    background: false,
    counter: true,
    clamp: 0,
    duration: 450,
    easing: (t) => t,
    getImgSrc: (item) => (item as unknown as { src: string }).src ?? '',
    getThumbSrc: (item) => (item as unknown as { src: string }).src ?? '',
    navigation: false,
    gravity: 1.2,
    indent: 2,
    loop: false,
    groups: 0,
    progress: false,
    sensity: 5,
    slides: [],
    thumbnail: false,
    index: () => 0,
    position: () => 0,
    autoplay: () => false,
    autoplayControl: false,
    classNames: classNamesDefaults,
    i18n: i18nDefaults,
};

const Slidy: Component<Partial<Props>> = ($props) => {
    const props = mergeProps(defaultProps as unknown as Required<Props>, $props);

    const [index, setIndex] = isFunction(props.setIndex)
        ? [props.index, props.setIndex]
        : createSignal(untrack(props.index));

    const [position, setPosition] = isFunction(props.setPosition)
        ? [props.position, props.setPosition]
        : createSignal(untrack(props.position));

    const [autoplay, setAutoplay] = isFunction(props.setAutoplay)
        ? [props.autoplay, props.setAutoplay]
        : createSignal(untrack(props.autoplay));

    /**
     * Indicate the paused autoplay.
     */
    const [autoplayState, setAutoplayState] = createSignal<'play' | 'pause' | 'stop'>('stop');

    const length = () => props.slides.length;

    const handleClick = (event: Event): void => {
        const element = event.target as HTMLElement;

        if (element.nodeName !== 'BUTTON') return;

        if (element.dataset.index) {
            setIndex(parseInt(element.dataset.index));
            return;
        }

        if (element.dataset.step) {
            setIndex(parseInt(element.dataset.step) + untrack(index));
            return;
        }
    };

    const onIndex: Props['onIndex'] = (e) => {
        Promise.resolve(e.detail.index).then(setIndex);
    };

    const onMove: Props['onMove'] = (e) => {
        setPosition(e.detail.position);
    };

    const handleAutoplay = () => {
        batch(() => {
            setAutoplayState('play');

            if (props.loop) {
                setIndex(increment);
            } else if (untrack(index) + 1 < length()) {
                setIndex(increment);
            } else {
                setAutoplay(false);
            }
        });
    };

    const handleAutoplayPause = () => {
        setAutoplayState('pause');
    };

    const handleAutoplayStop = () => {
        batch(() => {
            setAutoplayState('stop');
            setAutoplay(false);
        });
    };

    const handleAutoplayControl = () => {
        const state = untrack(autoplayState);

        batch(() => {
            setAutoplayState(state === 'stop' ? 'play' : 'stop');
            setAutoplay(not);
        });
    };

    const useAutoplay = (el: HTMLElement) => {
        const { update, destroy } = autoplayAction(el, {
            status: untrack(autoplay),
            interval: props.interval,
        });

        createEffect(() => update({ status: autoplay() }));
        onCleanup(destroy);
    };

    return (
        <SlidyContext.Provider value={{ classNames: props.classNames, i18n: props.i18n }}>
            <section
                aria-roledescription={props.i18n.carousel}
                class={props.classNames?.root}
                aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
                classList={{ groups: props.groups > 1 }}
                style={{
                    '--slidy-autoplay-interval': props.interval + 'ms',
                    '--slidy-group-items': props.groups,
                }}
                id={props.id}
                onClick={handleClick}
                // on:play={handleAutoplay}
                // on:pause={handleAutoplayPause}
                // on:stop={handleAutoplayStop}
                // ref={useAutoplay}
            >
                <Show when={props.counter || props.overlay}>
                    <div class={props.classNames?.overlay}>
                        <Show when={props.counter}>
                            <output class={props.classNames?.counter}>
                                {index() + 1} / {length()}
                            </output>
                        </Show>
                        <Show when={props.autoplayControl}>
                            <ButtonAutoplay
                                state={autoplayState()}
                                disabled={index() + 1 >= length() && !props.loop}
                                onClick={handleAutoplayControl}
                            />
                        </Show>
                        {isFunction(props.overlay) && props.overlay()}
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
                    plugins={/* @once */ props.plugins}
                    position={position()}
                    onResize={props.onResize}
                    onMount={props.onMount}
                    onMove={execute(onMove, props.onMove)}
                    onIndex={execute(onIndex, props.onIndex)}
                    onKeys={props.onKeys}
                    onUpdate={props.onUpdate}
                    onDestroy={props.onDestroy}
                    onMutate={props.onMutate}
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
                                    aria-label={format(props.i18n.counter, index() + 1, length())}
                                    aria-roledescription={props.i18n.slide}
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
                                    <Show when={!props.background}>
                                        <Image {...item} src={props.getImgSrc(item)} />
                                    </Show>
                                </li>
                            );
                        }}
                    </For>
                </Core>
                <Show
                    when={props.arrows === true}
                    fallback={isFunction(props.arrows) && props.arrows()}
                >
                    <For each={[-1, 1]}>
                        {(direction) => (
                            <Arrow
                                direction={direction}
                                index={index()}
                                items={length()}
                                loop={props.loop}
                                step={props.clamp > 0 ? props.clamp : 1}
                                vertical={props.vertical}
                            >
                                <Show
                                    when={!props.arrow}
                                    fallback={isFunction(props.arrow) && props.arrow()}
                                >
                                    <svg class="slidy-arrow-icon" viewBox={iconChevron.viewBox}>
                                        <path d={iconChevron.path} />
                                    </svg>
                                </Show>
                            </Arrow>
                        )}
                    </For>
                </Show>

                <Show when={props.progress}>
                    <Progress
                        value={index() + 1}
                        max={length()}
                        vertical={props.vertical}
                        onInput={(e) => {
                            setIndex(e.currentTarget.valueAsNumber - 1);
                        }}
                    />
                </Show>

                <Show
                    when={props.thumbnail === true}
                    fallback={isFunction(props.thumbnail) && props.thumbnail()}
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
                        onSelect={setIndex}
                    />
                </Show>
                <Show when={props.navigation}>
                    <Navigation
                        current={index() + 1}
                        start={1}
                        end={length()}
                        vertical={props.vertical}
                    />
                </Show>
            </section>
        </SlidyContext.Provider>
    );
};

export { useSlidy };
export default Slidy;
