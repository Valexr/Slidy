<script lang="ts">
	import { slidy } from "@slidy/core";
	import type { SlidyCoreOptions } from "./Core.types";

	type $$Props = SlidyCoreOptions;

	export let animation: $$Props["animation"] = undefined;
	export let axis: $$Props["axis"] = "x";
	export let clamp = 0;
	export let className = "";
	export let duration = 450;
	export let easing: $$Props["easing"] = (t: number): number => t;
	export let gravity = 1.2;
	export let indent: $$Props["indent"] = 2;
	export let index = 0;
	export let loop = false;
	export let plugins: $$Props["plugins"] = [];
	export let position = 0;
	export let sensity = 5;
	export let snap: $$Props["snap"] = undefined;
	export let tag = "ol";
</script>

<svelte:element
	class="{className}"
	aria-live="polite"
	tabindex="0"
	this={tag}
	use:slidy={{
		animation,
		axis,
		clamp,
		duration,
		easing,
		gravity,
		indent,
		index,
		loop,
		plugins,
		sensity,
		snap
	}}
	on:destroy
	on:index
	on:index={e => index = e.detail.index}
	on:keys
	on:mount
	on:move
	on:move={e => position = e.detail.position}
	on:resize
	on:update
>
	<slot />
</svelte:element>
