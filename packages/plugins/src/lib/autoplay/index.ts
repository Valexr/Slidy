/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { button as createButton } from './button'
import { eventListener } from './utils'
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

        const [buttonRoot, button, path0, path1, iconPath] = createButton(
            function handleAutoplayControl() {
                autoplayState = autoplayState === 'stop' ? 'play' : 'stop';
                autoplay = !autoplay;
                onStateChange(), onAutoplayChange();
            }
        );

        const onStateChange: OnStateChange = () => {
            if (onStateChange.current === autoplayState) return;
            onStateChange.current = autoplayState;

            path0.setAttribute('class', `slidy-autoplay-indicator ${autoplayState}`);
            path1.setAttribute('d', iconPath[autoplayState]);

            button.setAttribute(
                'title',
                autoplayState === 'play' ? i18n.stop : autoplayState === 'stop' ? i18n.play : ''
            );
        };

        onStateChange();

        const onIndexChange = () => {
            if ((options.index as number) + 1 >= slides.length && !options.loop) {
                button.setAttribute('disabled', 'disabled');
            } else {
                button.removeAttribute('disabled');
            }
        };

        const onAutoplayChange = () => {
            actionInstance.update({ status: autoplay });
        };

        const handleAutoplay = () => {
            autoplayState = 'play';
            onStateChange();

            const index = options.index as number;

            if (options.loop || index + 1 < slides.length) {
                instance.update({ index: index + 1 });
            } else {
                autoplay = false;
                onAutoplayChange();
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

        /**
         * Create [addEventListener, removeEventListener] pair just to type less
         */
        const [pael, prel] = eventListener(parent);
        const [nael, nrel] = eventListener(node);

        const mount = () => {
            pael('play', handleAutoplay);
            pael('pause', handleAutoplayPause);
            pael('stop', handleAutoplayStop);

            parent.querySelector('.slidy-overlay')!.appendChild(buttonRoot);
        };

        const destroy = () => {
            nrel('mount', mount);
            nrel('index', onIndexChange);
            nrel('destroy', destroy);

            prel('play', handleAutoplay);
            prel('pause', handleAutoplayPause);
            prel('stop', handleAutoplayStop);

            actionInstance.destroy();
        };

        nael('mount', mount);
        nael('index', onIndexChange);
        nael('destroy', destroy);
    };
}
