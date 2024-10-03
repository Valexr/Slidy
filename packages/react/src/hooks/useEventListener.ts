/**
 * The `useEventListener` is authored by  https://github.com/juliencrn/usehooks-ts
 */

import { useEffect, useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';

const browser = typeof window !== 'undefined';

const useIsomorphicLayoutEffect = browser ? useLayoutEffect : useEffect;

type AnyFunction = (..._: any[]) => unknown;

interface Listenable {
    addEventListener(name: string, handler: AnyFunction): any;
    removeEventListener(name: string, handler: AnyFunction): any;
}

// prettier-ignore
const useEventListener = <T extends Listenable>(eventName: string, handler: AnyFunction, element: RefObject<T>) => {
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
