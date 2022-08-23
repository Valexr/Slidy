<script lang="ts">
	import { getContext } from "svelte/internal";
	import type { I18NDict, SlidyStyles } from "../Slidy/Slidy.types";
	import "@slidy/assets/styles/arrow.module.css";

	// describes slide management the direction: previous / next
	export let type: -1 | 1 | number = 1;
	export let loop: boolean;
	export let index: number;
	export let items: number;
	export let vertical = false;

	const classNames = getContext<SlidyStyles>("classNames");
	const i18n = getContext<I18NDict>("i18n");

	$: disabled = type < 1
		? index === 0 && !loop
		: index === items - 1 && !loop;

	$: title = type < 1
		? i18n.prev
		: i18n.next;
</script>

<button
	aria-label={title}
	class="{classNames.arrow}"
	class:prev={type < 0}
	class:vertical
	data-step={type}
	{disabled}
	{title}
>
	<slot />
</button>
