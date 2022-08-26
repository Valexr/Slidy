import { useSlidy } from '../Context';
import { clsx } from 'clsx';
import { s } from '../../utils';

import '@slidy/assets/styles/progress.module.css';

import type { FC } from 'react';

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

const Progress: FC<Props> = (props) => {
    const { classNames } = useSlidy();

    const style = s({
        '--_slidy-progress-size': `${Math.ceil(100 / props.max)}%`,
        '--_slidy-progress': `${Math.ceil((props.value * 100) / props.max)}%`,
    });

    return (
        <div className={clsx(classNames.progress, props.vertical && 'vertical')}>
            <span style={style} />
        </div>
    );
};

Progress.defaultProps = defaultProps;

export default Progress;
