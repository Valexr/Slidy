import type { SlidyOptions as Options } from "../src/components/Slidy/Slidy.types";

interface Position {
	index: number;
	position: number;
}

type SlidyEvent<T> = (event: CustomEvent<T>) => void;

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		ondestroy?: SlidyEvent<HTMLElement>;
		onindex?: SlidyEvent<Position>;
		onkeys?: (event: any) => any;
		onmount?: SlidyEvent<{
			childs: HTMLCollection,
			options: Options
		}>;
		onmove?: SlidyEvent<Position>;
		onresize?: SlidyEvent<{
			node: HTMLUListElement;
			options: Options;
		}>;
		onupdate?: SlidyEvent<Options>;
		// You can replace any with something more specific if you like
	}
}
