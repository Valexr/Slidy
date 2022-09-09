import { useSlidy } from '../Context';
import { clsx } from 'clsx';

import '@slidy/assets/styles/arrow.module.css';

import type { FC, PropsWithChildren } from 'react';

interface Props {
    clamp: number;
    loop: boolean;
    index: number;
    items: number;
    vertical: boolean;
}

const defaultProps: Props = {
    clamp: 1,
    index: 0,
    items: 0,
    vertical: false,
    loop: false,
};

const Arrow: FC<PropsWithChildren<Props>> = (props) => {
    const { classNames, i18n } = useSlidy();

    const type = props.clamp < 0;

    const disabled = type
        ? props.index === 0 && !props.loop
        : props.index === props.items - 1 && !props.loop;

    const title = type ? i18n.prev : i18n.next;

    return (
        <button
            aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
            className={clsx(classNames.arrow, type && 'prev')}
            disabled={disabled}
            data-step={props.clamp}
            aria-label={title}
            title={title}
        >
            {props.children}
        </button>
    );
};

Arrow.defaultProps = defaultProps;

export default Arrow;
