import type { PluginArgs } from '../../types';

/**
 * What to share
 */
type ShareType = 'url';

/**
 * Where to mount the button
 */
type ShareMountTarget = HTMLElement | string | undefined;

interface ShareProps {
    type: ShareType;
    target: ShareMountTarget;
}

type SharePluginFunc = (props?: ShareProps) => (args: PluginArgs) => void;

export type { ShareType, ShareMountTarget, ShareProps, SharePluginFunc };
