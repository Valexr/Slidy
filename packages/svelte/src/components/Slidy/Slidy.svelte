<script lang="ts" context="module">
	import { setContext } from "svelte/internal";
	import { Arrow, Core, Image, Navigation, Progress, Thumbnail } from "../index";
	import { format } from "@slidy/assets/scripts/utils";
	import { classNames as classNamesDefault } from "./slidy.styles";
	import { iconChevron } from "@slidy/assets/icons";
	import { i18nDefaults } from "./i18n";

	import "@slidy/assets/styles/slidy.module.css";

	import type { SlidyOptions } from "./Slidy.types";
</script>

<script lang="ts">
	export let animation: SlidyOptions["animation"] = undefined;
	export let arrows = true;
	export let axis: SlidyOptions["axis"] = "x";
	export let background = false;
	export let counter = true;
	export let clamp = 0;
	export let classNames = classNamesDefault;
	export let duration = 450;
	export let easing: SlidyOptions["easing"] = (t: number): number => t;
	export let getImgSrc: SlidyOptions["getImgSrc"] = (item) => item.src || "";
	export let getThumbSrc: SlidyOptions["getThumbSrc"] = (item) => getImgSrc(item);
	export let navigation = false;
	export let gravity = 1.2;
	export let i18n: SlidyOptions["i18n"] = i18nDefaults;
	export let indent: SlidyOptions["indent"] = 2;
	export let index = 0;
	export let loop = false;
	export let groups = 0;
	export let plugins: SlidyOptions["plugins"] = [];
	export let progress = false;
	export let sensity = 5;
	export let slides: SlidyOptions["slides"];
	export let snap: SlidyOptions["snap"] = undefined;
	export let thumbnail = false;
	export let vertical = false;

	/**
	 * To prevent infinite loop the thumb index has separate variable
	 * Also, the current index passed into thumbs as it may be dragged away.
	 */
	export let indexThumb = index;

	setContext("classNames", classNames);
	setContext("i18n", i18n);

	$: length = slides.length;

	const handleClick = (event: Event): void => {
		const element = event.target as HTMLElement;

		if (element.nodeName !== "BUTTON") return;

		if (element.dataset.index) {
			index = parseInt(element.dataset.index);
			return;
		}

		if (element.dataset.step) {
			index = parseInt(element.dataset.step) + index;
			return;
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<section
	aria-roledescription="{i18n.carousel}"
	aria-orientation="{vertical ? "vertical" : "horizontal"}"
	class="{classNames?.root}"
	class:groups={groups > 1}
	style:--slidy-group-items="{groups}"
	on:click={handleClick}
>
	{#if counter || $$slots.overlay}
		<div class="{classNames?.overlay}">
			{#if counter}
				<output class="{classNames?.counter}">
					{format(i18n.counter, index + 1, length)}
				</output>
			{/if}
			<slot name="overlay" />
		</div>
	{/if}

	<Core
		{animation}
		{axis}
		{clamp}
		className={classNames?.slides}
		{duration}
		{easing}
		{gravity}
		{indent}
		{index}
		{loop}
		{plugins}
		{sensity}
		{snap}
		on:destroy
		on:index
		on:index={e => index = e.detail.index}
		on:keys
		on:mount
		on:move
		on:resize
		on:update
	>
		{#each slides as item, i (item.id ?? getImgSrc(item) ?? i)}
			{@const active = i === index}
			<li
				aria-current={active ? "true" : undefined}
				aria-label="{format(i18n.counter, i, length)}"
				aria-roledescription="{i18n.slide}"
				class="{classNames?.slide}"
				class:active
				class:bg={background}
				role="group"
				style:--_slidy-slide-bg={background ? `url(${getImgSrc(item)}` : undefined}
				on:click
			>
				<slot {item}>
					{#if !background}
						<Image src={getImgSrc(item)} {...item} />
					{/if}
				</slot>
			</li>
		{/each}
	</Core>

	{#if arrows}
		<slot name="arrows">
			{#each [ -1, 1 ] as direction}
				<Arrow
					{direction}
					{index}
					items="{length}"
					{loop}
					step="{clamp > 0 ? clamp : 1}"
					{vertical}
				>
					<slot name="arrow">
						<svg
							class="slidy-arrow-icon"
							viewBox="{iconChevron.viewBox}"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="{iconChevron.path}" />
						</svg>
					</slot>
				</Arrow>
			{/each}
		</slot>
	{/if}

	{#if progress}
		<Progress
			value={index + 1}
			max={length}
			{vertical}
			on:input={e => index = e.currentTarget.valueAsNumber - 1}
		/>
	{/if}

	{#if thumbnail}
		<slot name="thumbnail">
			<Thumbnail
				active={index}
				{background}
				{duration}
				{easing}
				getImgSrc={getThumbSrc}
				{indent}
				index={indexThumb}
				{loop}
				{sensity}
				{slides}
				on:select={event => index = event.detail.index}
			/>
		</slot>
	{/if}

	{#if navigation}
		<Navigation current={index + 1} start={1} end={length} {vertical} />
	{/if}
</section>
