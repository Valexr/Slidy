<script lang="ts">
	import { getContext } from "svelte";
	import { iconChevron } from "@slidy/assets/icons";
	import { format } from "@slidy/assets/scripts/utils";
	import { generateIndexes } from "@slidy/assets/scripts/navigation";
	import type { I18NDict, SlidyStyles } from "@slidy/assets/types";
	import "@slidy/assets/styles/navigation.module.css";

	let {
		current = 0,
		start = 0,
		end = 0,
		ordinal = false,
		vertical = false,
		limit = 7,
		siblings = 1,
		onclick
	} = $props()

	const classNames = getContext<SlidyStyles>("classNames");
	const i18n = getContext<I18NDict>("i18n");

	const setTitle = (i: number) => {
		if (i === start) {
			return i18n.first;
		} else if (i === end) {
			return i18n.last;
		} else {
			return format(i18n.slideN, i);
		}
	};

	// Too many items -> should be ordinal for accessibility and responsiveness
	// ordinal = $derived( end - start + 1 > limit && true);
	const indices = generateIndexes({ current, start, end, limit, siblings });
</script>

<!-- svelte-ignore a11y_role_supports_aria_props_implicit -->
<nav
	aria-label="pagination"
	aria-orientation="{vertical ? "vertical" : "horizontal"}"
	class={classNames?.nav}
>
	<button
		aria-label={i18n.first}
		class="{classNames["nav-item"]} arrow"
		data-step={-1}
		disabled={current <= 1}
		title={i18n.prev}
		{onclick}
	>
		<svg viewBox="{iconChevron.viewBox}">
			<path d="{iconChevron.path}" />
		</svg>
	</button>
	{#each indices as item}
		{@const active = item === current}
		{@const contents = item < 0 ? "…" : item}
		{@const ellipsis = item < 0}
		{@const title = setTitle(item)}
		<!-- <slot name="nav-item" index={item} {active}> -->
			<button
				aria-current={active ? "true" : undefined}
				aria-label={title}
				class={classNames["nav-item"]}
				class:active
				class:ellipsis
				class:ordinal
				data-index={ellipsis ? undefined : item - 1}
				disabled={ellipsis}
				{title}
				{onclick}
			>
				{ordinal ? contents : ""}
			</button>
		<!-- </slot> -->
	{/each}
	<button
		aria-label={i18n.first}
		class="{classNames["nav-item"]} arrow"
		data-step={1}
		disabled={current >= end}
		title={i18n.next}
		{onclick}
	>
		<svg viewBox={iconChevron.viewBox}>
			<path d={iconChevron.path} />
		</svg>
	</button>
</nav>
