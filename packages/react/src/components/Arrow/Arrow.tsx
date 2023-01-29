import { useSlidy } from '../Context';
import { clsx } from 'clsx';

import '@slidy/assets/styles/arrow.module.css';

import type { FC, PropsWithChildren } from 'react';

interface Props {
    direction: number;
    step: number;
    loop?: boolean;
    index: number;
    items?: number;
    vertical: boolean;
}

const Arrow: FC<PropsWithChildren<Props>> = ({ direction = 1, step = 1, index = 0, items = 0, vertical = false, loop = false, children }) => {
    const { classNames, i18n } = useSlidy();

    const disabled = direction < 0
        ? index === 0 && !loop
        : index === items - 1 && !loop;

    const title = direction > 0 ? i18n.prev : i18n.next;

    return (
        <button
            aria-label={title}
            aria-orientation={vertical ? 'vertical' : 'horizontal'}
            className={clsx(classNames.arrow, direction < 1 && 'prev')}
            data-step={direction * step}
            disabled={disabled}
            title={title}
        >
            {children}
        </button>
    );
};

export default Arrow;
