declare namespace svelteHTML {
	// enhance elements
	interface IntrinsicElements {
		'my-custom-element': { someattribute: string; 'on:event': (e: CustomEvent<any>) => void };
	}
	// enhance attributes
	interface HTMLAttributes<T> {
		onresize?: (event: CustomEvent<{ ROE: ResizeObserverEntry[]; options: SlidyCoreOptions }>) => void;
	}
}
