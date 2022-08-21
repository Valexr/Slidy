import type { SlidyCoreOptions } from '../../../../../assets/components/Core/Core.types';
import type { SlidyOptions } from '../../../../../assets/components/Slidy/Slidy.types';

export interface SlidyThumbOptions extends SlidyCoreOptions {
    active: number;
    background: SlidyOptions['background'];
    className: never;
    getImgSrc: SlidyOptions['getImgSrc'];
    position: never;
    slides: SlidyOptions['slides'];
}
