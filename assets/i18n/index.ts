import type { I18NDict } from '../types';

export const i18nDefaults: I18NDict = {
    carousel: 'carousel',
    counter: '%s of %s',
    first: 'Go to the first slide',
    last: 'Go to the last slide',
    next: 'Go to the next slide',
    play: 'Start autoplay',
    prev: 'Return back to previous slide',
    slide: 'slide',
    slideN: 'Go to the slide %s',
    stop: 'Stop autoplay',
};

export const fillTemplate = (input: string, values: string[]) => {
    let result = input;
    for (const value of values) {
        result = result.replace('%s', value);
    }
    return result;
};
