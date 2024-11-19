<script lang="ts" module>
	import { getContext } from "svelte";
	import type { SlidyStyles } from "@slidy/assets/types";
	import "@slidy/assets/styles/image.module.css";
</script>

<script lang="ts">
	let {
		alt = "",
		decoding = "auto",
		height = undefined,
		lazy = false,
		src = "",
		width = undefined,
	}: Partial<{
		alt: string,
		decoding: "sync" | "async" | "auto" ,
		height: number | string | undefined,
		lazy: boolean,
		src: string,
		width: number | string | undefined
	}> = $props()

	const classNames = getContext<SlidyStyles>("classNames");
</script>

<img
	{alt}
	{src}
	{width}
	{height}
	{decoding}
	class={classNames["img"]}
	loading={lazy ? "lazy" : undefined}
/>
