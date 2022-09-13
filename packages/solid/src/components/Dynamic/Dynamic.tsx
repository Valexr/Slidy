import { splitProps } from 'solid-js';
import { spread } from 'solid-js/web';

import type { Props } from './Dynamic.types'

const Dynamic = (props: Props) => {
    const [p, others] = splitProps(props, ['component']);

    const el = document.createElement(p.component);

    spread(el, others, false);

    return el;
};

export default Dynamic;
