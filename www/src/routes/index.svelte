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
	import { Slidy } from '@slidy/svelte';
	import { stairs } from '@slidy/animation';
	import { Header, Icon, Link } from '@components';
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
		<Icon viewBox="0 0 176 176">
			<path
				d="M51.25 111.097c-6.983 2.75-12.25 10.352-12.25 17.68v25.07c0 8.633 7.22 13.368 15.447 10.129l71.303-28.073c6.983-2.75 12.25-10.352 12.25-17.68v-25.07c0-8.633-7.22-13.368-15.447-10.13l-71.302 28.074Z"
				fill="#FF3E80"
			/>
			<path
				d="M51.25 111.097c-6.983 2.75-12.25 10.352-12.25 17.68v25.07c0 8.633 7.22 13.368 15.447 10.129l71.303-28.073c6.983-2.75 12.25-10.352 12.25-17.68v-25.07c0-8.633-7.22-13.368-15.447-10.13l-71.302 28.074Z"
				fill="url(#a)"
			/>
			<path
				d="M125.75 75.097c6.983 2.75 12.25 10.352 12.25 17.68v25.07c0 8.633-7.22 13.368-15.447 10.129L51.251 99.903C44.267 97.153 39 89.55 39 82.222v-25.07c0-8.633 7.22-13.368 15.447-10.13l71.303 28.074Z"
				fill="#8759F2"
			/>
			<path
				d="M125.75 75.097c6.983 2.75 12.25 10.352 12.25 17.68v25.07c0 8.633-7.22 13.368-15.447 10.129L51.251 99.903C44.267 97.153 39 89.55 39 82.222v-25.07c0-8.633 7.22-13.368 15.447-10.13l71.303 28.074Z"
				fill="url(#b)"
			/>
			<path
				d="M51.25 39.097C44.268 41.847 39 49.45 39 56.777v25.07c0 8.633 7.22 13.368 15.447 10.13l71.303-28.075c6.983-2.749 12.25-10.35 12.25-17.68v-25.07c0-8.632-7.22-13.367-15.447-10.128L51.251 39.097Z"
				fill="#FFC300"
			/>
			<defs>
				<linearGradient
					id="a"
					x1="114"
					y1="132.5"
					x2="120.5"
					y2="71"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FF3E80" />
					<stop offset="1" stop-color="#212529" />
				</linearGradient>
				<linearGradient
					id="b"
					x1="65.5"
					y1="99"
					x2="54.5"
					y2="38"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#8759F2" />
					<stop offset="1" />
				</linearGradient>
			</defs>
		</Icon>
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
