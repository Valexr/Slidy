import { mergeProps, For } from 'solid-js';
import { useSlidy } from '../Slidy/Slidy';

import { generateIndexes } from '@slidy/assets/scripts/navigation';
import { format } from '@slidy/assets/scripts/utils';

import '@slidy/assets/styles/navigation.module.css';

import type { VoidComponent } from 'solid-js';
import type { Props } from './Navigation.types'

const defaultProps = {
    ordinal: false,
    vertical: false,
    limit: 7,
    siblings: 1,
};

const Navigation: VoidComponent<Props> = ($props) => {
    const props = mergeProps(defaultProps, $props);

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

    const ordinal = () => {
        return props.end - props.start + 1 > props.limit && true;
    };

    const indices = () => {
        return generateIndexes({
            current: props.current,
            start: props.start,
            end: props.end,
            limit: props.limit,
            siblings: props.siblings,
        });
    };

    return (
        <nav
            class={classNames?.nav}
            aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
            aria-label="pagination"
        >
            <For each={indices()}>
                {(item) => {
                    const active = () => props.current === item;
                    const contents = () => (item < 0 ? '…' : item);
                    const ellipsis = () => item < 0;
                    const title = () => getTitle(item);

                    return (
                        <button
                            aria-current={active() ? 'true' : undefined}
                            aria-label={title()}
                            class={classNames['nav-item']}
                            classList={{
                                active: active(),
                                ellipsis: ellipsis(),
                                ordinal: ordinal(),
                            }}
                            data-index={ellipsis() ? undefined : item - 1}
                            disabled={ellipsis()}
                            title={title()}
                        >
                            {ordinal() ? contents() : ''}
                        </button>
                    );
                }}
            </For>
        </nav>
    );
};

export default Navigation;
