<script lang="ts">
	import { getRandomSlides } from '@slidy/assets/scripts/slide-store';
	import { Slidy } from '@slidy/svelte';
	import { stairs } from '@slidy/animation';
	import '@slidy/svelte/dist/slidy.css';
</script>

<svelte:head>
	<title>Slidy 3.1.0 - SvelteKit</title>
</svelte:head>

<main>
	{#await getRandomSlides(10) then slides}
		<Slidy
			animation={stairs}
			duration={450}
			gravity={1.45}
			snap="center"
			thumbnail
			index={4}
			{slides}
			arrows
			loop
		/>
	{/await}
</main>

<style>
	main {
		--slidy-height: 75vh;
		--slidy-nav-item-color: white;

		padding: var(--size-fluid-2) 0;
	}
</style>
