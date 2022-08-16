import type { SlidyCoreOptions } from "../Core/Core.types";
import type { SlidyOptions } from "../Slidy/Slidy.types";

export interface SlidyThumbOptions extends SlidyCoreOptions {
	active: number;
	background: SlidyOptions["background"];
	className: never;
	getImgSrc: SlidyOptions["getImgSrc"];
	position: never;
	slides: SlidyOptions["slides"];
}