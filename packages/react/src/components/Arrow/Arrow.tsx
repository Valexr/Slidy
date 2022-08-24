import { useSlidy } from '../Context';
import { clsx } from 'clsx';

import '@slidy/assets/styles/arrow.module.css';

import type { FC, PropsWithChildren } from 'react';
import React from 'react';

interface Props {
    type: -1 | 1 | (number & Record<never, never>);
    loop: boolean;
    index: number;
    items: number;
    vertical: boolean;
}

const defaultProps: Props = {
    type: 1,
    index: 0,
    items: 0,
    vertical: false,
    loop: false,
};

const Arrow: FC<PropsWithChildren<Props>> = (props) => {
    const { classNames, i18n } = useSlidy();

    const disabled =
        props.type < 1
            ? props.index === 0 && !props.loop
            : props.index === props.items - 1 && !props.loop;

    const title = props.type < 1 ? i18n.prev : i18n.next;

    return (
        <button
            className={clsx(
                classNames.arrow,
                props.vertical && 'vertical',
                props.type < 1 && 'prev'
            )}
            disabled={disabled}
            data-step={props.type}
            aria-label={title}
            title={title}
        >
            {props.children}
        </button>
    );
};

Arrow.defaultProps = defaultProps;

export default Arrow;
