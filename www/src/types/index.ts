export interface Size {
	width: number;
	height: number;
}

export interface Slide extends Size {
	id: string | number;
	src: string;
	alt: string;
	[key: string]: unknown;
}
