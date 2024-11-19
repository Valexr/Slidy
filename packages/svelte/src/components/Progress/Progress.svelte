<script lang="ts" module>
	import { getContext } from "svelte";
	import type { SlidyStyles } from "@slidy/assets/types";
	import "@slidy/assets/styles/progress.module.css";
</script>

<script lang="ts">
	interface $$Events {
		"input": Event & { currentTarget: EventTarget & HTMLInputElement }
	}

	let {
		value = 0,
		max = 1,
		vertical = false,
		change = (valueAsNumber: number) => valueAsNumber,
	} = $props()

	const classNames = getContext<SlidyStyles>("classNames");

	const progress = $derived(() => Math.ceil(value * 100 / max));
	const size = $derived(() => Math.ceil(100 / max));
</script>

<div
	aria-orientation={vertical ? "vertical" : "horizontal"}
	class={classNames.progress}
	style:--_slidy-progress-size="{size}%"
	style:--_slidy-progress="{progress}%"
>
	<input
		class="slidy-progress-input"
		name="slidy-progress"
		type="range"
		min="1"
		oninput={(e) => change(e.currentTarget.valueAsNumber)}
		{value}
		{max}
	/>
	<span class={classNames["progress-handle"]}></span>
</div>
