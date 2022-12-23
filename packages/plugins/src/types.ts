export type { PluginArgs, PluginFunc, EventMap } from '@slidy/core';

export type TimerInstace = {
    play: () => void;
    pause: () => void;
    resume: () => void | false;
    stop: () => void;
};
