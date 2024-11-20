<script lang="ts" module>
	import { setContext, type Snippet } from "svelte";
	import { Arrow, Core, Image, Navigation, Progress, Thumbnail } from "../index";
	import { format } from "@slidy/assets/scripts/utils";
	import { classNames as classNamesDefault } from "./slidy.styles";
	import { iconChevron } from "@slidy/assets/icons";
	import { i18nDefaults } from "./i18n";

	import "@slidy/assets/styles/slidy.module.css";

	import type { Slide, SlidyOptions } from "./Slidy.types";

	interface Snippets<K> {
		slide: Snippet<[K]>,
		overlay: Snippet,
		thumbnails: Snippet,
		arrrows: Snippet,
		arrrow: Snippet
	}
</script>

<script lang="ts">
	type K = $$Generic<Record<PropertyKey, unknown>>

	let {
		animation= undefined,
		arrows = true,
		axis = "x",
		background = false,
		counter = true,
		clamp = 0,
		classNames = classNamesDefault,
		duration = 450,
		easing = (t) => t,
		getImgSrc= (item) => item.src || "",
		getThumbSrc = (item) => getImgSrc(item),
		navigation = false,
		gravity = 1.2,
		i18n = i18nDefaults,
		indent = 2,
		index = $bindable(0),
		position = $bindable(0),
		loop = false,
		groups = 0,
		plugins = [],
		progress = false,
		sensity = 5,
		slides = [],
		snap = undefined,
		thumbnail = false,
		vertical = false,
		onmove, onmount, onkeys, onresize, onupdate, ondestroy,
		slide, overlay, thumbnails, arrrows, arrrow
	}: Partial<SlidyOptions<K> & Snippets<Slide & NoInfer<K>>> = $props()

	setContext("classNames", classNames);
	setContext("i18n", i18n);

	const length = $derived(slides.length);

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

<!-- svelte-ignore a11y_role_supports_aria_props_implicit -->
<section
	aria-roledescription={i18n.carousel}
	aria-orientation={vertical ? "vertical" : "horizontal"}
	class={classNames?.root}
	class:groups={groups > 1}
	style:--slidy-group-items={groups}
>
	{#if counter}
		<div class={classNames?.overlay}>
			{#if counter}
				<output class={classNames?.counter}>
					{format(i18n.counter, index + 1, length)}
				</output>
			{/if}
			{@render overlay?.()}
		</div>
	{/if}

	<Core
		{animation}
		{axis}
		{clamp}
		{duration}
		{easing}
		{gravity}
		{indent}
		{index}
		{position}
		{loop}
		{plugins}
		{sensity}
		{snap}
		{onmove}
		{onkeys}
		{onmount}
		{onresize}
		{onupdate}
		{ondestroy}
		className={classNames?.slides}
		onindex={e => index = e.detail.index}
	>
		{#each slides as item, i (item.id ?? getImgSrc(item) ?? i)}
			{@const active = i === index}
			<li
				aria-current={active ? "true" : undefined}
				aria-label={format(i18n.counter, i, length)}
				aria-roledescription={i18n.slide}
				class={classNames?.slide}
				class:active
				class:bg={background}
				role="group"
				style:--_slidy-slide-bg={background ? `url(${getImgSrc(item)}` : undefined}
			>
				{#if slide}
					{@render slide(item)}
				{:else}
					{#if !background}<Image src={getImgSrc(item)} {...item} />{/if}
				{/if}
			</li>
		{/each}
	</Core>

	{#if arrows}
		{#if arrrows}
			{@render arrrows?.()}
		{:else}
			{#each [ -1, 1 ] as direction}
				<Arrow
					{direction}
					{index}
					{loop}
					{vertical}
					items={length}
					step={clamp > 0 ? clamp : 1}
					onclick={handleClick}
				>
					{#if arrrow}
						{@render arrrow?.()}
					{:else}
						<svg
							class="slidy-arrow-icon"
							viewBox={iconChevron.viewBox}
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d={iconChevron.path}></path>
						</svg>
					{/if}
				</Arrow>
			{/each}
		{/if}
	{/if}

	{#if progress}
		<Progress
			value={index + 1}
			max={length}
			change={(valueAsNumber) => index = valueAsNumber - 1}
			{vertical}
		/>
	{/if}

	{#if thumbnail}
		{#if thumbnails}
			{@render thumbnails()}
		{:else}
			<Thumbnail
				{background}
				{duration}
				{easing}
				{indent}
				{loop}
				{sensity}
				{slides}
				active={index}
				index={index}
				getImgSrc={getThumbSrc}
				select={indx => index = indx}
			/>
		{/if}
	{/if}

	{#if navigation}
		<Navigation current={index + 1} start={1} end={length} {vertical} onclick={handleClick} />
	{/if}
</section>
