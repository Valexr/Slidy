<script lang="ts" context="module">
	import { Slidy } from '@slidy/svelte/src';
	import '@slidy/svelte/slidy.css';

	async function getItems(page: number): Promise<any> {
		const path = `https://picsum.photos/v2/list?page=${page}&limit=15`;
		const res = await fetch(path);
		const json = await res.json();
		return json;
	}
</script>

<script lang="ts">
	let page = Math.trunc(Math.random() * 10);
</script>

<svelte:head>
	<title>Slidy 3.0 - SvelteKit</title>
</svelte:head>

<h1>Welcome to Slidy SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#await getItems(page) then slides}
	<Slidy getImgSrc={(item) => item.download_url} {slides} snap="center" />
{/await}
