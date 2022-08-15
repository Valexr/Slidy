import { createSignal, createEffect } from 'solid-js';

function themeStore() {
    const dark = globalThis.window && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [value, set] = createSignal<boolean>(dark);

    createEffect(() => {
        if (!globalThis.window) return;

        document.documentElement.setAttribute('scheme', value() ? 'dark' : 'light');
    });

    return [value, () => set((theme) => !theme)] as const;
}

export { themeStore };
