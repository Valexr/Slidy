import { useSlidy } from '../Slidy/Slidy';
import { omit, merge } from 'solid-js';

import '@slidy/assets/styles/image.module.css';

import type { Component } from 'solid-js';
import type { Props } from './Image.types';

const defaultProps: Props = {
    decoding: 'auto',
    lazy: false,
};

const Image: Component<Partial<Props>> = (rawProps) => {
    const props = merge(defaultProps, rawProps);
    const rest = omit(props, 'lazy', 'id');

    const { classNames } = useSlidy();

    return (
        <img
            {...rest}
            class={classNames['img']}
            id={props.id as string}
            loading={props.lazy ? 'lazy' : undefined}
        />
    );
};

export default Image;
