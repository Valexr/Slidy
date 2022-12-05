/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { button as createButton, iconPath as buttonIconPath } from './button';
import { eventListener } from './utils';
import { timer as IntervalTimer } from '../../utils/env';
import type { PluginArgs } from '../../types';
import type { Slide } from '../../../../../assets/types';

interface PlayI18NDict {
    play: string;
    stop: string;
}

interface PlayProps {
    /**
     * Slides you pass into `<Slidy slides={} />` component
     */
    slides: Slide[];
    /**
     * The i18n localization dictionary
     */
    i18n: PlayI18NDict;
    /**
     * Defines the autoplay duration time in ms
     */
    duration?: number;
    /**
     * Defines the autoplay delay time in ms
     */
    delay?: number;
}

const enum State {
    Stop,
    Resume,
    Pause,
}

export function autoplay({ slides, i18n, duration, delay }: PlayProps) {
    interface OnStateChange {
        (): void;
        current?: State;
    }

    let state = 0 as State;

    return ({ node, options, instance }: PluginArgs) => {
        const parent = node.parentElement!;

        // Set interval property that is used in button animation
        parent.style.setProperty('--slidy-autoplay-interval', duration + 'ms');

        const cb = () => {
            const next = (options.index as number) + 1;

            if (options.loop || next < slides.length) {
                state = State.Resume;
                instance.to(next);
            } else {
                state = State.Stop;
                timer.stop();
            }

            onStateChange();
        };

        const timer = IntervalTimer(cb, duration as number, delay);

        const [buttonRoot, button, path0, path1] = createButton(function onButtonClick() {
            /**
             * When we click on playing icon we expect it to stop the autoplay,
             * And because on `pointerenter` we automatically stop the autoplay, `State.Pause` also in check
             *
             * When state is `Stop`, then we want it to play
             */
            if (state === State.Pause || state === State.Resume) {
                state = State.Stop;
                timer.stop();
            } else {
                state = State.Resume;
                timer.play();
            }

            onStateChange();
        });

        const onStateChange: OnStateChange = () => {
            // no unnecessary redraws
            if (onStateChange.current === state) return;

            // remove it because animation need to start from zero
            path0.classList.remove('playing');

            // add .playing to show playing animation when needed
            if (state === State.Resume) {
                path0.classList.add('playing');
            }

            // show user the action, not state
            path1.setAttribute(
                'd',
                state === State.Resume ? buttonIconPath.pause : buttonIconPath.play
            );

            button.setAttribute('title', state === State.Resume ? i18n.stop : i18n.play);

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

        function mount() {
            parent.querySelector('.slidy-overlay')!.appendChild(buttonRoot);

            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') {
                    if (state === State.Resume) {
                        state = 2;
                        timer.pause();
                    }
                } else {
                    if (state === State.Pause) {
                        timer.resume();
                        onStateChange();
                    }
                }
            });

            button.addEventListener('pointerenter', () => {
                if (state === State.Resume) {
                    state = State.Pause;
                    timer.pause();
                    onStateChange();
                }
            });

            button.addEventListener('pointerleave', () => {
                if (state === State.Pause) {
                    state = State.Resume;
                    timer.play();
                    onStateChange();
                }
            });
        }

        node.addEventListener('index', onIndexChange);
        node.addEventListener('mount', mount);
        node.addEventListener('destroy', timer.stop);
    };
}
