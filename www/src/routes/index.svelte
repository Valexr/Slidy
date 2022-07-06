<!-- <script lang="ts" context="module">
	import { media, type Queries } from '$lib/media';
	
	export async function load({ session }) {
		let { theme = JSON.stringify(media.matches) } = session.user;

		return {
			props: {
				theme: JSON.parse(theme)
			}
		};
	}
</script> -->

<script lang="ts">
	import { randomSlides } from "@stores/slides";
	import { Slidy } from "@slidy/svelte";
	import "@slidy/svelte/slidy.css";
	
	//export let theme: Queries = media.matches;
	const slides1 = randomSlides(5);
	const slides2 = randomSlides(5);
</script>

<svelte:head>
	<title>Slidy 3.1.0 - SvelteKit</title>
</svelte:head>

<main>
		<Slidy
			duration={450}
			gravity={1.45}
			snap="center"
			thumbnail
			index={4}
			slides={$slides1}
			navigation
			arrows
		/>
		<Slidy
			duration={450}
			gravity={1.45}
			snap="center"
			thumbnail
			index={4}
			slides={$slides2}
			navigation
			arrows
		/>
</main>

<style>
	main {
		--slidy-height: 75vh;
		--slidy-nav-item-color: white;

		padding: var(--size-fluid-2) 0;
	}
</style>
