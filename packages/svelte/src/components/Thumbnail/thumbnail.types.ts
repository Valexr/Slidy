import type { SlidyCoreOptions } from "../Core/Core.types";
import type { SlidyOptions } from "../Slidy/Slidy.types";

export interface SlidyThumbOptions extends Omit<SlidyCoreOptions, "axis" | "className" | "position" | "position" | "className"> {
	active: number;
	background: SlidyOptions["background"];
	getImgSrc: SlidyOptions["getImgSrc"];
	slides: SlidyOptions["slides"];
}
