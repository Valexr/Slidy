import { media as mediaStore, type Queries } from '@slidy/media';
export type { Queries } from '@slidy/media'

const queries = {
    xs: '(max-width: 480px)',
    sm: '(max-width: 600px)',
    md: '(max-width: 840px)',
    lg: '(max-width: 960px)',
    xl: '(max-width: 1280px)',
    xxl: '(min-width: 1281px)',
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
    mouse: '(hover: hover)',
    touch: '(hover: none)'
};

export const media = mediaStore({ queries, cookie: true });