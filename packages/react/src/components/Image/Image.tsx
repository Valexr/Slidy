import { useSlidy } from '../Context';
import type { FC } from 'react';

import '@slidy/assets/styles/image.module.css';

type ImgNativeAttrs = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'class' | 'id'>;

interface Props extends ImgNativeAttrs {
    lazy?: boolean;
    id?: string | number;
}

const Image: FC<Props> = ({ lazy = false, decoding = 'auto', id, ...rest }) => {
    const { classNames } = useSlidy();

    return (
        <img
            {...rest}
            className={classNames['img']}
            id={id ? String(id) : undefined}
            alt={rest.alt}
            loading={lazy ? 'lazy' : undefined}
        />
    );
};

export default Image;
