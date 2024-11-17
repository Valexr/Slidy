import type { SlidyCoreOptions } from "../Core/Core.types";
import type { SlidyStyles, I18NDict, Slide, GetSrc } from "@slidy/assets/types";

export type { Slide } from "@slidy/assets/types";

export interface SlidyOptions extends SlidyCoreOptions {
	arrows: boolean;
	background: boolean;
	classNames: SlidyStyles;
	getImgSrc: GetSrc<Slide>;
	getThumbSrc: GetSrc<Slide>;
	groups: number;
	i18n: I18NDict;
	navigation: boolean;
	progress: boolean;
	slides: Slide[];
	thumbnail: boolean;
	counter: boolean;
	indexThumb: number
}
