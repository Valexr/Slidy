<script lang="ts" context="module">
	import { getContext } from "svelte";
	import type { SlidyStyles } from "@slidy/assets/types";
	import "@slidy/assets/styles/image.module.css";
</script>

<script lang="ts">
	export let alt = "";
	export let decoding: "sync" | "async" | "auto" = "auto";
	export let height: number | string | undefined = undefined;
	export let lazy = false;
	export let src = "";
	export let width: number | string | undefined = undefined;

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
