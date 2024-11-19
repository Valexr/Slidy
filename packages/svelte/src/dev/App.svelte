<script lang="ts" module>
	// import Slidy from "../components/Slidy/Slidy.svelte";
	import { Slidy } from '@slidy/svelte'
	import { Header, ControlPanel, Sidemenu } from "./components";

	import { translate } from "@slidy/animation";
	import { linear } from "@slidy/easing";
	import { autoplay } from "@slidy/plugins";

	import { getRandomSlides } from "@slidy/assets/scripts";
	import "@slidy/assets/styles/dev/app.module.css";
</script>

<script lang="ts">
	let animation = translate;
	let axis: "x" | "y" = "x";
	let easing = linear;
	let groups = 0;
	let limit = $state(9);;
	let index = $state(4)
	let vertical = $state(false);
	let clamp = $state(0);
	let duration = $state(450);
	let gravity = $state(1.45);
	let width = $state("auto");
	let snap: "start" | "center" | "end" = $state("center");
	let loop = $state(true);
	let gap = $state(15);
	let indent = 0;
	let background = false;
	let controlPanel = $state(false);

	async function loadSlides() {
		const slides = await getRandomSlides(limit);
		limit = 9
		return slides
	};

</script>

<Header bind:limit bind:controlPanel />

<main>
	{#await loadSlides() then slides}
		<Slidy
			{animation}
			{axis}
			{background}
			{easing}
			{slides}
			{clamp}
			{duration}
			{gravity}
			{groups}
			{indent}
			{snap}
			{loop}
			bind:index
			navigation
			thumbnail
			progress
			plugins={[ autoplay({ duration: 2000 }) ]} >
			<!-- {#snippet slide(item)}
				<img src="{item.src}" alt="{item.alt}" />
			{/snippet} -->
		</Slidy>
	{/await}
</main>

<Sidemenu bind:open={controlPanel}>
	<ControlPanel bind:vertical bind:clamp bind:snap bind:duration bind:gravity bind:width bind:loop bind:gap />
</Sidemenu>

<style>
	main {
		--slidy-arrow-bg: #655aa39a;
		--slidy-arrow-bg-hover: #655aa39a;
		--slidy-arrow-icon-color: white;
		--slidy-counter-bg: #655aa3;
		--slidy-focus-ring-color: #655aa3dc;
		--slidy-nav-item-color: #655aa3;
		--slidy-progress-thumb-color: #655aa3;
		--slidy-progress-track-color: #a79cd3;
		--slidy-slide-bg-color: #655aa3;
	}
</style>
