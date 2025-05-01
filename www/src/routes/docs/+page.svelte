<script lang="ts" module>
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { Header, Link } from '@components';
</script>

<script lang="ts">
	const sections = [
		{
			section: 'Core Script',
			items: [{ title: 'Core', href: '/docs/core' }]
		},
		{
			section: 'Integrations',
			items: [{ title: 'Svelte', href: '/docs/svelte' }]
		},
		{
			section: 'Extensions',
			items: [
				{ title: 'Animation', href: '/docs/animation' },
				{ title: 'Easing', href: '/docs/easing' },
				{ title: 'Media', href: '/docs/media' }
			]
		}
	];
</script>

<main>
	<Header className="surface-2" title={page.params.section || 'Documentation'} />
	<div class="contents">
		{#each sections as { section, items }}
			<section>
				<h2>{section}</h2>
				<ul>
					{#each items as { title, href }}
						<li>
							<Link href="{base}{href}">
								{title}
							</Link>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</main>

<style>
	main {
		display: grid;
		width: 100%;
		justify-items: center;
	}

	.contents {
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
		margin-top: var(--size-5);
	}

	h2 {
		margin-bottom: var(--size-2);
	}

	ul {
		display: flex;
		gap: var(--size-3);
	}

	li {
		width: fit-content;
		border: 1px solid white;
		padding: var(--size-2);
		border-radius: var(--radius-2);
	}
</style>
