import type { AnimationFunc } from "@slidy/core";
import type { PluginFunc } from "@slidy/plugins";

export interface SlidyCoreOptions {
	animation?: AnimationFunc;
	axis: "x" | "y";
	clamp?: number;
	className?: string;
	duration?: number;
	easing?: (t: number) => number;
	gravity?: number;
	indent?: number;
	index?: number;
	loop?: boolean;
	plugins?: ReturnType<PluginFunc>[];
	position?: number;
	sensity?: number;
	snap?: "deck" | "start" | "center" | "end";
	tag?: string;
}

export type Attributes = {
	"on:resize"?: (event: CustomEvent<{ ROE: ResizeObserverEntry[]; options: SlidyCoreOptions }>) => void;
	"on:mutate"?: (event: CustomEvent<{ ML: MutationRecord[]; options: SlidyCoreOptions }>) => void;
	"on:mount"?: (event: CustomEvent<{ options: SlidyCoreOptions }>) => void;
	"on:move"?: (event: CustomEvent<{ index: number; position: number }>) => void;
	"on:index"?: (event: CustomEvent<{ index: number }>) => void;
	"on:keys"?: (event: CustomEvent<string>) => void;
	"on:update"?: (event: CustomEvent<SlidyCoreOptions>) => void;
	"on:destroy"?: (event: CustomEvent<HTMLElement>) => void;
}

export type Events = {
	[Key in keyof Required<Attributes> as Key extends `on:${infer Name}` ? Name : never]: Parameters<Required<Attributes>[Key]>[0]
}