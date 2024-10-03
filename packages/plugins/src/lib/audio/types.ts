import type { PluginArgs } from '../../types';

/**
 * Events to listen to
 */
type Events = 'resize' | 'mutate' | 'mount' | 'move' | 'index' | 'keys' | 'update' | 'destroy';

/**
 * Note Block to play a melody
 */
type Note = {
    /**
     * Note frequency
     */
    freq: number;
    /**
     * Note duration
     */
    dur: number;
};

type AudioProps = Partial<Record<Events, Note[]>>;

type AudioPluginFunc = (props?: AudioProps) => (args: PluginArgs) => void;

export type { Events, Note, AudioProps, AudioPluginFunc };
