<script lang="ts" context="module">
	import { Slidy } from '@slidy/svelte';
	import { mediaStorage, type MediaQuery } from '@slidy/media';
	import { getPhotos } from '$lib/api';

	const queries = {
			xs: '(max-width: 480px)',
			sm: '(max-width: 600px)',
			md: '(max-width: 840px)',
			lg: '(max-width: 960px)',
			xl: '(max-width: 1280px)',
			xxl: '(min-width: 1281px)',
			landscape: '(orientation: landscape)',
			portrait: '(orientation: portrait)',
			dark: '(prefers-color-scheme: dark)',
			light: '(prefers-color-scheme: light)',
			mouse: '(hover: hover)',
			touch: '(hover: none)'
		},
		storage = { type: 'session', key: 'ss-media' };

	const media = mediaStorage({ queries, storage, cookie: true });

	export async function load({ session }) {
		const { theme = JSON.stringify(media.matches) } = session.user;

		return {
			props: {
				theme
			}
		};
	}
</script>

<script lang="ts">
	let main,
		page = Math.trunc(Math.random() * 99);

	export let theme: MediaQuery = media.matches;

	$: theme = JSON.parse(theme as unknown as string);
</script>

<svelte:head>
	<title>Slidy 3.1.0 - SvelteKit</title>
</svelte:head>

<header>
	<h1 style="color: {theme.dark ? 'inherit' : 'red'}">
		Welcome to Slidy SvelteKit! {theme.dark}
	</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</header>

<main bind:this={main}>
	{#await getPhotos(page, main) then slides}
		<Slidy
			{slides}
			getImgSrc={(item) => item.download_url}
			clamp
			index={4}
			snap="center"
			duration={450}
			gravity={1.45}
			thumbnail
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
