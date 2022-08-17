import { mergeProps } from 'solid-js';
import { useClassNames } from '../Slidy/Slidy';

import '@slidy/assets/components/Arrow/arrow.module.css';

import type { FlowComponent } from 'solid-js';

interface Props {
    type: -1 | 1;
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

    const classNames = useClassNames();

    const disabled = () => {
        return props.type < 1
            ? props.index === 0 && !props.loop
            : props.index === props.items! - 1 && !props.loop;
    };

    const ariaLabel = () => {
        return `Go to the ${props.type < 1 ? 'previous' : 'next'} slide: #${props.index}`;
    };

    return (
        <button
            aria-label={ariaLabel()}
            class={classNames.arrow}
            classList={{
                vertical: props.vertical,
                prev: props.type < 0,
            }}
            data-step={props.type}
            disabled={disabled()}
        >
            {props.children}
        </button>
    );
};

export default Arrow;
