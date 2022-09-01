<script lang="ts">
	import { getContext } from "svelte/internal";
	import "@slidy/assets/styles/progress.module.css";

	import type { SlidyStyles } from "../Slidy/Slidy.types";

	export let value = 0;
	export let max = 1;
	export let vertical = false;

	const classNames = getContext<SlidyStyles>("classNames");
</script>

<div 
	aria-orientation="{vertical ? "vertical" : "horizontal"}"
	class="{classNames.progress}"
>
	<span
		style:--_slidy-progress-size={`${Math.ceil(100 / max)}%`}
		style:--_slidy-progress="{Math.ceil(value * 100 / max)}%"
	/>
</div>