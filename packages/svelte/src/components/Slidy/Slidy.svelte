<script lang="ts" context="module">
	import { createEventDispatcher } from "svelte/internal";
	import { slidy } from "@slidy/core";
	import { Arrow, Image, Navigation, Progress } from "../";
	import { clamp as clampValue } from "../../helpers";
	import "./slidy.module.css";

	import type { Slide, SlidyOptions, GetSrc } from "./Slidy.types";
</script>

<script lang="ts">
	type $$Props = SlidyOptions;

	export let arrows = true;
	export let background = false;
	export let counter = true;
	export let clamp = 0;
	export let className: $$Props["className"] = "";
	export let easing: $$Props["easing"] = undefined;
	export let getImgSrc: GetSrc<Slide> = (item: Slide) => item.src ?? "";
	export let getThumbSrc: GetSrc<Slide> = (item: Slide) => getImgSrc(item);
	export let navigation = true;
	export let duration = 450;
	export let gravity = 1.2;
	export let id: $$Props["id"] = undefined;
	export let indent: $$Props["indent"] = 2;
	export let index = 0;
	export let loop = false;
	export let position = 0;
	export let progress = false;
	export let slides: $$Props["slides"] = [];
	export let snap: $$Props["snap"] = undefined;
	export let thumbnail = false;
	export let vertical = false;

	/**
	 * To prevent infinite loop the thumb index has separate variable
	 * Also, the current index passed into thumbs as it may be dragged away.
	 */
	export let _indexActive = index;
	export let _indexThumb = index;

	const dispatch = createEventDispatcher();

	$: length = slides.length;

	/**
	 * Route to the desired slide index.
	 */
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
</script>

<section
	aria-roledescription="carousel"
	class="slidy {className}"
	class:vertical
	{id}
	on:click={handleClick}
>
	{#if counter || $$slots.overlay}
		<div class="slidy-overlay">
			{#if counter}
				<output class="slidy-counter">
					{index + 1} / {length}
				</output>
			{/if}
			<slot name="overlay" />
		</div>
	{/if}
	<ul
		class="slidy-slides"
		aria-live="polite"
		tabindex="0"
		use:slidy={{
			clamp,
			duration,
			easing,
			gravity,
			indent,
			index,
			loop,
			snap,
			vertical
		}}
		on:destroy
		on:index
		on:index={e => {
			goto(e.detail.index);
			_indexThumb = e.detail.index;
		}}
		on:keys
		on:mount
		on:move
		on:move={e => position = e.detail.position}
		on:resize
		on:update
	>
		{#each slides as item, i (item.id ?? getImgSrc(item) ?? i)}
			{@const active = i === (!thumbnail ? _indexActive : index)}
			{@const bgURL = background ? `--slidy-slide-bg: url(${getImgSrc(item)});` : undefined}
			<li
				aria-current={active ? "true" : undefined}
				aria-label={`${i} of ${length}`}
				aria-roledescription="slide"
				class="slidy-slide"
				class:active
				class:background
				on:click={() => dispatch("select", { index: i })}
				style={bgURL}
				role="group"
			>
				<slot {item}>
					{#if !background}
						<Image src={getImgSrc(item)} {...item} />
					{/if}
				</slot>
			</li>
		{/each}
	</ul>

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
		<Progress value={index + 1} max={length} />
	{/if}

	{#if thumbnail}
		<slot name="thumbnail">
			<nav class="slidy-thumbnail">
				<svelte:self
					arrows={false}
					counter={false}
					navigation={false}
					className="thumbnail"
					getImgSrc={getThumbSrc}
					{background}
					{duration}
					{vertical}
					gravity={0.75}
					{slides}
					on:select={event => goto(event.detail.index)}
					_indexActive={index}
					index={_indexThumb}
				/>
			</nav>
		</slot>
	{/if}

	{#if navigation}
		<Navigation current={index + 1} start={1} end={length} {vertical} />
	{/if}
</section>
