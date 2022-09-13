import { useSlidy } from '../Slidy/Slidy';
import { mergeProps } from 'solid-js';
import { noop } from '@slidy/assets/scripts/utils';
import { s } from '../../utils';

import '@slidy/assets/styles/progress.module.css';

import type { VoidComponent } from 'solid-js';
import type { Props } from './Progress.types'

const defaultProps: Props = {
    value: 0,
    max: 1,
    vertical: false,
    onInput: noop,
};

const Progress: VoidComponent<Partial<Props>> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    const { classNames } = useSlidy();

    const progress = () => Math.ceil((props.value * 100) / props.max);
    const size = () => Math.ceil(100 / props.max);

    return (
        <div
            class={classNames.progress}
            aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
            style={s({
                '--_slidy-progress-size': size() + '%',
                '--_slidy-progress': progress() + '%',
            })}
        >
            <input
                class="slidy-progress-input"
                type="range"
                value={props.value}
                min={1}
                max={props.max}
                name="slidy-progress"
                onInput={props.onInput}
            />
            <span class={classNames['progress-handle']} />
        </div>
    );
};

export default Progress;
