<script lang="ts" context="module">
	import Slidy from '@slidy/svelte';

	async function getItems(page: number): Promise<any> {
		const path = `https://picsum.photos/v2/list?page=${page}&limit=15`;
		const res = await fetch(path);
		const json = await res.json();
		console.log(json);
		return json;
	}
</script>

<script lang="ts">
	let page = Math.trunc(Math.random() * 10);
	let position = 0;
	let limit = 9;
	let index = 4;
	let vertical = false;
	let clamp = true;
	let duration = 450;
	let gravity = 1.45;
	let width = 'auto';
	let snap: 'start' | 'center' | 'end' = 'center';
	let loop = false;
	let gap = 15;
</script>

<svelte:head>
	<title>Slidy 3.0</title>
</svelte:head>

<h1>Welcome to Slidy SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#await getItems(page) then slides}
	<Slidy
		bind:index
		bind:position
		getImgSrc={(item) => item.download_url}
		{slides}
		{clamp}
		{duration}
		{gravity}
		{snap}
		{loop}
		{vertical}
	/>
{/await}
