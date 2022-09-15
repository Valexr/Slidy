import { Dynamic as OriginalDynamic } from 'solid-js/web';

import type { JSX } from 'solid-js'
import type { Props } from './Dynamic.types'

const Dynamic = OriginalDynamic as (arg: Props) => JSX.Element;

export default Dynamic;
