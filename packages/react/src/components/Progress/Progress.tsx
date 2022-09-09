import { useSlidy } from '../Context';
import { clsx } from 'clsx';
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

const defaultProps: Props = {
    value: 0,
    max: 1,
    vertical: false,
    onInput: noop
};

const Progress: FC<Props> = (props) => {
    const { classNames } = useSlidy();

    const progress = () => Math.ceil((props.value * 100) / props.max);
    const size = () => Math.ceil(100 / props.max);

    return (
        <div
            className={classNames.progress}
            aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
            style={s({
                '--_slidy-progress-size': size() + '%',
                '--_slidy-progress': progress() + '%',
            })}
        >
            <input
                className="slidy-progress-input"
                type="range"
                value={props.value}
                min={1}
                max={props.max}
                name="slidy-progress"
                onInput={execute(props.onInput)}
            />
            <span className={classNames['progress-handle']} />
        </div>
        // <div className={clsx(classNames.progress, props.vertical && 'vertical')}>
        //     <span style={style} />
        // </div>
    );
};

Progress.defaultProps = defaultProps;

export default Progress;
