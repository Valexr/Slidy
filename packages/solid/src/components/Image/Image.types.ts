import type { JSX } from 'solid-js';

type ImgNativeAttrs = Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'class' | 'id'>;

export interface Props extends ImgNativeAttrs {
    lazy?: boolean;
    id?: string | number;
}