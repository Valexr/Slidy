/**
 * credits: https://github.com/juliencrn/usehooks-ts
 *
 * @todo: better credits
 */

import { useEffect, useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';

const browser = typeof window !== 'undefined';

const useIsomorphicLayoutEffect = browser ? useLayoutEffect : useEffect;

/**
 * No type-safety here!
 */
type AnyFunction = (...args: any[]) => unknown;

// prettier-ignore
const useEventListener = <T extends HTMLElement>(eventName: string, handler: AnyFunction, element: RefObject<T>) => {
    const savedHandler = useRef(handler);

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const target = element.current!;

        const eventListener: typeof handler = (event) => savedHandler.current(event);

        target.addEventListener(eventName, eventListener);

        return () => {
            target.removeEventListener(eventName, eventListener);
        }
    }, [eventName, element])
}

export { useEventListener };
