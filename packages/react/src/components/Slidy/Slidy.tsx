import { execute, isFunction, format } from '@slidy/assets/scripts/utils';
import { useExternalState } from '../../hooks';
import { Arrow, Core, Image, Progress, Thumbnail, Navigation } from '..';
import { SlidyContext, useSlidy } from '../Context/Context';
import { clsx } from 'clsx';
import { s } from '../../utils';
import { iconChevron } from '@slidy/assets/icons';

import { i18nDefaults } from './i18n';
import { classNames as classNamesDefaults } from './slidy.styles';

import '@slidy/assets/styles/slidy.module.css';

import type { Options } from './Slidy.types';
import type { FC } from 'react';


const defaultProps: Options = {
    arrows: true,
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
    index: 0,
    classNames: classNamesDefaults,
    i18n: i18nDefaults,
    plugins: [],
};

const Slidy: FC<Partial<Options>> = ($props) => {
    const props = $props as Required<Options>;

    const [index, setIndex] = useExternalState(props.index, props.setIndex);

    const length = props.slides.length;

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

    return (
        <SlidyContext.Provider value={{ classNames: props.classNames, i18n: props.i18n }}>
            <section
                aria-roledescription={props.i18n.carousel}
                aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
                className={clsx(
                    props.classNames?.root,
                    props.groups > 1 && 'groups'
                )}
                style={s({
                    '--slidy-group-items': props.groups,
                })}
                id={props.id}
                onClick={handleClick}
            >
                {(props.counter || props.overlay) && (
                    <div className={props.classNames?.overlay}>
                        {props.counter && (
                            <output className={props.classNames?.counter}>
                                {index + 1} / {length}
                            </output>
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
                    plugins={props.plugins}
                >
                    {props.slides.map((item, i) => {
                        const active = index === i;
                        const key = props.getImgSrc(item) ?? i;

                        const Children = props.children;

                        if (isFunction(Children)) {
                            return <Children key={key} {...item} />;
                        }

                        return (
                            <li
                                key={key}
                                aria-current={active ? 'true' : undefined}
                                aria-label={format(props.i18n.counter, i + 1, length)}
                                aria-roledescription={props.i18n.slide}
                                className={clsx(
                                    props.classNames?.slide,
                                    active && 'active',
                                    props.background && 'bg'
                                )}
                                role="group"
                                style={s({
                                    '--_slidy-slide-bg': props.background
                                        ? `url("${props.getImgSrc(item)}")`
                                        : undefined,
                                })}
                            >
                                {!props.background && (
                                    <Image {...item} src={props.getImgSrc(item)} />
                                )}
                            </li>
                        );
                    })}
                </Core>

                {props.arrows === true && (
                    [-1, 1].map(direction => (
                        <Arrow
                            key={'arrow-' + direction}
                            direction={direction}
                            index={index}
                            items={length}
                            loop={props.loop}
                            step={props.clamp > 0 ? props.clamp : 1}
                            vertical={props.vertical}
                        >
                            {!props.arrow && (
                                <svg className="slidy-arrow-icon" viewBox={iconChevron.viewBox}>
                                    <path d={iconChevron.path} />
                                </svg>
                            )}

                            {isFunction(props.arrow) && props.arrow()}
                        </Arrow>
                    ))
                )}

                {isFunction(props.arrows) && props.arrows()}

                {props.progress && (<Progress
                    value={index + 1}
                    max={length}
                    vertical={props.vertical}
                    onInput={(e: any) => {
                        setIndex(e.currentTarget.valueAsNumber - 1);
                    }}
                />)}

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
                    <Navigation current={index + 1} start={1} end={length} vertical={props.vertical} />
                )}
            </section>
        </SlidyContext.Provider>
    );
};

Slidy.defaultProps = defaultProps;

export { useSlidy };
export default Slidy;
