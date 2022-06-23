<script lang="ts">
	import { getContext } from "svelte/internal";
	import type { SlidyStyles } from "../Slidy/Slidy.types";

	export let alt = "";
	export let decoding: "sync" | "async" | "auto" = "auto";
	export let height: number | string | undefined = undefined;
	export let lazy = false;
	export let src = "";
	export let width: number | string | undefined = undefined;

	import "./image.module.css";

	const classNames = getContext<SlidyStyles>("classNames");
</script>

<img
	{alt}
	class="{classNames["img"]}"
	{decoding}
	loading={lazy ? "lazy" : undefined}
	{src}
	{width}
	{height}
	{...$$restProps}
/>
