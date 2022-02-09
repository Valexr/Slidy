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
	controlDotsOrdinal?: boolean;
	duration?: number;
	gravity?: number;
	id?: string;
	imgSrcKey?: string;
	index?: number;
	loop?: boolean;
	position?: number;
	slides: Slide[];
	snap?: boolean;
	vertical?: boolean;
}

export type ChangeSlide = (index: number) => void;