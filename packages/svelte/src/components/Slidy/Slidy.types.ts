import type { AnimationFunc } from "@slidy/animation";

/**
 * Common Image interface.
 */
export interface Slide {
	id?: string | number;
	src?: string;
	alt?: string;
	width?: string | number;
	height?: string | number;
	[key: string]: unknown;
}

export type GetSrc<T> = (item: T) => string;

export interface SlidyOptions {
	animation?: AnimationFunc; 
	arrows?: boolean;
	background?: boolean;
	clamp?: number;
	className?: string;
	dots?: boolean;
	duration?: number;
	easing?: (t: number) => number;
	getImgSrc?: (item: any) => string;
	getThumbSrc?: (item: any) => string;
	gravity?: number;
	id?: string;
	indent?: number;
	index?: number;
	loop?: boolean;
	position?: number;
	progress?: boolean;
	slides: Slide[];
	snap?: "start" | "center" | "end";
	thumbnail?: boolean;
	vertical?: boolean;
}
