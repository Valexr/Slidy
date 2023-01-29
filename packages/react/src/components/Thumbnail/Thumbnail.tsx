import { Core, Image } from '..';
import { format, noop } from '@slidy/assets/scripts/utils';
import { useSlidy } from '../Context';
import { clsx } from 'clsx';
import { s } from '../../utils';

import type { SlidyThumbOptions } from './thumbnail.types';
import type { FC } from 'react';

import '@slidy/assets/styles/thumbnail.module.css';

interface Options {
    active: number;
    animation: SlidyThumbOptions['animation'];
    axis: SlidyThumbOptions['axis'];
    background: boolean;
    clamp: number;
    duration: SlidyThumbOptions['duration'];
    easing: SlidyThumbOptions['easing'];
    getImgSrc: SlidyThumbOptions['getImgSrc'];
    gravity: number;
    indent: number;
    index: number;
    loop: boolean;
    sensity: number;
    slides: SlidyThumbOptions['slides'];
    snap: SlidyThumbOptions['snap'];

    onIndex?: (event: CustomEvent<{ index: number }>) => void;
    onSelect: (index: number) => void;
}

const defaultProps: Options = {
    active: 0,
    animation: undefined,
    axis: 'x',
    background: false,
    clamp: 0,
    duration: 250,
    easing: (t) => t,
    getImgSrc: (item) => (item as unknown as { src: string }).src ?? '',
    gravity: 0.75,
    indent: 0,
    index: 0,
    loop: false,
    sensity: 5,
    slides: [],
    snap: undefined,
    onSelect: noop,
};

const Thumbnail: FC<Partial<Options>> = ({ active = 0, animation, axis = 'x', background = false, clamp = 0, duration = 250, easing = (t) => t, getImgSrc = (item) => (item as unknown as { src: string }).src ?? '', gravity = 0.75, indent = 0, index = 0, loop = false, sensity = 5, slides = [], snap = undefined, onSelect = noop, onIndex }) => {
    const { classNames, i18n } = useSlidy();

    return (
        <Core animation={animation} axis={axis} clamp={clamp} duration={duration} easing={easing} gravity={gravity} indent={indent} index={index} loop={loop} sensity={sensity} snap={snap} onIndex={onIndex} tag="nav" className={classNames?.thumbnails}>
            {slides.map((item, i) => {
                const _active = active === i;
                const title = format(i18n.slideN, i + 1);

                const style = s({
                    '--_slidy-slide-bg': background ? `url(${getImgSrc(item)})` : '',
                });

                return (
                    <button
                        key={getImgSrc(item) ?? i}
                        type="button"
                        aria-current={_active ? 'true' : undefined}
                        aria-label={title}
                        title={title}
                        aria-roledescription="slide"
                        className={clsx(
                            classNames.thumbnail,
                            _active && 'active',
                            background && 'bg'
                        )}
                        role="group"
                        style={style}
                        onClick={() => onSelect(i)}
                    >
                        {!background && <Image {...item} src={getImgSrc(item)} />}
                    </button>
                );
            })}
        </Core>
    );
};

Thumbnail.defaultProps = defaultProps;

export default Thumbnail;
