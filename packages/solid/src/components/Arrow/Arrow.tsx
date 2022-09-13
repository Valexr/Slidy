import { mergeProps } from 'solid-js';
import { useSlidy } from '../Slidy/Slidy';

import '@slidy/assets/styles/arrow.module.css';

import type { Props } from './Arrow.types'
import type { FlowComponent } from 'solid-js';

const defaultProps: Props = {
    direction: 1,
    step: 1,
    index: 0,
    vertical: false,
};

const Arrow: FlowComponent<Props> = ($props) => {
    const props = mergeProps(defaultProps, $props)

    const { classNames, i18n } = useSlidy();

    const disabled = () => {
        return (props.direction < 0)
            ? props.index === 0 && !props.loop
            : props.index === props.items! - 1 && !props.loop;
    };

    const title = () => {
        return (props.direction > 0) ? i18n.next : i18n.prev;
    };

    return (
        <button
            aria-label={title()}
            aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
            class={classNames.arrow}
            classList={{
                prev: props.direction < 1,
            }}
            data-step={props.direction * props.step}
            disabled={disabled()}
            title={title()}
        >
            {props.children}
        </button>
    );
};

export default Arrow;
