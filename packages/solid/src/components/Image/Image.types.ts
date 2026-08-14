import type { JSX } from '@solidjs/web';

type ImgNativeAttrs = Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'class' | 'id'>;

export interface Props extends ImgNativeAttrs {
    lazy?: boolean;
    id?: string | number;
}
