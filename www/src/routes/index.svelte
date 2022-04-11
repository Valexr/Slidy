<script lang="ts" context="module">
	import { Slidy } from '@slidy/svelte/src';
	import '@slidy/svelte/slidy.css';

	let main: HTMLElement;

	async function getItems(page: number): Promise<any> {
		const path = `https://picsum.photos/v2/list?page=${page}&limit=15`;
		const res = await fetch(path);
		const json = await res.json();

		return json.map((p: { width: number; height: number; id: number }) => {
			const { width, height } = aspectQ(
				p.width,
				p.height,
				main.offsetWidth,
				main.offsetHeight
			);
			const download_url = `https://picsum.photos/id/${p.id}/${
				width * window.devicePixelRatio
			}/${height * window.devicePixelRatio}.jpg`;

			return { ...p, width, height, download_url };
		});
	}

	function aspectQ(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {
		let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
		return {
			width: Math.round(srcWidth * ratio),
			height: Math.round(srcHeight * ratio)
		};
	}
</script>

<script lang="ts">
	let page = Math.trunc(Math.random() * 100);
</script>

<svelte:head>
	<title>Slidy 3.1.0 - SvelteKit</title>
</svelte:head>

<header>
	<h1>Welcome to Slidy SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</header>

<main bind:this={main}>
	{#await getItems(page) then slides}
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
