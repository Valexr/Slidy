<script lang="ts">
	import { getContext } from "svelte/internal";
	import type { SlidyStyles } from "@slidy/assets/types";
	import "@slidy/assets/styles/progress.module.css";

	export let value = 0;
	export let max = 1;
	export let vertical = false;

	const classNames = getContext<SlidyStyles>("classNames");

	$: progress = Math.ceil(value * 100 / max);
	$: size = Math.ceil(100 / max);
</script>

<div 
	aria-orientation="{vertical ? "vertical" : "horizontal"}"
	class="{classNames.progress}"
	style:--_slidy-progress-size="{size}%"
	style:--_slidy-progress="{progress}%"
>
	<input
		class="slidy-progress-input"
		type="range"
		{value}
		min="{1}"
		{max}
		name="slidy-progress"
		on:input
	/>
	<span
		class="{classNames["progress-handle"]}"
	/>	
</div>