<script lang="ts" context="module">
	import { createEventDispatcher } from "svelte/internal";
	import { slidy } from "@slidy/core";
	import { Arrow, Image, Navigation } from "../";
	import { clamp as clampValue } from "../../helpers";
	import "./slidy.module.css";

	import type { Slide, SlidyOptions, GetSrc } from "./Slidy.types";
</script>

<script lang="ts">
	type $$Props = SlidyOptions;

	export let arrows = true;
	export let background = false;
	export let clamp = false;
	export let className: $$Props["className"] = "";
	export let getImgSrc: GetSrc<Slide> = (item: Slide) => item.src ?? "";
	export let navigation = true;
	export let duration = 450;
	export let gravity = 1.2;
	export let id: $$Props["id"] = undefined;
	export let index = 0;
	export let loop = false;
	export let position = 0;
	export let slides: $$Props["slides"] = [];
	export let snap: $$Props["snap"] = undefined;
	export let vertical = false;

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

<section aria-roledescription="carousel" class="slidy {className}" class:vertical {id} tabindex="0" on:click={handleClick}>
	<slot name="counter" {index} amount={length}>
		<output class="slidy-counter">
			{index + 1} / {length}
		</output>
	</slot>
	<ul
		class="slidy-slides"
		aria-live="polite"
		use:slidy={{
			length,
			vertical,
			duration,
			gravity,
			index,
			clamp,
			snap,
			loop,
		}}
		on:mount
		on:resize
		on:update
		on:move
		on:move={({ detail }) => {
			index = detail.index;
			position = detail.position;
		}}
	>
		{#each slides as item, i (item.id ?? getImgSrc(item) ?? i)}
			{@const active = i === index}
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

	{#if navigation}
		<Navigation current={index + 1} start={1} end={length} {vertical} />
	{/if}
</section>
