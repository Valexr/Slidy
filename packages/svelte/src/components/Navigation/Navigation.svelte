<script lang="ts">
	import { getContext } from "svelte/internal";
	import { generateIndexes } from "@slidy/assets/scripts";
	import { fillTemplate } from "../Slidy/i18n";
	import { iconChevron } from "@slidy/assets/icons";
	import type { I18NDict, SlidyStyles } from "@slidy/assets/types";
	import "@slidy/assets/styles/navigation.module.css";

	export let current: number;
	export let start: number;
	export let end: number;
	export let ordinal = false;
	export let vertical = false;
	export let limit = 7;
	export let siblings = 1;

	const classNames = getContext<SlidyStyles>("classNames");
	const i18n = getContext<I18NDict>("i18n");

	const setTitle = (i: number) => {
		if (i === start) {
			return i18n.first;
		} else if (i === end) {
			return i18n.last;
		} else {
			return fillTemplate(i18n.slideN, [ i.toString() ]);
		}
	};

	// Too many items -> should be ordinal for accessibility and responsiveness
	$: ordinal = end - start + 1 > limit && true;
	$: indices = generateIndexes({ current, start, end, limit, siblings });

	$: console.log(current);
</script>

<nav
	aria-label="pagination"
	aria-orientation="{vertical ? "vertical" : "horizontal"}"
	class="{classNames?.nav}"
>
	<button
		aria-label="{i18n.first}"
		class="{classNames["nav-item"]} arrow"
		data-step={-1}
		disabled={current <= 1}
		title="{i18n.prev}"
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
		<slot name="nav-item" index={item} {active}>
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
			>
				{ordinal ? contents : ""}
			</button>
		</slot>
	{/each}
	<button
		aria-label="{i18n.first}"
		class="{classNames["nav-item"]} arrow"
		data-step={1}
		disabled={current >= end}
		title="{i18n.next}"
	>
		<svg viewBox="{iconChevron.viewBox}">
			<path d="{iconChevron.path}" />
		</svg>
	</button>
</nav>
