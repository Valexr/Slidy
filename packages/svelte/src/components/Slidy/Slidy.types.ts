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
	arrows?: boolean;
	background?: boolean;
	clamp?: boolean;
	className?: string;
	dots?: boolean;
	duration?: number;
	getImgSrc?: (item: any) => string;
	gravity?: number;
	id?: string;
	index?: number;
	loop?: boolean;
	position?: number;
	slides: Slide[];
	snap?: "start" | "center" | "end";
	vertical?: boolean;
}
