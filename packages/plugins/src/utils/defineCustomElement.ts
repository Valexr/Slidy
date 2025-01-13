import { isBrowser } from './isBrowser'

const defineCustomElement = <T extends CustomElementConstructor>(name: string, get: () => T) => {
    if (!isBrowser) {
        return class { } as unknown as T;
    }

    const Class = get();

    customElements.define(name, Class);

    return Class;
}

export { defineCustomElement }