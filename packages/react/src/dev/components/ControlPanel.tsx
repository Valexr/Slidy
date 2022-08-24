import { not } from '../../helpers';

import type { FC } from 'react';
import type { Channel } from '../lib';

import '@slidy/assets/styles/dev/control-panel.module.css';

interface Options {
    clamp: Channel<boolean>;
    duration: Channel<number>;
    gravity: Channel<number>;
    width: Channel<string>;
    snap: Channel<'start' | 'center' | 'end' | undefined>;
    loop: Channel<boolean>;
    gap: Channel<number>;
}

const ControlPanel: FC<Options> = (props) => {
    return (
        <form className="controls">
            <header>
                <h2>Control Panel</h2>
            </header>
            <section>
                <header>
                    <h3>Mode</h3>
                </header>
                <fieldset className="flex-horizontal">
                    <label>
                        <input
                            type="checkbox"
                            checked={props.clamp()}
                            onChange={() => props.clamp(not)}
                        />
                        <span>Clamp</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={props.loop()}
                            onChange={() => props.loop(not)}
                        />
                        <span>Loop</span>
                    </label>
                </fieldset>
            </section>
            <section>
                <header>
                    <h3>Swipe</h3>
                </header>
                <fieldset>
                    <label>
                        <span>Duration</span>
                        <input
                            type="number"
                            value={props.duration()}
                            onInput={(e) => props.duration(e.currentTarget.valueAsNumber)}
                            size={5}
                            step="1"
                            min="100"
                            max="1000"
                        />
                    </label>
                    <label>
                        <span>Gravity</span>
                        <input
                            type="number"
                            value={props.gravity()}
                            onInput={(e) => props.gravity(e.currentTarget.valueAsNumber)}
                            size={5}
                            step="0.1"
                            min="0.1"
                            max="2"
                            width="auto"
                        />
                    </label>
                    <label>
                        <span>Align</span>
                        <select
                            onChange={(e) => {
                                const value = e.currentTarget.value;

                                props.snap(
                                    Boolean(value)
                                        ? (value as 'start' | 'center' | 'end')
                                        : undefined
                                );
                            }}
                        >
                            <option value="">unset</option>
                            <option value="start">← start</option>
                            <option value="center">center</option>
                            <option value="end">end →</option>
                        </select>
                    </label>
                </fieldset>
            </section>
            <section>
                <header>
                    <h3>Slides</h3>
                </header>
                <fieldset>
                    <label>
                        <span>Width</span>
                        <input
                            value={props.width()}
                            onInput={(e) => props.width(e.currentTarget.value)}
                            size={5}
                            width="auto"
                        />
                    </label>
                    <label>
                        <span>Gap</span>
                        <input
                            type="number"
                            value={props.gap()}
                            onInput={(e) => props.gravity(e.currentTarget.valueAsNumber)}
                            size={5}
                        />
                    </label>
                </fieldset>
            </section>
        </form>
    );
};

export default ControlPanel;
