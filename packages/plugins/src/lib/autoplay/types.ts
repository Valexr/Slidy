import type { PluginArgs } from '../../types';
import type { Slide } from '../../../../../assets/types';

export interface PlayI18NDict {
    play: string;
    stop: string;
}

export interface PlayProps {
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
    /**
     * Defines the autoplay state
     */
    autoplay?: boolean;
}

export interface AutoplayControls {
    /**
     * Changes the autoplay state to "play" and starts it immediately
     */
    play: () => void;
    /**
     * Changes the autoplay state to "pause" and pauses it immediately
     */
    pause: () => void;
    /**
     * Changes the autoplay state to "stop" and stops it immediately
     */
    stop: () => void;
}

export type AutoplayPluginFunc = (params: PlayProps) => (plugin: PluginArgs) => void;
