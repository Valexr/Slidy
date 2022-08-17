import { generateIndexes } from '@slidy/assets/components/Navigation/Navigation.helpers';
import { useClassNames } from '../Slidy/Slidy';
import { mergeProps, For } from 'solid-js';

import '@slidy/assets/components/Navigation/navigation.module.css';

import type { VoidComponent } from 'solid-js';

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

const Navigation: VoidComponent<Props> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    const classNames = useClassNames();

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
            classList={{ vertical: props.vertical }}
            aria-label="pagination"
        >
            <For each={indices()}>
                {(item) => {
                    const active = () => props.current === item;
                    const contents = () => (item < 0 ? '…' : item);
                    const ellipsis = () => item < 0;
                    const title = () => (item < 0 ? undefined : `Show to item #${item}`);

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
