import { generateIndexes } from '@slidy/assets/scripts/navigation';
import { useSlidy } from '../Context';
import { format } from '@slidy/assets/scripts/utils';
import { clsx } from 'clsx';

import '@slidy/assets/styles/navigation.module.css';

import type { FC } from 'react';

interface Options {
    current: number;
    start: number;
    end: number;
    ordinal?: boolean;
    vertical: boolean;
    limit: number;
    siblings: number;
}

type Props = Pick<Options, 'start' | 'current' | 'end'> &
    Partial<Omit<Options, 'start' | 'current' | 'end'>>;

const Navigation: FC<Props> = ({ vertical = false, limit = 7, siblings = 1, start, current, end, }) => {
    const { i18n, classNames } = useSlidy();

    const getTitle = (i: number) => {
        if (i === start) {
            return i18n.first;
        } else if (i === end) {
            return i18n.last;
        } else {
            return format(i18n.slideN, i);
        }
    };

    const ordinal = end - start + 1 > limit && true;

    const indices = generateIndexes({
        current: current,
        start: start,
        end: end,
        limit: limit,
        siblings: siblings,
    });

    return (
        <nav
            className={clsx(classNames?.nav, vertical && 'vertical')}
            aria-label="pagination"
        >
            {indices.map((item, i) => {
                const active = current === item;
                const contents = item < 0 ? '…' : item;
                const ellipsis = item < 0;
                const title = getTitle(item);

                return (
                    <button
                        className={clsx(
                            classNames['nav-item'],
                            active && 'active',
                            ellipsis && 'ellipsis',
                            ordinal && 'ordinal'
                        )}
                        data-index={ellipsis ? undefined : item - 1}
                        disabled={ellipsis}
                        aria-current={active ? 'true' : undefined}
                        aria-label={title}
                        title={title}
                        key={i}
                    >
                        {ordinal ? contents : ''}
                    </button>
                );
            })}
        </nav>
    );
};

export default Navigation;
