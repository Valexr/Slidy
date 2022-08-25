import { useState, useEffect, useRef } from 'react';
import { execute, isFunction, format, not, increment, useEventListener } from '../../helpers';
import { Arrow, Core, Image, Progress, Thumbnail, Navigation, ButtonAutoplay } from '..';
import { SlidyContext, useSlidy } from '../Context/Context';
import { autoplay as autoplayAction } from '@slidy/assets/actions/autoplay';
import { clsx } from 'clsx';

import { i18nDefaults } from './i18n';
import { classNames as classNamesDefaults } from './slidy.styles';

import '@slidy/assets/styles/slidy.module.css';

import type { Slide, SlidyOptions } from './Slidy.types';
import type { FC, SetStateAction, Dispatch, CSSProperties } from 'react';

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
    i18n?: SlidyOptions['i18n'];
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
    /**
     * @default undefined
     */
    snap?: SlidyOptions['snap'];
    /**
     * @default 1500
     */
    interval?: number;
    autoplay?: boolean;
    setAutoplay?: Dispatch<SetStateAction<boolean>>;
    autoplayControl?: boolean;

    index?: number;

    /**
     * Control the index from outside
     */
    setIndex?: Dispatch<SetStateAction<number>>;

    overlay?: () => JSX.Element;
    thumbnail?: (() => JSX.Element) | boolean;
    arrows?: (() => JSX.Element) | boolean;
    arrow?: () => JSX.Element;
    children?: (item: Slide) => JSX.Element;

    onResize?: (event: CustomEvent<{ ROE: ResizeObserverEntry[] }>) => void;
    onMount?: (event: CustomEvent<Options>) => void;
    onMove?: (event: CustomEvent<{ index: number; position: number }>) => void;
    onIndex?: (event: CustomEvent<{ index: number }>) => void;
    onKeys?: (event: CustomEvent<string>) => void;
    onUpdate?: (event: CustomEvent<Options>) => void;
    onDestroy?: (event: CustomEvent<HTMLElement>) => void;
}

const defaultProps: Options = {
    arrows: true,
    interval: 1500,
    axis: 'x',
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
    progress: false,
    sensity: 5,
    slides: [],
    thumbnail: false,
    index: 0,
    autoplay: false,
    autoplayControl: false,
    classNames: classNamesDefaults,
    i18n: i18nDefaults,
};

const Slidy: FC<Partial<Options>> = ($props) => {
    const props = $props as Required<Options>;

    const [index, setIndex] = isFunction(props.setIndex)
        ? [props.index, props.setIndex]
        : useState(props.index);

    const [autoplay, setAutoplay] = isFunction(props.setAutoplay)
        ? [props.autoplay, props.setAutoplay]
        : useState(props.autoplay);

    /**
     * Indicate the paused autoplay.
     */
    const [autoplayState, setAutoplayState] = useState<'play' | 'pause' | 'stop'>('stop');

    const length = props.slides.length;
    const vertical = props.axis === 'y';

    const handleClick: React.MouseEventHandler<HTMLElement> = (event): void => {
        const element = event.target as HTMLElement;

        if (element.nodeName !== 'BUTTON') return;

        if (element.dataset.index) {
            setIndex(parseInt(element.dataset.index));
            return;
        }

        if (element.dataset.step) {
            setIndex(parseInt(element.dataset.step) + index);
            return;
        }
    };

    const onIndex: Options['onIndex'] = (e) => {
        setIndex(e.detail.index);
    };

    const handleAutoplayControl = () => {
        setAutoplayState(autoplayState === 'stop' ? 'play' : 'stop');
        setAutoplay(not);
    };

    const handleAutoplay = () => {
        setAutoplayState('play');

        if (props.loop) {
            setIndex(increment);
        } else if (index + 1 < length) {
            setIndex(increment);
        } else {
            setAutoplay(false);
        }
    };

    const handleAutoplayPause = () => {
        setAutoplayState('pause');
    };

    const handleAutoplayStop = () => {
        setAutoplayState('stop');
        setAutoplay(false);
    };

    const section = useRef<HTMLElement>(null);
    const autoplayRef = useRef<null | ReturnType<typeof autoplayAction>>(null);

    useEventListener('play', handleAutoplay, section);
    useEventListener('pause', handleAutoplayPause, section);
    useEventListener('stop', handleAutoplayStop, section);

    useEffect(() => {
        if (!section.current) return;

        if (!autoplayRef.current) {
            autoplayRef.current = autoplayAction(section.current, {
                status: autoplay,
                interval: props.interval,
            });

            return;
        }

        autoplayRef.current.update({ status: autoplay });
    }, [autoplay]);

    useEffect(
        () => () => {
            autoplayRef.current?.destroy();
        },
        []
    );

    return (
        <SlidyContext.Provider value={{ classNames: props.classNames, i18n: props.i18n }}>
            <section
                aria-roledescription={props.i18n.carousel}
                className={clsx(props.classNames?.root, vertical && 'vertical')}
                style={{ '--slidy-autoplay-interval': props.interval + 'ms' } as CSSProperties}
                id={props.id}
                onClick={handleClick}
                ref={section}
            >
                {(props.counter || props.overlay) && (
                    <div className={props.classNames?.overlay}>
                        {props.counter && (
                            <output className={props.classNames?.counter}>
                                {index + 1} / {length}
                            </output>
                        )}
                        {props.autoplayControl && (
                            <ButtonAutoplay
                                state={autoplayState}
                                disabled={index + 1 >= length && !props.loop}
                                onClick={handleAutoplayControl}
                            />
                        )}
                        {isFunction(props.overlay) && props.overlay()}
                    </div>
                )}
                <Core
                    animation={props.animation}
                    axis={props.axis}
                    clamp={props.clamp}
                    className={props.classNames?.slides}
                    duration={props.duration}
                    easing={props.easing}
                    gravity={props.gravity}
                    indent={props.indent}
                    index={index}
                    loop={props.loop}
                    sensity={props.sensity}
                    snap={props.snap}
                    onResize={execute(props.onResize)}
                    onMount={execute(props.onMount)}
                    onMove={execute(props.onMove)}
                    onIndex={execute(onIndex, props.onIndex)}
                    onKeys={execute(props.onKeys)}
                    onUpdate={execute(props.onUpdate)}
                    onDestroy={execute(props.onDestroy)}
                >
                    {props.slides.map((item, i) => {
                        const active = index === i;

                        return (
                            <li
                                key={props.getImgSrc(item) ?? i}
                                aria-current={active ? 'true' : undefined}
                                aria-label={format(props.i18n.counter, i + 1, length)}
                                aria-roledescription={props.i18n.slide}
                                className={clsx(
                                    props.classNames?.slide,
                                    active && 'active',
                                    props.background && 'bg'
                                )}
                                role="group"
                                style={
                                    {
                                        '--_slidy-slide-bg': props.background
                                            ? `url("${props.getImgSrc(item)}")`
                                            : undefined,
                                    } as CSSProperties
                                }
                            >
                                {!props.background && (
                                    <Image {...item} src={props.getImgSrc(item)} />
                                )}
                            </li>
                        );
                    })}
                </Core>
                {props.arrows === true &&
                    [-1, 1].map((type) => (
                        <Arrow
                            key={type}
                            type={type as -1 | 1}
                            index={index}
                            items={length}
                            loop={props.loop}
                            vertical={vertical}
                        >
                            {!props.arrow && (
                                <svg className="slidy-arrow-icon" viewBox="0 0 32 32">
                                    <path d="M19.56,24a.89.89,0,0,1-.63-.26L11.8,16.65a.92.92,0,0,1,0-1.27h0l7.13-7.16A.9.9,0,0,1,20.2,9.48L13.69,16l6.51,6.5a.91.91,0,0,1,0,1.26h0A.9.9,0,0,1,19.56,24Z" />
                                </svg>
                            )}

                            {isFunction(props.arrow) && props.arrow()}
                        </Arrow>
                    ))}

                {isFunction(props.arrows) && props.arrows()}

                {props.progress && <Progress value={index + 1} max={length} vertical={vertical} />}

                {props.thumbnail === true && (
                    <Thumbnail
                        active={index}
                        background={props.background}
                        duration={props.duration}
                        easing={props.easing}
                        getImgSrc={props.getThumbSrc}
                        indent={props.indent}
                        index={index}
                        loop={props.loop}
                        sensity={props.sensity}
                        slides={props.slides}
                        onSelect={setIndex}
                    />
                )}

                {isFunction(props.thumbnail) && props.thumbnail()}

                {props.navigation && (
                    <Navigation current={index + 1} start={1} end={length} vertical={vertical} />
                )}
            </section>
        </SlidyContext.Provider>
    );
};

Slidy.defaultProps = defaultProps;

export { useSlidy };
export default Slidy;
