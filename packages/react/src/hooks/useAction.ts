import { useEffect, useRef } from 'react';
import type { DependencyList, MutableRefObject } from 'react';

interface ActionInstance<T> {
    destroy(): void;
    update(options: T): void;
}

type Action<T> = (target: HTMLElement, initial: T) => ActionInstance<T>;

// prettier-ignore
const useAction = <T, K extends HTMLElement | null>(action: Action<T>, options: T, target: MutableRefObject<K>, dependencies: DependencyList) => {
  const instance = useRef<null | ActionInstance<T>>(null);

  useEffect(
    () => {
      if (!target.current) return;

      if (!instance.current) {
        instance.current = action(target.current, options);

        return;
      }

      instance.current.update(options);
    },
    dependencies
  );

  useEffect(
    () => instance.current?.destroy,
    []
  );
}

export { useAction };
