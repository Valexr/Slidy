<script lang="ts" context="module">
	import Core from "../Core/Core.svelte";
	import Image from "../Image/Image.svelte";

	import { createEventDispatcher, getContext } from "svelte";
	import { format } from "@slidy/assets/scripts/utils";
	import type { SlidyThumbOptions } from "./thumbnail.types";
	import type { I18NDict, SlidyStyles } from "@slidy/assets/types";
	import "@slidy/assets/styles/thumbnail.module.css";
</script>

<script lang="ts">
	type $$Props = SlidyThumbOptions;
	type $$Events = {
		"select": CustomEvent<{ index: number }>
	}

	export let active = 0;
	export let animation: $$Props["animation"] = undefined;
	export let background = false;
	export let clamp = 0;
	export let duration: $$Props["duration"] = 250;
	export let easing: $$Props["easing"] = (t: number): number => t;
	export let getImgSrc: $$Props["getImgSrc"] = (item) => item.src ?? "";
	export let gravity = 0.75;
	export let indent = 0;
	export let index = 0;
	export let loop = false;
	export let sensity = 5;
	export let slides: $$Props["slides"] = [];
	export let snap: $$Props["snap"] = undefined;

	const dispatch = createEventDispatcher();
	const classNames = getContext<SlidyStyles>("classNames");
	const i18n = getContext<I18NDict>("i18n");
</script>

<Core
	{animation}
	{clamp}
	{duration}
	{easing}
	{gravity}
	{indent}
	{index}
	{loop}
	{sensity}
	{snap}
	tag="nav"
	axis="x"
	className="{classNames?.thumbnails}"
>
	{#each slides as item, i (item.id ?? getImgSrc(item) ?? i)}
		{@const title = format(i18n.slideN, i + 1)}
		<button
			aria-current={i === active ? "true" : undefined}
			aria-label={title}
			aria-roledescription="slide"
			class="{classNames.thumbnail}"
			class:active={i === active}
			class:bg={background}
			style:--_slidy-slide-bg={background ? `url(${getImgSrc(item)})` : ""}
			{title}
			on:click={() => dispatch("select", { index: i })}
		>
			{#if !background}
				<Image src={getImgSrc(item)} {...item} />
			{/if}
		</button>
	{/each}
</Core>
