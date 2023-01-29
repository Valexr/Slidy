import { useState } from 'react';
import { isFunction } from '@slidy/assets/scripts/utils'
import type { Dispatch, SetStateAction } from 'react';

const useExternalState = <T>(state: T, setState?: Dispatch<SetStateAction<T>>) => {
  const local = useState(state);
  const out = isFunction(setState) ? [state, setState] : local;

  return out as [T, Dispatch<SetStateAction<T>>];
}

export { useExternalState }