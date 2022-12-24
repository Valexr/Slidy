export type { PluginArgs, PluginFunc, EventMap } from '@slidy/core';

export type TimerInstace = {
    play: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
};
