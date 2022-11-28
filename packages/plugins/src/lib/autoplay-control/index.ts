import { button as createButton } from './button'
import { autoplay as autoplayAction } from '@slidy/assets/actions';
import type { PluginArgs } from '../../types';
import type { Slide } from '../../../../../assets/types'

function error(statement: string) {
    return new Error('@slidy/autoplay-control: ' + statement);
}

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
     * написать зачем что и откуда взять
     */
    i18n: PlayI18NDict;
    /**
     * Interval ляля
     */
    interval: number;
    /**
     * состояние типа включено или нет
     */
    autoplay: boolean
}

export function play({ slides, i18n, interval, autoplay }: PlayProps) {
    /**
     * Indicate the paused autoplay.
     */
    let autoplayState = 'stop' as 'play' | 'pause' | 'stop';

    interface OnStateChange {
        (): void;
        current?: typeof autoplayState;
    }

    return ({ node, options, instance }: PluginArgs) => {
        const parent = node.parentElement;

        if (!parent) throw error('node has no parent element');

        parent.style.setProperty('--slidy-autoplay-interval', interval + 'ms');

        const overlay = parent.querySelector('.slidy-overlay');

        if (!overlay) throw error('overlay should be enabled');

        const { update, destroy: $destroy } = autoplayAction(parent, {
            interval: interval,
            status: autoplay,
        });

        const [button_root, button, path0, path1, iconPath] = createButton();

        const onStateChange: OnStateChange = () => {
            /**
             * Если текущее состояние равно состоянию автоплея, то менять нечего.
             */
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
        }

        const onAutoplayChange = () => {
            update({ status: autoplay });
        };

        const handleAutoplay = () => {
            autoplayState = 'play';
            onStateChange();

            const index = options.index as number;

            if (options.loop) {
                instance.update({ index: index + 1 });
            } else if (index + 1 < slides.length) {
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

        const handleAutoplayControl = () => {
            autoplayState = autoplayState === 'stop' ? 'play' : 'stop';
            autoplay = !autoplay;
            onStateChange(), onAutoplayChange();
        };


        const mount = () => {
            parent.addEventListener('play', handleAutoplay);
            parent.addEventListener('pause', handleAutoplayPause);
            parent.addEventListener('stop', handleAutoplayStop);

            node.addEventListener('index', onIndexChange);

            button.addEventListener('click', handleAutoplayControl);

            overlay.appendChild(button_root);
        };

        node.addEventListener('mount', mount);

        node.addEventListener('destroy', function destroy() {
            node.removeEventListener('mount', mount);
            node.removeEventListener('destroy', destroy);
            node.removeEventListener('index', onIndexChange);

            parent.removeEventListener('play', handleAutoplay);
            parent.removeEventListener('pause', handleAutoplayPause);
            parent.removeEventListener('stop', handleAutoplayStop);

            $destroy();
        });
    };
}
