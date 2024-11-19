<script lang="ts" module>
	import {  getContext } from "svelte";

	import Core from "../Core/Core.svelte";
	import Image from "../Image/Image.svelte";

	import { format } from "@slidy/assets/scripts/utils";
	import type { SlidyThumbOptions } from "./thumbnail.types";
	import type { I18NDict, SlidyStyles } from "@slidy/assets/types";
	import "@slidy/assets/styles/thumbnail.module.css";
</script>

<script lang="ts">
	let {
		active = 0,
		animation = undefined,
		background = false,
		clamp = 0,
		duration= 250,
		easing= (t) => t,
		getImgSrc = (item) => item.src ?? "",
		gravity = 0.75,
		indent = 0,
		index = 0,
		loop = false,
		sensity = 5,
		slides = [],
		snap = undefined, // `"start", "center", "end", "deck = undefined,
		select = () => {},
	}: Partial<SlidyThumbOptions> & { select: (index: number) => void } = $props()

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
	className={classNames?.thumbnails}
>
	{#each slides as item, i (item.id ?? getImgSrc(item) ?? i)}
		{@const title = format(i18n.slideN, i + 1)}
		<button
			aria-current={i === active ? "true" : undefined}
			aria-label={title}
			aria-roledescription="slide"
			class={classNames.thumbnail}
			class:active={i === active}
			class:bg={background}
			style:--_slidy-slide-bg={background ? `url(${getImgSrc(item)})` : ""}
			{title}
			onclick={() => select(i)}
		>
			{#if !background}
				<Image src={getImgSrc(item)} {...item} />
			{/if}
		</button>
	{/each}
</Core>
