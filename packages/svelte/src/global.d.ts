declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onmount?: (event: any) => any;
		onmove?: (event: any) => any;
		onresize?: (event: any) => any;
		onupdate?: (event: any) => any;
		// You can replace any with something more specific if you like
	}
}
