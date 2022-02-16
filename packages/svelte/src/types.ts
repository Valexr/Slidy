export interface Slide {
	id?: string;
	src?: string;
	alt?: string;
	width?: string | number;
	height?: string | number;
	[key: string]: unknown;
}

export interface SlidyOptions {
	arrows?: boolean;
	align?: "start" | "middle" | "end";
	background?: boolean;
	clamp?: boolean;
	className?: string;	
	dots?: boolean;
	duration?: number;
	getImgSrc?: string;
	gravity?: number;
	id?: string;
	index?: number;
	loop?: boolean;
	position?: number;
	slides: Slide[];
	snap?: boolean;
	vertical?: boolean;
}

export type ChangeSlide = (index: number) => void;

export type GetSrc = (item: Slide) => string | undefined;