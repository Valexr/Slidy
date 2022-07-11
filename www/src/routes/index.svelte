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
	import { Slidy } from "@slidy/svelte";
	import { Icon, Link } from "@components";
	import {
		pathPackageAnimation,
		pathPackageCore,
		pathPackageEasing,
		pathPackageMedia,
		pathPackageSvelte
	} from "$lib/paths";
	//export let theme: Queries = media.matches;

	const packages = [
		{ id: 0, name: "@slidy/animation", href: pathPackageAnimation },
		{ id: 1, name: "@slidy/core", href: pathPackageCore },
		{ id: 2, name: "@slidy/easing", href: pathPackageEasing },
		{ id: 3, name: "@slidy/media", href: pathPackageMedia },
		{ id: 4, name: "@slidy/svelte", href: pathPackageSvelte }
	];
</script>

<svelte:head>
	<title>Slidy</title>
</svelte:head>

<main>
	<section class="surface-2">
		<Icon viewBox="0 0 36 36">
			<path fill="#e94280" d="M25.05,27,11,32.88c-.85.34-1.53-.08-1.53-.93V25.16A2.62,2.62,0,0,1,11,23l14.1-5.78c.85-.34,1.53.09,1.53.94V24.9A2.49,2.49,0,0,1,25.05,27Z" />
			<path fill="#655aa3" d="M9.42,17.87v-6.8c0-.85.68-1.27,1.53-.93l14.1,5.77a2.62,2.62,0,0,1,1.53,2.21v6.79c0,.85-.68,1.28-1.53.94L11,20A2.5,2.5,0,0,1,9.42,17.87Z" />
			<path fill="#fdc21a" d="M25.05,13,11,18.83c-.85.34-1.53-.09-1.53-.94V11.1A2.62,2.62,0,0,1,11,8.89l14.1-5.77c.85-.34,1.53.08,1.53.93v6.79A2.5,2.5,0,0,1,25.05,13Z" />			
		</Icon>
		<h1>Slidy</h1>
		<p>
			Simple, configurable, nested & reusable sliding action script with templates, animations, easings & plugins.
		</p>
	</section>
	<section>
		<h2>Packages</h2>
		<Slidy
			slides={packages}
			counter={false}
			duration={450}
			gravity={1.45}
			snap="center"
			loop
			index={0}
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
