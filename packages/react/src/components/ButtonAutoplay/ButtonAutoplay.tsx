import { useSlidy } from '../Context';
import { noop } from '../../helpers';
import { clsx } from 'clsx';

import '@slidy/assets/styles/button-autoplay.module.css';

import type { FC, CSSProperties } from 'react';

type State = 'play' | 'pause' | 'stop';

interface Options {
    disabled: boolean;
    state: State;

    onClick: () => void;
}

const defaultProps: Options = {
    disabled: false,
    state: 'stop',
    onClick: noop,
};

const r = 15;
const stroke = 2;

const iconPath = {
    play: 'M7.61,4.61a.75.75,0,0,0-1.11.66V18.73a.75.75,0,0,0,1.11.65L20,12.66a.75.75,0,0,0,0-1.32ZM5,5.27a2.25,2.25,0,0,1,3.33-2L20.69,10a2.26,2.26,0,0,1,0,4L8.33,20.7a2.25,2.25,0,0,1-3.33-2Z',
    pause: 'M5.75,3A1.75,1.75,0,0,0,4,4.75v14.5A1.75,1.75,0,0,0,5.75,21h3.5A1.75,1.75,0,0,0,11,19.25V4.75A1.75,1.75,0,0,0,9.25,3ZM5.5,4.75a.25.25,0,0,1,.25-.25h3.5a.25.25,0,0,1,.25.25v14.5a.25.25,0,0,1-.25.25H5.75a.25.25,0,0,1-.25-.25ZM14.75,3A1.75,1.75,0,0,0,13,4.75v14.5A1.75,1.75,0,0,0,14.75,21h3.5A1.75,1.75,0,0,0,20,19.25V4.75A1.75,1.75,0,0,0,18.25,3ZM14.5,4.75a.25.25,0,0,1,.25-.25h3.5a.25.25,0,0,1,.25.25v14.5a.25.25,0,0,1-.25.25h-3.5a.25.25,0,0,1-.25-.25Z',
    stop: 'M5.75,3h12.5A2.75,2.75,0,0,1,21,5.75v12.5A2.75,2.75,0,0,1,18.25,21H5.75A2.75,2.75,0,0,1,3,18.25V5.75A2.75,2.75,0,0,1,5.75,3Zm0,1.5A1.25,1.25,0,0,0,4.5,5.75v12.5A1.25,1.25,0,0,0,5.75,19.5h12.5a1.25,1.25,0,0,0,1.25-1.25V5.75A1.25,1.25,0,0,0,18.25,4.5Z',
};

const viewBox = `0 0 ${2 * r + stroke} ${2 * r + stroke}`;
const strokeWidth = `${stroke}px`;

// prettier-ignore
const d = `M ${r + stroke / 2}, ${r + stroke / 2} m -${r}, 0 a ${r},${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 ${-2 * r},0`;

const ButtonAutoplay: FC<Options> = (props) => {
    const { i18n } = useSlidy();

    const setTitle = (state: State) => {
        if (state === 'play') {
            return i18n.stop;
        } else if (state === 'stop') {
            return i18n.play;
        }
    };

    const style = { '--slidy-autoplay-stroke-length': 2 * Math.PI * r } as CSSProperties;

    return (
        <div className="slidy-autoplay" style={style}>
            <svg viewBox={viewBox}>
                <path
                    stroke="var(--slidy-counter-bg, #4e4e4ebf)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    d={d}
                />
                <path
                    className={clsx('slidy-autoplay-indicator', props.state)}
                    stroke="var(--slidy-autoplay-indicator-accent, lightpink)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    d={d}
                />
            </svg>
            <button disabled={props.disabled} onClick={props.onClick} title={setTitle(props.state)}>
                <svg viewBox="0 0 24 24">
                    <path d={iconPath[props.state]} />
                </svg>
            </button>
        </div>
    );
};

ButtonAutoplay.defaultProps = defaultProps;

export default ButtonAutoplay;
