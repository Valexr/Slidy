<script lang="ts" context="module">
	import { setContext } from "svelte/internal";
	import { Arrow, ButtonAutoplay, Core, Image, Navigation, Progress, Thumbnail } from "../";
	import { autoplay as autoplayAction } from "../../actions/autoplay";
	import { clamp as clampValue } from "../../helpers";
	import { classNames as classNamesDefault } from "./slidy.styles";
	import "./slidy.module.css";

	import type { SlidyOptions } from "./Slidy.types";
</script>

<script lang="ts">
	type $$Props = SlidyOptions;

	export let animation: $$Props["animation"] = undefined;
	export let arrows = true;
	export let autoplay = false;
	export let axis: $$Props["axis"] = "x";
	export let background = false;
	export let counter = true;
	export let clamp = 0;
	export let classNames: $$Props["classNames"] = classNamesDefault;
	export let duration = 450;
	export let easing: $$Props["easing"] = (t: number): number => t;
	export let getImgSrc: $$Props["getImgSrc"] = (item) => item.src ?? "";
	export let getThumbSrc: $$Props["getThumbSrc"] = (item) => getImgSrc(item);
	export let navigation = false;
	export let gravity = 1.2;
	export let id: $$Props["id"] = undefined;
	export let indent: $$Props["indent"] = 2;
	export let index = 0;
	export let interval = 1500;
	export let loop = false;
	export let position = 0;
	export let progress = false;
	export let sensity = 5;
	export let slides: $$Props["slides"] = [];
	export let snap: $$Props["snap"] = undefined;
	export let thumbnail = false;

	/**
	 * To prevent infinite loop the thumb index has separate variable
	 * Also, the current index passed into thumbs as it may be dragged away.
	 */
	export let indexThumb = index;

	setContext("classNames", classNames);

	$: length = slides.length;
	$: vertical = axis === "y";

	const goto = (slide: number): void => {
		if (typeof slide === "number" && !Number.isNaN(slide)) {
			index = clampValue(slide, 0, length - 1);
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

	const handleAutoplay = () => {
		if (loop) {
			index += 1;
		}	else if (index + 1 < slides.length) {
			index += 1;
		}	else {
			autoplay = false;
		}
	};
</script>

<section
	aria-roledescription="carousel"
	class="{classNames?.root}"
	class:vertical
	{id}
	on:click={handleClick}
	on:play={handleAutoplay}
	on:stop={() => autoplay = false}
	use:autoplayAction={{	status: autoplay,	interval }}
	on:play
	on:pause
	on:stop
>
	{#if counter || $$slots.overlay}
		<div class="{classNames?.overlay}">
			{#if counter}
				<output class="{classNames?.counter}">
					{index + 1} / {length}
				</output>
			{/if}
			<ButtonAutoplay
				bind:status="{autoplay}"
				disabled={index + 1 >= length && !loop}
			/>
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
		on:index={e => {
			goto(e.detail.index);
			indexThumb = e.detail.index;
		}}
		on:keys
		on:mount
		on:move
		on:move={e => {
			position = e.detail.position;
		}}
		on:resize
		on:update
	>
		{#each slides as item, i (item.id ?? getImgSrc(item) ?? i)}
			{@const active = i === index}
			<li
				aria-current={active ? "true" : undefined}
				aria-label={`${index} of ${slides.length}`}
				aria-roledescription="slide"
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
			{#each [ -1, 1 ] as type}
				<Arrow {type} {index} items={length} {loop} {vertical}>
						<slot name="arrow">
							<svg class="slidy-arrow-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
								<path d="M19.56,24a.89.89,0,0,1-.63-.26L11.8,16.65a.92.92,0,0,1,0-1.27h0l7.13-7.16A.9.9,0,0,1,20.2,9.48L13.69,16l6.51,6.5a.91.91,0,0,1,0,1.26h0A.9.9,0,0,1,19.56,24Z" />
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
