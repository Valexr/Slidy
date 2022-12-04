/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { button as createButton, iconPath as buttonIconPath } from './button';
import { eventListener } from './utils';
import { autoplay as autoplayAction } from '../../../../../assets/actions';
import type { PluginArgs } from '../../types';
import type { Slide } from '../../../../../assets/types'

interface PlayI18NDict {
    play: string;
    stop: string
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
     * Defines the autoplay interval time in ms
     */
    interval: number;
    /**
     * Initial autoplay state
     */
    autoplay: boolean;
}

export function autoplay({ slides, i18n, interval, autoplay }: PlayProps) {
    /**
     * Indicate the paused autoplay.
     */
    let autoplayState = 'stop' as 'play' | 'pause' | 'stop';

    interface OnStateChange {
        (): void;
        current?: typeof autoplayState;
    }

    return ({ node, options, instance }: PluginArgs) => {
        const parent = node.parentElement!;

        // Set interval property that is used in button animation
        parent.style.setProperty('--slidy-autoplay-interval', interval + 'ms');

        const actionInstance = autoplayAction(parent, {
            interval: interval,
            status: autoplay,
        });

        const [buttonRoot, button, path0, path1] = createButton(
            function handleAutoplayControl() {
                autoplayState = autoplayState === 'stop' ? 'play' : 'stop';
                onStateChange();
                onAutoplayChange((autoplay = !autoplay));
            },
        );

        const onStateChange: OnStateChange = () => {
            if (onStateChange.current === autoplayState) return;

            path0.setAttribute('class', `slidy-autoplay-indicator ${autoplayState}`);
            path1.setAttribute('d', buttonIconPath[autoplayState]);

            button.setAttribute(
                'title',
                autoplayState === 'play' ? i18n.stop : autoplayState === 'stop' ? i18n.play : ''
            );

            onStateChange.current = autoplayState;
        };

        onStateChange();

        const onIndexChange = () => {
            if ((options.index as number) + 1 >= slides.length && !options.loop) {
                button.setAttribute('disabled', 'disabled');
            } else {
                button.removeAttribute('disabled');
            }
        };

        const onAutoplayChange = (status: typeof autoplay) => {
            actionInstance.update({ status });
        };

        const handleAutoplay = () => {
            autoplayState = 'play';
            onStateChange();

            const index = options.index as number;

            if (options.loop || index + 1 < slides.length) {
                instance.update({ index: index + 1 });
            } else {
                onAutoplayChange((autoplay = false));
            }
        };

        const handleAutoplayPause = () => {
            autoplayState = 'pause';
            onStateChange();
        };

        const handleAutoplayStop = () => {
            autoplayState = 'stop';
            autoplay = false;
            onStateChange();
        };

        const unlistenParentEvents = eventListener(parent, {
            play: handleAutoplay,
            pause: handleAutoplayPause,
            stop: handleAutoplayStop
        });

        const mount = () => {
            parent.querySelector('.slidy-overlay')!.appendChild(buttonRoot);
        };

        const destroy = () => {
            unlistenNodeEvents(), unlistenParentEvents(), actionInstance.destroy();
        };

        const unlistenNodeEvents = eventListener(node, {
            mount: mount,
            index: onIndexChange,
            destroy: destroy
        });
    };
}
