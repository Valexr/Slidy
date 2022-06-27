import type { AnimationFunc } from "@slidy/animation";

export interface SlidyCoreOptions {
	animation?: AnimationFunc;
	clamp?: number;
	className?: string;
	duration?: number;
	easing?: (t: number) => number;
	gravity?: number;
	indent?: number;
	index?: number;
	loop?: boolean;
	position?: number;
	sensity?: number;
	snap?: "start" | "center" | "end";
	vertical?: boolean;
}