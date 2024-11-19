import type { Options } from "@slidy/core";
import type { UIEventHandler } from "svelte/elements";

export interface SlidyCoreOptions extends Options, Events {
	className?: string;
	tag?: string;
}

export interface Events {
	onmount?: (event: CustomEvent<{ options: SlidyCoreOptions }>) => void;
	onmove?: (event: CustomEvent<{ index: number; position: number }>) => void;
	onkeys?: (event: CustomEvent<string>) => void;
	onindex?: (event: CustomEvent<{ index: number }>) => void;
	onupdate?: (event: CustomEvent<SlidyCoreOptions>) => void;
	// onresize?: (event: CustomEvent<{ ROE: ResizeObserverEntry[]; options: SlidyCoreOptions }>) => void;
	onresize?: (UIEventHandler<any>
		& ((event: CustomEvent<{ ROE: ResizeObserverEntry[]; options: SlidyCoreOptions; }>) => void))
	onmutate?: (event: CustomEvent<{ ML: MutationRecord[]; options: SlidyCoreOptions }>) => void;
	ondestroy?: (event: CustomEvent<HTMLElement>) => void;
}

// export type Events = {
// 	[Key in keyof Required<Actions> as Key extends `on:${infer Name}`
// 	? Name : never]: Parameters<Required<Actions>[Key]>[0]
// }
