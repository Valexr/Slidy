import { mergeProps } from 'solid-js';
import { useSlidy } from '../Slidy/Slidy';

import '@slidy/assets/styles/arrow.module.css';

import type { FlowComponent } from 'solid-js';

interface Props {
    clamp: number;
    loop?: boolean;
    index: number;
    items?: number;
    vertical: boolean;
}

const defaultProps: Props = {
    clamp: 1,
    index: 0,
    vertical: false,
};

const Arrow: FlowComponent<Props> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    const { classNames, i18n } = useSlidy();

    const type = () => props.clamp < 0;

    const disabled = () => {
        return type()
            ? props.index === 0 && !props.loop
            : props.index === props.items! - 1 && !props.loop;
    };

    const title = () => {
        return type() ? i18n.prev : i18n.next;
    };

    return (
        <button
            aria-label={title()}
            aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
            class={classNames.arrow}
            classList={{
                prev: type(),
            }}
            data-step={props.clamp}
            disabled={disabled()}
            title={title()}
        >
            {props.children}
        </button>
    );
};

export default Arrow;
