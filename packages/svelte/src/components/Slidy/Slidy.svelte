<script lang="ts" context="module">
	import { setContext } from "svelte/internal";
	import { Arrow, ButtonAutoplay, Core, Image, Navigation, Progress, Thumbnail } from "../index";
	import { autoplay as autoplayAction } from "@slidy/assets/actions";
	import { clamp as clampValue } from "@slidy/assets/scripts";
	import { classNames as classNamesDefault } from "./slidy.styles";
	import "@slidy/assets/styles/slidy.module.css";
	import { iconChevron } from "@slidy/assets/icons";

	import type { SlidyOptions } from "./Slidy.types";
</script>

<script lang="ts">
	import { fillTemplate, i18nDefaults } from "./i18n";

	type $$Props = SlidyOptions;

	export let animation: $$Props["animation"] = undefined;
	export let arrows = true;
	export let autoplay = false;
	export let autoplayControl = false;
	export let axis: $$Props["axis"] = "x";
	export let background = false;
	export let counter = true;
	export let clamp = 0;
	export let classNames: $$Props["classNames"] = classNamesDefault;
	export let duration = 450;
	export let easing: $$Props["easing"] = (t: number): number => t;
	export let getImgSrc: $$Props["getImgSrc"] = (item) => item.src || "";
	export let getThumbSrc: $$Props["getThumbSrc"] = (item) => getImgSrc(item);
	export let navigation = false;
	export let gravity = 1.2;
	export let i18n: $$Props["i18n"] = i18nDefaults;
	export let indent: $$Props["indent"] = 2;
	export let index = 0;
	export let interval = 1500;
	export let loop = false;
	export let groups = 0;
	export let position = 0;
	export let progress = false;
	export let sensity = 5;
	export let slides: $$Props["slides"] = [];
	export let snap: $$Props["snap"] = undefined;
	export let thumbnail = false;
	export let vertical = false;

	/**
	 * Indicate the paused autoplay.
	 */
	let autoplayState: "play" | "pause" | "stop" = "stop";

	/**
	 * To prevent infinite loop the thumb index has separate variable
	 * Also, the current index passed into thumbs as it may be dragged away.
	 */
	export let indexThumb = index;

	setContext("classNames", classNames);
	setContext("i18n", i18n);

	$: length = slides.length;

	const goto = (slide: number): void => {
		if (typeof slide === "number" && !Number.isNaN(slide)) {
			index = clampValue(0, slide, length - 1);
		}
	};

	const handleClick = (event: Event): void => {
		const element = event.target as HTMLElement;

		if (element.nodeName !== "BUTTON") return;

		if (element.dataset.index) {
			goto(parseInt(element.dataset.index));
			return;
		}

		if (element.dataset.step) {
			goto(parseInt(element.dataset.step) + index);
			return;
		}
	};

	const handleIndexChange = (event: CustomEvent<{ index: number }>) => {
		const i = event.detail.index;
		goto(i);
		indexThumb = i;
	};

	const handlePositionChange = (event: CustomEvent<{ position: number }>) => {
		position = event.detail.position;
	};

	const handleAutoplay = () => {
		autoplayState = "play";
		if (loop) {
			index += 1;
		}	else if (index + 1 < slides.length) {
			index += 1;
		}	else {
			autoplay = false;
		}
	};

	const handleAutoplayPause = () => {
		autoplayState = "pause";
	};

	const handleAutoplayStop = () => {
		autoplayState = "stop";
		autoplay = false;
	};

	const handleAutoplayControl = () => {
		if (autoplayState === "play" || autoplayState === "pause") {
			autoplayState = "stop";
		} else if (autoplayState === "stop") {
			autoplayState = "play";
		}
		autoplay = !autoplay;
	};
</script>

<section
	aria-roledescription="{i18n.carousel}"
	aria-orientation="{vertical ? "vertical" : "horizontal"}"
	class="{classNames?.root}"
	class:groups={groups > 1}
	on:click={handleClick}
	on:play={handleAutoplay}
	on:pause={handleAutoplayPause}
	on:stop={handleAutoplayStop}
	use:autoplayAction={{	status: autoplay,	interval }}
	on:play
	on:pause
	on:stop
	style:--slidy-autoplay-interval="{interval}ms"
	style:--slidy-group-items="{groups}"
>
	{#if counter || $$slots.overlay}
		<div class="{classNames?.overlay}">
			{#if counter}
				<output class="{classNames?.counter}">
					{fillTemplate(i18n.counter, [ `${index + 1}`, length.toString() ])}
				</output>
			{/if}
			{#if autoplayControl}
				<ButtonAutoplay
					state={autoplayState}
					disabled={index + 1 >= length && !loop}
					on:click={handleAutoplayControl}
				/>
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
		{sensity}
		{snap}
		on:destroy
		on:index
		on:index={handleIndexChange}
		on:keys
		on:mount
		on:move
		on:move={handlePositionChange}
		on:resize
		on:update
	>
		{#each slides as item, i (item.id ?? getImgSrc(item) ?? i)}
			{@const active = i === index}
			<li
				aria-current={active ? "true" : undefined}
				aria-label="{fillTemplate(i18n.counter, [ i.toString(), length.toString() ])}"
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
			on:input={e => index = Number(e.target.value) - 1}
		/>
	{/if}

	{#if thumbnail}
		<slot name="thumbnail">
			<Thumbnail
				active={indexThumb}
				{background}
				{duration}
				{easing}
				getImgSrc={getThumbSrc}
				{indent}
				index={indexThumb}
				{loop}
				{sensity}
				{slides}
				on:index
				on:select={event => goto(event.detail.index)}
			/>
		</slot>
	{/if}

	{#if navigation}
		<Navigation current={index + 1} start={1} end={length} {vertical} />
	{/if}
</section>
