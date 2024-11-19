<script lang="ts" module>
	import { slidy } from "@slidy/core";
	import type { Snippet } from "svelte";
	import type { Action } from "svelte/action";
	import type { SlidyCoreOptions, Events } from "./Core.types";
</script>

<script lang="ts">
	let  {
		animation = undefined,
		axis = "x",
		clamp = 0,
		className = "",
		duration = 450,
		easing = (t) => t,
		gravity = 1.2,
		indent = 2,
		index = 0,
		loop = false,
		plugins = [],
		position = 0,
		sensity = 5,
		snap = undefined,
		tag = "ol"	,
		children,
		onmount, onkeys, onresize, onupdate, ondestroy,
		onindex = e => index = e.detail.index,
		onmove = e => position = e.detail.position
	}: SlidyCoreOptions & { children: Snippet } = $props();

	const action: Action<HTMLElement, SlidyCoreOptions, Events> = slidy
</script>

<svelte:element
	class="{className}"
	aria-live="polite"
	role="listbox"
	tabindex="0"
	this={tag}
	use:action={{
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
	{onmount}
	{onkeys}
	{onupdate}
	{onresize}
	{ondestroy}
	{onindex}
	{onmove}
>
	{@render children?.()}
</svelte:element>
