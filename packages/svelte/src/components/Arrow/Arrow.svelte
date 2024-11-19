<script lang="ts" module>
	import { getContext } from "svelte";
	import "@slidy/assets/styles/arrow.module.css";
	import type { I18NDict, SlidyStyles } from "@slidy/assets/types";
</script>

<script lang="ts">
	let {
		direction = 1,
		loop = false,
		index= 0,
		items = 0,
		step = 1,
		vertical = false,
		children,
		onclick
	} = $props()

	const classNames = getContext<SlidyStyles>("classNames");
	const i18n = getContext<I18NDict>("i18n");

	const disabled = $derived(direction < 0
		? index === 0 && !loop
		: index === items - 1 && !loop);


	const title = $derived(direction > 0 ? i18n.next : i18n.prev);
</script>

<!-- svelte-ignore a11y_role_supports_aria_props_implicit -->
<button
	aria-label={title}
	aria-orientation={vertical ? "vertical" : "horizontal"}
	class={classNames.arrow}
	class:prev={direction < 1}
	data-step={direction * step}
	{disabled}
	{title}
	{onclick}
>
	{@render children?.()}
</button>
