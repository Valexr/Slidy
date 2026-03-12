import type { FlowComponent, Setter } from 'solid-js';
import { onSettled } from 'solid-js';

import '@slidy/assets/styles/dev/side-menu.module.css';

interface Props {
    controlPanelVisible: boolean;
    setControlPanelVisible: Setter<boolean>;
}

const Sidemenu: FlowComponent<Props> = (props) => {
    const close = () => props.setControlPanelVisible((v) => !v);

    const handleKeydown = (event: KeyboardEvent) => {
        return event.code === 'Escape' && close();
    };

    onSettled(() => {
        addEventListener('keydown', handleKeydown);

        return () => {
            removeEventListener('keydown', handleKeydown);
        }
    });

    return (
        <aside class={{ 'side-menu': true, open: props.controlPanelVisible }}>
            <div
                class="backdrop"
                title="Close sidebar"
                aria-label="Close sidebar"
                onClick={close}
                tabindex="0"
            />
            <section class="contents">{props.children}</section>
        </aside>
    );
};

export default Sidemenu;
