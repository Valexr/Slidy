/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { button as createButton, iconPath as buttonIconPath } from './button';
import { eventListener, eql } from './utils';
import { timer as IntervalTimer } from '../../utils/env';
import type { AutoplayPluginFunc } from './types';

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

export const autoplay: AutoplayPluginFunc = ({ slides, i18n, duration, delay, autoplay }) => {
    let state = State.Stop as State;

    return ({ node, options, instance }) => {
        const parent = node.parentElement!;
        const overlay = parent.querySelector('.slidy-overlay')!;

        // Set interval property that is used in button animation
        parent.style.setProperty('--slidy-autoplay-interval', duration + 'ms');

        const cb = () => {
            const next = (options.index as number) + 1;

            if (options.loop || next < slides.length) {
                state = State.Play;
                instance.to(next);
            } else {
                state = State.Stop;
                timer.stop();
            }

            onStateChange();
        };

        const timer = IntervalTimer(cb, duration as number, delay);

        const [buttonRoot, button, path0, path1] = createButton(() => {
            /**
             * When we click on playing icon we expect it to stop the autoplay,
             * And because on `pointerenter` we automatically stop the autoplay, `State.Pause` also in check
             *
             * When state is `Stop`, then we want it to play
             */
            if (eql(state, State.Pause, State.Play)) {
                state = State.Stop;
                timer.stop();
            } else {
                state = State.Play;
                timer.play();
            }

            onStateChange();
        });

        overlay.appendChild(buttonRoot);

        const onStateChange: OnStateChange = () => {
            // avoid unnecessary redraws
            if (onStateChange.current === state) return;

            // remove it because animation need to start from zero
            path0.classList.remove('playing');
            state === State.Play && path0.classList.add('playing');

            path1.setAttribute('d', buttonIconPath[D_STATE_MAP[state]]);

            button.setAttribute('title', state === State.Play ? i18n.stop : i18n.play);

            onStateChange.current = state;
        };

        onStateChange();

        const onIndexChange = () => {
            const next = (options.index as number) + 1;

            if (options.loop || next < slides.length) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', 'disabled');
            }
        };

        const onPointerEnter = () => {
            if (state === State.Play) {
                state = State.Pause;
                timer.pause();
                onStateChange();
            }
        };

        const onPointerLeave = () => {
            if (state === State.Pause) {
                state = State.Play;
                timer.play();
                onStateChange();
            }
        };

        // #start посох гвоздь виселица

        let previousMouseLocation = PreviousMouseLocation.Else;
        let currentMouseLocation = CurrentMouseLocation.Else;

        node.onpointerenter = () => {
            currentMouseLocation = CurrentMouseLocation.Node;

            if (previousMouseLocation !== PreviousMouseLocation.Button) {
                onPointerEnter();
            }
        };

        button.onpointerenter = () => {
            currentMouseLocation = CurrentMouseLocation.Button;
            onPointerEnter();
        };

        button.onpointerleave = () => {
            if (previousMouseLocation !== PreviousMouseLocation.Node) {
                onPointerLeave();
            }

            previousMouseLocation = PreviousMouseLocation.Button;
        };

        node.onpointerleave = () => {
            previousMouseLocation = PreviousMouseLocation.Node;

            setTimeout(() => {
                if (currentMouseLocation !== CurrentMouseLocation.Button) {
                    onPointerLeave();
                }
            }, 2);
        };

        // #end

        const unregisterDocumentEventListeners = eventListener(document, {
            visibilitychange: () => {
                if (document.visibilityState === 'hidden' && state === State.Play) {
                    state = State.Pause;
                    timer.pause();
                } else if (state === State.Pause) {
                    timer.resume();
                    onStateChange();
                }
            },
        });

        const unregisterNodeEventListeners = eventListener(node, {
            index: onIndexChange,
            mount: () => {
                /**
                 * Outside of the user's desire, we will run an autoplay
                 */
                if (autoplay) {
                    setTimeout(() => {
                        state = State.Play;
                        timer.play();
                    }, delay);
                }
            },
            destroy: () => {
                timer.stop();
                unregisterDocumentEventListeners();
                unregisterNodeEventListeners();
            },
        });

        return {
            play() {
                state = State.Play;
                onStateChange();
                timer.play();
            },
            pause() {
                state = State.Pause;
                onStateChange();
                timer.pause();
            },
            stop() {
                state = State.Stop;
                onStateChange();
                timer.stop();
            },
        };
    };
};

export * from './types';
