import { splitProps } from 'solid-js';
import { spread } from 'solid-js/web';

interface Options {
    component: string;
}

type Props = Options & Record<string, unknown>;

const Dynamic = (props: Props) => {
    const [p, others] = splitProps(props, ['component']);

    const el = document.createElement(p.component);

    spread(el, others, false);

    return el;
};

export default Dynamic;
