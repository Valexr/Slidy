import { useClassNames } from '../Slidy/Slidy';
import { mergeProps } from 'solid-js';

import '@slidy/assets/styles/progress.module.css';

import type { VoidComponent } from 'solid-js';

interface Props {
    value: number;
    max: number;
    vertical: boolean;
}

const defaultProps: Props = {
    value: 0,
    max: 1,
    vertical: false,
};

const Progress: VoidComponent<Partial<Props>> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    const classNames = useClassNames();

    return (
        <div class={classNames.progress} classList={{ vertical: props.vertical }}>
            <span
                style={{
                    '--_slidy-progress-size': `${Math.ceil(100 / props.max)}%`,
                    '--_slidy-progress': `${Math.ceil((props.value * 100) / props.max)}%`,
                }}
            />
        </div>
    );
};

export default Progress;
