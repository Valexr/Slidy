<script lang="ts" module>
	import { base } from '$app/paths';
	import { Slidy } from '@slidy/svelte';
	import { stairs } from '@slidy/animation';
	import { Header, Link } from '@components';
	import {
		pathPackageAnimation,
		pathPackageCore,
		pathPackageEasing,
		pathPackageMedia,
		pathPackagePlugins,
		pathPackageReact,
		pathPackageSvelte,
		pathPackageSolid
	} from '$lib/paths';
	import '@slidy/svelte/dist/slidy.css';
</script>

<script lang="ts">
	const packages = [
		{ id: 0, name: '@slidy/animation', href: pathPackageAnimation },
		{ id: 1, name: '@slidy/core', href: pathPackageCore },
		{ id: 2, name: '@slidy/easing', href: pathPackageEasing },
		{ id: 3, name: '@slidy/media', href: pathPackageMedia },
		{ id: 4, name: '@slidy/plugins', href: pathPackagePlugins },
		{ id: 5, name: '@slidy/react', href: pathPackageReact },
		{ id: 6, name: '@slidy/svelte', href: pathPackageSvelte },
		{ id: 7, name: '@slidy/solid', href: pathPackageSolid }
	];
</script>

<svelte:head>
	<title>Slidy</title>
</svelte:head>

<main>
	<Header className="surface-2">
		<img src="{base}/Slidy.svg" alt="Slidy" width="128" height="128" />
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
			loop
		>
			{#snippet slide(item)}
				<article class="surface-3">
					<Link href={item.href}>
						{item.name}
					</Link>
				</article>
			{/snippet}
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
	:global(.slidy-slides) {
		justify-content: center;
	}
</style>
