import { mergeProps } from 'solid-js';
import { useSlidy } from '../Slidy/Slidy';

import '@slidy/assets/styles/arrow.module.css';

import type { FlowComponent } from 'solid-js';

interface Props {
    type: -1 | 1 | (number & Record<never, never>);
    loop?: boolean;
    index: number;
    items?: number;
    vertical: boolean;
}

const defaultProps: Props = {
    type: 1,
    index: 0,
    vertical: false,
};

const Arrow: FlowComponent<Props> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    const { classNames, i18n } = useSlidy();

    const disabled = () => {
        return props.type < 1
            ? props.index === 0 && !props.loop
            : props.index === props.items! - 1 && !props.loop;
    };

    const title = () => {
        return props.type < 1 ? i18n.prev : i18n.next;
    };

    return (
        <button
            aria-label={title()}
            class={classNames.arrow}
            classList={{
                vertical: props.vertical,
                prev: props.type < 0,
            }}
            data-step={props.type}
            disabled={disabled()}
            title={title()}
        >
            {props.children}
        </button>
    );
};

export default Arrow;
