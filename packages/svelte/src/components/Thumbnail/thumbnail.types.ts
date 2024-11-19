import type { SlidyCoreOptions } from "../Core/Core.types";
import type { Slide, SlidyOptions } from "../Slidy/Slidy.types";

export interface SlidyThumbOptions extends Omit<SlidyCoreOptions, "axis" | "className" | "position" | "position" | "className"> {
	active: number;
	background: SlidyOptions<Slide>["background"];
	getImgSrc: SlidyOptions<Slide>["getImgSrc"];
	slides: SlidyOptions<Slide>["slides"];
}
