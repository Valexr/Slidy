<script lang="ts" context="module">
	type State = "play" | "pause" | "stop";
</script>

<script lang="ts">
	import { getContext } from "svelte/internal";
	import type { I18NDict } from "../Slidy/Slidy.types";
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
		"play": "M7.61,4.61a.75.75,0,0,0-1.11.66V18.73a.75.75,0,0,0,1.11.65L20,12.66a.75.75,0,0,0,0-1.32ZM5,5.27a2.25,2.25,0,0,1,3.33-2L20.69,10a2.26,2.26,0,0,1,0,4L8.33,20.7a2.25,2.25,0,0,1-3.33-2Z",
		"pause": "M5.75,3A1.75,1.75,0,0,0,4,4.75v14.5A1.75,1.75,0,0,0,5.75,21h3.5A1.75,1.75,0,0,0,11,19.25V4.75A1.75,1.75,0,0,0,9.25,3ZM5.5,4.75a.25.25,0,0,1,.25-.25h3.5a.25.25,0,0,1,.25.25v14.5a.25.25,0,0,1-.25.25H5.75a.25.25,0,0,1-.25-.25ZM14.75,3A1.75,1.75,0,0,0,13,4.75v14.5A1.75,1.75,0,0,0,14.75,21h3.5A1.75,1.75,0,0,0,20,19.25V4.75A1.75,1.75,0,0,0,18.25,3ZM14.5,4.75a.25.25,0,0,1,.25-.25h3.5a.25.25,0,0,1,.25.25v14.5a.25.25,0,0,1-.25.25h-3.5a.25.25,0,0,1-.25-.25Z",
		"stop": "M5.75,3h12.5A2.75,2.75,0,0,1,21,5.75v12.5A2.75,2.75,0,0,1,18.25,21H5.75A2.75,2.75,0,0,1,3,18.25V5.75A2.75,2.75,0,0,1,5.75,3Zm0,1.5A1.25,1.25,0,0,0,4.5,5.75v12.5A1.25,1.25,0,0,0,5.75,19.5h12.5a1.25,1.25,0,0,0,1.25-1.25V5.75A1.25,1.25,0,0,0,18.25,4.5Z"
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
			<path d="{iconPath[state]}" />
		</svg>
	</button>
</div>

