<script lang="ts">
	import { getContext } from "svelte/internal";
	import type { SlidyStyles } from "../Slidy/Slidy.types";

	export let src = "";
	export let width: number | string | undefined = undefined;
	export let height: number | string | undefined = undefined;
	export let alt = "";
	export let lazy = false;
	export let style = "";
	export let className = "";

	import "./image.module.css";

	const classNames = getContext<SlidyStyles>("classNames");
</script>

<img
	{alt}
	class="{classNames["img"]} {className}"
	loading={lazy ? "lazy" : undefined}
	{src}
	{width}
	{height}
	{style}
	{...$$restProps}
/>
