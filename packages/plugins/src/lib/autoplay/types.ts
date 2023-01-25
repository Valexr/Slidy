import type { PluginArgs } from '../../types';

export interface PlayI18NDict {
    play: string;
    stop: string;
}

export interface PlayProps {
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
     * Defines the autoplay state - `Idle` or `Running`
     * @default false
     */
    autoplay?: boolean;
}

export type AutoplayPluginFunc = (params: PlayProps) => (plugin: PluginArgs) => void;
