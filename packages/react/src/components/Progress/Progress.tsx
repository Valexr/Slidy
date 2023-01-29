import { useSlidy } from '../Context';
import { s } from '../../utils';
import { execute, noop } from '@slidy/assets/scripts/utils';

import '@slidy/assets/styles/progress.module.css';

import type { FC } from 'react';

interface Props {
    value: number;
    max: number;
    vertical: boolean;
    onInput: (e: InputEvent) => void;
}

const Progress: FC<Props> = ({ value = 0, max = 1, vertical = false, onInput = noop }) => {
    const { classNames } = useSlidy();

    const progress = () => Math.ceil((value * 100) / max);
    const size = () => Math.ceil(100 / max);

    return (
        <div
            className={classNames.progress}
            aria-orientation={vertical ? 'vertical' : 'horizontal'}
            style={s({
                '--_slidy-progress-size': size() + '%',
                '--_slidy-progress': progress() + '%',
            })}
        >
            <input
                className="slidy-progress-input"
                type="range"
                value={value}
                min={1}
                max={max}
                name="slidy-progress"
                onInput={execute(onInput)}
            />
            <span className={classNames['progress-handle']} />
        </div>
    );
};

export default Progress;
