import { mergeProps, Show } from 'solid-js';

import '@slidy/assets/components/ButtonAutoplay/button-autoplay.module.css';

import type { Component, Accessor, Setter } from 'solid-js';

interface Options {
    active: boolean;
    status: Accessor<boolean>;
    setStatus?: Setter<boolean>;
    disabled: boolean;
}

const defaultProps: Options = {
    active: false,
    status: () => false,
    disabled: false,
};

const ButtonAutoplay: Component<Partial<Options>> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    const swap = () => props.setStatus?.((v) => !v);

    return (
        <Show when={props.active}>
            <button type="button" class="slidy-autoplay" disabled={props.disabled} onClick={swap}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d={
                            props.status()
                                ? 'M5.75,3A1.75,1.75,0,0,0,4,4.75v14.5A1.75,1.75,0,0,0,5.75,21h3.5A1.75,1.75,0,0,0,11,19.25V4.75A1.75,1.75,0,0,0,9.25,3ZM5.5,4.75a.25.25,0,0,1,.25-.25h3.5a.25.25,0,0,1,.25.25v14.5a.25.25,0,0,1-.25.25H5.75a.25.25,0,0,1-.25-.25ZM14.75,3A1.75,1.75,0,0,0,13,4.75v14.5A1.75,1.75,0,0,0,14.75,21h3.5A1.75,1.75,0,0,0,20,19.25V4.75A1.75,1.75,0,0,0,18.25,3ZM14.5,4.75a.25.25,0,0,1,.25-.25h3.5a.25.25,0,0,1,.25.25v14.5a.25.25,0,0,1-.25.25h-3.5a.25.25,0,0,1-.25-.25Z'
                                : 'M7.61,4.61a.75.75,0,0,0-1.11.66V18.73a.75.75,0,0,0,1.11.65L20,12.66a.75.75,0,0,0,0-1.32ZM5,5.27a2.25,2.25,0,0,1,3.33-2L20.69,10a2.26,2.26,0,0,1,0,4L8.33,20.7a2.25,2.25,0,0,1-3.33-2Z'
                        }
                    />
                </svg>
            </button>
        </Show>
    );
};

export default ButtonAutoplay;
