<script lang="ts">
	import { getContext } from "svelte/internal";
	import type { I18NDict, SlidyStyles } from "../Slidy/Slidy.types";
	import "@slidy/assets/styles/arrow.module.css";

	// describes slide management the direction: previous / next
	export let clamp = 1;
	export let loop: boolean;
	export let index: number;
	export let items: number;
	export let vertical = false;

	const classNames = getContext<SlidyStyles>("classNames");
	const i18n = getContext<I18NDict>("i18n");

	$: type = clamp < 0;

	$: disabled = type
		? index === 0 && !loop
		: index === items - 1 && !loop;

	$: title = type
		? i18n.prev
		: i18n.next;
</script>

<button
	aria-label={title}
	aria-orientation="{vertical ? "vertical" : "horizontal"}"
	class="{classNames.arrow}"
	class:prev={type}
	data-step={clamp}
	{disabled}
	{title}
>
	<slot />
</button>
