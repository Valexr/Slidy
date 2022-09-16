import type { SlidyCoreOptions } from "../Core/Core.types";
import type { SlidyOptions } from "../Slidy/Slidy.types";

export interface SlidyThumbOptions extends Omit<SlidyCoreOptions, "axis" | "className" | "position"> {
	active: number;
	background: SlidyOptions["background"];
	className: never;
	getImgSrc: SlidyOptions["getImgSrc"];
	position: never;
	slides: SlidyOptions["slides"];
}
