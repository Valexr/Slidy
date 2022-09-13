import type { SlidyCoreOptions } from '../Core/Core.types';
import type { Props as SlidyOptions } from '../Slidy/Slidy.types';

export interface Props {
    active: number;
    animation: SlidyCoreOptions['animation'];
    axis: SlidyCoreOptions['axis'];
    background: boolean;
    clamp: number;
    duration: SlidyCoreOptions['duration'];
    easing: SlidyCoreOptions['easing'];
    getImgSrc: SlidyOptions['getImgSrc'];
    gravity: number;
    indent: number;
    index: number;
    loop: boolean;
    sensity: number;
    slides: SlidyOptions['slides'];
    snap: SlidyCoreOptions['snap'];

    onIndex?: (event: CustomEvent<{ index: number }>) => void;
    onSelect?: (index: number) => void;
}

export type SlidyThumbOptions = Props;