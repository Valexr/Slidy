<script lang="ts" context="module">
	import { getContext } from "svelte/internal";
	import "@slidy/assets/styles/arrow.module.css";
	import type { I18NDict, SlidyStyles } from "@slidy/assets/types";
</script>

<script lang="ts">
	export let direction = 1;
	export let loop: boolean;
	export let index: number;
	export let items: number;
	export let step = 1;
	export let vertical = false;

	const classNames = getContext<SlidyStyles>("classNames");
	const i18n = getContext<I18NDict>("i18n");

	$: disabled = (direction < 0)
		? index === 0 && !loop
		: index === items - 1 && !loop;

	$: title = direction > 0
		? i18n.next
		: i18n.prev;
</script>

<button
	aria-label={title}
	aria-orientation="{vertical ? "vertical" : "horizontal"}"
	class="{classNames.arrow}"
	class:prev={direction < 1}
	data-step={direction * step}
	{disabled}
	{title}
>
	<slot />
</button>
