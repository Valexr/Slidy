import { Dynamic as OriginalDynamic } from 'solid-js/web';

import type { JSX } from 'solid-js'
import type { Props } from './Dynamic.types'

const Dynamic = (props: Props) => {
    return (OriginalDynamic as (arg: any) => JSX.Element)(props);
};

export default Dynamic;
