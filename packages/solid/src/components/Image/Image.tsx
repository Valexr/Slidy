import { useSlidy } from '../Slidy/Slidy';
import { splitProps, mergeProps } from 'solid-js';

import '@slidy/assets/styles/image.module.css';

import type { Component } from 'solid-js';
import type { Props } from './Image.types'

const defaultProps: Props = {
    decoding: 'auto',
    lazy: false,
};

const Image: Component<Partial<Props>> = ($props) => {
    const props = mergeProps(defaultProps, $props);
    const [it, rest] = splitProps(props, ['lazy', 'id']);

    const { classNames } = useSlidy();

    return (
        <img
            {...rest}
            class={classNames['img']}
            id={it.id as string}
            loading={it.lazy ? 'lazy' : undefined}
        />
    );
};

export default Image;
