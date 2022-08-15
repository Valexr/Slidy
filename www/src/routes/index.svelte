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
	import { base } from '$app/paths';
	import { Slidy } from '@slidy/svelte';
	import { stairs } from '@slidy/animation';
	import { Header, Link } from '@components';
	import {
		pathPackageAnimation,
		pathPackageCore,
		pathPackageEasing,
		pathPackageMedia,
		pathPackageSvelte
	} from '$lib/paths';
	//export let theme: Queries = media.matches;

	const packages = [
		{ id: 0, name: '@slidy/animation', href: pathPackageAnimation },
		{ id: 1, name: '@slidy/core', href: pathPackageCore },
		{ id: 2, name: '@slidy/easing', href: pathPackageEasing },
		{ id: 3, name: '@slidy/media', href: pathPackageMedia },
		{ id: 4, name: '@slidy/svelte', href: pathPackageSvelte }
	];
</script>

<svelte:head>
	<title>Slidy</title>
</svelte:head>

<main>
	<Header className="surface-2">
		<img src="{base}/Slidy.svg" width="128" height="128" />
		<h1>Slidy</h1>
		<p>
			Simple, configurable, nested & reusable sliding action script with rich ecosystem:
			templates, animations, easings & plugins.
		</p>
	</Header>
	<section>
		<h2>Packages</h2>
		<Slidy
			animation={stairs}
			slides={packages}
			counter={false}
			duration={450}
			gravity={1.45}
			snap="center"
			arrows
			let:item
		>
			<article class="surface-3">
				<Link href={item.href}>
					{item.name}
				</Link>
			</article>
		</Slidy>
	</section>
</main>

<style>
	main {
		--icon-size: calc(2 * var(--font-size-8));
	}

	h2 {
		margin-bottom: var(--size-3);
	}

	main section {
		padding-block: var(--size-8);
		display: flex;
		flex-flow: column;
		align-items: center;
		gap: var(--size-2);
		text-align: center;
	}

	article {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--size-3);
		border-radius: var(--size-3);
	}
</style>
