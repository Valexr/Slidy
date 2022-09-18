import { mergeProps } from 'solid-js';
import { useSlidy } from '../Slidy/Slidy';
import { noop } from '@slidy/assets/scripts/utils';
import { iconPause, iconPlay, iconStop } from '@slidy/assets/icons';
import { s } from '../../utils';

import '@slidy/assets/styles/button-autoplay.module.css';

import type { Props, State } from './ButtonAutoplay.types';
import type { Component } from 'solid-js';

const defaultProps: Props = {
    disabled: false,
    state: 'stop',
    onClick: noop,
};

const r = 15;
const stroke = 2;

const iconPath = {
    play: iconPlay.path,
    pause: iconPause.path,
    stop: iconStop.path,
};

const viewBox = `0 0 ${2 * r + stroke} ${2 * r + stroke}`;
const strokeWidth = `${stroke}px`;

// prettier-ignore
const d = `M ${r + stroke / 2}, ${r + stroke / 2} m -${r}, 0 a ${r},${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 ${-2 * r},0`;

const ButtonAutoplay: Component<Partial<Props>> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    const { i18n } = useSlidy();

    const getTitle = (state: State) => {
        if (state === 'play') {
            return i18n.stop;
        } else if (state === 'stop') {
            return i18n.play;
        }
    };

    return (
        <div
            class="slidy-autoplay"
            style={s({ '--slidy-autoplay-stroke-length': 2 * Math.PI * r })}
        >
            <svg viewBox={viewBox}>
                <path
                    stroke="var(--slidy-counter-bg, #4e4e4ebf)"
                    stroke-width={strokeWidth}
                    fill="none"
                    d={d}
                />
                <path
                    class={`slidy-autoplay-indicator ${props.state}`}
                    stroke="var(--slidy-autoplay-indicator-accent, lightpink)"
                    stroke-width={strokeWidth}
                    fill="none"
                    d={d}
                />
            </svg>
            <button disabled={props.disabled} onClick={props.onClick} title={getTitle(props.state)}>
                <svg viewBox="0 0 24 24">
                    <path d={iconPath[props.state]} />
                </svg>
            </button>
        </div>
    );
};

export default ButtonAutoplay;
