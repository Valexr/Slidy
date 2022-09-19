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
