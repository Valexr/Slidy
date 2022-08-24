import { Core, Image } from '..';
import { format, noop } from '../../helpers';
import { useSlidy } from '../Context';
import { clsx } from 'clsx';

import type { SlidyThumbOptions } from './thumbnail.types';
import type { FC, CSSProperties } from 'react';

import '@slidy/assets/styles/thumbnail.module.css';
import React from 'react';

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

const Thumbnail: FC<Partial<Options>> = ($props) => {
    const props = $props as Options;
    const { classNames, i18n } = useSlidy();

    return (
        <Core {...props} tag="nav" className={classNames?.thumbnails}>
            {props.slides.map((item, i) => {
                const active = props.active === i;
                const title = format(i18n.slideN, i + 1);

                const style = {
                    '--_slidy-slide-bg': props.background ? `url(${props.getImgSrc(item)})` : '',
                } as CSSProperties;

                return (
                    <button
                        key={props.getImgSrc(item) ?? i}
                        type="button"
                        aria-current={active ? 'true' : undefined}
                        aria-label={title}
                        title={title}
                        aria-roledescription="slide"
                        className={clsx(
                            classNames.thumbnail,
                            active && 'active',
                            props.background && 'bg'
                        )}
                        role="group"
                        style={style}
                        onClick={() => props.onSelect(i)}
                    >
                        {!props.background && <Image {...item} src={props.getImgSrc(item)} />}
                    </button>
                );
            })}
        </Core>
    );
};

Thumbnail.defaultProps = defaultProps;

export default Thumbnail;
