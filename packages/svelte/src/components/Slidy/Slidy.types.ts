import type { SlidyCoreOptions } from "../Core/Core.types";
import type { SlidyStyles, I18NDict, Slide, GetSrc } from "@slidy/assets/types";

export interface SlidyOptions extends SlidyCoreOptions {
	arrows?: boolean;
	autoplay?: boolean;
	autoplayControl?: boolean;
	background?: boolean;
	classNames: SlidyStyles;
	getImgSrc: GetSrc<Slide>;
	getThumbSrc: GetSrc<Slide>;
	groups?: number;
	i18n: I18NDict;
	interval?: number;
	navigation?: boolean;
	progress?: boolean;
	slides: Slide[];
	thumbnail?: boolean;
}
