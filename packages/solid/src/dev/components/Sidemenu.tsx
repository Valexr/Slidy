import type { FlowComponent } from 'solid-js';
import type { Channel } from '../lib';
import { onMount, onCleanup } from 'solid-js';

import '@slidy/assets/styles/dev/side-menu.module.css';

interface Props {
    controlPanel: Channel<boolean>;
}

const Sidemenu: FlowComponent<Props> = (props) => {
    const controlPanel = props.controlPanel;

    const close = () => controlPanel((v) => !v);

    const handleKeydown = (event: KeyboardEvent) => {
        return event.code === 'Escape' && close();
    };

    onMount(() => addEventListener('keydown', handleKeydown));
    onCleanup(() => removeEventListener('keydown', handleKeydown));

    return (
        <aside classList={{ 'side-menu': true, open: controlPanel() }}>
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
