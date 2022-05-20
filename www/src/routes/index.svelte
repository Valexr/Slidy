<script lang="ts" context="module">
	import { Slidy } from '@slidy/svelte/src';
	import '@slidy/svelte/slidy.css';
	import { media, type Queries } from '$lib/media';
	import { getPhotos } from '$lib/api';

	export async function load({ session }) {
		let { theme = JSON.stringify(media.matches) } = session.user;

		return {
			props: {
				theme: JSON.parse(theme)
			}
		};
	}
</script>

<script lang="ts">
	let main: HTMLElement,
		page = Math.trunc(Math.random() * 99);

	export let theme: Queries = media.matches;
</script>

<svelte:head>
	<title>Slidy 3.1.0 - SvelteKit</title>
</svelte:head>

<header>
	<h1 style="color: {theme.dark ? 'inherit' : 'red'}">Welcome to Slidy SvelteKit!</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</header>

<main bind:this={main}>
	{#await getPhotos(page, main) then slides}
		<Slidy
			getImgSrc={(item) => item.download_url}
			duration={450}
			gravity={1.45}
			snap="center"
			thumbnail
			index={4}
			{slides}
			clamp
		/>
	{/await}
</main>

<style lang="scss">
	header {
		padding: var(--size-fluid-2);
	}
	main {
		height: var(--slidy-height);
		padding: var(--size-fluid-2) 0;
	}
</style>
