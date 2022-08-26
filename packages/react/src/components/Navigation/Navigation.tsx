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
    ordinal: boolean;
    vertical: boolean;
    limit: number;
    siblings: number;
}

const defaultProps = {
    ordinal: false,
    vertical: false,
    limit: 7,
    siblings: 1,
};

type Props = Pick<Options, 'start' | 'current' | 'end'> &
    Partial<Omit<Options, 'start' | 'current' | 'end'>>;

const Navigation: FC<Props> = (props) => {
    const { i18n, classNames } = useSlidy();

    const getTitle = (i: number) => {
        if (i === props.start) {
            return i18n.first;
        } else if (i === props.end) {
            return i18n.last;
        } else {
            return format(i18n.slideN, i);
        }
    };

    const ordinal = props.end - props.start + 1 > props.limit! && true;

    const indices = generateIndexes({
        current: props.current,
        start: props.start,
        end: props.end,
        limit: props.limit!,
        siblings: props.siblings!,
    });

    return (
        <nav
            className={clsx(classNames?.nav, props.vertical && 'vertical')}
            aria-label="pagination"
        >
            {indices.map((item, i) => {
                const active = props.current === item;
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

Navigation.defaultProps = defaultProps;

export default Navigation;
