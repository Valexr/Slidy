import React from 'react';
import { useSlidy } from '../Context';

import '@slidy/assets/styles/image.module.css';

import type { FC } from 'react';

type ImgNativeAttrs = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'class' | 'id'>;

interface Props extends ImgNativeAttrs {
    lazy?: boolean;
    id?: string | number;
}

const defaultProps: Props = {
    decoding: 'auto',
    lazy: false,
};

const Image: FC<Props> = (props) => {
    const { lazy, id, ...rest } = props;

    const { classNames } = useSlidy();

    return (
        <img
            {...rest}
            className={classNames['img']}
            id={id ? String(id) : undefined}
            loading={lazy ? 'lazy' : undefined}
        />
    );
};

Image.defaultProps = defaultProps;

export default Image;
