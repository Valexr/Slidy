import type { Options } from "@slidy/core";

export interface SlidyCoreOptions extends Options {
	className?: string;
	tag?: string;
	onmount?: (event: CustomEvent<SlidyCoreOptions>) => void;
	onmove?: (event: CustomEvent<{ index: number; position: number }>) => void;
	onindex?: (event: CustomEvent<{ index: number }>) => void;
	onkeys?: (event: CustomEvent<string>) => void;
	onupdate?: (event: CustomEvent<SlidyCoreOptions>) => void;
	ondestroy?: (event: CustomEvent<HTMLElement>) => void;
	onresize?: (event: CustomEvent<{ ROE: ResizeObserverEntry[]; options: SlidyCoreOptions }>) => void;
	onmutate?: (event: CustomEvent<{ ML: MutationRecord[]; options: SlidyCoreOptions }>) => void;
}

export type Actions = {
	"onresize"?: (event: CustomEvent<{ ROE: ResizeObserverEntry[]; options: SlidyCoreOptions }>) => void;
	"onmutate"?: (event: CustomEvent<{ ML: MutationRecord[]; options: SlidyCoreOptions }>) => void;
	"onmount"?: (event: CustomEvent<{ options: SlidyCoreOptions }>) => void;
	"onmove"?: (event: CustomEvent<{ index: number; position: number }>) => void;
	"onindex"?: (event: CustomEvent<{ index: number }>) => void;
	"onkeys"?: (event: CustomEvent<string>) => void;
	"onupdate"?: (event: CustomEvent<SlidyCoreOptions>) => void;
	"ondestroy"?: (event: CustomEvent<HTMLElement>) => void;
}

export type Events = {
	[Key in keyof Required<Actions> as Key extends `on:${infer Name}`
	? Name : never]: Parameters<Required<Actions>[Key]>[0]
}
