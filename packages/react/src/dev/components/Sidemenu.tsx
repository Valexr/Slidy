import { not } from '@slidy/assets/scripts/utils';
import { useEventListener } from '../../hooks'
import { clsx } from 'clsx';

import type { FC, PropsWithChildren } from 'react';
import type { Channel } from '../lib';

import '@slidy/assets/styles/dev/side-menu.module.css';

interface Props {
    controlPanel: Channel<boolean>;
}

const Sidemenu: FC<PropsWithChildren<Props>> = (props) => {
    const controlPanel = props.controlPanel;

    const close = () => controlPanel(not);

    const handleKeydown = (event: KeyboardEvent) => {
        return event.code === 'Escape' && close();
    };

    useEventListener('keydown', handleKeydown, { current: window });

    return (
        <aside className={clsx('side-menu', controlPanel() && 'open')}>
            <div
                className="backdrop"
                title="Close sidebar"
                aria-label="Close sidebar"
                onClick={close}
                tabIndex={0}
            />
            <section className="contents">{props.children}</section>
        </aside>
    );
};

export default Sidemenu;
