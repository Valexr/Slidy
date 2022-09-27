<script lang="ts" context="module">
	type State = "play" | "pause" | "stop";
</script>

<script lang="ts">
	import { getContext } from "svelte/internal";
	import { iconPause, iconPlay, iconStop } from "@slidy/assets/icons";
	import type { I18NDict } from "@slidy/assets/types";
	import "@slidy/assets/styles/button-autoplay.module.css";

	export let disabled = false;
	export let state: State;

	const i18n = getContext<I18NDict>("i18n");

	let r = 15;
	let stroke = 2;

	const setTitle = (state: State) => {
		if (state === "play") {
			return i18n.stop;
		} else if (state === "stop") {
			return i18n.play;
		}
	};

	const iconPath = {
		"play": iconPlay,
		"pause": iconPause,
		"stop": iconStop
	};
</script>

<div class="slidy-autoplay" style:--slidy-autoplay-stroke-length={2 * Math.PI * r}>
	<!-- Indicator -->
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {2 * r + stroke} {2 * r + stroke}">
		<path
			stroke="var(--slidy-counter-bg, #4e4e4ebf)"
			stroke-width="{stroke}px"
			fill="none"
			d="M {r + stroke / 2}, {r + stroke / 2} m -{r}, 0 a {r},{r} 0 1,0 {2 * r},0 a {r},{r} 0 1,0 {-2 * r},0"
		/>
		<path
			class="slidy-autoplay-indicator {state}"
			stroke="var(--slidy-autoplay-indicator-accent, lightpink)"
			stroke-width="{stroke}px"
			fill="none"
			d="M {r + stroke / 2}, {r + stroke / 2} m -{r}, 0 a {r},{r} 0 1,0 {2 * r},0 a {r},{r} 0 1,0 {-2 * r},0"
		/>
	</svg>
	<button
		{disabled}
		on:click
		title={setTitle(state)}
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="{iconPath[state]['path']}" />
		</svg>
	</button>
</div>

