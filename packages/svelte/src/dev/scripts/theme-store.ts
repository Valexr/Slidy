import { writable } from "svelte/store";

function themeStore() {
	const dark = globalThis.window && window.matchMedia("(prefers-color-scheme: dark)").matches;
	const { subscribe, update } = writable<boolean>(dark);

	return {
		subscribe,
		switch: () => update(theme => !theme),
	};
}

export const darkTheme = themeStore();

darkTheme.subscribe((value) => {
	if (!globalThis.window) return;
	document.documentElement.setAttribute("scheme", value ? "dark" : "light");
});
