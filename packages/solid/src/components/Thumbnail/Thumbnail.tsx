import { mergeProps, For, Show } from 'solid-js';
import { Core, Image } from '..';
import { useSlidy } from '../Slidy/Slidy';
import { format } from '@slidy/assets/scripts/utils';
import { s } from '../../utils';

import type { Props } from './thumbnail.types';
import type { VoidComponent } from 'solid-js';

import '@slidy/assets/styles/thumbnail.module.css';

const defaultProps: Props = {
    active: 0,
    animation: undefined,
    axis: 'x',
    background: false,
    clamp: 0,
    duration: 250,
    easing: (t) => t,
    getImgSrc: (item) => (item as unknown as { src: string }).src ?? '',
    gravity: 0.75,
    indent: 0,
    index: 0,
    loop: false,
    sensity: 5,
    slides: [],
    snap: undefined,
};

const Thumbnail: VoidComponent<Partial<Props>> = ($props) => {
    const props = mergeProps(defaultProps, $props);

    const { classNames, i18n } = useSlidy();

    return (
        <Core {...props} tag="nav" className={classNames?.thumbnails}>
            <For each={props.slides}>
                {(item, i) => {
                    const active = () => props.active === i();
                    const title = () => format(i18n.slideN, i() + 1);

                    return (
                        <button
                            type="button"
                            aria-current={active() ? 'true' : undefined}
                            aria-label={title()}
                            title={title()}
                            aria-roledescription="slide"
                            class={classNames.thumbnail}
                            classList={{
                                active: active(),
                                bg: props.background,
                            }}
                            role="group"
                            style={s({
                                '--_slidy-slide-bg': props.background
                                    ? `url(${props.getImgSrc?.(item)})`
                                    : '',
                            })}
                            onClick={() => props.onSelect?.(i())}
                        >
                            <Show when={!props.background}>
                                <Image {...item} src={props.getImgSrc?.(item)} />
                            </Show>
                        </button>
                    );
                }}
            </For>
        </Core>
    );
};

export default Thumbnail;
