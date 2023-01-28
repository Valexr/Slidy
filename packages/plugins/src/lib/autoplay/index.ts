/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { button as createButton, iconPath } from './button';
import { eventListener, eql } from './utils';
import { timer as IntervalTimer } from './timer';
import type { AutoplayPluginFunc, PlayI18NDict } from './types';

const i18nDefaults: PlayI18NDict = {
    play: 'Start autoplay',
    stop: 'Stop autoplay',
}

const enum State {
    Play,
    Stop,
    Pause,
}

/**
 * Since the autoplay button and slidy overlay are in different layers, it is necessary to know the correct position of the mouse to process the action more correctly
 */
const enum PreviousMouseLocation {
    Button,
    Node,
    Else,
}

const enum CurrentMouseLocation {
    Button,
    Node,
    Else,
}

/**
 * Function to make ui changes
 */
interface OnStateChange {
    (): void;
    current?: State;
}

/**
 * Used in button icon.
 * Stated are reversed, because we need to show the action, and not the state
 */
const D_STATE_MAP = {
    [State.Play]: 'pause',
    [State.Stop]: 'play',
    [State.Pause]: 'stop',
} as const;

export const autoplay: AutoplayPluginFunc = ({ i18n = i18nDefaults, duration = 2500, delay = 0, autoplay = false, target } = {}) => {
    let state = State.Stop;

    const I18N_STATE_MAP = {
        [State.Play]: i18n.stop,
        [State.Stop]: i18n.play,
        [State.Pause]: i18n.stop,
    }

    return ({ node, options, instance }) => {
        const slides = node.childElementCount;

        const cb = () => {
            const next = (options.index as number) + 1;

            if (options.loop || next < slides) {
                state = State.Play;
                onStateChange();
                instance.to(next);
            } else {
                timer.stop();
            }
        };

        const [autoplayButton, button, icon] = createButton(() => {
            /**
             * When we click on playing icon we expect it to stop the autoplay,
             * And because on `pointerenter` we automatically stop the autoplay, `State.Pause` also in check
             *
             * When state is `Stop`, then we want it to play
             */
            if (eql(state, State.Pause, State.Play)) {
                timer.stop();
            } else {
                timer.play();
            }

            onStateChange();
        });

        const timer = IntervalTimer(cb, {
            set state(value: State) {
                state = value;
                onStateChange();
            },
            delay: delay,
            interval: duration,
            animation: autoplayButton.animation
        });

        if (!target) {
            node.insertAdjacentElement('afterend', autoplayButton);
        } else if (typeof target === 'string') {
            document.querySelector(target)!.appendChild(autoplayButton);
        } else {
            target.appendChild(autoplayButton)
        }

        autoplayButton.setDuration(duration);

        const onStateChange: OnStateChange = () => {
            if (onStateChange.current === state) return;

            button.setAttribute('title', I18N_STATE_MAP[state]);
            icon.setAttribute('d', iconPath[D_STATE_MAP[state]]);

            onStateChange.current = state;
        };

        onStateChange();

        const onIndexChange = () => {
            const next = (options.index as number) + 1;

            if (options.loop || next < slides) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', 'disabled');
                timer.stop();
            }

            onStateChange();
        };

        const onPointerEnter = () => {
            if (state === State.Play) {
                timer.pause();
            }
        };

        const onPointerLeave = () => {
            if (state === State.Pause) {
                timer.play();
            }
        };

        // #start mouse location

        const onPointerLeaveNode = () => {
            // prettier-ignore
            if (!eql(currentMouseLocation, CurrentMouseLocation.Button, CurrentMouseLocation.Node)) {
                onPointerLeave();
            }
        };

        let previousMouseLocation = PreviousMouseLocation.Else;
        let currentMouseLocation = CurrentMouseLocation.Else;

        node.onpointerenter = () => {
            currentMouseLocation = CurrentMouseLocation.Node;

            if (previousMouseLocation !== PreviousMouseLocation.Button) {
                onPointerEnter();
            }
        };

        autoplayButton.onpointerenter = () => {
            currentMouseLocation = CurrentMouseLocation.Button;
            onPointerEnter();
        };

        autoplayButton.onpointerleave = () => {
            if (previousMouseLocation !== PreviousMouseLocation.Node) {
                onPointerLeave();
            }

            previousMouseLocation = PreviousMouseLocation.Button;
        };

        node.onpointerleave = () => {
            previousMouseLocation = PreviousMouseLocation.Node;
            currentMouseLocation = CurrentMouseLocation.Else;

            queueMicrotask(onPointerLeaveNode);
        };

        // #end

        const unregisterDocumentEventListeners = eventListener(document, {
            visibilitychange: () => {
                if (document.visibilityState === 'hidden' && state === State.Play) {
                    timer.pause();
                } else if (state === State.Pause) {
                    timer.play();
                }
            },
        });

        const unregisterNodeEventListeners = eventListener(node, {
            index: onIndexChange,
            mount: () => {
                if (autoplay) timer.play();
            },
            destroy: () => {
                timer.stop();
                unregisterDocumentEventListeners();
                unregisterNodeEventListeners();
            },
        });
    };
};

export * from './types';
