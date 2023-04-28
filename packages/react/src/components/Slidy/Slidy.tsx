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
import type { FC, MouseEventHandler } from 'react';


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

const Slidy: FC<Partial<Options>> = ({
    arrows = true,
    axis = 'x',
    vertical = false,
    background = false,
    counter = true,
    clamp = 0,
    duration = 450,
    easing = (t) => t,
    getImgSrc = (item) => (item as unknown as { src: string }).src ?? '',
    getThumbSrc = (item) => (item as unknown as { src: string }).src ?? '',
    navigation = false,
    gravity = 1.2,
    indent = 2,
    loop = false,
    groups = 0,
    progress = false,
    sensity = 5,
    slides = [],
    thumbnail = false,
    index: _index = 0,
    setIndex: _setIndex,
    id,
    classNames = classNamesDefaults,
    i18n = i18nDefaults,
    plugins = [],
    overlay,
    animation,
    snap,
    onDestroy,
    onIndex,
    onKeys,
    onMount,
    onMove,
    onResize,
    onUpdate,
    children,
    arrow
}) => {
    const [index, setIndex] = useExternalState(_index, _setIndex);
    const length = slides.length;

    const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
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

    const _onIndex: Options['onIndex'] = (e) => {
        setIndex(e.detail.index);
    };

    return (
        <SlidyContext.Provider value={{ classNames: classNames, i18n: i18n }}>
            <section
                aria-roledescription={i18n.carousel}
                aria-orientation={vertical ? 'vertical' : 'horizontal'}
                className={clsx(
                    classNames?.root,
                    groups > 1 && 'groups'
                )}
                style={s({
                    '--slidy-group-items': groups,
                })}
                id={id}
                onClick={handleClick}
            >
                {(counter || isFunction(overlay)) && (
                    <div className={classNames?.overlay}>
                        {counter && (
                            <output className={classNames?.counter}>
                                {index + 1} / {length}
                            </output>
                        )}
                        {isFunction(overlay) && overlay()}
                    </div>
                )}

                <Core
                    animation={animation}
                    axis={axis}
                    clamp={clamp}
                    className={classNames?.slides}
                    duration={duration}
                    easing={easing}
                    gravity={gravity}
                    indent={indent}
                    index={index}
                    loop={loop}
                    sensity={sensity}
                    snap={snap}
                    onResize={execute(onResize)}
                    onMount={execute(onMount)}
                    onMove={execute(onMove)}
                    onIndex={execute(onIndex, _onIndex)}
                    onKeys={execute(onKeys)}
                    onUpdate={execute(onUpdate)}
                    onDestroy={execute(onDestroy)}
                    plugins={plugins}
                >
                    {slides.map((item, i) => {
                        const active = index === i;
                        const key = getImgSrc(item) ?? i;

                        const Children = children;

                        if (isFunction(Children)) {
                            return <Children key={key} {...item} />;
                        }

                        return (
                            <li
                                key={key}
                                aria-current={active ? 'true' : undefined}
                                aria-label={format(i18n.counter, i + 1, length)}
                                aria-roledescription={i18n.slide}
                                className={clsx(
                                    classNames?.slide,
                                    active && 'active',
                                    background && 'bg'
                                )}
                                role="group"
                                style={s({
                                    '--_slidy-slide-bg': background
                                        ? `url("${getImgSrc(item)}")`
                                        : undefined,
                                })}
                            >
                                {!background && (
                                    <Image {...item} src={getImgSrc(item)} />
                                )}
                            </li>
                        );
                    })}
                </Core>

                {arrows === true && (
                    [-1, 1].map(direction => (
                        <Arrow
                            key={'arrow-' + direction}
                            direction={direction}
                            index={index}
                            items={length}
                            loop={loop}
                            step={clamp > 0 ? clamp : 1}
                            vertical={vertical}
                        >
                            {!arrow && (
                                <svg className="slidy-arrow-icon" viewBox={iconChevron.viewBox}>
                                    <path d={iconChevron.path} />
                                </svg>
                            )}

                            {isFunction(arrow) && arrow()}
                        </Arrow>
                    ))
                )}

                {isFunction(arrows) && arrows()}

                {progress && (<Progress
                    value={index + 1}
                    max={length}
                    vertical={vertical}
                    onInput={(e: any) => {
                        setIndex(e.currentTarget.valueAsNumber - 1);
                    }}
                />)}

                {thumbnail === true && (
                    <Thumbnail
                        active={index}
                        background={background}
                        duration={duration}
                        easing={easing}
                        getImgSrc={getThumbSrc}
                        indent={indent}
                        index={index}
                        loop={loop}
                        sensity={sensity}
                        slides={slides}
                        onSelect={setIndex}
                    />
                )}

                {isFunction(thumbnail) && thumbnail()}

                {navigation && (
                    <Navigation current={index + 1} start={1} end={length} vertical={vertical} />
                )}
            </section>
        </SlidyContext.Provider>
    );
};

Slidy.defaultProps = defaultProps;

export { useSlidy };
export default Slidy;
